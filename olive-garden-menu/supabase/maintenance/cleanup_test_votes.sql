-- =====================================================================
-- cleanup_test_votes.sql  (NOT a migration; run by the owner, by hand)
--
-- Removes ONLY confirmed test votes and keeps every genuine visitor vote.
-- Run each step separately in the Supabase SQL Editor (postgres role).
-- Nothing here deletes all votes. Docs: docs/RATING_SYSTEM.md section 9.
-- =====================================================================

-- STEP 1. Look at all votes (no visitor data is shown in full).
select id,
       product_id,
       rating_key,
       rating,
       created_at,
       updated_at,
       left(visitor_hash, 12) as visitor
  from ratings_private.votes
 order by created_at;

-- STEP 2. Choose ONE way to select the test votes and PREVIEW them.
--   (a) Best: your own browser's votes. Get your hash with
--       npm run rating:visitor-hash -- "<og_rv cookie value>"
--       and paste it below (64 characters).
select id, product_id, rating, created_at
  from ratings_private.votes
 where visitor_hash in ('PASTE_YOUR_64_CHARACTER_VISITOR_HASH_HERE');

--   (b) Or: exact vote ids you confirmed as tests in STEP 1.
select id, product_id, rating, created_at
  from ratings_private.votes
 where id in (0); -- replace 0 with the ids, e.g. (1, 2)

-- STEP 3. Delete exactly what the preview showed.
--   Put the SAME list as in the preview, and the number of rows the
--   preview showed as expected_count. If the numbers differ, NOTHING is
--   deleted (the whole block is rolled back with an error message).
do $$
declare
  expected_count constant integer := 0;  -- <- number of rows from the preview
  deleted integer;
begin
  delete from ratings_private.votes
   where visitor_hash in ('PASTE_YOUR_64_CHARACTER_VISITOR_HASH_HERE');
   -- or instead: where id in (1, 2)
  get diagnostics deleted = row_count;
  if deleted <> expected_count or deleted = 0 then
    raise exception 'Expected % test votes but found %. Nothing was deleted.', expected_count, deleted;
  end if;
  raise notice 'Deleted % test votes.', deleted;
end
$$;

-- STEP 4. Check: totals are recalculated automatically by the trigger.
select rating_key, rating_count, rating_sum, updated_at
  from ratings_private.summaries
 where rating_count > 0
 order by rating_key;

-- Optional: rate-limit counters are deleted automatically after 2 days.
-- Before launch you may clear them (they contain no ratings):
-- delete from ratings_private.rate_limits;
