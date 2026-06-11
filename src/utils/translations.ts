export interface TranslationDict {
  // Navbar
  navPortfolio: string;
  navPackages: string;
  navCheckDates: string;
  navAdminPanel: string;
  navViewSite: string;
  navLogout: string;

  // Hero
  heroSubtitle: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  heroCtaAvailability: string;
  heroCtaPortfolio: string;
  heroScroll: string;

  // Portfolio
  portfolioSubtitle: string;
  portfolioTitle: string;
  portfolioAllWork: string;
  portfolioNoPhotos: string;
  portfolioViewCaptures: string;

  // Pricing
  pricingSubtitle: string;
  pricingTitle: string;
  pricingPromoHeader: string;
  pricingInvestment: string;
  pricingPopular: string;
  pricingCta: string;

  // Booking
  bookingSubtitle: string;
  bookingTitle: string;
  bookingAvailable: string;
  bookingFull: string;
  bookingSelected: string;
  bookingDetailsTitle: string;
  bookingSelectedDate: string;
  bookingNoDateSelected: string;
  bookingNameLabel: string;
  bookingNamePlaceholder: string;
  bookingEmailLabel: string;
  bookingEmailPlaceholder: string;
  bookingPhoneLabel: string;
  bookingPhonePlaceholder: string;
  bookingSubmit: string;
  bookingProcessing: string;

  // Booking Success / Payment
  bookingSuccessTitle: string;
  bookingSuccessDesc: string;
  bookingSuccessBankHeader: string;
  bookingSuccessBankName: string;
  bookingSuccessBankAccName: string;
  bookingSuccessBankAccNum: string;
  bookingSuccessSlipWarning: string;

  // Footer
  footerDesc: string;
  footerHoursTitle: string;
  footerHoursWeekdays: string;
  footerHoursWeekends: string;
  footerHoursAppointment: string;
  footerCopyright: string;
}

