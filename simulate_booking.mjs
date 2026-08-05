import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

// Simulate exactly what addBooking does in the app
async function simulateAddBooking() {
  const testId = `b-${Date.now()}`;
  const payload = {
    id: testId,
    client_name: 'TEST ທົດສອບລະບົບ',
    client_phone: '+856 20 1234 5678',
    booking_date: '2026-09-15',
    package_name: 'Wedding Package 2: STANDARD (ຍອດນິຍົມ)',
    custom_details: null,
    custom_budget: null,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  console.log('Simulating addBooking INSERT...');
  console.log('Payload:', JSON.stringify(payload, null, 2));

  const { error } = await supabase.from('bookings').insert(payload);
  if (error) {
    console.log('\n❌ INSERT FAILED!');
    console.log('Error message:', error.message);
    console.log('Error code:', error.code);
    console.log('Error hint:', error.hint);
    console.log('Error details:', error.details);
  } else {
    console.log('\n✅ INSERT SUCCESS — booking saved to DB');
    
    // Verify it's there
    const { data: verify } = await supabase.from('bookings').select('id, client_name, status').eq('id', testId).maybeSingle();
    console.log('Verified in DB:', verify);
    
    // Clean up
    await supabase.from('bookings').delete().eq('id', testId);
    console.log('✅ Test booking cleaned up');
  }

  // Show all current bookings
  console.log('\n=== ALL BOOKINGS IN DB RIGHT NOW ===');
  const { data: all } = await supabase.from('bookings').select('id, client_name, status, booking_date, created_at').order('created_at', { ascending: false });
  console.log(`Total: ${all?.length}`);
  all?.forEach(b => console.log(`  ${b.id} | ${b.client_name} | ${b.status} | date: ${b.booking_date} | created: ${b.created_at}`));
}

simulateAddBooking().catch(console.error);
