import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

async function deepCheckBookings() {
  console.log('=== DEEP BOOKING AUDIT ===\n');

  // 1. Count total
  const { count, error: countErr } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });
  console.log(`Total booking rows in DB: ${count} | Error: ${countErr?.message ?? 'none'}`);

  // 2. Fetch ALL without any filter
  const { data: all, error: allErr } = await supabase
    .from('bookings')
    .select('*');
  console.log(`\nFetch all (*): ${all?.length} rows | Error: ${allErr?.message ?? 'none'}`);
  if (all) all.forEach(b => console.log(`  id=${b.id} | name=${b.client_name} | status=${b.status} | date=${b.booking_date}`));

  // 3. Check RLS — try inserting a test booking
  console.log('\n=== TEST: INSERT a booking ===');
  const testId = `b-test-${Date.now()}`;
  const { error: insertErr } = await supabase.from('bookings').insert({
    id: testId,
    client_name: 'TEST_DELETE_ME',
    client_phone: '+856200000000',
    booking_date: '2026-01-01',
    package_name: 'Test',
    status: 'pending',
    created_at: new Date().toISOString()
  });
  if (insertErr) {
    console.log('❌ INSERT failed (RLS?):', insertErr.message, '| code:', insertErr.code);
  } else {
    console.log('✅ INSERT succeeded');
    // Clean up
    const { error: delErr } = await supabase.from('bookings').delete().eq('id', testId);
    console.log(delErr ? `❌ Cleanup delete failed: ${delErr.message}` : '✅ Test row cleaned up');
  }

  // 4. Fetch count after test
  const { count: finalCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });
  console.log(`\nFinal booking count: ${finalCount}`);

  // 5. Check Supabase Auth — does login work?
  console.log('\n=== CHECK: Supabase Auth ===');
  const { data: session, error: authErr } = await supabase.auth.getSession();
  console.log('Current session:', session?.session ? `Logged in as ${session.session.user.email}` : 'Not logged in (anon)');
  if (authErr) console.log('Auth error:', authErr.message);

  // 6. Try login to see if it changes visibility
  console.log('\n=== TRY: Login as admin ===');
  const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({
    email: 'takong.nov25@gmail.com',
    password: 'test_wrong_pass_12345'  // intentionally wrong to just check error type
  });
  if (loginErr) {
    if (loginErr.message.includes('Invalid login credentials')) {
      console.log('ℹ️ Auth is working — "Invalid credentials" (expected with test pass)');
    } else {
      console.log('⚠️ Auth error type:', loginErr.message);
    }
  }

  // 7. Recheck bookings after trying auth
  const { data: finalBookings } = await supabase.from('bookings').select('id, client_name, status');
  console.log(`\nBookings visible to anon user: ${finalBookings?.length}`);
  finalBookings?.forEach(b => console.log(`  - ${b.id} | ${b.client_name} | ${b.status}`));
}

deepCheckBookings().catch(console.error);
