import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ccqersgpjirdlurulcri.supabase.co', 'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f');
async function check() {
  const { data, error } = await supabase.from('settings').select('*').eq('id', 1).maybeSingle();
  console.log('Settings:', data, error);
}
check();
