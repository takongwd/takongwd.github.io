import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

// ===== CANONICAL PACKAGES (ຂໍ້ມູນທີ່ຖືກຕ້ອງ ─ ຕາມ DEFAULT_PACKAGES ໃນ Code) =====
const CANONICAL_PACKAGES = [
  {
    id: 'pkg-1',
    name: 'Wedding Package 1: ECONOMY (ເນັ້ນຄວາມປະຢັດ)',
    price: '5,900 THB',
    description: 'ເໝາະສົມສຳລັບງານຂະໜາດນ້ອຍ ຫຼື ຕ້ອງການປະຢັດງົບປະມານ.',
    features: [
      'ທີມງານ: ຊ່າງພາບ 1 ຄົນ',
      'ອຸປະກອນໄຟ LED 2 ດອກ ກັບເສົາ',
      'ຖ່າຍຮູບບໍ່ຈຳກັດຈຳນວນໄຟລ໌ຕະຫຼອດງານ',
      'ປັບແສງ ແລະ ແຕ່ງສີຮູບໃຫ້ທຸກໃບ',
      'ສົ່ງງານຜ່ານ Google Drive (ໄລຍະເວລາ 7-14 ມື້)'
    ],
    is_popular: false,
    order_index: 0,
    category: 'main'
  },
  {
    id: 'pkg-2',
    name: 'Wedding Package 2: STANDARD (ຍອດນິຍົມ)',
    price: '10,000 THB',
    description: 'ແພັກເກດຍອດນິຍົມ ຄອບຄຸມການຖ່າຍພາບທັງງານພິທີ ແລະ ງານລ້ຽງ.',
    features: [
      'ທີມງານ: ຊ່າງພາບ 2 ຄົນ',
      'ໄດ້ມຸມພາບທີ່ຫຼາກຫຼາຍ (ມຸມກວ້າງ ແລະ ມຸມເຈາະ)',
      'ອຸປະກອນໄຟສະຕູດິໂອ (LED 4 ດອກ)',
      'ປັບແສງ ແລະ ແຕ່ງສີຮູບໃຫ້ທຸກໃບ',
      'ສົ່ງງານຜ່ານ Google Drive (ໄລຍະເວລາ 7-14 ມື້)',
      'Promotion: ຟຣີ! ລະບົບ QR Code Scan ເອົາຮູບໜ້າ Backdrop ທັນທີ'
    ],
    is_popular: true,
    order_index: 1,
    category: 'main'
  },
  {
    id: 'pkg-3',
    name: 'Wedding Package 3: PREMIUM PHOTO & VIDEO',
    price: '24,000 THB',
    description: 'ຄົບທັງພາບນິ້ງ ແລະ ວິດີໂອໄຮໄລ້ ຄຸນນະພາບສູງ.',
    features: [
      'ຊ່າງພາບ 2 ຄົນ + ຊ່າງວິດີໂອ 2 ຄົນ (ລວມ 4 ຄົນ)',
      'ອຸປະກອນໄຟຊຸດໃຫຍ່ສໍາລັບງານພິທີ ແລະ ງານລ້ຽງ',
      'ປັບແສງ ແລະ ແຕ່ງສີໃຫ້ຄົບທັງຮູບ ແລະ ວິດີໂອ',
      'ວິດີໂອ Highlight (ຄວາມຍາວ 5-8 ນາທີ)',
      'ຟຣີ QR Code Scan ໜ້າ Backdrop + ຮູບໄຮໄລ້ 20-40 ໃບ (ສົ່ງໃຫ້ໃນມື້ງານ)'
    ],
    is_popular: false,
    order_index: 2,
    category: 'main'
  },
  {
    id: 'pkg-4',
    name: 'Wedding Package 4: THE ULTIMATE VIP (ຈັດເຕັມ)',
    price: '30,000 THB',
    description: 'ບໍລິການລະດັບ VIP ຈັດເຕັມທີມງານ, ໂດຣນຖ່າຍພາບມຸມສູງ ແລະ ປິ່ນຮູບພາບອະລະບັ້ມ.',
    features: [
      'ຊ່າງພາບ 3 ຄົນ + ຊ່າງວິດີໂອ 2 ຄົນ (ລວມ 5 ຄົນ)',
      'ອຸປະກອນໄຟຊຸດໃຫຍ່ສໍາລັບງານພິທີ ແລະ ງານລ້ຽງ',
      'ຖ່າຍພາບນິ້ງ ແລະ ວິດີໂອມຸມສູງ (Drone)',
      'ສະແກນເອົາຮູບໄດ້ທັນທີ (Backdrop, ມັດແຂນ, ແລະ Candid)',
      'ໄດ້ທັງ Highlight ແລະ ວິດີໂອຫຼັກສະບັບເຕັມ (5-6 ນາທີ)',
      'ຟຣີ! ອັດຮູບສະໜາດ 4x6 ຈໍານວນ 300 ໃບ ພ້ອມອະລະບັ້ມ',
      'ສົ່ງຮູບໄຮໄລ້ 30-40 ໃບ ໃນມື້ງານທັນທີ'
    ],
    is_popular: false,
    order_index: 3,
    category: 'main'
  },
  {
    id: 'addon-1',
    name: 'Photo Booth - Package A',
    price: '9,900 THB',
    description: 'ບໍລິການຖ່າຍຮູບ Photo Booth (ລະບົບສະແກນ QR ເພື່ອຮັບຮູບໄດ້ເລີຍໜ້າງານ) - ຖ່າຍ ແລະ ພິມຮູບຈຸໃຈ.',
    features: [
      'ເວລາບໍລິການ 3 ຊົ່ວໂມງ',
      'ລະບົບສະແກນ QR ເພື່ອຮັບຮູບໄດ້ເລີຍໜ້າງານ',
      'ອອກແບບກອບຮູບສະເພາະງານ (Custom Frame Design)',
      'ພິມຮູບບໍ່ຈຳກັດຈຳນວນ (Unlimited Photo Prints)'
    ],
    is_popular: false,
    order_index: 4,
    category: 'addon'
  },
  {
    id: 'addon-2',
    name: 'Photo Booth - Package B',
    price: '8,900 THB',
    description: 'ບໍລິການຖ່າຍຮູບ Photo Booth (ລະບົບສະແກນ QR ເພື່ອຮັບຮູບໄດ້ເລີຍໜ້າງານ) - ເໝາະກັບງານລ້ຽງໄລຍະສັ້ນ.',
    features: [
      'ເວລາບໍລິການ 2 ຊົ່ວໂມງ',
      'ລະບົບສະແກນ QR ເພື່ອຮັບຮູບໄດ້ເລີຍໜ້າງານ',
      'ອອກແບບກອບຮູບສະເພາະງານ (Custom Frame Design)',
      'ພິມຮູບບໍ່ຈຳກັດຈຳນວນ (Unlimited Photo Prints)'
    ],
    is_popular: false,
    order_index: 5,
    category: 'addon'
  },
  {
    id: 'addon-3',
    name: 'Photo Booth - Package C',
    price: '7,900 THB',
    description: 'ບໍລິການຖ່າຍຮູບ Photo Booth (ລະບົບສະແກນ QR ເພື່ອຮັບຮູບໄດ້ເລີຍໜ້າງານ) - ບໍລິການຮູບແບບດິຈິຕອນ ບໍ່ພິມຮູບ.',
    features: [
      'ເວລາບໍລິການ 3 ຊົ່ວໂມງ',
      'ລະບົບສະແກນ QR ເພື່ອຮັບຮູບໄດ້ເລີຍໜ້າງານ',
      'ອອກແບບກອບຮູບສະເພາະງານ (Custom Frame Design)',
      'ບໍ່ມີພິມຮູບ (No Photo Prints - Digital Files Only)'
    ],
    is_popular: false,
    order_index: 6,
    category: 'addon'
  }
];

