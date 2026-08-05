import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ccqersgpjirdlurulcri.supabase.co', 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f');
const { data } = await supabase.from('settings').select('hero_background_url').eq('id', 1).maybeSingle();
const raw = data?.hero_background_url;
console.log('RAW hero_background_url:', JSON.stringify(raw));
// ensureLeadingSlash logic from code
function ensureLeadingSlash(url) {
  if (!url) return '';
  if (!url.startsWith('/') && !url.startsWith('http') && !url.startsWith('data:')) {
    return '/' + url;
  }
  return url;
}
const afterMapper = ensureLeadingSlash(raw || '');
console.log('After ensureLeadingSlash:', JSON.stringify(afterMapper));
console.log('Final check (starts / or http):', afterMapper.startsWith('/') || afterMapper.startsWith('http') || afterMapper === '');
