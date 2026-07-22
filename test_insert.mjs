import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ccqersgpjirdlurulcri.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testInsert() {
  console.log('Fetching valid album ID...');
  const { data: albums, error: albumError } = await supabase.from('albums').select('id').limit(1);
  if (albumError || !albums || albums.length === 0) {
    console.error('Failed to fetch albums:', albumError);
    return;
  }
  const validAlbumId = albums[0].id;
  console.log('Using album ID:', validAlbumId);

  console.log('Testing insert with a large base64 URL...');
  const base64Data = Buffer.alloc(5 * 1024 * 1024, 'a').toString('base64');
  const url = `data:image/jpeg;base64,${base64Data}`;
  
  const payload = {
    id: `test-${Date.now()}`,
    album_id: validAlbumId,
    url: url,
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from('photos').insert([payload]);

  if (error) {
    console.error('Insert Failed:', error);
  } else {
    console.log('Insert Succeeded!');
    await supabase.from('photos').delete().eq('id', payload.id);
  }
}

testInsert();
