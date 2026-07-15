const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ccqersgpjirdlurulcri.supabase.co";
const supabaseAnonKey = "sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runDiagnostics() {
  console.log("Simulating visitor booking submission...");
  const tempId = `b-test-${Date.now()}`;
  
  const { error } = await supabase.from('bookings').insert({
    id: tempId,
    client_name: 'Visitor Test',
    client_phone: '+856 20 95188888',
    booking_date: '2026-07-20',
    package_name: 'Wedding Package 1',
    status: 'pending'
  });

  if (error) {
    console.error("Booking Submission Failed:", error.message, error.details, error.hint);
  } else {
    console.log("Booking Submission Success! Public RLS insert works perfectly.");
    
    // Cleanup using anon role?
    // Wait, the anon role doesn't have delete permission, so we can't clean it up using anon.
    // That is correct because deletes are restricted to admin!
  }
}

runDiagnostics();