export const translations: Record<'en' | 'lo', TranslationDict> = {
  en: {
    navPortfolio: 'Portfolio',
    navPackages: 'Packages',
    navCheckDates: 'Check Dates',
    navAdminPanel: 'Admin Panel',
    navViewSite: 'View Site',
    navLogout: 'Logout',

    heroSubtitle: 'FINE ART WEDDING PHOTOGRAPHY',
    heroTitle1: 'Capturing Sacred',
    heroTitle2: 'Moments in Laos',
    heroDescription: 'Crafting modern cinematic memories and luxury portraits. Every frame a masterpiece, preserving your heritage and love story forever.',
    heroCtaAvailability: 'Check Availability',
    heroCtaPortfolio: 'Explore Albums',
    heroScroll: 'Scroll',

    portfolioSubtitle: 'CURATED STORIES',
    portfolioTitle: 'Our Portfolio',
    portfolioAllWork: 'All Work',
    portfolioNoPhotos: 'No photos found in this album yet. Upload photos from the Admin panel!',
    portfolioViewCaptures: 'View Captures',

    pricingSubtitle: 'PRICING COLLECTIONS',
    pricingTitle: 'Packages & Investment',
    pricingPromoHeader: 'Limited Time Promotion',
    pricingInvestment: '/ investment',
    pricingPopular: 'Most Selected',
    pricingCta: 'Inquire & Book',

    bookingSubtitle: 'RESERVE YOUR DATE',
    bookingTitle: 'Book a Shooting Date',
    bookingAvailable: 'Available',
    bookingFull: 'Booked',
    bookingSelected: 'Selected',
    bookingDetailsTitle: 'Complete Booking Details',
    bookingSelectedDate: 'Selected Shoot Date',
    bookingNoDateSelected: 'Please select an available date from the calendar.',
    bookingNameLabel: 'Full Name',
    bookingNamePlaceholder: 'e.g. Sengdeuane Phommasone',
    bookingEmailLabel: 'Email Address',
    bookingEmailPlaceholder: 'e.g. email@example.com',
    bookingPhoneLabel: 'WhatsApp/Phone Number',
    bookingPhonePlaceholder: 'e.g. +856 20 XXXX XXXX',
    bookingSubmit: 'Book Shoot Date',
    bookingProcessing: 'Processing Request...',

    bookingSuccessTitle: 'Booking Requested!',
    bookingSuccessDesc: 'Thank you. Your shoot is provisionally held. Please scan the QR code below or transfer the deposit to secure your booking.',
    bookingSuccessBankHeader: 'Bank Details for Deposit',
    bookingSuccessBankName: 'Bank:',
    bookingSuccessBankAccName: 'Account Name:',
    bookingSuccessBankAccNum: 'Account Number:',
    bookingSuccessSlipWarning: 'Send your payment slip via WhatsApp to confirm instantly!',

    footerDesc: 'Crafting timeless fine-art wedding stories across Laos. Dedicated to capturing the elegance, heritage, and genuine connection of your love story.',
    footerHoursTitle: 'Studio Hours',
    footerHoursWeekdays: 'Monday - Friday',
    footerHoursWeekends: 'Saturday - Sunday',
    footerHoursAppointment: 'By Appointment Only',
    footerCopyright: 'All Rights Reserved.',
  },
  lo: {
    navPortfolio: 'ອັນລະບັ້ມຜົນງານ',
    navPackages: 'ແພັກເກດລາຄາ',
    navCheckDates: 'ຈອງຄິວງານ',
    navAdminPanel: 'ລະບົບຜູ້ດູແລ',
    navViewSite: 'ເບິ່ງໜ້າເວັບ',
    navLogout: 'ອອກຈາກລະບົບ',

    heroSubtitle: 'ໃນມື້ທີ່ສຳຄັນທີ່ສຸດ',
    heroTitle1: 'ບັນທຶກຄວາມຊົງຈຳ',
    heroTitle2: 'ອັນງົດງາມ',
    heroDescription: 'ໃຫ້ພວກເຮົາເປັນສ່ວນໜຶ່ງ ໃນການບັນທຶກວັນສໍາຄັນຄວາມຮັກຂອງທ່ານ. ບໍ່ວ່າຈະເປັນພິທີລາວອັນສັກສິດ ຫຼື ງານສະຫຼອງທີ່ອົບອຸ່ນ, ທຸກໂມເມັນຈະຖືກບັນທຶກໄວ້ຢ່າງສົມບູນແບບ.',
    heroCtaAvailability: 'ກວດເບິ່ງວັນຫວ່າງ',
    heroCtaPortfolio: 'ສຳຫຼວດອັນລະບັ້ມ',
    heroScroll: 'ເລື່ອນລົງ',

    portfolioSubtitle: 'ເລື່ອງລາວທີ່ຄັດສັນມາ',
    portfolioTitle: 'ອັນລະບັ້ມຜົນງານຂອງພວກເຮົາ',
    portfolioAllWork: 'ຜົນງານທັງໝົດ',
    portfolioNoPhotos: 'ຍັງບໍ່ມີຮູບພາບໃນອັນລະບັ້ມນີ້ເທື່ອ. ອັບໂຫຼດຮູບພາບຈາກໜ້າຜູ້ດູແລ!',
    portfolioViewCaptures: 'ເບິ່ງຮູບພາບ',

    pricingSubtitle: 'ຄໍເລັກຊັນການລົງທຶນ',
    pricingTitle: 'ແພັກເກດ ແລະ ລາຄາ',
    pricingPromoHeader: 'ໂປຣໂມຊັນພິເສດໃນຊ່ວງນີ້',
    pricingInvestment: '/ ງານ',
    pricingPopular: 'ຍອດນິຍົມທີ່ສຸດ',
    pricingCta: 'ສອບຖາມ & ຈອງວັນ',

    bookingSubtitle: 'ຈອງວັນເວລາຂອງທ່ານ',
    bookingTitle: 'ຈອງວັນຖ່າຍຮູບ',
    bookingAvailable: 'ວັນຫວ່າງ',
    bookingFull: 'ເຕັມແລ້ວ',
    bookingSelected: 'ເລືອກແລ້ວ',
    bookingDetailsTitle: 'ປ້ອນຂໍ້ມູນການຈອງຄິວ',
    bookingSelectedDate: 'ວັນຖ່າຍຮູບທີ່ເລືອກ',
    bookingNoDateSelected: 'ກະລຸນາເລືອກວັນຖ່າຍຮູບທີ່ຫວ່າງຈາກປະຕິທິນ.',
    bookingNameLabel: 'ຊື່ ແລະ ນາມສະກຸນ',
    bookingNamePlaceholder: 'ຕົວຢ່າງ: ແສງເດືອນ ພົມມະສອນ',
    bookingEmailLabel: 'ທີ່ຢູ່ອີເມວ',
    bookingEmailPlaceholder: 'ຕົວຢ່າງ: email@example.com',
    bookingPhoneLabel: 'ເບີ WhatsApp / ເບີໂທຕິດຕໍ່',
    bookingPhonePlaceholder: 'ຕົວຢ່າງ: +856 20 XXXX XXXX',
    bookingSubmit: 'ຢືນຢັນການຈອງຄິວ',
    bookingProcessing: 'ກຳລັງປະມວນຜົນ...',

    bookingSuccessTitle: 'ສົ່ງຄຳຂໍຈອງແລ້ວ!',
    bookingSuccessDesc: 'ຂອບໃຈ. ຄິວຖ່າຍຮູບຂອງທ່ານໄດ້ຖືກຈອງໄວ້ຊົ່ວຄາວແລ້ວ. ກະລຸນາສະແກນຄິວອາໂຄດດ້ານລຸ່ມ ຫຼື ໂອນເງິນມັດຈຳເພື່ອຢືນຢັນສິດການຈອງ.',
    bookingSuccessBankHeader: 'ລາຍລະອຽດບັນຊີທະນາຄານ',
    bookingSuccessBankName: 'ທະນາຄານ:',
    bookingSuccessBankAccName: 'ຊື່ບັນຊີ:',
    bookingSuccessBankAccNum: 'ເລກບັນຊີ:',
    bookingSuccessSlipWarning: 'ສົ່ງສະລິບການໂອນເງິນທາງ WhatsApp ເພື່ອຢືນຢັນທັນທີ!',

    footerDesc: 'ສ້າງສັນເລື່ອງລາວຄວາມຮັກຜ່ານພາບຖ່າຍສິລະປະທີ່ບໍ່ເສື່ອມຄາຍທົ່ວປະເທດລາວ. ມຸ່ງໝັ້ນທີ່ຈະບັນທຶກຄວາມສະຫງ່າງາມ, ມໍລະດົກວັດທະນະທຳ ແລະ ຄວາມຜູກພັນທີ່ແທ້ຈິງຂອງທ່ານ.',
    footerHoursTitle: 'ເວລາທຳການສະຕູດີໂອ',
    footerHoursWeekdays: 'ວັນຈັນ - ວັນສຸກ',
    footerHoursWeekends: 'ວັນເສົາ - ວັນອາທິດ',
    footerHoursAppointment: 'ສະເພາະນັດໝາຍລ່ວງໜ້າເທົ່ານັ້ນ',
    footerCopyright: 'ສະຫງວນລິຂະສິດທັງໝົດ.',
  }
};
