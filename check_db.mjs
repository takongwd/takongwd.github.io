import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ccqersgpjirdlurulcri.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDatabase() {
  console.log('--- Checking Albums ---');
  const { data: albums, error: albumError } = await supabase.from('albums').select('id, title');
  if (albumError) {
    console.error('Error fetching albums:', albumError);
    return;
  }
  albums.forEach(a => console.log(`- ${a.id}: ${a.title}`));

  console.log('\n--- Checking Photos Count ---');
  const { data: photos, error: photoError } = await supabase.from('photos').select('id, album_id');
  if (photoError) {
    console.error('Error fetching photos:', photoError);
    return;
  }
  
  const counts = {};
  photos.forEach(p => {
    counts[p.album_id] = (counts[p.album_id] || 0) + 1;
  });

  albums.forEach(a => {
    console.log(`Album ${a.title} has ${counts[a.id] || 0} photos`);
  });

  console.log('\nTotal photos in DB:', photos.length);
}

checkDatabase();
