import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

async function checkBookings() {
  console.log('=== ALL BOOKINGS IN DB (select * no filter) ===\n');
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('❌ ERROR:', error.message, '| code:', error.code);
    return;
  }

  console.log(`Total bookings found: ${data.length}\n`);
  data.forEach((b, i) => {
    console.log(`--- Booking ${i + 1} ---`);
    console.log(JSON.stringify(b, null, 2));
    console.log('');
  });

  // Also check with the exact query the app uses
  console.log('\n=== QUERY USED BY APP (select specific columns) ===');
  const { data: appData, error: appError } = await supabase
    .from('bookings')
    .select('id, client_name, client_phone, booking_date, package_name, custom_details, custom_budget, status, created_at')
    .order('booking_date', { ascending: true });

  if (appError) {
    console.log('❌ App query ERROR:', appError.message);
  } else {
    console.log(`App query found: ${appData.length} bookings`);
    appData.forEach(b => console.log(`  - ${b.id} | ${b.client_name} | ${b.status} | ${b.booking_date}`));
  }
}

checkBookings().catch(console.error);
