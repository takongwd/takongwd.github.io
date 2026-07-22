import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ccqersgpjirdlurulcri.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkBookings() {
  console.log('--- Checking Bookings ---');
  const { data, error } = await supabase.from('bookings').select('id, client_name, client_phone, booking_date, package_name, custom_details, custom_budget, status, created_at').order('booking_date', { ascending: true });
  
  if (error) {
    console.error('Error fetching bookings:', error);
  } else {
    console.log(`Found ${data.length} bookings.`);
    if (data.length > 0) {
      console.log('First booking:', data[0]);
    }
  }
}

checkBookings();
