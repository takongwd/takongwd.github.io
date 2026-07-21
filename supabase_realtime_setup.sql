-- =========================================================================
-- SUPABASE REALTIME PUBLICATION SETUP
-- Enables instant, live real-time sync across all devices for all tables.
-- Run this in your Supabase SQL Editor (https://supabase.com).
-- =========================================================================

-- Ensure the supabase_realtime publication exists and add all tables to it
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

-- Enable Realtime broadcasting on all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.albums;
ALTER PUBLICATION supabase_realtime ADD TABLE public.photos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pricing_packages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
