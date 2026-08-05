import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

async function testFetch() {
  const { data } = await supabase
    .from('pricing_packages')
    .select('*')
    .order('order_index', { ascending: true });
    
  console.log("Current DB packages:", data?.map(d => ({ id: d.id, order_index: d.order_index, name: d.name })));
}

testFetch();
