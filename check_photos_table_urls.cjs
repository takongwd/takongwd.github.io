const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ccqersgpjirdlurulcri.supabase.co";
const supabaseAnonKey = "sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPhotoUrls() {
  console.log("=== SAMPLE PHOTO URLS IN SUPABASE ===");
  const { data: photos, error } = await supabase.from('photos').select('*').limit(20);
  if (error) {
    console.error("Error fetching photos:", error);
    return;
  }
  photos.forEach(p => {
    console.log(`Album: ${p.album_id} | URL: ${p.url}`);
  });
}

checkPhotoUrls();
