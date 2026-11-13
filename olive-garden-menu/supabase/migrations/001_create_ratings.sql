-- =====================================================================
-- 001_create_ratings.sql
-- Genuine visitor ratings (1-5 stars) for the Olive Garden Menu & Prices
-- site. Lesson 7.4.3, 2026-11-13. Documentation: docs/RATING_SYSTEM.md
--
-- Run ONCE, manually, in the Supabase SQL Editor (as the default
-- "postgres" role). It inserts NO ratings: only the list of products
-- that can be rated. Safe to run again (it skips what already exists).
--
-- Security model (summary):
--   * All tables live in the private schema "ratings_private", which the
--     Supabase Data API does not expose. RLS is enabled on every table
--     and there are no policies for anon/authenticated, so the browser
--     (publishable key) can never read or write them directly.
--   * Public read access is ONE function: public.get_rating_summaries(),
--     which returns only product id, average, and vote count.
--   * Votes can only be written by public.submit_rating(), which is
--     executable by the service_role ONLY, i.e. by our own server-side
--     API with the secret key (Lesson 7.4.4). Browsers cannot call it.
--   * Visitors are stored only as a 64-character HMAC hash created on
--     the server. No IP address, name, email, or user agent is stored.
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- 1. Private schema (not exposed by the Data API)
-- ---------------------------------------------------------------------
create schema if not exists ratings_private;
revoke all on schema ratings_private from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- 2. Tables
-- ---------------------------------------------------------------------

-- Products that can be rated. product_id = the id in
-- content/menu/products.ts. rating_key = the product whose ratings are
-- shared (itself, or the canonical product of a confirmed alias group).
create table if not exists ratings_private.products (
  product_id  text primary key
              check (product_id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(product_id) <= 80),
  rating_key  text not null
              references ratings_private.products (product_id),
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);
create index if not exists products_rating_key_idx on ratings_private.products (rating_key);

-- One row per visitor per rated dish (rating_key). Updating a rating
-- changes this row; it never creates a second vote.
create table if not exists ratings_private.votes (
  id            bigint generated always as identity primary key,
  rating_key    text not null references ratings_private.products (product_id),
  product_id    text not null references ratings_private.products (product_id),
  visitor_hash  text not null check (visitor_hash ~ '^[0-9a-f]{64}$'),
  rating        smallint not null check (rating between 1 and 5),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint votes_one_per_visitor_per_dish unique (rating_key, visitor_hash),
  constraint votes_updated_after_created check (updated_at >= created_at)
);
create index if not exists votes_visitor_hash_idx on ratings_private.votes (visitor_hash);

-- Pre-computed totals per rated dish, kept up to date by a trigger, so a
-- page can read all averages with one fast query.
create table if not exists ratings_private.summaries (
  rating_key    text primary key references ratings_private.products (product_id),
  rating_count  integer not null default 0 check (rating_count >= 0),
  rating_sum    integer not null default 0 check (rating_sum >= 0),
  updated_at    timestamptz not null default now(),
  constraint summaries_sum_in_range check (rating_sum between rating_count and rating_count * 5)
);

-- Hourly write counters for rate limiting. subject_hash is a server-side
-- HMAC hash (visitor or daily-rotated network hash), never a raw IP.
create table if not exists ratings_private.rate_limits (
  subject_hash  text not null check (subject_hash ~ '^[vn]:[0-9a-f]{64}$'),
  window_start  timestamptz not null,
  hits          integer not null default 0 check (hits >= 0),
  primary key (subject_hash, window_start)
);
create index if not exists rate_limits_window_idx on ratings_private.rate_limits (window_start);

-- ---------------------------------------------------------------------
-- 3. Row Level Security: ON for every table, no anon/authenticated
--    policies (= deny all). Only SECURITY DEFINER functions below
--    (owned by postgres) touch these tables.
-- ---------------------------------------------------------------------
alter table ratings_private.products    enable row level security;
alter table ratings_private.votes       enable row level security;
alter table ratings_private.summaries   enable row level security;
alter table ratings_private.rate_limits enable row level security;

alter table ratings_private.products    force row level security;
alter table ratings_private.votes       force row level security;
alter table ratings_private.summaries   force row level security;
alter table ratings_private.rate_limits force row level security;

revoke all on all tables in schema ratings_private from public, anon, authenticated;
revoke all on all sequences in schema ratings_private from public, anon, authenticated;

