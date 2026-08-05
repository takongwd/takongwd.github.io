import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

async function checkHeroUrl() {
  const { data } = await supabase.from('settings').select('hero_background_url, featured_album_id').eq('id', 1).maybeSingle();
  console.log('hero_background_url in DB:', JSON.stringify(data?.hero_background_url));
  console.log('featured_album_id in DB:', JSON.stringify(data?.featured_album_id));
  // Check if it starts with /
  const url = data?.hero_background_url || '';
  const startsWithSlash = url.startsWith('/');
  const startsWithHttp = url.startsWith('http');
  const isEmpty = url === '';
  console.log('Starts with /:', startsWithSlash);
  console.log('Starts with http:', startsWithHttp);
  console.log('Is empty:', isEmpty);
  console.log('Would pass check:', startsWithSlash || startsWithHttp || isEmpty);
}
checkHeroUrl();
