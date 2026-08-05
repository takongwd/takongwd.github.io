import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ccqersgpjirdlurulcri.supabase.co', 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f');
const { data } = await supabase.from('settings').select('hero_background_url').eq('id', 1).maybeSingle();
const raw = data?.hero_background_url;
// Log every char's char code so we can detect invisible chars
if (raw) {
  console.log('String length:', raw.length);
  console.log('First 5 chars:', [...raw.slice(0, 5)].map(c => `'${c}'(${c.charCodeAt(0)})`).join(' '));
  console.log('Full value:', JSON.stringify(raw));
} else {
  console.log('NULL or undefined');
}