async function cleanAndReseedPackages() {
  console.log('=== CLEANING DUPLICATE PACKAGES IN SUPABASE ===\n');

  // 1. ດຶງ packages ທັງໝົດທີ່ມີຢູ່
  const { data: current, error: readErr } = await supabase
    .from('pricing_packages')
    .select('id, name, order_index')
    .order('order_index', { ascending: true });

  if (readErr) {
    console.log('ERROR reading:', readErr.message);
    return;
  }

  console.log(`Found ${current.length} packages in DB:`);
  current.forEach(p => console.log(`  [${p.order_index}] ${p.id} - ${p.name.slice(0, 40)}`));
  console.log('');

  // 2. ລຶບທຸກ package ທີ່ id ບໍ່ຢູ່ໃນ canonical list
  const canonicalIds = CANONICAL_PACKAGES.map(p => p.id);
  const toDelete = current.filter(p => !canonicalIds.includes(p.id));

  if (toDelete.length > 0) {
    console.log(`Deleting ${toDelete.length} duplicate/old packages:`);
    for (const pkg of toDelete) {
      console.log(`  Deleting: ${pkg.id} - ${pkg.name.slice(0, 40)}`);
      const { error } = await supabase.from('pricing_packages').delete().eq('id', pkg.id);
      if (error) console.log(`  ❌ Delete error: ${error.message}`);
      else console.log(`  ✅ Deleted`);
    }
  } else {
    console.log('No duplicate packages to delete.');
  }
  console.log('');

  // 3. UPSERT canonical packages (update existing, insert missing)
  console.log('Upserting canonical packages...');
  for (const pkg of CANONICAL_PACKAGES) {
    const { error } = await supabase
      .from('pricing_packages')
      .upsert(pkg, { onConflict: 'id' });
    if (error) {
      console.log(`  ❌ Upsert failed for ${pkg.id}: ${error.message}`);
    } else {
      console.log(`  ✅ OK: [${pkg.order_index}] ${pkg.id} - Price: ${pkg.price}`);
    }
  }

  // 4. Verify final state
  console.log('\n=== FINAL DB STATE ===');
  const { data: final } = await supabase
    .from('pricing_packages')
    .select('id, name, price, order_index, category')
    .order('order_index', { ascending: true });

  final.forEach(p => {
    console.log(`[${p.order_index}] ${p.id}`);
    console.log(`  Name:  ${p.name}`);
    console.log(`  Price: ${p.price}`);
    console.log(`  Cat:   ${p.category}`);
    console.log('');
  });

  console.log(`✅ DONE — ${final.length} packages in DB (expected 7)`);
}

cleanAndReseedPackages().catch(console.error);
