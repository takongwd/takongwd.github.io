const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ccqersgpjirdlurulcri.supabase.co";
const supabaseAnonKey = "sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const email = 'takong.nov25@gmail.com';
const password = 'SaipaZ@2026';

async function runDiagnostics() {
  console.log(`Attempting Supabase Auth login for ${email}...`);
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    console.error("Login Failed:", loginError.message);
    return;
  }

  console.log("Login Success! Token acquired. User ID:", data.user.id);
  
  console.log("Attempting to update settings row in database...");
  const { error: updateError } = await supabase
    .from('settings')
    .update({ featured_album_id: 'album-prewedding-collection-laos' })
    .eq('id', 1);

  if (updateError) {
    console.error("Update Failed:", updateError.message, updateError.details, updateError.hint);
  } else {
    console.log("Update Success! Database was updated successfully.");
  }
}

runDiagnostics();
