import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

async function auditAll() {
  console.log('=== SUPABASE DATA INTEGRITY AUDIT ===\n');

  // 1. Albums
  const albums = await supabase.from('albums').select('*').limit(1);
  console.log('--- ALBUMS ---');
  console.log('Error:', albums.error);
  console.log('Sample row keys:', albums.data?.[0] ? Object.keys(albums.data[0]) : 'No data');
  console.log('Count:', albums.data?.length);
  console.log('');

  // 2. Photos
  const photos = await supabase.from('photos').select('*').limit(1);
  console.log('--- PHOTOS ---');
  console.log('Error:', photos.error);
  console.log('Sample row keys:', photos.data?.[0] ? Object.keys(photos.data[0]) : 'No data');
  console.log('');

  // 3. Pricing Packages
  const pkgs = await supabase.from('pricing_packages').select('*');
  console.log('--- PRICING_PACKAGES ---');
  console.log('Error:', pkgs.error);
  console.log('Count:', pkgs.data?.length);
  console.log('Sample row keys:', pkgs.data?.[0] ? Object.keys(pkgs.data[0]) : 'No data');
  console.log('Sample data:', JSON.stringify(pkgs.data?.[0], null, 2));
  console.log('');

  // 4. Bookings
  const bookings = await supabase.from('bookings').select('*');
  console.log('--- BOOKINGS ---');
  console.log('Error:', bookings.error);
  console.log('Count:', bookings.data?.length);
  console.log('Sample row keys:', bookings.data?.[0] ? Object.keys(bookings.data[0]) : 'No data');
  console.log('Sample data:', JSON.stringify(bookings.data?.[0], null, 2));
  console.log('');

  // 5. Settings
  const settings = await supabase.from('settings').select('*').eq('id', 1).maybeSingle();
  console.log('--- SETTINGS ---');
  console.log('Error:', settings.error);
  console.log('All keys:', settings.data ? Object.keys(settings.data) : 'No data');
  console.log('');

  // 6. Page Views
  const pageViews = await supabase.from('page_views').select('*', { count: 'exact', head: true });
  console.log('--- PAGE_VIEWS ---');
  console.log('Error:', pageViews.error);
  console.log('Count:', pageViews.count);
  console.log('');

  // 7. Albums count
  const albumsCount = await supabase.from('albums').select('*', { count: 'exact', head: true });
  console.log('Total albums in DB:', albumsCount.count, '| Error:', albumsCount.error?.message);
  
  // 8. Photos count
  const photosCount = await supabase.from('photos').select('*', { count: 'exact', head: true });
  console.log('Total photos in DB:', photosCount.count, '| Error:', photosCount.error?.message);
}

auditAll().catch(console.error);
