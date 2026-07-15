-- =========================================================================
-- SUPABASE RLS POLICIES CLEANUP & CONSOLIDATION SCRIPT (VERSION 2)
-- Resolves all remaining "Multiple Permissive Policies" warnings by
-- splitting general FOR ALL policies into specific command policies.
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. ALBUMS TABLE
-- -------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public select on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin write on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin insert on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin update on albums" ON public.albums;
DROP POLICY IF EXISTS "Allow admin delete on albums" ON public.albums;

-- 1 Public Select Policy
CREATE POLICY "Allow public select on albums" ON public.albums 
    FOR SELECT USING (true);

-- Specific Admin Command Policies (No SELECT overlap)
CREATE POLICY "Allow admin insert on albums" ON public.albums 
    FOR INSERT TO authenticated 
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin update on albums" ON public.albums 
    FOR UPDATE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com')
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin delete on albums" ON public.albums 
    FOR DELETE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');


-- -------------------------------------------------------------------------
-- 2. PHOTOS TABLE
-- -------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public select on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin write on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin insert on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin update on photos" ON public.photos;
DROP POLICY IF EXISTS "Allow admin delete on photos" ON public.photos;

-- 1 Public Select Policy
CREATE POLICY "Allow public select on photos" ON public.photos 
    FOR SELECT USING (true);

-- Specific Admin Command Policies (No SELECT overlap)
CREATE POLICY "Allow admin insert on photos" ON public.photos 
    FOR INSERT TO authenticated 
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin update on photos" ON public.photos 
    FOR UPDATE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com')
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin delete on photos" ON public.photos 
    FOR DELETE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');


-- -------------------------------------------------------------------------
-- 3. PRICING PACKAGES TABLE
-- -------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public select on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin write on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin insert on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin update on pricing_packages" ON public.pricing_packages;
DROP POLICY IF EXISTS "Allow admin delete on pricing_packages" ON public.pricing_packages;

-- 1 Public Select Policy
CREATE POLICY "Allow public select on pricing_packages" ON public.pricing_packages 
    FOR SELECT USING (true);

-- Specific Admin Command Policies (No SELECT overlap)
CREATE POLICY "Allow admin insert on pricing_packages" ON public.pricing_packages 
    FOR INSERT TO authenticated 
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin update on pricing_packages" ON public.pricing_packages 
    FOR UPDATE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com')
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin delete on pricing_packages" ON public.pricing_packages 
    FOR DELETE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');


-- -------------------------------------------------------------------------
-- 4. SETTINGS TABLE
-- -------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public select on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin write on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin insert on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin update on settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admin delete on settings" ON public.settings;

-- 1 Public Select Policy
CREATE POLICY "Allow public select on settings" ON public.settings 
    FOR SELECT USING (true);

-- Specific Admin Command Policies (No SELECT overlap)
CREATE POLICY "Allow admin insert on settings" ON public.settings 
    FOR INSERT TO authenticated 
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin update on settings" ON public.settings 
    FOR UPDATE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com')
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin delete on settings" ON public.settings 
    FOR DELETE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');


-- -------------------------------------------------------------------------
-- 5. BOOKINGS TABLE
-- -------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public insert on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin full access on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin select on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin update on bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin delete on bookings" ON public.bookings;

-- 1 Public Insert Policy (Anonymous bookings submission)
CREATE POLICY "Allow public insert on bookings" ON public.bookings 
    FOR INSERT 
    WITH CHECK (booking_date IS NOT NULL AND client_name IS NOT NULL AND client_phone IS NOT NULL);

-- Specific Admin Command Policies (No INSERT overlap)
CREATE POLICY "Allow admin select on bookings" ON public.bookings 
    FOR SELECT TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin update on bookings" ON public.bookings 
    FOR UPDATE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com')
    WITH CHECK (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');

CREATE POLICY "Allow admin delete on bookings" ON public.bookings 
    FOR DELETE TO authenticated 
    USING (((select auth.jwt()) ->> 'email') = 'takong.nov25@gmail.com');


-- -------------------------------------------------------------------------
-- 6. PAGE VIEWS TABLE
-- -------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public insert on page_views" ON public.page_views;
DROP POLICY IF EXISTS "Allow public select on page_views" ON public.page_views;

-- 1 Public Insert & 1 Public Select Policy (No overlaps)
CREATE POLICY "Allow public insert on page_views" ON public.page_views 
    FOR INSERT 
    WITH CHECK (id IS NOT NULL);

CREATE POLICY "Allow public select on page_views" ON public.page_views 
    FOR SELECT 
    USING (true);
