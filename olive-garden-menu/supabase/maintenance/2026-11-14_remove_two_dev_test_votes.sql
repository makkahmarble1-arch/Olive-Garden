-- =====================================================================
-- 2026-11-14_remove_two_dev_test_votes.sql   (owner-approved, run by hand)
--
-- Replaces 2026-11-13_remove_dev_test_votes.sql. That file only deletes
-- when the database holds exactly 2 votes; on 2026-11-14 /api/ratings showed
-- a THIRD vote (Breadsticks, 3 stars), so the old file would now delete
-- nothing.
--
-- This file removes ONLY the 2 confirmed development test votes and leaves
-- every other vote (including the Breadsticks vote) untouched:
--   * family-style-lasagna-bundle  1 star   created 2026-11-13 (UTC)
--   * famous-house-salad           4 stars  created 2026-11-13 (UTC)
--
-- Supabase Dashboard > SQL Editor > New query (postgres role).
-- Run STEP 1, check the result, then STEP 2, then STEP 3 and STEP 4.
-- Nothing here runs automatically; the code cannot reach ratings_private.
-- =====================================================================

-- STEP 1. Verify before deleting. Expect exactly 2 rows: the two votes
-- above. Write down their ids.
select id, product_id, rating_key, rating, created_at,
       left(visitor_hash, 12) as visitor
  from ratings_private.votes
 where created_at >= '2026-11-13 00:00:00+00' and created_at < '2026-11-14 00:00:00+00'
   and ((product_id = 'family-style-lasagna-bundle' and rating = 1)
     or (product_id = 'famous-house-salad' and rating = 4))
 order by created_at;

-- (Optional) All votes, to see what will stay:
-- select id, product_id, rating, created_at from ratings_private.votes order by created_at;

-- STEP 2. Delete exactly those 2 votes (all-or-nothing).
do $$
declare
  matched integer;
  deleted integer;
begin
  select count(*) into matched
    from ratings_private.votes
   where created_at >= '2026-11-13 00:00:00+00' and created_at < '2026-11-14 00:00:00+00'
     and ((product_id = 'family-style-lasagna-bundle' and rating = 1)
       or (product_id = 'famous-house-salad' and rating = 4));
  if matched <> 2 then
    raise exception 'Found % matching votes instead of 2. Nothing was deleted.', matched;
  end if;

  delete from ratings_private.votes
   where created_at >= '2026-11-13 00:00:00+00' and created_at < '2026-11-14 00:00:00+00'
     and ((product_id = 'family-style-lasagna-bundle' and rating = 1)
       or (product_id = 'famous-house-salad' and rating = 4));
  get diagnostics deleted = row_count;
  if deleted <> 2 then
    raise exception 'Would delete % rows instead of 2. Nothing was deleted.', deleted;
  end if;

  raise notice 'Deleted the 2 development test votes. Other votes were kept.';
end
$$;

-- STEP 3. Check the two dishes: expect rating_count 0 and rating_sum 0 for
-- both rows (the summary trigger subtracted each deleted vote).
select rating_key, rating_count, rating_sum
  from ratings_private.summaries
 where rating_key in (
   select rating_key from ratings_private.products
    where product_id in ('family-style-lasagna-bundle', 'famous-house-salad'));

-- STEP 4. All totals are consistent with the remaining votes: expect 0 rows.
select s.rating_key, s.rating_count, s.rating_sum
  from ratings_private.summaries s
 where s.rating_count < 0 or s.rating_sum < 0
    or s.rating_count <> (select count(*) from ratings_private.votes v where v.rating_key = s.rating_key)
    or s.rating_sum <> coalesce((select sum(v.rating) from ratings_private.votes v where v.rating_key = s.rating_key), 0);

-- The site shows "Not rated yet" for both dishes within about one minute
-- (server cache). The Breadsticks vote stays until the owner decides.
