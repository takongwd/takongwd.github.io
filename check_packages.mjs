import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

async function checkPackages() {
  // 1. ດຶງທຸກ packages ຈາກ DB
  const { data, error } = await supabase
    .from('pricing_packages')
    .select('id, name, price, order_index, category')
    .order('order_index', { ascending: true });

  if (error) {
    console.log('ERROR reading packages:', error.message);
    return;
  }

  console.log('=== PACKAGES IN SUPABASE DB ===\n');
  data.forEach(p => {
    console.log(`[${p.order_index}] ${p.id}`);
    console.log(`  Name:     ${p.name}`);
    console.log(`  Price:    ${p.price}`);
    console.log(`  Category: ${p.category}`);
    console.log('');
  });

  // 2. ລອງ UPDATE ລາຄາ ─ test write permission
  console.log('=== TESTING WRITE PERMISSION ===');
  const testPkg = data?.[0];
  if (testPkg) {
    const originalPrice = testPkg.price;
    const testPrice = originalPrice + '_TEST';
    
    const { error: updateErr } = await supabase
      .from('pricing_packages')
      .update({ price: testPrice })
      .eq('id', testPkg.id);

    if (updateErr) {
      console.log('❌ UPDATE FAILED (RLS blocking?):', updateErr.message);
      console.log('Code:', updateErr.code);
    } else {
      console.log('✅ UPDATE succeeded ─ reverting...');
      // Revert
      await supabase.from('pricing_packages').update({ price: originalPrice }).eq('id', testPkg.id);
      console.log('✅ Reverted back to original price');
    }
  }
}

checkPackages().catch(console.error);
