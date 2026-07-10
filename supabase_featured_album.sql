-- ====================================================================
-- SUPABASE SETTINGS MIGRATION: ADD FEATURED ALBUM ID SUPPORT
-- Run this script inside your Supabase SQL Editor (https://supabase.com)
-- ====================================================================

ALTER TABLE settings 
ADD COLUMN IF NOT EXISTS featured_album_id text DEFAULT 'all';
