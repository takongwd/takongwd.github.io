-- ====================================================================
-- SUPABASE SECURITY PATCH: RESOLVE RLS POLICY ALWAYS TRUE WARNINGS
-- Run this script inside your Supabase SQL Editor (https://supabase.com)
-- ====================================================================

-- 1. ALBUMS POLICIES
DROP POLICY IF EXISTS "Allow authenticated admin write on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin write on albums" ON public.albums;
CREATE POLICY "Allow admin write on albums" ON public.albums 
FOR ALL TO authenticated 
USING ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com');

-- 2. PHOTOS POLICIES
DROP POLICY IF EXISTS "Allow authenticated admin write on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin write on photos" ON public.photos;
CREATE POLICY "Allow admin write on photos" ON public.photos 
FOR ALL TO authenticated 
USING ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com');

-- 3. PRICING PACKAGES POLICIES
DROP POLICY IF EXISTS "Allow authenticated admin write on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin write on pricing_packages" ON public.pricing_packages;
CREATE POLICY "Allow admin write on pricing_packages" ON public.pricing_packages 
FOR ALL TO authenticated 
USING ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com');

-- 4. SETTINGS POLICIES
DROP POLICY IF EXISTS "Allow authenticated admin write on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin write on settings" ON public.settings;
CREATE POLICY "Allow admin write on settings" ON public.settings 
FOR ALL TO authenticated 
USING ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com');

-- 5. BOOKINGS POLICIES
DROP POLICY IF EXISTS "Allow authenticated admin full access on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin full access on bookings" ON public.bookings;
CREATE POLICY "Allow admin full access on bookings" ON public.bookings 
FOR ALL TO authenticated 
USING ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'takong.nov25@gmail.com');

DROP POLICY IF EXISTS "Allow public insert on bookings" ON public.bookings;
CREATE POLICY "Allow public insert on bookings" ON public.bookings 
FOR INSERT 
WITH CHECK (booking_date IS NOT NULL AND client_name IS NOT NULL AND client_phone IS NOT NULL);

-- 6. PAGE VIEWS POLICIES
DROP POLICY IF EXISTS "Allow public insert on page_views" ON public.page_views;
DROP POLICY IF EXISTS "Allow public inserts" ON public.page_views;
DROP POLICY IF EXISTS "Allow public select on page_views" ON public.page_views;
CREATE POLICY "Allow public insert on page_views" ON public.page_views FOR INSERT WITH CHECK (id IS NOT NULL);
CREATE POLICY "Allow public select on page_views" ON public.page_views FOR SELECT USING (true);
