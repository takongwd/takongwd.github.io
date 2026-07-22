import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ccqersgpjirdlurulcri.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testInsertBooking() {
  console.log('--- Testing Booking Insert ---');
  const payload = {
    id: `test-b-${Date.now()}`,
    client_name: 'Test Client',
    client_phone: '12345678',
    booking_date: '2027-01-01',
    package_name: 'Test Package',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from('bookings').insert([payload]);

  if (error) {
    console.error('Insert Failed:', error);
  } else {
    console.log('Insert Succeeded!', data);
    
    // Cleanup
    await supabase.from('bookings').delete().eq('id', payload.id);
  }
}

testInsertBooking();
