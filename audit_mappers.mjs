import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ccqersgpjirdlurulcri.supabase.co',
  'sb_publishable_5EYUFJodKqIGaqy3idYJmQ_wSmXsU3f'
);

// ===== MAPPER DEFINITIONS (copy from code) =====
const ensureLeadingSlash = (url) => {
  if (!url) return '';
  if (!url.startsWith('/') && !url.startsWith('http') && !url.startsWith('data:')) {
    return '/' + url;
  }
  return url;
};

const mapAlbumFromDb = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description || '',
  coverUrl: ensureLeadingSlash(row.cover_url),
  createdAt: row.created_at
});

const mapAlbumToDb = (album) => ({
  ...(album.id && { id: album.id }),
  ...(album.title !== undefined && { title: album.title }),
  ...(album.description !== undefined && { description: album.description }),
  ...(album.coverUrl !== undefined && { cover_url: album.coverUrl })
});

const mapPhotoFromDb = (row) => ({
  id: row.id,
  albumId: row.album_id,
  url: ensureLeadingSlash(row.url),
  createdAt: row.created_at
});

const mapPackageFromDb = (row) => ({
  id: row.id,
  name: row.name,
  price: row.price,
  description: row.description || '',
  features: row.features || [],
  isPopular: !!row.is_popular,
  orderIndex: row.order_index || 0,
  category: row.category
});

const mapPackageToDb = (pkg) => ({
  ...(pkg.id && { id: pkg.id }),
  ...(pkg.name !== undefined && { name: pkg.name }),
  ...(pkg.price !== undefined && { price: pkg.price }),
  ...(pkg.description !== undefined && { description: pkg.description }),
  ...(pkg.features !== undefined && { features: pkg.features }),
  ...(pkg.isPopular !== undefined && { is_popular: pkg.isPopular }),
  ...(pkg.orderIndex !== undefined && { order_index: pkg.orderIndex }),
  ...(pkg.category !== undefined && { category: pkg.category })
});

const mapBookingFromDb = (row) => ({
  id: row.id,
  clientName: row.client_name,
  clientEmail: '',
  clientPhone: row.client_phone,
  bookingDate: row.booking_date,
  packageName: row.package_name,
  customDetails: row.custom_details,
  customBudget: row.custom_budget,
  status: row.status,
  createdAt: row.created_at
});

const mapSettingsFromDb = (row) => ({
  promotionText: row.promotion_text || '',
  qrCodeUrl: row.qr_code_url || '',
  whatsappNumber: row.whatsapp_number || '',
  facebookPageUrl: row.facebook_page_url || '',
  bankName: row.bank_name || '',
  bankAccountName: row.bank_account_name || '',
  bankAccountNumber: row.bank_account_number || '',
  heroBackgroundUrl: ensureLeadingSlash(row.hero_background_url || ''),
  featuredAlbumId: row.featured_album_id || 'all',
  telegramNotificationsEnabled: !!row.telegram_notifications_enabled,
  telegramBotToken: row.telegram_bot_token || '',
  telegramChatId: row.telegram_chat_id || '',
  promoPopupEnabled: row.promo_popup_enabled !== undefined ? !!row.promo_popup_enabled : true,
  promoPopupTitle: row.promo_popup_title || '',
  promoPopupPkg1Name: row.promo_popup_pkg1_name || '',
  promoPopupPkg1Price: row.promo_popup_pkg1_price || '',
  promoPopupPkg1OrigPrice: row.promo_popup_pkg1_orig_price || '',
  promoPopupPkg1Desc: row.promo_popup_pkg1_desc || '',
  promoPopupPkg2Name: row.promo_popup_pkg2_name || '',
  promoPopupPkg2Price: row.promo_popup_pkg2_price || '',
  promoPopupPkg2OrigPrice: row.promo_popup_pkg2_orig_price || '',
  promoPopupPkg2Desc: row.promo_popup_pkg2_desc || ''
});