-- FORCE RLS also applies to the table owner, so the owner (postgres)
-- needs explicit policies. These do not apply to anon/authenticated.
do $$
declare t text;
begin
  foreach t in array array['products', 'votes', 'summaries', 'rate_limits'] loop
    if not exists (
      select 1 from pg_policies
      where schemaname = 'ratings_private' and tablename = t and policyname = t || '_owner_all'
    ) then
      execute format(
        'create policy %I on ratings_private.%I as permissive for all to postgres using (true) with check (true)',
        t || '_owner_all', t);
    end if;
  end loop;
end
$$;

-- ---------------------------------------------------------------------
-- 4. Summary trigger (keeps ratings_private.summaries in sync)
-- ---------------------------------------------------------------------
create or replace function ratings_private.apply_vote_to_summary()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op in ('UPDATE', 'DELETE') then
    update ratings_private.summaries
       set rating_count = rating_count - 1,
           rating_sum   = rating_sum - old.rating,
           updated_at   = now()
     where rating_key = old.rating_key;
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    insert into ratings_private.summaries as s (rating_key, rating_count, rating_sum, updated_at)
    values (new.rating_key, 1, new.rating, now())
    on conflict (rating_key) do update
      set rating_count = s.rating_count + 1,
          rating_sum   = s.rating_sum + excluded.rating_sum,
          updated_at   = now();
  end if;
  return null;
end;
$$;

drop trigger if exists votes_apply_to_summary on ratings_private.votes;
create trigger votes_apply_to_summary
  after insert or update of rating, rating_key or delete on ratings_private.votes
  for each row execute function ratings_private.apply_vote_to_summary();

