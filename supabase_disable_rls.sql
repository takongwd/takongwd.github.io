-- =========================================================================
-- SUPABASE DATABASE CONFIGURATION: DISABLE RLS FOR MAXIMUM SPEED & SIMPLICITY
-- This script completely disables RLS and opens up all tables for public write/read.
-- Run this in your Supabase SQL Editor (https://supabase.com).
-- =========================================================================

-- 1. Disable Row Level Security (RLS) on all tables to bypass policy checks entirely
ALTER TABLE public.albums DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views DISABLE ROW LEVEL SECURITY;

-- 2. Drop all existing security policies to keep the database schema clean
DROP POLICY IF EXISTS "Allow public select on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin insert on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin update on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin delete on albums" ON public.albums;

DROP POLICY IF EXISTS "Allow public select on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin insert on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin update on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin delete on photos" ON public.photos;

DROP POLICY IF EXISTS "Allow public select on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin insert on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin update on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin delete on pricing_packages" ON public.pricing_packages;

DROP POLICY IF EXISTS "Allow public select on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin insert on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin update on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin delete on settings" ON public.settings;

DROP POLICY IF EXISTS "Allow public insert on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin select on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin update on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin delete on bookings" ON public.bookings;

DROP POLICY IF EXISTS "Allow public insert on page_views" ON public.page_views;
DROP POLICY IF EXISTS "Allow public select on page_views" ON public.page_views;

-- 3. Grant full table and column permissions to both guest (anon) and admin (authenticated) roles
GRANT ALL ON public.albums TO anon, authenticated, service_role;
GRANT ALL ON public.photos TO anon, authenticated, service_role;
GRANT ALL ON public.pricing_packages TO anon, authenticated, service_role;
GRANT ALL ON public.settings TO anon, authenticated, service_role;
GRANT ALL ON public.bookings TO anon, authenticated, service_role;
GRANT ALL ON public.page_views TO anon, authenticated, service_role;