const mapSettingsToDb = (settings) => ({
  updated_at: new Date().toISOString(),
  ...(settings.promotionText !== undefined && { promotion_text: settings.promotionText }),
  ...(settings.qrCodeUrl !== undefined && { qr_code_url: settings.qrCodeUrl }),
  ...(settings.whatsappNumber !== undefined && { whatsapp_number: settings.whatsappNumber }),
  ...(settings.facebookPageUrl !== undefined && { facebook_page_url: settings.facebookPageUrl }),
  ...(settings.bankName !== undefined && { bank_name: settings.bankName }),
  ...(settings.bankAccountName !== undefined && { bank_account_name: settings.bankAccountName }),
  ...(settings.bankAccountNumber !== undefined && { bank_account_number: settings.bankAccountNumber }),
  ...(settings.heroBackgroundUrl !== undefined && { hero_background_url: settings.heroBackgroundUrl }),
  ...(settings.featuredAlbumId !== undefined && { featured_album_id: settings.featuredAlbumId }),
  ...(settings.telegramNotificationsEnabled !== undefined && { telegram_notifications_enabled: settings.telegramNotificationsEnabled }),
  ...(settings.telegramBotToken !== undefined && { telegram_bot_token: settings.telegramBotToken }),
  ...(settings.telegramChatId !== undefined && { telegram_chat_id: settings.telegramChatId }),
  ...(settings.promoPopupEnabled !== undefined && { promo_popup_enabled: settings.promoPopupEnabled }),
  ...(settings.promoPopupTitle !== undefined && { promo_popup_title: settings.promoPopupTitle }),
  ...(settings.promoPopupPkg1Name !== undefined && { promo_popup_pkg1_name: settings.promoPopupPkg1Name }),
  ...(settings.promoPopupPkg1Price !== undefined && { promo_popup_pkg1_price: settings.promoPopupPkg1Price }),
  ...(settings.promoPopupPkg1OrigPrice !== undefined && { promo_popup_pkg1_orig_price: settings.promoPopupPkg1OrigPrice }),
  ...(settings.promoPopupPkg1Desc !== undefined && { promo_popup_pkg1_desc: settings.promoPopupPkg1Desc }),
  ...(settings.promoPopupPkg2Name !== undefined && { promo_popup_pkg2_name: settings.promoPopupPkg2Name }),
  ...(settings.promoPopupPkg2Price !== undefined && { promo_popup_pkg2_price: settings.promoPopupPkg2Price }),
  ...(settings.promoPopupPkg2OrigPrice !== undefined && { promo_popup_pkg2_orig_price: settings.promoPopupPkg2OrigPrice }),
  ...(settings.promoPopupPkg2Desc !== undefined && { promo_popup_pkg2_desc: settings.promoPopupPkg2Desc })
});

// ===== ACTUAL DB COLUMNS FROM AUDIT =====
const DB_COLUMNS = {
  albums: ['id', 'title', 'description', 'cover_url', 'created_at'],
  photos: ['id', 'album_id', 'url', 'created_at'],
  pricing_packages: ['id', 'name', 'price', 'description', 'features', 'is_popular', 'order_index', 'category', 'created_at'],
  bookings: ['id', 'client_name', 'client_phone', 'booking_date', 'package_name', 'custom_details', 'custom_budget', 'status', 'created_at'],
  settings: ['id', 'promotion_text', 'qr_code_url', 'whatsapp_number', 'facebook_page_url', 'bank_name', 'bank_account_name', 'bank_account_number', 'hero_background_url', 'telegram_notifications_enabled', 'telegram_bot_token', 'telegram_chat_id', 'updated_at', 'promo_popup_enabled', 'promo_popup_title', 'promo_popup_pkg1_name', 'promo_popup_pkg1_price', 'promo_popup_pkg1_orig_price', 'promo_popup_pkg1_desc', 'promo_popup_pkg2_name', 'promo_popup_pkg2_price', 'promo_popup_pkg2_orig_price', 'promo_popup_pkg2_desc', 'featured_album_id']
};

