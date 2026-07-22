import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ccqersgpjirdlurulcri.supabase.co', 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f');

async function testPromiseAll() {
  const [
    albumsRes,
    photosRes,
    packagesRes,
    bookingsRes,
    settingsRes,
    pageViewsRes
  ] = await Promise.all([
    supabase.from('albums').select('*').order('created_at', { ascending: false }),
    supabase.from('photos').select('*').order('created_at', { ascending: false }),
    supabase.from('pricing_packages').select('*').order('order_index', { ascending: true }),
    supabase.from('bookings').select('id, client_name, client_phone, booking_date, package_name, custom_details, custom_budget, status, created_at').order('booking_date', { ascending: true }),
    supabase.from('settings').select('*').eq('id', 1).maybeSingle(),
    supabase.from('page_views').select('*', { count: 'exact', head: true })
  ]);

  if (albumsRes.error) console.log('albums error:', albumsRes.error);
  if (photosRes.error) console.log('photos error:', photosRes.error);
  if (packagesRes.error) console.log('packages error:', packagesRes.error);
  if (bookingsRes.error) console.log('bookings error:', bookingsRes.error);
  if (settingsRes.error) console.log('settings error:', settingsRes.error);
  if (pageViewsRes.error) console.log('page views error:', pageViewsRes.error);
  
  console.log('Done!');
}
testPromiseAll();
