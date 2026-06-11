-- ====================================================================
-- SUPABASE DATABASE SECURITY SETUP: ROW LEVEL SECURITY & POLICIES
-- Run this script inside your Supabase SQL Editor to secure your project.
-- ====================================================================

-- 1. Enable Row Level Security (RLS) on all tables
alter table albums enable row level security;
alter table photos enable row level security;
alter table pricing_packages enable row level security;
alter table settings enable row level security;
alter table bookings enable row level security;

-- ====================================================================
-- POLICIES FOR: albums, photos, pricing_packages, settings
-- ====================================================================

-- Allow anyone (anonymous and logged in admins) to view/read albums, photos, packages, and settings
create policy "Allow public read access on albums" on albums for select using (true);
create policy "Allow public read access on photos" on photos for select using (true);
create policy "Allow public read access on pricing_packages" on pricing_packages for select using (true);
create policy "Allow public read access on settings" on settings for select using (true);

-- Allow ONLY authenticated administrators (logged in) to write/edit/delete these records
create policy "Allow authenticated admin write on albums" on albums for all to authenticated using (true);
create policy "Allow authenticated admin write on photos" on photos for all to authenticated using (true);
create policy "Allow authenticated admin write on pricing_packages" on pricing_packages for all to authenticated using (true);
create policy "Allow authenticated admin write on settings" on settings for all to authenticated using (true);

-- ====================================================================
-- POLICIES AND COLUMN SECURITY FOR: bookings
-- ====================================================================

-- Allow anyone (public clients) to submit a new booking
create policy "Allow public insert on bookings" on bookings for insert with check (true);

-- Allow authenticated administrators to do everything on bookings (view, update, delete)
create policy "Allow authenticated admin full access on bookings" on bookings for all to authenticated using (true);

-- Allow everyone to SELECT bookings (so we can filter dates in the calendar)
create policy "Allow select access on bookings" on bookings for select using (true);

-- SECURE CLIENT SENSITIVE COLUMNS:
-- We revoke SELECT on all columns from the public 'anon' role, and grant SELECT only to booking_date and status.
-- This ensures that anonymous users can query booking dates for calendar availability, but cannot read client names, phone numbers, or custom details.

revoke select on bookings from anon;
grant select (id, booking_date, status) on bookings to anon;
grant select on bookings to authenticated;
