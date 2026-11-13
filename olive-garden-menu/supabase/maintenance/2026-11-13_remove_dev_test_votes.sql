-- =====================================================================
-- 2026-11-13_remove_dev_test_votes.sql   (owner-approved, run by hand)
--
-- Removes ONLY the 2 confirmed development test votes made from the local
-- site before launch:
--   * family-style-lasagna-bundle  1 star
--   * famous-house-salad           4 stars
-- Safety: the delete runs only if the database holds EXACTLY these 2
-- votes, both created on 2026-11-13 (UTC). If anything else is found
-- (for example a genuine visitor vote), NOTHING is deleted.
--
-- Supabase Dashboard > SQL Editor > New query. Run STEP 1, then STEP 2,
-- then STEP 3 (one at a time).
-- =====================================================================

-- STEP 1. Look first (expect exactly 2 rows: the votes listed above).
select id, product_id, rating_key, rating, created_at, updated_at,
       left(visitor_hash, 12) as visitor
  from ratings_private.votes
 order by created_at;

-- STEP 2. Delete the 2 test votes (all checks inside; all-or-nothing).
do $$
declare
  total    integer;
  matched  integer;
  deleted  integer;
begin
  select count(*) into total from ratings_private.votes;
  select count(*) into matched
    from ratings_private.votes
   where created_at >= '2026-11-13 00:00:00+00' and created_at < '2026-11-14 00:00:00+00'
     and ((product_id = 'family-style-lasagna-bundle' and rating = 1)
       or (product_id = 'famous-house-salad' and rating = 4));

  if total <> 2 then
    raise exception 'Found % votes in total, expected exactly the 2 test votes. Nothing was deleted.', total;
  end if;
  if matched <> 2 then
    raise exception 'Only % of the 2 test votes match (product, stars, date). Nothing was deleted.', matched;
  end if;

  delete from ratings_private.votes
   where created_at >= '2026-11-13 00:00:00+00' and created_at < '2026-11-14 00:00:00+00'
     and ((product_id = 'family-style-lasagna-bundle' and rating = 1)
       or (product_id = 'famous-house-salad' and rating = 4));
  get diagnostics deleted = row_count;
  if deleted <> 2 then
    raise exception 'Would delete % rows instead of 2. Nothing was deleted.', deleted;
  end if;

  -- Development rate-limit counters (no ratings in them).
  delete from ratings_private.rate_limits;

  raise notice 'Deleted the 2 development test votes.';
end
$$;

-- STEP 3. Check: expect votes_left = 0 and rated_dishes = 0.
select (select count(*) from ratings_private.votes) as votes_left,
       (select count(*) from ratings_private.summaries where rating_count > 0) as rated_dishes;