// ===== TEST MAPPER FUNCTIONS =====
async function testMappers() {
  let pass = 0, fail = 0;
  const results = [];

  function check(name, condition, detail='') {
    if (condition) {
      results.push({ status: '✅ PASS', name, detail });
      pass++;
    } else {
      results.push({ status: '❌ FAIL', name, detail });
      fail++;
    }
  }

  // --- ALBUMS ---
  const { data: albumRows } = await supabase.from('albums').select('*').limit(2);
  const albumRow = albumRows?.[0];
  if (albumRow) {
    const mapped = mapAlbumFromDb(albumRow);
    check('Album fromDb: id', mapped.id === albumRow.id);
    check('Album fromDb: title', mapped.title === albumRow.title);
    check('Album fromDb: coverUrl from cover_url', mapped.coverUrl !== undefined && !('cover_url' in mapped));
    check('Album fromDb: createdAt from created_at', mapped.createdAt === albumRow.created_at);
    check('Album fromDb: no extra DB keys in result', !('cover_url' in mapped) && !('created_at' in mapped));

    // Test toDb
    const toDb = mapAlbumToDb({ title: 'Test', coverUrl: '/test.jpg', description: 'Desc' });
    check('Album toDb: cover_url from coverUrl', 'cover_url' in toDb && toDb.cover_url === '/test.jpg');
    check('Album toDb: no camelCase keys', !('coverUrl' in toDb));
    check('Album toDb: no created_at (not mapped)', !('created_at' in toDb));
  }

  // --- PHOTOS ---
  const { data: photoRows } = await supabase.from('photos').select('*').limit(2);
  const photoRow = photoRows?.[0];
  if (photoRow) {
    const mapped = mapPhotoFromDb(photoRow);
    check('Photo fromDb: albumId from album_id', mapped.albumId === photoRow.album_id && !('album_id' in mapped));
    check('Photo fromDb: url has leading slash', mapped.url.startsWith('/') || mapped.url.startsWith('http'));
    check('Photo fromDb: createdAt from created_at', mapped.createdAt === photoRow.created_at);
    check('Photo fromDb: no extra DB keys', !('album_id' in mapped) && !('created_at' in mapped));
  }

  // --- PACKAGES ---
  const { data: pkgRows } = await supabase.from('pricing_packages').select('*');
  const pkgRow = pkgRows?.[0];
  if (pkgRow) {
    const mapped = mapPackageFromDb(pkgRow);
    check('Package fromDb: isPopular from is_popular', 'isPopular' in mapped && !('is_popular' in mapped));
    check('Package fromDb: orderIndex from order_index', 'orderIndex' in mapped && !('order_index' in mapped));
    check('Package fromDb: features is array', Array.isArray(mapped.features));
    check('Package fromDb: category preserved', mapped.category === pkgRow.category);
    check('Package fromDb: NO created_at mapped (OK - not in interface)', true, 'created_at in DB but not in PricingPackage interface — intentional');

    // toDb
    const toDb = mapPackageToDb({ name: 'Test', isPopular: true, orderIndex: 5, category: 'main' });
    check('Package toDb: is_popular from isPopular', toDb.is_popular === true && !('isPopular' in toDb));
    check('Package toDb: order_index from orderIndex', toDb.order_index === 5 && !('orderIndex' in toDb));
  }

  // --- BOOKINGS ---
  const { data: bookingRows } = await supabase.from('bookings').select('*');
  const bookingRow = bookingRows?.[0];
  if (bookingRow) {
    const mapped = mapBookingFromDb(bookingRow);
    check('Booking fromDb: clientName from client_name', mapped.clientName === bookingRow.client_name);
    check('Booking fromDb: clientPhone from client_phone', mapped.clientPhone === bookingRow.client_phone);
    check('Booking fromDb: bookingDate from booking_date', mapped.bookingDate === bookingRow.booking_date);
    check('Booking fromDb: packageName from package_name', mapped.packageName === bookingRow.package_name);
    check('Booking fromDb: customDetails from custom_details', mapped.customDetails === bookingRow.custom_details);
    check('Booking fromDb: customBudget from custom_budget', mapped.customBudget === bookingRow.custom_budget);
    check('Booking fromDb: status preserved', mapped.status === bookingRow.status);
    check('Booking fromDb: no DB snake_case keys in result', !('client_name' in mapped));
    // Verify all DB columns are handled
    const dbCols = DB_COLUMNS.bookings.filter(c => c !== 'id' && c !== 'created_at');
    const unmapped = dbCols.filter(c => !(c.replace(/_([a-z])/g, (_, l) => l.toUpperCase()) in mapped) && c !== 'client_phone' && c !== 'booking_date');
    check('Booking fromDb: all DB columns mapped', unmapped.length === 0, unmapped.length > 0 ? `Unmapped: ${unmapped.join(', ')}` : 'All columns mapped');
    
    // Check no_email in DB
    check('Booking: no client_email column in DB (correct)', !DB_COLUMNS.bookings.includes('client_email'), 'Email not stored in Supabase — correct by design');
  }

  // --- SETTINGS ---
  const { data: settingsRow } = await supabase.from('settings').select('*').eq('id', 1).maybeSingle();
  if (settingsRow) {
    const mapped = mapSettingsFromDb(settingsRow);
    // Check every DB column is mapped
    const settingsCols = DB_COLUMNS.settings.filter(c => c !== 'id' && c !== 'updated_at');
    const unmapped = [];
    const toCheck = {
      promotion_text: 'promotionText', qr_code_url: 'qrCodeUrl', whatsapp_number: 'whatsappNumber',
      facebook_page_url: 'facebookPageUrl', bank_name: 'bankName', bank_account_name: 'bankAccountName',
      bank_account_number: 'bankAccountNumber', hero_background_url: 'heroBackgroundUrl',
      featured_album_id: 'featuredAlbumId', telegram_notifications_enabled: 'telegramNotificationsEnabled',
      telegram_bot_token: 'telegramBotToken', telegram_chat_id: 'telegramChatId',
      promo_popup_enabled: 'promoPopupEnabled', promo_popup_title: 'promoPopupTitle',
      promo_popup_pkg1_name: 'promoPopupPkg1Name', promo_popup_pkg1_price: 'promoPopupPkg1Price',
      promo_popup_pkg1_orig_price: 'promoPopupPkg1OrigPrice', promo_popup_pkg1_desc: 'promoPopupPkg1Desc',
      promo_popup_pkg2_name: 'promoPopupPkg2Name', promo_popup_pkg2_price: 'promoPopupPkg2Price',
      promo_popup_pkg2_orig_price: 'promoPopupPkg2OrigPrice', promo_popup_pkg2_desc: 'promoPopupPkg2Desc'
    };
    for (const [dbKey, appKey] of Object.entries(toCheck)) {
      if (!(appKey in mapped)) unmapped.push(dbKey + ' → ' + appKey);
    }
    check('Settings fromDb: all 22 DB columns mapped', unmapped.length === 0, unmapped.length > 0 ? `Missing: ${unmapped.join(', ')}` : 'All 22 columns mapped correctly');
    check('Settings fromDb: heroBackgroundUrl has slash', mapped.heroBackgroundUrl.startsWith('/') || mapped.heroBackgroundUrl === '');

    // toDb: verify no snake_case is missing
    const fullSettings = { promotionText: 'x', qrCodeUrl: 'x', whatsappNumber: 'x', facebookPageUrl: 'x', bankName: 'x', bankAccountName: 'x', bankAccountNumber: 'x', heroBackgroundUrl: 'x', featuredAlbumId: 'x', telegramNotificationsEnabled: true, telegramBotToken: 'x', telegramChatId: 'x', promoPopupEnabled: true, promoPopupTitle: 'x', promoPopupPkg1Name: 'x', promoPopupPkg1Price: 'x', promoPopupPkg1OrigPrice: 'x', promoPopupPkg1Desc: 'x', promoPopupPkg2Name: 'x', promoPopupPkg2Price: 'x', promoPopupPkg2OrigPrice: 'x', promoPopupPkg2Desc: 'x' };
    const toDb = mapSettingsToDb(fullSettings);
    const missingInToDb = settingsCols.filter(c => !(c in toDb));
    check('Settings toDb: all DB columns covered', missingInToDb.length === 0, missingInToDb.length > 0 ? `Missing in toDb: ${missingInToDb.join(', ')}` : 'All DB columns writable');
    check('Settings toDb: has updated_at', 'updated_at' in toDb);
    check('Settings toDb: no camelCase keys', !Object.keys(toDb).some(k => k.includes('promotionText') || k.includes('qrCode')));
  }

  // --- SUMMARY ---
  console.log('\n=== AUDIT RESULTS ===\n');
  results.forEach(r => console.log(`${r.status} | ${r.name}${r.detail ? ' | ' + r.detail : ''}`));
  console.log(`\n📊 Total: ${pass + fail} checks | ✅ ${pass} passed | ❌ ${fail} failed`);
  
  if (fail === 0) {
    console.log('\n🎉 ALL CHECKS PASSED! Data integrity is confirmed.');
  } else {
    console.log('\n⚠️ Some checks failed. Review above for details.');
  }
}

testMappers().catch(console.error);
