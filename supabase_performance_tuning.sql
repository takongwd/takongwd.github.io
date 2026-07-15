-- =========================================================================
-- SUPABASE POSTGRES PERFORMANCE TUNING SCRIPT
-- Resolves suggestions from Supabase Performance Advisor:
--   1. Creates missing covering index on foreign key photos(album_id)
--   2. Drops unused indexes to save storage and speed up insert/update writes
-- =========================================================================

-- 1. Create covering index for the photos(album_id) foreign key fkey
-- Speeds up MasonryGrid queries when visitors select specific portfolio tabs
CREATE INDEX IF NOT EXISTS idx_photos_album_id ON public.photos(album_id);

-- 2. Drop unused index on pricing_packages(order_index)
DROP INDEX IF EXISTS public.idx_pricing_packages_order_index;

-- 3. Drop unused index on bookings(booking_date)
DROP INDEX IF EXISTS public.idx_bookings_booking_date;
