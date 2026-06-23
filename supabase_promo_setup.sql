-- ====================================================================
-- SUPABASE SETTINGS TABLE MIGRATION: ADD CUSTOMIZABLE PROMO POPUP FIELDS
-- Run this script inside your Supabase SQL Editor to support the promo popup.
-- ====================================================================

ALTER TABLE settings 
ADD COLUMN IF NOT EXISTS promo_popup_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS promo_popup_title text DEFAULT 'ໂປຣໂມຊັ່ນຖ່າຍຮູບແຕ່ງງານ 2026',
ADD COLUMN IF NOT EXISTS promo_popup_pkg1_name text DEFAULT 'ແພັກເກດ ECONOMY (ເນັ້ນຄວາມປະຢັດ)',
ADD COLUMN IF NOT EXISTS promo_popup_pkg1_price text DEFAULT '5,900 THB',
ADD COLUMN IF NOT EXISTS promo_popup_pkg1_orig_price text DEFAULT '7,670 THB',
ADD COLUMN IF NOT EXISTS promo_popup_pkg1_desc text DEFAULT 'ຊ່າງພາບ 1 ທ່ານ, ໄຟ LED 2 ດວງ, ຖ່າຍຮູບບໍ່ຈຳກັດ ແລະ ປັບແຕ່ງສີແສງທຸກຮູບ, ສົ່ງວຽນຜ່ານ Google Drive 7-14 ວັນ.',
ADD COLUMN IF NOT EXISTS promo_popup_pkg2_name text DEFAULT 'ແພັກເກດ STANDARD (ຍອດນິຍົມ)',
ADD COLUMN IF NOT EXISTS promo_popup_pkg2_price text DEFAULT '10,000 THB',
ADD COLUMN IF NOT EXISTS promo_popup_pkg2_orig_price text DEFAULT '13,000 THB',
ADD COLUMN IF NOT EXISTS promo_popup_pkg2_desc text DEFAULT 'ຊ່າງພາບ 2 ທ່ານ, ໄຟສະຕູດີໂອ 4 ດວງ, ຖ່າຍຮູບບໍ່ຈຳກັດ ແລະ ປັບແຕ່ງສີແສງທຸກຮູບ, ສົ່ງວຽນຜ່ານ Google Drive 7-14 ວັນ + ຟຣີ! ລະບົບສະແກນ QR Code ດາວໂຫລດຮູບພາບໃນງານທັນທີ.';