revoke all on function ratings_private.apply_vote_to_summary() from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- 5. Public read: averages and counts for many products in ONE call.
--    Unrated products return rating_count 0 and average_rating NULL
--    (never an invented value). Unknown ids return count 0 too.
-- ---------------------------------------------------------------------
create or replace function public.get_rating_summaries(p_product_ids text[])
returns table (
  product_id      text,
  rating_key      text,
  average_rating  numeric(3, 2),
  rating_count    integer
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if p_product_ids is null or cardinality(p_product_ids) = 0 then
    return;
  end if;
  if cardinality(p_product_ids) > 300 then
    raise exception 'too_many_products' using errcode = '22023',
      hint = 'Request at most 300 product ids per call.';
  end if;

  return query
  select req.id::text,
         p.rating_key,
         case when coalesce(s.rating_count, 0) > 0
              then round(s.rating_sum::numeric / s.rating_count, 2)::numeric(3, 2)
         end,
         coalesce(s.rating_count, 0)
    from (select distinct u.id from unnest(p_product_ids) as u(id)) as req
    left join ratings_private.products p
           on p.product_id = req.id and p.is_active
    left join ratings_private.summaries s
           on s.rating_key = p.rating_key;
end;
$$;

revoke all on function public.get_rating_summaries(text[]) from public;
grant execute on function public.get_rating_summaries(text[]) to anon, authenticated, service_role;

-- ---------------------------------------------------------------------
-- 6. Server-only write: create or update one visitor's rating.
--    Callable ONLY by service_role (our server API with the secret key).
--    p_visitor_hash: HMAC-SHA256 of the server-issued anonymous visitor
--                    id (hex, 64 chars). Never taken from the browser.
--    p_network_hash: HMAC-SHA256 of the IP + current date (hex, 64
--                    chars), used only for rate limiting, rotates daily.
--    Errors (raised): invalid_rating, invalid_hash, unknown_product,
--                     rate_limited.
-- ---------------------------------------------------------------------
create or replace function public.submit_rating(
  p_product_id    text,
  p_visitor_hash  text,
  p_network_hash  text,
  p_rating        integer
)
returns table (
  product_id      text,
  rating_key      text,
  result          text,
  average_rating  numeric(3, 2),
  rating_count    integer
)
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  -- Limits per rolling clock hour. Raise them here if real visitors hit them.
  c_visitor_limit constant integer := 40;   -- writes per visitor per hour
  c_network_limit constant integer := 120;  -- writes per network per hour
  v_key     text;
  v_window  timestamptz := date_trunc('hour', now());
  v_hits    integer;
  v_old     smallint;
  v_result  text;
begin
  if p_rating is null or p_rating < 1 or p_rating > 5 then
    raise exception 'invalid_rating' using errcode = '22023';
  end if;
  if p_visitor_hash is null or p_visitor_hash !~ '^[0-9a-f]{64}$'
     or p_network_hash is null or p_network_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid_hash' using errcode = '22023';
  end if;

  select p.rating_key into v_key
    from ratings_private.products p
   where p.product_id = p_product_id and p.is_active;
  if v_key is null then
    raise exception 'unknown_product' using errcode = '22023';
  end if;

  -- Rate limits (counted per attempt; rows older than 2 days are removed).
  delete from ratings_private.rate_limits where window_start < now() - interval '2 days';

  insert into ratings_private.rate_limits as r (subject_hash, window_start, hits)
  values ('v:' || p_visitor_hash, v_window, 1)
  on conflict (subject_hash, window_start) do update set hits = r.hits + 1
  returning r.hits into v_hits;
  if v_hits > c_visitor_limit then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  insert into ratings_private.rate_limits as r (subject_hash, window_start, hits)
  values ('n:' || p_network_hash, v_window, 1)
  on conflict (subject_hash, window_start) do update set hits = r.hits + 1
  returning r.hits into v_hits;
  if v_hits > c_network_limit then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  -- One vote per visitor per rated dish: insert, or update the old vote.
  select v.rating into v_old
    from ratings_private.votes v
   where v.rating_key = v_key and v.visitor_hash = p_visitor_hash
   for update;

  if v_old is null then
    insert into ratings_private.votes (rating_key, product_id, visitor_hash, rating)
    values (v_key, p_product_id, p_visitor_hash, p_rating)
    on conflict on constraint votes_one_per_visitor_per_dish do update
      set rating = excluded.rating, product_id = excluded.product_id, updated_at = now();
    v_result := 'created';
  elsif v_old = p_rating then
    v_result := 'unchanged';
  else
    update ratings_private.votes v
       set rating = p_rating, product_id = p_product_id, updated_at = now()
     where v.rating_key = v_key and v.visitor_hash = p_visitor_hash;
    v_result := 'updated';
  end if;

  return query
  select p_product_id,
         v_key,
         v_result,
         case when s.rating_count > 0
              then round(s.rating_sum::numeric / s.rating_count, 2)::numeric(3, 2)
         end,
         coalesce(s.rating_count, 0)
    from (select 1) as one
    left join ratings_private.summaries s on s.rating_key = v_key;
end;
$$;

revoke all on function public.submit_rating(text, text, text, integer) from public, anon, authenticated;
grant execute on function public.submit_rating(text, text, text, integer) to service_role;

-- ---------------------------------------------------------------------
-- 7. Products that can be rated (146 products, 131 rating keys).
--    Generated from content/menu/products.ts. Shared groups follow the
--    owner's alias decisions; see docs/RATING_SYSTEM.md. NO ratings.
-- ---------------------------------------------------------------------
-- Canonical rows first (rating_key = product_id), then group members.
insert into ratings_private.products (product_id, rating_key)
select v.product_id, v.product_id
  from (values
    ('2-liter-soda', '2-liter-soda'),
    ('6-oz-sirloin', '6-oz-sirloin'),
    ('acqua-panna-spring-1-liter-bottle', 'acqua-panna-spring-1-liter-bottle'),
    ('alfredo-dipping-sauce', 'side-of-alfredo-sauce'),
    ('bellini-peach-raspberry-iced-tea', 'bellini-peach-raspberry-iced-tea'),
    ('black-tie-mousse-cake', 'black-tie-mousse-cake'),
    ('breadsticks', 'breadsticks'),
    ('broccoli', 'side-of-broccoli'),
    ('bud-light', 'bud-light'),
    ('budweiser', 'budweiser'),
    ('cabernet-robert-mondavi-private-selection', 'cabernet-robert-mondavi-private-selection'),
    ('calabrian-steak-and-shrimp-bucatini', 'calabrian-steak-and-shrimp-bucatini'),
    ('calamari', 'calamari'),
    ('cappuccino', 'cappuccino'),
    ('chardonnay-chateau-ste-michelle', 'chardonnay-chateau-ste-michelle'),
    ('cheese-grater', 'cheese-grater'),
    ('cheese-ravioli', 'cheese-ravioli'),
    ('cheese-ravioli-with-marinara-or-meat-sauce', 'cheese-ravioli'),
    ('cheese-ravioli-with-meat-or-marinara-sauce', 'cheese-ravioli'),
    ('chianti-classico-rocca-delle-macie', 'chianti-classico-rocca-delle-macie'),
    ('chicken-alfredo', 'chicken-alfredo'),
    ('chicken-alfredo-flatbread', 'chicken-alfredo-flatbread'),
    ('chicken-and-shrimp-carbonara', 'chicken-and-shrimp-carbonara'),
    ('chicken-fingers', 'chicken-fingers'),
    ('chicken-parmigiana', 'chicken-parmigiana'),
    ('chicken-parmigiana-combination', 'chicken-parmigiana-combination'),
    ('chicken-parmigiana-sandwich', 'chicken-parmigiana-sandwich'),
    ('chicken-scampi', 'chicken-scampi'),
    ('chicken-tortelloni-alfredo', 'chicken-tortelloni-alfredo'),
    ('chocolate-lasagna', 'chocolate-lasagna'),
    ('classic-lemonade', 'classic-lemonade'),
    ('classic-pepperoni-flatbread', 'classic-pepperoni-flatbread'),
    ('coors-light', 'coors-light'),
    ('create-your-own-pasta', 'create-your-own-pasta'),
    ('create-your-own-pasta-station', 'create-your-own-pasta-station'),
    ('desert-pear-limonata', 'desert-pear-limonata'),
    ('dipping-sauces-with-breadsticks', 'dipping-sauces-with-breadsticks'),
    ('eggplant-parmigiana', 'eggplant-parmigiana'),
    ('eggplant-parmigiana-sandwich', 'eggplant-parmigiana-sandwich'),
    ('family-style-chicken-alfredo-bundle', 'family-style-chicken-alfredo-bundle'),
    ('family-style-chicken-parmigiana-bundle', 'family-style-chicken-parmigiana-bundle'),
    ('family-style-five-cheese-ziti-al-forno-bundle', 'family-style-five-cheese-ziti-al-forno-bundle'),
    ('family-style-lasagna-bundle', 'family-style-lasagna-bundle'),
    ('famous-house-salad', 'famous-house-salad'),
    ('famous-house-salad-without-croutons', 'famous-house-salad-without-croutons'),
    ('fettuccine-alfredo', 'fettuccine-alfredo'),
    ('five-cheese-flatbread', 'five-cheese-flatbread'),
    ('five-cheese-marinara-dipping-sauce', 'side-of-five-cheese-marinara-sauce'),
    ('five-cheese-ziti-al-forno', 'five-cheese-ziti-al-forno'),
    ('four-cheese-manicotti-with-marinara', 'four-cheese-manicotti-with-marinara'),
    ('fresh-brewed-sweet-iced-tea', 'fresh-brewed-sweet-iced-tea'),
    ('fresh-brewed-unsweet-iced-tea', 'fresh-brewed-unsweet-iced-tea'),
    ('fried-mozzarella', 'fried-mozzarella'),
    ('gallon-iced-teas-and-raspberry-lemonade', 'gallon-iced-teas-and-raspberry-lemonade'),
    ('grilled-chicken-breasts', 'side-of-grilled-chicken'),
    ('grilled-chicken-margherita', 'grilled-chicken-margherita'),
    ('grilled-chicken-parmigiana', 'grilled-chicken-parmigiana'),
    ('grilled-chicken-with-rotini-pasta-and-marinara', 'kids-grilled-chicken-with-rotini-pasta-and-marinara'),
    ('half-iced-tea-and-half-lemonade', 'half-iced-tea-and-half-lemonade'),
    ('heineken-0-0-non-alcoholic', 'heineken-0-0-non-alcoholic'),
    ('herb-grilled-salmon', 'herb-grilled-salmon'),
    ('homemade-soups', 'homemade-soups'),
    ('italian-grilled-chicken-sandwich', 'italian-grilled-chicken-sandwich'),
    ('italian-meatballs', 'italian-meatballs'),
    ('italian-sausage', 'italian-sausage'),
    ('kids-alfredo-pasta', 'kids-alfredo-pasta'),
    ('kids-cheese-ravioli', 'kids-cheese-ravioli'),
    ('kids-chicken-fingers', 'chicken-fingers'),
    ('kids-five-cheese-marinara-pasta', 'kids-five-cheese-marinara-pasta'),
    ('kids-grilled-chicken-with-rotini-pasta-and-marinara', 'kids-grilled-chicken-with-rotini-pasta-and-marinara'),
    ('kids-macaroni-and-cheese', 'kids-macaroni-and-cheese'),
    ('kids-meat-sauce-pasta', 'kids-meat-sauce-pasta'),
    ('kids-pizza', 'kids-pizza'),
    ('kids-rotini-with-marinara', 'kids-rotini-with-marinara'),
    ('kids-rotini-with-meat-sauce', 'kids-rotini-with-meat-sauce'),
    ('kids-tomato-sauce-pasta', 'kids-tomato-sauce-pasta'),
    ('large-salad', 'large-salad'),
    ('lasagna-classico', 'lasagna-classico'),
    ('lasagna-combination', 'lasagna-combination'),
    ('lasagna-fritta', 'lasagna-fritta'),
    ('lavazza-espresso', 'lavazza-espresso'),
    ('mango-passion-fruit-iced-tea', 'mango-passion-fruit-iced-tea'),
    ('marinara-dipping-sauce', 'side-of-marinara-sauce'),
    ('meat-dipping-sauce', 'side-of-meat-sauce'),
    ('meatballs-parmigiana', 'meatballs-parmigiana'),
    ('merlot-beringer', 'merlot-beringer'),
    ('michelob-ultra', 'michelob-ultra'),
    ('miller-lite', 'miller-lite'),
    ('moscato-castello-del-poggio', 'moscato-castello-del-poggio'),
    ('moscato-primo-amore', 'moscato-primo-amore'),
    ('pinot-grigio-cavit', 'pinot-grigio-cavit'),
    ('pinot-noir-meiomi', 'pinot-noir-meiomi'),
    ('pumpkin-cookie-butter-cheesecake', 'pumpkin-cookie-butter-cheesecake'),
    ('raspberry-lemonade', 'raspberry-lemonade'),
    ('ravioli-carbonara', 'ravioli-carbonara'),
    ('red-blend-porta-vita', 'red-blend-porta-vita'),
    ('riesling-chateau-ste-michelle', 'riesling-chateau-ste-michelle'),
    ('rigatoni-alla-vodka', 'rigatoni-alla-vodka'),
    ('rotini-pasta-with-marinara', 'rotini-pasta-with-marinara'),
    ('rotini-pasta-with-meat-sauce', 'rotini-pasta-with-meat-sauce'),
    ('rotini-with-marinara', 'rotini-with-marinara'),
    ('rotini-with-meat-sauce', 'rotini-with-meat-sauce'),
    ('san-pellegrino-sparkling-1-liter-bottle', 'san-pellegrino-sparkling-1-liter-bottle'),
    ('sauvignon-blanc-starborough', 'sauvignon-blanc-starborough'),
    ('seafood-alfredo', 'seafood-alfredo'),
    ('shrimp-alfredo', 'shrimp-alfredo'),
    ('shrimp-carbonara', 'shrimp-carbonara'),
    ('shrimp-fritto-misto', 'shrimp-fritto-misto'),
    ('shrimp-scampi', 'shrimp-scampi'),
    ('sicilian-cheesecake', 'sicilian-cheesecake-with-strawberry-topping'),
    ('sicilian-cheesecake-with-strawberry-topping', 'sicilian-cheesecake-with-strawberry-topping'),
    ('side-of-alfredo-sauce', 'side-of-alfredo-sauce'),
    ('side-of-broccoli', 'side-of-broccoli'),
    ('side-of-crispy-chicken-fritta', 'side-of-crispy-chicken-fritta'),
    ('side-of-crispy-shrimp-fritta', 'side-of-crispy-shrimp-fritta'),
    ('side-of-five-cheese-marinara-sauce', 'side-of-five-cheese-marinara-sauce'),
    ('side-of-grilled-chicken', 'side-of-grilled-chicken'),
    ('side-of-marinara-sauce', 'side-of-marinara-sauce'),
    ('side-of-mashed-potatoes', 'side-of-mashed-potatoes'),
    ('side-of-meat-sauce', 'side-of-meat-sauce'),
    ('side-of-meatballs', 'side-of-meatballs'),
    ('soup-salad-and-breadsticks', 'soup-salad-and-breadsticks'),
    ('soup-salad-and-breadsticks-lunch', 'soup-salad-and-breadsticks'),
    ('spaghetti', 'spaghetti'),
    ('spaghetti-and-meatballs', 'spaghetti-and-meatballs'),
    ('spaghetti-with-marinara', 'spaghetti-with-marinara'),
    ('spaghetti-with-marinara-sauce', 'spaghetti-with-marinara'),
    ('spaghetti-with-meat-sauce', 'spaghetti-with-meat-sauce'),
    ('spicy-alfredo-fettuccine', 'spicy-alfredo-fettuccine'),
    ('spinach-artichoke-dip', 'spinach-artichoke-dip'),
    ('steak-gorgonzola-alfredo', 'steak-gorgonzola-alfredo'),
    ('strawberry-cream-cake', 'strawberry-cream-cake'),
    ('strawberry-passion-fruit-limonata', 'strawberry-passion-fruit-limonata'),
    ('stuffed-chicken-marsala', 'stuffed-chicken-marsala'),
    ('stuffed-ziti-fritta', 'stuffed-ziti-fritta'),
    ('sweet-pink-moscato-blend-confetti', 'sweet-pink-moscato-blend-confetti'),
    ('sweet-red-roscato-rosso-dolce', 'sweet-red-roscato-rosso-dolce'),
    ('tiramisu', 'tiramisu'),
    ('to-go-fountain-drinks', 'to-go-fountain-drinks'),
    ('toasted-beef-ravioli', 'toasted-ravioli'),
    ('toasted-ravioli', 'toasted-ravioli'),
    ('tour-of-italy', 'tour-of-italy'),
    ('warm-italian-doughnuts', 'warm-italian-doughnuts'),
    ('weekday-lunch-special', 'soup-salad-and-breadsticks'),
    ('white-zinfandel-sutter-home', 'white-zinfandel-sutter-home'),
    ('zuppa-toscana', 'zuppa-toscana')
  ) as v(product_id, rating_key)
on conflict (product_id) do nothing;

update ratings_private.products p
   set rating_key = v.rating_key
  from (values
    ('2-liter-soda', '2-liter-soda'),
    ('6-oz-sirloin', '6-oz-sirloin'),
    ('acqua-panna-spring-1-liter-bottle', 'acqua-panna-spring-1-liter-bottle'),
    ('alfredo-dipping-sauce', 'side-of-alfredo-sauce'),
    ('bellini-peach-raspberry-iced-tea', 'bellini-peach-raspberry-iced-tea'),
    ('black-tie-mousse-cake', 'black-tie-mousse-cake'),
    ('breadsticks', 'breadsticks'),
    ('broccoli', 'side-of-broccoli'),
    ('bud-light', 'bud-light'),
    ('budweiser', 'budweiser'),
    ('cabernet-robert-mondavi-private-selection', 'cabernet-robert-mondavi-private-selection'),
    ('calabrian-steak-and-shrimp-bucatini', 'calabrian-steak-and-shrimp-bucatini'),
    ('calamari', 'calamari'),
    ('cappuccino', 'cappuccino'),
    ('chardonnay-chateau-ste-michelle', 'chardonnay-chateau-ste-michelle'),
    ('cheese-grater', 'cheese-grater'),
    ('cheese-ravioli', 'cheese-ravioli'),
    ('cheese-ravioli-with-marinara-or-meat-sauce', 'cheese-ravioli'),
    ('cheese-ravioli-with-meat-or-marinara-sauce', 'cheese-ravioli'),
    ('chianti-classico-rocca-delle-macie', 'chianti-classico-rocca-delle-macie'),
    ('chicken-alfredo', 'chicken-alfredo'),
    ('chicken-alfredo-flatbread', 'chicken-alfredo-flatbread'),
    ('chicken-and-shrimp-carbonara', 'chicken-and-shrimp-carbonara'),
    ('chicken-fingers', 'chicken-fingers'),
    ('chicken-parmigiana', 'chicken-parmigiana'),
    ('chicken-parmigiana-combination', 'chicken-parmigiana-combination'),
    ('chicken-parmigiana-sandwich', 'chicken-parmigiana-sandwich'),
    ('chicken-scampi', 'chicken-scampi'),
    ('chicken-tortelloni-alfredo', 'chicken-tortelloni-alfredo'),
    ('chocolate-lasagna', 'chocolate-lasagna'),
    ('classic-lemonade', 'classic-lemonade'),
    ('classic-pepperoni-flatbread', 'classic-pepperoni-flatbread'),
    ('coors-light', 'coors-light'),
    ('create-your-own-pasta', 'create-your-own-pasta'),
    ('create-your-own-pasta-station', 'create-your-own-pasta-station'),
    ('desert-pear-limonata', 'desert-pear-limonata'),
    ('dipping-sauces-with-breadsticks', 'dipping-sauces-with-breadsticks'),
    ('eggplant-parmigiana', 'eggplant-parmigiana'),
    ('eggplant-parmigiana-sandwich', 'eggplant-parmigiana-sandwich'),
    ('family-style-chicken-alfredo-bundle', 'family-style-chicken-alfredo-bundle'),
    ('family-style-chicken-parmigiana-bundle', 'family-style-chicken-parmigiana-bundle'),
    ('family-style-five-cheese-ziti-al-forno-bundle', 'family-style-five-cheese-ziti-al-forno-bundle'),
    ('family-style-lasagna-bundle', 'family-style-lasagna-bundle'),
    ('famous-house-salad', 'famous-house-salad'),
    ('famous-house-salad-without-croutons', 'famous-house-salad-without-croutons'),
    ('fettuccine-alfredo', 'fettuccine-alfredo'),
    ('five-cheese-flatbread', 'five-cheese-flatbread'),
    ('five-cheese-marinara-dipping-sauce', 'side-of-five-cheese-marinara-sauce'),
    ('five-cheese-ziti-al-forno', 'five-cheese-ziti-al-forno'),
    ('four-cheese-manicotti-with-marinara', 'four-cheese-manicotti-with-marinara'),
    ('fresh-brewed-sweet-iced-tea', 'fresh-brewed-sweet-iced-tea'),
    ('fresh-brewed-unsweet-iced-tea', 'fresh-brewed-unsweet-iced-tea'),
    ('fried-mozzarella', 'fried-mozzarella'),
    ('gallon-iced-teas-and-raspberry-lemonade', 'gallon-iced-teas-and-raspberry-lemonade'),
    ('grilled-chicken-breasts', 'side-of-grilled-chicken'),
    ('grilled-chicken-margherita', 'grilled-chicken-margherita'),
    ('grilled-chicken-parmigiana', 'grilled-chicken-parmigiana'),
    ('grilled-chicken-with-rotini-pasta-and-marinara', 'kids-grilled-chicken-with-rotini-pasta-and-marinara'),
    ('half-iced-tea-and-half-lemonade', 'half-iced-tea-and-half-lemonade'),
    ('heineken-0-0-non-alcoholic', 'heineken-0-0-non-alcoholic'),
    ('herb-grilled-salmon', 'herb-grilled-salmon'),
    ('homemade-soups', 'homemade-soups'),
    ('italian-grilled-chicken-sandwich', 'italian-grilled-chicken-sandwich'),
    ('italian-meatballs', 'italian-meatballs'),
    ('italian-sausage', 'italian-sausage'),
    ('kids-alfredo-pasta', 'kids-alfredo-pasta'),
    ('kids-cheese-ravioli', 'kids-cheese-ravioli'),
    ('kids-chicken-fingers', 'chicken-fingers'),
    ('kids-five-cheese-marinara-pasta', 'kids-five-cheese-marinara-pasta'),
    ('kids-grilled-chicken-with-rotini-pasta-and-marinara', 'kids-grilled-chicken-with-rotini-pasta-and-marinara'),
    ('kids-macaroni-and-cheese', 'kids-macaroni-and-cheese'),
    ('kids-meat-sauce-pasta', 'kids-meat-sauce-pasta'),
    ('kids-pizza', 'kids-pizza'),
    ('kids-rotini-with-marinara', 'kids-rotini-with-marinara'),
    ('kids-rotini-with-meat-sauce', 'kids-rotini-with-meat-sauce'),
    ('kids-tomato-sauce-pasta', 'kids-tomato-sauce-pasta'),
    ('large-salad', 'large-salad'),
    ('lasagna-classico', 'lasagna-classico'),
    ('lasagna-combination', 'lasagna-combination'),
    ('lasagna-fritta', 'lasagna-fritta'),
    ('lavazza-espresso', 'lavazza-espresso'),
    ('mango-passion-fruit-iced-tea', 'mango-passion-fruit-iced-tea'),
    ('marinara-dipping-sauce', 'side-of-marinara-sauce'),
    ('meat-dipping-sauce', 'side-of-meat-sauce'),
    ('meatballs-parmigiana', 'meatballs-parmigiana'),
    ('merlot-beringer', 'merlot-beringer'),
    ('michelob-ultra', 'michelob-ultra'),
    ('miller-lite', 'miller-lite'),
    ('moscato-castello-del-poggio', 'moscato-castello-del-poggio'),
    ('moscato-primo-amore', 'moscato-primo-amore'),
    ('pinot-grigio-cavit', 'pinot-grigio-cavit'),
    ('pinot-noir-meiomi', 'pinot-noir-meiomi'),
    ('pumpkin-cookie-butter-cheesecake', 'pumpkin-cookie-butter-cheesecake'),
    ('raspberry-lemonade', 'raspberry-lemonade'),
    ('ravioli-carbonara', 'ravioli-carbonara'),
    ('red-blend-porta-vita', 'red-blend-porta-vita'),
    ('riesling-chateau-ste-michelle', 'riesling-chateau-ste-michelle'),
    ('rigatoni-alla-vodka', 'rigatoni-alla-vodka'),
    ('rotini-pasta-with-marinara', 'rotini-pasta-with-marinara'),
    ('rotini-pasta-with-meat-sauce', 'rotini-pasta-with-meat-sauce'),
    ('rotini-with-marinara', 'rotini-with-marinara'),
    ('rotini-with-meat-sauce', 'rotini-with-meat-sauce'),
    ('san-pellegrino-sparkling-1-liter-bottle', 'san-pellegrino-sparkling-1-liter-bottle'),
    ('sauvignon-blanc-starborough', 'sauvignon-blanc-starborough'),
    ('seafood-alfredo', 'seafood-alfredo'),
    ('shrimp-alfredo', 'shrimp-alfredo'),
    ('shrimp-carbonara', 'shrimp-carbonara'),
    ('shrimp-fritto-misto', 'shrimp-fritto-misto'),
    ('shrimp-scampi', 'shrimp-scampi'),
    ('sicilian-cheesecake', 'sicilian-cheesecake-with-strawberry-topping'),
    ('sicilian-cheesecake-with-strawberry-topping', 'sicilian-cheesecake-with-strawberry-topping'),
    ('side-of-alfredo-sauce', 'side-of-alfredo-sauce'),
    ('side-of-broccoli', 'side-of-broccoli'),
    ('side-of-crispy-chicken-fritta', 'side-of-crispy-chicken-fritta'),
    ('side-of-crispy-shrimp-fritta', 'side-of-crispy-shrimp-fritta'),
    ('side-of-five-cheese-marinara-sauce', 'side-of-five-cheese-marinara-sauce'),
    ('side-of-grilled-chicken', 'side-of-grilled-chicken'),
    ('side-of-marinara-sauce', 'side-of-marinara-sauce'),
    ('side-of-mashed-potatoes', 'side-of-mashed-potatoes'),
    ('side-of-meat-sauce', 'side-of-meat-sauce'),
    ('side-of-meatballs', 'side-of-meatballs'),
    ('soup-salad-and-breadsticks', 'soup-salad-and-breadsticks'),
    ('soup-salad-and-breadsticks-lunch', 'soup-salad-and-breadsticks'),
    ('spaghetti', 'spaghetti'),
    ('spaghetti-and-meatballs', 'spaghetti-and-meatballs'),
    ('spaghetti-with-marinara', 'spaghetti-with-marinara'),
    ('spaghetti-with-marinara-sauce', 'spaghetti-with-marinara'),
    ('spaghetti-with-meat-sauce', 'spaghetti-with-meat-sauce'),
    ('spicy-alfredo-fettuccine', 'spicy-alfredo-fettuccine'),
    ('spinach-artichoke-dip', 'spinach-artichoke-dip'),
    ('steak-gorgonzola-alfredo', 'steak-gorgonzola-alfredo'),
    ('strawberry-cream-cake', 'strawberry-cream-cake'),
    ('strawberry-passion-fruit-limonata', 'strawberry-passion-fruit-limonata'),
    ('stuffed-chicken-marsala', 'stuffed-chicken-marsala'),
    ('stuffed-ziti-fritta', 'stuffed-ziti-fritta'),
    ('sweet-pink-moscato-blend-confetti', 'sweet-pink-moscato-blend-confetti'),
    ('sweet-red-roscato-rosso-dolce', 'sweet-red-roscato-rosso-dolce'),
    ('tiramisu', 'tiramisu'),
    ('to-go-fountain-drinks', 'to-go-fountain-drinks'),
    ('toasted-beef-ravioli', 'toasted-ravioli'),
    ('toasted-ravioli', 'toasted-ravioli'),
    ('tour-of-italy', 'tour-of-italy'),
    ('warm-italian-doughnuts', 'warm-italian-doughnuts'),
    ('weekday-lunch-special', 'soup-salad-and-breadsticks'),
    ('white-zinfandel-sutter-home', 'white-zinfandel-sutter-home'),
    ('zuppa-toscana', 'zuppa-toscana')
  ) as v(product_id, rating_key)
 where p.product_id = v.product_id
   and p.rating_key is distinct from v.rating_key
   and not exists (select 1 from ratings_private.votes x where x.product_id = p.product_id);

-- ---------------------------------------------------------------------
-- 8. Self-check: every rating_key must point to a canonical product.
-- ---------------------------------------------------------------------
do $$
declare bad integer;
begin
  select count(*) into bad
    from ratings_private.products p
    join ratings_private.products k on k.product_id = p.rating_key
   where k.rating_key <> k.product_id;
  if bad > 0 then
    raise exception 'rating_key must point to a canonical product (% bad rows)', bad;
  end if;
end
$$;

commit;

-- After running, this should return 146 rows, all with rating_count 0:
--   select count(*) from public.get_rating_summaries(
--     (select array_agg(product_id) from ratings_private.products));
