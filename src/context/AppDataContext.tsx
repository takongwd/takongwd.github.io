import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

// Define Data Interfaces
export interface Album {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  albumId: string;
  url: string;
  createdAt: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  orderIndex: number;
  category?: 'main' | 'addon';
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  bookingDate: string; // YYYY-MM-DD
  packageName?: string; // Selected package name
  customDetails?: string; // Custom proposed package details
  customBudget?: string; // Custom proposed budget
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface AppDataContextType {
  albums: Album[];
  photos: Photo[];
  pricingPackages: PricingPackage[];
  settings: {
    promotionText: string;
    qrCodeUrl: string;
    whatsappNumber: string;
    facebookPageUrl: string;
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: string;
    heroBackgroundUrl: string;
    telegramNotificationsEnabled?: boolean;
    telegramBotToken?: string;
    telegramChatId?: string;
  };
  bookings: Booking[];
  isAdminAuthenticated: boolean;
  isSupabaseMode: boolean;
  language: 'en' | 'lo';
  setLanguage: (lang: 'en' | 'lo') => void;
  
  // Album Actions
  addAlbum: (title: string, description: string, coverUrl: string) => Promise<Album>;
  updateAlbum: (id: string, data: Partial<Album>) => Promise<Album>;
  deleteAlbum: (id: string) => Promise<void>;
  
  // Photo Actions
  addPhotos: (albumId: string, urls: string[]) => Promise<Photo[]>;
  deletePhoto: (id: string) => Promise<void>;
  
  // Package Actions
  addPackage: (pkg: Omit<PricingPackage, 'id'>) => Promise<PricingPackage>;
  updatePackage: (id: string, pkg: Partial<PricingPackage>) => Promise<PricingPackage>;
  deletePackage: (id: string) => Promise<void>;
  reorderPackages: (reorderedPkgs: { id: string; orderIndex: number }[]) => Promise<void>;
  
  // Settings Actions
  updateSettings: (data: Partial<AppDataContextType['settings']>) => Promise<void>;
  
  // Booking Actions
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<Booking>;
  updateBookingStatus: (id: string, status: Booking['status']) => Promise<Booking>;
  deleteBooking: (id: string) => Promise<void>;
  
  // Auth Actions
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// Initial Default Mock Data (Luxury Wedding Assets)
const DEFAULT_ALBUMS: Album[] = [
  {
    id: 'album-pre-wedding-tor-kar-ning',
    title: 'Pre Wedding Tor Kar & Ning',
    description: 'A romantic pre-wedding photo session of Tor Kar & Ning. Capture of sweet glances and elegant portraits. / ພາບຖ່າຍພຣີເວດດິ້ງອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Tor Kar & Ning. ບັນທຶກທຸກຊ່ວງເວລາແຫ່ງຄວາມຮັກ.',
    coverUrl: '/albums/pre-wedding-tor-kar-ning/1.jpg',
    createdAt: new Date(Date.now() - 0 * 10000).toISOString()
  },
  {
    id: 'album-wedding-phonexay-viengphet',
    title: 'Wedding Day Phonexay & Viengphet',
    description: 'A beautiful wedding day celebration of Phonexay & Viengphet. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Phonexay & Viengphet. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.',
    coverUrl: '/albums/wedding-phonexay-viengphet/1.jpg',
    createdAt: new Date(Date.now() - 1 * 10000).toISOString()
  },
  {
    id: 'album-pre-wedding-bank-pookie',
    title: 'Pre Wedding Bank & Pookie',
    description: 'A romantic pre-wedding photo session of Bank & Pookie. Capture of sweet glances and elegant portraits. / ພາບຖ່າຍພຣີເວດດິ້ງອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Bank & Pookie. ບັນທຶກທຸກຊ່ວງເວລາແຫ່ງຄວາມຮັກ.',
    coverUrl: '/albums/pre-wedding-bank-pookie/1.jpg',
    createdAt: new Date(Date.now() - 2 * 10000).toISOString()
  },
  {
    id: 'album-wedding-houmphan-soumontha',
    title: 'Wedding Day HOUMPHAN & SOUMONTHA',
    description: 'A beautiful wedding day celebration of HOUMPHAN & SOUMONTHA. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ HOUMPHAN & SOUMONTHA. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.',
    coverUrl: '/albums/wedding-houmphan-soumontha/1.jpg',
    createdAt: new Date(Date.now() - 3 * 10000).toISOString()
  },
  {
    id: 'album-wedding-odai-sophia',
    title: 'Wedding Day Odai & Sophia',
    description: 'A beautiful wedding day celebration of Odai & Sophia. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Odai & Sophia. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.',
    coverUrl: '/albums/wedding-odai-sophia/1.jpg',
    createdAt: new Date(Date.now() - 4 * 10000).toISOString()
  },
  {
    id: 'album-wedding-chokxay-latda',
    title: 'Wedding Day ໂຊກໄຊ & ລັດດາ',
    description: 'A beautiful wedding day celebration of Chokxay & Latda. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ ໂຊກໄຊ & ລັດດາ. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.',
    coverUrl: '/albums/wedding-chokxay-latda/1.jpg',
    createdAt: new Date(Date.now() - 5 * 10000).toISOString()
  },
  {
    id: 'album-engagement-tinu',
    title: 'ງານໝັ້ນ Tinu',
    description: 'A romantic engagement celebration of Tinu. Capture of sweet glances and traditional Lao custom. / ງານໝັ້ນອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Tinu. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.',
    coverUrl: '/albums/engagement-tinu/1.jpg',
    createdAt: new Date(Date.now() - 6 * 10000).toISOString()
  },
  {
    id: 'album-wedding-25-nov-2025',
    title: 'Wedding 25 nov 2025',
    description: 'A beautiful wedding day celebration of November 25, 2025. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກ. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.',
    coverUrl: '/albums/wedding-25-nov-2025/0.jpg',
    createdAt: new Date(Date.now() - 7 * 10000).toISOString()
  },
  {
    id: 'album-wedding-aiy-tamon',
    title: 'Wedding Days Aiy & Tamon',
    description: 'A beautiful wedding day celebration of Aiy & Tamon. Capturing the romance and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Aiy & Tamon. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຄວາມຮັກ.',
    coverUrl: '/albums/wedding-aiy-tamon/0.jpg',
    createdAt: new Date(Date.now() - 8 * 10000).toISOString()
  },
  {
    id: 'album-engagement-phoutthasin-kataiy',
    title: 'ງານໝັ້ນ Phoutthasin & Kataiy',
    description: 'A romantic engagement celebration of Phoutthasin & Kataiy. Capture of sweet glances and traditional Lao custom. / ງານໝັ້ນອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Phoutthasin & Kataiy. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.',
    coverUrl: '/albums/engagement-phoutthasin-kataiy/1.jpg',
    createdAt: new Date(Date.now() - 9 * 10000).toISOString()
  },
  {
    id: 'album-engagement-thanakon-nanhtaly',
    title: 'ງານໝັ້ນ Thanakon 💗 Nanhtaly',
    description: 'A romantic engagement celebration of Thanakon & Nanhtaly. Capture of sweet glances and traditional Lao custom. / ງານໝັ້ນອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Thanakon ແລະ Nanhtaly. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.',
    coverUrl: '/albums/engagement-thanakon-nanhtaly/1.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'album-wedding-days-anousack-mayury-2020',
    title: 'Anousack & Mayury at 2020',
    description: 'A romantic wedding celebration of Anousack & Mayury at 2020. Capture of sweet glances and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ Anousack ແລະ Mayury ໃນປີ 2020. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.',
    coverUrl: '/albums/wedding-days-anousack-mayury-2020/1.jpg',
    createdAt: new Date(Date.now() - 1000).toISOString(),
  },
  {
    id: 'album-prewedding-collection-laos',
    title: 'Prewedding_collection_Laos',
    description: 'A romantic pre-wedding photo collection in Laos. Capture of sweet glances and traditional garments. / ພາບຖ່າຍພຣີເວດດິ້ງຄໍເລັກຊັນອັນແສນຫວານ ແລະ ໂຣແມນຕິກ. ບັນທຶກຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນງົດງາມຂອງລາວ.',
    coverUrl: '/albums/prewedding-collection-laos/1.jpg',
    createdAt: new Date(Date.now() - 2000).toISOString(),
  },
  {
    id: 'album-prewedding-anousack-mayury',
    title: 'P r e W e d d i n g : A n o u s a c k & M a y u r y',
    description: 'A romantic pre-wedding photo session of Anousack & Mayury. Capture of sweet glances and elegant portrait. / ພາບພຣີເວດດິ້ງອັນແsnຫວານ ແລະ ໂຣແມນຕິກຂອງ Anousack ແລະ Mayury. ບັນທຶກທຸກຮອຍຍິ້ມ ແລະ ຊ່ວງເວລາແຫ່ງຄວາມຮັກ.',
    coverUrl: '/albums/prewedding-anousack-mayury/1.jpg',
    createdAt: new Date(Date.now() - 3000).toISOString(),
  },
  {
    id: 'album-santi-soutthasone',
    title: 'Wedding Days SANTI 💗 SOUTTHASONE',
    description: 'A romantic wedding celebration of SANTI & SOUTTHASONE. Capture of sweet glances and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ SANTI ແລະ SOUTTHASONE. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.',
    coverUrl: '/albums/wedding-days-santi-soutthasone/1.jpg',
    createdAt: new Date(Date.now() - 4000).toISOString(),
  },
  {
    id: 'album-pm-paklai',
    title: 'Wedding Days P&M At Paklai',
    description: 'A romantic wedding celebration of P&M at Paklai. Capture of sweet glances and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ P&M ທີ່ເມືອງປາກລາຍ. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.',
    coverUrl: '/albums/wedding-days-pm-paklai/1.jpg',
    createdAt: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: 'album-lb-paklai',
    title: 'Wedding Days L&B At Paklai',
    description: 'A romantic wedding celebration of L&B at Paklai. Capture of sweet glances and traditional Lao custom. / ງານສະຫຼອງມົງຄຸນສົມລົດອັນແສນຫວານ ແລະ ໂຣແມນຕິກຂອງ L&B ທີ່ເມືອງປາກລາຍ. ບັນທຶກທຸກສາຍຕາແຫ່ງຄວາມຮັກ ແລະ ຮີດຄອງປະເພນີອັນຈົບງາມ.',
    coverUrl: '/albums/wedding-days-lb-paklai/1.jpg',
    createdAt: new Date(Date.now() - 6000).toISOString(),
  },
  {
    id: 'album-1',
    title: 'Pre-Wedding in Vang Vieng',
    description: 'Enchanting sunset portrait session amidst the mist-covered karst peaks and emerald waters of Vang Vieng.',
    coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'album-2',
    title: 'The Sacred Ceremony',
    description: 'A grand traditional Lao wedding ceremony in Vientiane, detailed with golden silks, baci threads, and absolute bliss.',
    coverUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'album-3',
    title: 'Intimate Forest Reception',
    description: 'Fairy lights, exquisite styling, and fine-art editorial photography under the forest canopy.',
    coverUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const SOUKHAUN_PHOTO_FILES = [
  '0-1.jpg', '0-2.jpg', '0-3.jpg', '0-4.jpg', '0-5.jpg', '0-6.jpg', '0-7.jpg', '0-8.jpg', 
  '0.jpg', '00.jpg', '000.jpg', '1.jpg', '2.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', 
  '9.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', 
  '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '29.jpg'
];

const WEDDING_AM_PHOTO_FILES = Array.from({ length: 73 }, (_, i) => `${i + 1}.jpg`);

const PREWED_COLLECTION_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
  '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg'
];

const PREWED_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
  '11.jpg', '12.jpg', '13.jpg'
];

const SANTI_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
  '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
  '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg'
];

const PM_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
  '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
  '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg'
];

const LB_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '3-1.jpg', '3-2.jpg', '4.jpg', '5.jpg', '5-1.jpg', '5-2.jpg', '5-3.jpg', 
  '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '12-1.jpg', '13.jpg', '13-1.jpg', 
  '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', 
  '24.jpg', '25.jpg', '26.jpg', '27.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', 
  '35.jpg', '36.jpg'
];

const PRE_WEDDING_TOR_KAR_NING_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'
];

const WEDDING_PHONEXAY_VIENGPHET_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg', '50.jpg', '51.jpg'
];

const PRE_WEDDING_BANK_POOKIE_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg'
];

const WEDDING_HOUMPHAN_SOUMONTHA_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg'
];

const WEDDING_ODAI_SOPHIA_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg'
];

const WEDDING_CHOKXAY_LATDA_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'
];

const ENGAGEMENT_TINU_PHOTO_FILES = [
  '1.jpg', '2.jpg', '2-0.jpg', '2-1.jpg', '3.jpg', '3-0.jpg', '3-01.jpg', '3-1.jpg', '3-2.jpg', '3-3.jpg', '4.jpg', '4-1.jpg', '4-2.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '10-1.jpg', '10-2.jpg', '10-3.jpg', '10-4.jpg', '10-5.jpg', '10-6.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg'
];

const WEDDING_25_NOV_2025_PHOTO_FILES = [
  '0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg'
];

const WEDDING_AIY_TAMON_PHOTO_FILES = [
  '0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg'
];

const ENGAGEMENT_PHOUTTHASIN_KATAIY_PHOTO_FILES = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg'
];

const DEFAULT_PHOTOS: Photo[] = [
  ...PRE_WEDDING_TOR_KAR_NING_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-pre-wedding-tor-kar-ning-' + idx,
    albumId: 'album-pre-wedding-tor-kar-ning',
    url: '/albums/pre-wedding-tor-kar-ning/' + file,
    createdAt: new Date(Date.now() - 0 * 10000 - idx * 60000).toISOString()
  })),
  ...WEDDING_PHONEXAY_VIENGPHET_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-wedding-phonexay-viengphet-' + idx,
    albumId: 'album-wedding-phonexay-viengphet',
    url: '/albums/wedding-phonexay-viengphet/' + file,
    createdAt: new Date(Date.now() - 1 * 10000 - idx * 60000).toISOString()
  })),
  ...PRE_WEDDING_BANK_POOKIE_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-pre-wedding-bank-pookie-' + idx,
    albumId: 'album-pre-wedding-bank-pookie',
    url: '/albums/pre-wedding-bank-pookie/' + file,
    createdAt: new Date(Date.now() - 2 * 10000 - idx * 60000).toISOString()
  })),
  ...WEDDING_HOUMPHAN_SOUMONTHA_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-wedding-houmphan-soumontha-' + idx,
    albumId: 'album-wedding-houmphan-soumontha',
    url: '/albums/wedding-houmphan-soumontha/' + file,
    createdAt: new Date(Date.now() - 3 * 10000 - idx * 60000).toISOString()
  })),
  ...WEDDING_ODAI_SOPHIA_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-wedding-odai-sophia-' + idx,
    albumId: 'album-wedding-odai-sophia',
    url: '/albums/wedding-odai-sophia/' + file,
    createdAt: new Date(Date.now() - 4 * 10000 - idx * 60000).toISOString()
  })),
  ...WEDDING_CHOKXAY_LATDA_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-wedding-chokxay-latda-' + idx,
    albumId: 'album-wedding-chokxay-latda',
    url: '/albums/wedding-chokxay-latda/' + file,
    createdAt: new Date(Date.now() - 5 * 10000 - idx * 60000).toISOString()
  })),
  ...ENGAGEMENT_TINU_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-engagement-tinu-' + idx,
    albumId: 'album-engagement-tinu',
    url: '/albums/engagement-tinu/' + file,
    createdAt: new Date(Date.now() - 6 * 10000 - idx * 60000).toISOString()
  })),
  ...WEDDING_25_NOV_2025_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-wedding-25-nov-2025-' + idx,
    albumId: 'album-wedding-25-nov-2025',
    url: '/albums/wedding-25-nov-2025/' + file,
    createdAt: new Date(Date.now() - 7 * 10000 - idx * 60000).toISOString()
  })),
  ...WEDDING_AIY_TAMON_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-wedding-aiy-tamon-' + idx,
    albumId: 'album-wedding-aiy-tamon',
    url: '/albums/wedding-aiy-tamon/' + file,
    createdAt: new Date(Date.now() - 8 * 10000 - idx * 60000).toISOString()
  })),
  ...ENGAGEMENT_PHOUTTHASIN_KATAIY_PHOTO_FILES.map((file, idx) => ({
    id: 'photo-engagement-phoutthasin-kataiy-' + idx,
    albumId: 'album-engagement-phoutthasin-kataiy',
    url: '/albums/engagement-phoutthasin-kataiy/' + file,
    createdAt: new Date(Date.now() - 9 * 10000 - idx * 60000).toISOString()
  })),
  // Engagement Thanakon & Nanhtaly photos
  ...SOUKHAUN_PHOTO_FILES.map((file, idx) => ({
    id: `photo-soukhaun-${idx}`,
    albumId: 'album-engagement-thanakon-nanhtaly',
    url: `/albums/engagement-thanakon-nanhtaly/${file}`,
    createdAt: new Date(Date.now() - idx * 60000).toISOString()
  })),
  // Anousack & Mayury at 2020 photos
  ...WEDDING_AM_PHOTO_FILES.map((file, idx) => ({
    id: `photo-wedding-am-${idx}`,
    albumId: 'album-wedding-days-anousack-mayury-2020',
    url: `/albums/wedding-days-anousack-mayury-2020/${file}`,
    createdAt: new Date(Date.now() - idx * 60000 - 80 * 60000).toISOString()
  })),
  // Pre-Wedding Collection Laos photos
  ...PREWED_COLLECTION_PHOTO_FILES.map((file, idx) => ({
    id: `photo-prewed-coll-${idx}`,
    albumId: 'album-prewedding-collection-laos',
    url: `/albums/prewedding-collection-laos/${file}`,
    createdAt: new Date(Date.now() - idx * 60000 - 90 * 60000).toISOString()
  })),
  // Pre-Wedding Anousack & Mayury photos
  ...PREWED_PHOTO_FILES.map((file, idx) => ({
    id: `photo-prewed-${idx}`,
    albumId: 'album-prewedding-anousack-mayury',
    url: `/albums/prewedding-anousack-mayury/${file}`,
    createdAt: new Date(Date.now() - idx * 60000 - 30 * 60000).toISOString()
  })),
  // SANTI & SOUTTHASONE photos
  ...SANTI_PHOTO_FILES.map((file, idx) => ({
    id: `photo-santi-${idx}`,
    albumId: 'album-santi-soutthasone',
    url: `/albums/wedding-days-santi-soutthasone/${file}`,
    createdAt: new Date(Date.now() - idx * 60000 - 60 * 60000).toISOString()
  })),
  // P&M Paklai photos
  ...PM_PHOTO_FILES.map((file, idx) => ({
    id: `photo-pm-${idx}`,
    albumId: 'album-pm-paklai',
    url: `/albums/wedding-days-pm-paklai/${file}`,
    createdAt: new Date(Date.now() - idx * 60000 - 60 * 60000).toISOString()
  })),
  // L&B Paklai photos
  ...LB_PHOTO_FILES.map((file, idx) => ({
    id: `photo-lb-${idx}`,
    albumId: 'album-lb-paklai',
    url: `/albums/wedding-days-lb-paklai/${file}`,
    createdAt: new Date(Date.now() - idx * 60000 - 30 * 60 * 1000).toISOString()
  })),
  // Album 1 photos
  { id: 'p1-1', albumId: 'album-1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', createdAt: new Date().toISOString() },
  { id: 'p1-2', albumId: 'album-1', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800', createdAt: new Date().toISOString() },
  { id: 'p1-3', albumId: 'album-1', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800', createdAt: new Date().toISOString() },
  { id: 'p1-4', albumId: 'album-1', url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800', createdAt: new Date().toISOString() },
  
  // Album 2 photos
  { id: 'p2-1', albumId: 'album-2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', createdAt: new Date().toISOString() },
  { id: 'p2-2', albumId: 'album-2', url: 'https://images.unsplash.com/photo-1507504038482-7621abf8c325?q=80&w=800', createdAt: new Date().toISOString() },
  { id: 'p2-3', albumId: 'album-2', url: 'https://images.unsplash.com/photo-1505232458627-52977172341d?q=80&w=800', createdAt: new Date().toISOString() },
  
  // Album 3 photos
  { id: 'p3-1', albumId: 'album-3', url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800', createdAt: new Date().toISOString() },
  { id: 'p3-2', albumId: 'album-3', url: 'https://images.unsplash.com/photo-1519225495810-7517c296517a?q=80&w=800', createdAt: new Date().toISOString() },
  { id: 'p3-3', albumId: 'album-3', url: 'https://images.unsplash.com/photo-1508219803497-a579bf631c4f?q=80&w=800', createdAt: new Date().toISOString() }
];

const DEFAULT_PACKAGES: PricingPackage[] = [
  // Main Packages
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
    isPopular: false,
    orderIndex: 0,
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
    isPopular: true,
    orderIndex: 1,
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
    isPopular: false,
    orderIndex: 2,
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
    isPopular: false,
    orderIndex: 3,
    category: 'main'
  },
  // Add-on Packages (Photo Booth)
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
    isPopular: false,
    orderIndex: 4,
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
    isPopular: false,
    orderIndex: 5,
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
    isPopular: false,
    orderIndex: 6,
    category: 'addon'
  }
];

const DEFAULT_SETTINGS = {
  promotionText: 'Summer Romance Promotion: Book any Gold or Platinum package this month and receive a complimentary 2-hour Pre-Wedding Sunset session in Vang Vieng!',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://takongweddinglaos.com/payment&color=c5a880&bgcolor=0d0d0f',
  whatsappNumber: '+8562099998888',
  facebookPageUrl: 'https://www.facebook.com/Takong.photography/',
  bankName: 'Banque Pour Le Commerce Exterieur Lao (BCEL)',
  bankAccountName: 'TAKONG WEDDING PHOTO CO., LTD',
  bankAccountNumber: '010-12-00-01234567-001',
  heroBackgroundUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000',
  telegramNotificationsEnabled: true,
  telegramBotToken: '8858034262:AAHS7Bwe2cmuO13AnlImq3epVzA4Xa8pzjg',
  telegramChatId: '2103336105'
};

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    clientName: 'Sengdeuane Phommasone',
    clientEmail: 'seng@example.com',
    clientPhone: '+8562055551234',
    bookingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b-2',
    clientName: 'Noy Keobouala',
    clientEmail: 'noy.k@example.com',
    clientPhone: '+8562022223344',
    bookingDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

// --- Supabase DB Mapping Helpers ---
const mapAlbumFromDb = (row: any): Album => ({
  id: row.id,
  title: row.title,
  description: row.description || '',
  coverUrl: row.cover_url || '',
  createdAt: row.created_at
});

const mapAlbumToDb = (album: Partial<Album>) => ({
  ...(album.id && { id: album.id }),
  ...(album.title !== undefined && { title: album.title }),
  ...(album.description !== undefined && { description: album.description }),
  ...(album.coverUrl !== undefined && { cover_url: album.coverUrl })
});

const mapPhotoFromDb = (row: any): Photo => ({
  id: row.id,
  albumId: row.album_id,
  url: row.url,
  createdAt: row.created_at
});

const mapPackageFromDb = (row: any): PricingPackage => ({
  id: row.id,
  name: row.name,
  price: row.price,
  description: row.description || '',
  features: row.features || [],
  isPopular: !!row.is_popular,
  orderIndex: row.order_index || 0,
  category: row.category as 'main' | 'addon'
});

const mapPackageToDb = (pkg: Partial<PricingPackage>) => ({
  ...(pkg.id && { id: pkg.id }),
  ...(pkg.name !== undefined && { name: pkg.name }),
  ...(pkg.price !== undefined && { price: pkg.price }),
  ...(pkg.description !== undefined && { description: pkg.description }),
  ...(pkg.features !== undefined && { features: pkg.features }),
  ...(pkg.isPopular !== undefined && { is_popular: pkg.isPopular }),
  ...(pkg.orderIndex !== undefined && { order_index: pkg.orderIndex }),
  ...(pkg.category !== undefined && { category: pkg.category })
});

const mapBookingFromDb = (row: any): Booking => ({
  id: row.id,
  clientName: row.client_name,
  clientEmail: '', // Email is not used in the form
  clientPhone: row.client_phone,
  bookingDate: row.booking_date,
  packageName: row.package_name,
  customDetails: row.custom_details,
  customBudget: row.custom_budget,
  status: row.status as 'pending' | 'confirmed' | 'cancelled',
  createdAt: row.created_at
});

const mapSettingsFromDb = (row: any) => ({
  promotionText: row.promotion_text || '',
  qrCodeUrl: row.qr_code_url || '',
  whatsappNumber: row.whatsapp_number || '',
  facebookPageUrl: row.facebook_page_url || '',
  bankName: row.bank_name || '',
  bankAccountName: row.bank_account_name || '',
  bankAccountNumber: row.bank_account_number || '',
  heroBackgroundUrl: row.hero_background_url || '',
  telegramNotificationsEnabled: !!row.telegram_notifications_enabled,
  telegramBotToken: row.telegram_bot_token || '',
  telegramChatId: row.telegram_chat_id || ''
});

const mapSettingsToDb = (settings: Partial<AppDataContextType['settings']>) => ({
  ...(settings.promotionText !== undefined && { promotion_text: settings.promotionText }),
  ...(settings.qrCodeUrl !== undefined && { qr_code_url: settings.qrCodeUrl }),
  ...(settings.whatsappNumber !== undefined && { whatsapp_number: settings.whatsappNumber }),
  ...(settings.facebookPageUrl !== undefined && { facebook_page_url: settings.facebookPageUrl }),
  ...(settings.bankName !== undefined && { bank_name: settings.bankName }),
  ...(settings.bankAccountName !== undefined && { bank_account_name: settings.bankAccountName }),
  ...(settings.bankAccountNumber !== undefined && { bank_account_number: settings.bankAccountNumber }),
  ...(settings.heroBackgroundUrl !== undefined && { hero_background_url: settings.heroBackgroundUrl }),
  ...(settings.telegramNotificationsEnabled !== undefined && { telegram_notifications_enabled: settings.telegramNotificationsEnabled }),
  ...(settings.telegramBotToken !== undefined && { telegram_bot_token: settings.telegramBotToken }),
  ...(settings.telegramChatId !== undefined && { telegram_chat_id: settings.telegramChatId })
});

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check Supabase configurations (Stub for future extension if user fills in variables)
  const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
  const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';
  const isSupabaseMode = !!(supabaseUrl && supabaseKey);

  // States
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [settings, setSettings] = useState<AppDataContextType['settings']>(DEFAULT_SETTINGS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [language, setLanguageState] = useState<'en' | 'lo'>('lo');

  const setLanguage = (lang: 'en' | 'lo') => {
    setLanguageState(lang);
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('wedding_language', lang);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('wedding_language') as 'en' | 'lo';
    if (storedLang === 'en' || storedLang === 'lo') {
      setLanguage(storedLang);
    } else {
      setLanguage('lo');
    }
  }, []);

  // Load Initial Data & Auth Subscription
  useEffect(() => {
    if (isSupabaseMode) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const loggedIn = !!session;
        setIsAdminAuthenticated(loggedIn);
        localStorage.setItem('wedding_admin_auth', loggedIn ? 'true' : 'false');
        
        // Load data on initialization or auth change
        await loadSupabaseData(loggedIn);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      loadLocalData();
      // Check local storage for admin auth state
      const auth = localStorage.getItem('wedding_admin_auth');
      if (auth === 'true') {
        setIsAdminAuthenticated(true);
      }
    }
  }, [isSupabaseMode]);

  const loadSupabaseData = async (isAuthenticatedAdmin?: boolean) => {
    try {
      const loggedIn = isAuthenticatedAdmin !== undefined
        ? isAuthenticatedAdmin
        : !!(await supabase.auth.getSession()).data.session;

      // 1. Fetch Albums
      const { data: dbAlbums, error: albumsError } = await supabase
        .from('albums')
        .select('*')
        .order('created_at', { ascending: false });

      if (albumsError) throw albumsError;

      let loadedAlbums = dbAlbums ? dbAlbums.map(mapAlbumFromDb) : [];

      // If no albums exist in DB, seed them with default albums
      if (loadedAlbums.length === 0) {
        console.log('Seeding default albums to Supabase...');
        const seedAlbums = DEFAULT_ALBUMS.map(a => ({
          id: a.id,
          title: a.title,
          description: a.description,
          cover_url: a.coverUrl,
          created_at: a.createdAt
        }));
        const { error: seedError } = await supabase.from('albums').insert(seedAlbums);
        if (seedError) console.error('Seed albums error:', seedError);
        loadedAlbums = DEFAULT_ALBUMS;
      }
      setAlbums(loadedAlbums);

      // 2. Fetch Photos
      const { data: dbPhotos, error: photosError } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (photosError) throw photosError;

      let loadedPhotos = dbPhotos ? dbPhotos.map(mapPhotoFromDb) : [];

      // If no photos exist in DB, seed them with default photos
      if (loadedPhotos.length === 0) {
        console.log('Seeding default photos to Supabase...');
        const seedPhotos = DEFAULT_PHOTOS.map(p => ({
          id: p.id,
          album_id: p.albumId,
          url: p.url,
          created_at: p.createdAt
        }));
        
        // Chunk to batches of 50 to avoid request size limits
        const chunkSize = 50;
        for (let i = 0; i < seedPhotos.length; i += chunkSize) {
          const chunk = seedPhotos.slice(i, i + chunkSize);
          const { error: seedPhotoError } = await supabase.from('photos').insert(chunk);
          if (seedPhotoError) {
            console.error('Seed photos batch error:', seedPhotoError);
            break;
          }
        }
        loadedPhotos = DEFAULT_PHOTOS;
      }
      setPhotos(loadedPhotos);

      // 3. Fetch Pricing Packages
      const { data: dbPackages, error: packagesError } = await supabase
        .from('pricing_packages')
        .select('*')
        .order('order_index', { ascending: true });

      if (packagesError) throw packagesError;

      let loadedPackages = dbPackages ? dbPackages.map(mapPackageFromDb) : [];

      // If no packages exist in DB, seed them
      if (loadedPackages.length === 0) {
        console.log('Seeding default packages to Supabase...');
        const seedPackages = DEFAULT_PACKAGES.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          features: p.features,
          is_popular: p.isPopular,
          order_index: p.orderIndex,
          category: p.category || 'main'
        }));
        const { error: seedPkgError } = await supabase.from('pricing_packages').insert(seedPackages);
        if (seedPkgError) console.error('Seed packages error:', seedPkgError);
        loadedPackages = DEFAULT_PACKAGES;
      }
      setPricingPackages(loadedPackages);

      // 4. Fetch Bookings (conditional fields selection based on role)
      const selectFields = loggedIn ? '*' : 'id, booking_date, status';
      const { data: dbBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(selectFields)
        .order('booking_date', { ascending: true });

      if (bookingsError) throw bookingsError;

      const loadedBookings = dbBookings ? dbBookings.map(mapBookingFromDb) : [];
      setBookings(loadedBookings);

      // 5. Fetch Settings
      const { data: dbSettings, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (settingsError) throw settingsError;

      if (dbSettings) {
        setSettings(mapSettingsFromDb(dbSettings));
      } else {
        const seedSettings = {
          id: 1,
          ...mapSettingsToDb(DEFAULT_SETTINGS)
        };
        const { error: seedSettingsError } = await supabase.from('settings').insert(seedSettings);
        if (seedSettingsError) console.error('Seed settings error:', seedSettingsError);
        setSettings(DEFAULT_SETTINGS);
      }

    } catch (err) {
      console.error('Error fetching data from Supabase:', err);
      loadLocalData();
    }
  };

  const loadLocalData = () => {
    // Albums
    const localAlbums = localStorage.getItem('wedding_albums');
    if (localAlbums) {
      const parsedAlbums = JSON.parse(localAlbums);
      let updated = false;
      // Auto-migrate any missing albums from DEFAULT_ALBUMS list
      DEFAULT_ALBUMS.forEach(defaultAlbum => {
        if (!parsedAlbums.some((a: any) => a.id === defaultAlbum.id)) {
          parsedAlbums.unshift(defaultAlbum);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('wedding_albums', JSON.stringify(parsedAlbums));
      }
      setAlbums(parsedAlbums);
    } else {
      localStorage.setItem('wedding_albums', JSON.stringify(DEFAULT_ALBUMS));
      setAlbums(DEFAULT_ALBUMS);
    }

    // Photos
    const localPhotos = localStorage.getItem('wedding_photos');
    if (localPhotos) {
      let parsedPhotos = JSON.parse(localPhotos);
      let updated = false;
      // Auto-migrate any missing photos from DEFAULT_PHOTOS based on albumId
      const existingAlbumIds = new Set(parsedPhotos.map((p: any) => p.albumId));
      DEFAULT_ALBUMS.forEach(defaultAlbum => {
        if (!existingAlbumIds.has(defaultAlbum.id)) {
          const albumPhotos = DEFAULT_PHOTOS.filter(p => p.albumId === defaultAlbum.id);
          parsedPhotos = [...albumPhotos, ...parsedPhotos];
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem('wedding_photos', JSON.stringify(parsedPhotos));
      }
      setPhotos(parsedPhotos);
    } else {
      localStorage.setItem('wedding_photos', JSON.stringify(DEFAULT_PHOTOS));
      setPhotos(DEFAULT_PHOTOS);
    }

    // Packages
    const localPkgs = localStorage.getItem('wedding_packages');
    if (localPkgs) {
      const parsed = JSON.parse(localPkgs);
      // Migration: automatically overwrite if the old default packages are present (USD price, old length, or missing category)
      if (parsed.some((p: any) => p.price.includes('$') || p.id === 'pkg-1' || !p.category || parsed.length < 5)) {
        localStorage.setItem('wedding_packages', JSON.stringify(DEFAULT_PACKAGES));
        setPricingPackages(DEFAULT_PACKAGES);
      } else {
        setPricingPackages(parsed);
      }
    } else {
      localStorage.setItem('wedding_packages', JSON.stringify(DEFAULT_PACKAGES));
      setPricingPackages(DEFAULT_PACKAGES);
    }

    // Settings
    const localSettings = localStorage.getItem('wedding_settings');
    if (localSettings) {
      const parsed = JSON.parse(localSettings);
      let needsUpdate = false;
      // Migration: automatically update old placeholder URL to your new Facebook link
      if (parsed.facebookPageUrl === 'https://facebook.com/takongweddinglaos') {
        parsed.facebookPageUrl = 'https://www.facebook.com/Takong.photography/';
        needsUpdate = true;
      }
      // Migration: inject default hero background url if missing
      if (!parsed.heroBackgroundUrl) {
        parsed.heroBackgroundUrl = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000';
        needsUpdate = true;
      }
      // Migration: inject Telegram settings if missing or empty
      if (
        parsed.telegramNotificationsEnabled === undefined ||
        !parsed.telegramBotToken ||
        !parsed.telegramChatId ||
        parsed.telegramChatId.includes('@')
      ) {
        parsed.telegramNotificationsEnabled = true;
        parsed.telegramBotToken = '8858034262:AAHS7Bwe2cmuO13AnlImq3epVzA4Xa8pzjg';
        parsed.telegramChatId = '2103336105';
        needsUpdate = true;
      }
      if (needsUpdate) {
        localStorage.setItem('wedding_settings', JSON.stringify(parsed));
      }
      setSettings(parsed);
    } else {
      localStorage.setItem('wedding_settings', JSON.stringify(DEFAULT_SETTINGS));
      setSettings(DEFAULT_SETTINGS);
    }

    // Bookings
    const localBookings = localStorage.getItem('wedding_bookings');
    if (localBookings) {
      setBookings(JSON.parse(localBookings));
    } else {
      localStorage.setItem('wedding_bookings', JSON.stringify(DEFAULT_BOOKINGS));
      setBookings(DEFAULT_BOOKINGS);
    }
  };

  // Helper to save to local storage
  const saveLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Album CRUDS
  const addAlbum = async (title: string, description: string, coverUrl: string) => {
    const newAlbum: Album = {
      id: `album-${Date.now()}`,
      title,
      description,
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseMode) {
      const { error } = await supabase.from('albums').insert({
        id: newAlbum.id,
        title: newAlbum.title,
        description: newAlbum.description,
        cover_url: newAlbum.coverUrl,
        created_at: newAlbum.createdAt
      });
      if (error) throw error;
    }

    const updated = [...albums, newAlbum];
    setAlbums(updated);
    saveLocal('wedding_albums', updated);
    return newAlbum;
  };

  const updateAlbum = async (id: string, data: Partial<Album>) => {
    if (isSupabaseMode) {
      const { error } = await supabase
        .from('albums')
        .update(mapAlbumToDb(data))
        .eq('id', id);
      if (error) throw error;
    }

    const updated = albums.map(a => a.id === id ? { ...a, ...data } : a);
    setAlbums(updated);
    saveLocal('wedding_albums', updated);
    return updated.find(a => a.id === id)!;
  };

  const deleteAlbum = async (id: string) => {
    if (isSupabaseMode) {
      const { error } = await supabase.from('albums').delete().eq('id', id);
      if (error) throw error;
    }

    const updatedAlbums = albums.filter(a => a.id !== id);
    const updatedPhotos = photos.filter(p => p.albumId !== id);
    setAlbums(updatedAlbums);
    setPhotos(updatedPhotos);
    saveLocal('wedding_albums', updatedAlbums);
    saveLocal('wedding_photos', updatedPhotos);
  };

  // Photo CRUDS
  const addPhotos = async (albumId: string, urls: string[]) => {
    const newPhotos: Photo[] = urls.map((url, idx) => ({
      id: `p-${Date.now()}-${idx}`,
      albumId,
      url,
      createdAt: new Date().toISOString()
    }));

    if (isSupabaseMode) {
      const dbPhotos = newPhotos.map(p => ({
        id: p.id,
        album_id: p.albumId,
        url: p.url,
        created_at: p.createdAt
      }));
      const { error } = await supabase.from('photos').insert(dbPhotos);
      if (error) throw error;
    }

    const updated = [...photos, ...newPhotos];
    setPhotos(updated);
    saveLocal('wedding_photos', updated);
    return newPhotos;
  };

  const deletePhoto = async (id: string) => {
    if (isSupabaseMode) {
      const { error } = await supabase.from('photos').delete().eq('id', id);
      if (error) throw error;
    }

    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    saveLocal('wedding_photos', updated);
  };

  // Package CRUDS
  const addPackage = async (pkg: Omit<PricingPackage, 'id'>) => {
    const newPkg: PricingPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`
    };

    if (isSupabaseMode) {
      const { error } = await supabase.from('pricing_packages').insert({
        id: newPkg.id,
        name: newPkg.name,
        price: newPkg.price,
        description: newPkg.description,
        features: newPkg.features,
        is_popular: newPkg.isPopular,
        order_index: newPkg.orderIndex,
        category: newPkg.category || 'main'
      });
      if (error) throw error;
    }

    const updated = [...pricingPackages, newPkg].sort((a, b) => a.orderIndex - b.orderIndex);
    setPricingPackages(updated);
    saveLocal('wedding_packages', updated);
    return newPkg;
  };

  const updatePackage = async (id: string, pkgData: Partial<PricingPackage>) => {
    if (isSupabaseMode) {
      const { error } = await supabase
        .from('pricing_packages')
        .update(mapPackageToDb(pkgData))
        .eq('id', id);
      if (error) throw error;
    }

    const updated = pricingPackages.map(p => p.id === id ? { ...p, ...pkgData } : p)
      .sort((a, b) => a.orderIndex - b.orderIndex);
    setPricingPackages(updated);
    saveLocal('wedding_packages', updated);
    return updated.find(p => p.id === id)!;
  };

  const deletePackage = async (id: string) => {
    if (isSupabaseMode) {
      const { error } = await supabase.from('pricing_packages').delete().eq('id', id);
      if (error) throw error;
    }

    const updated = pricingPackages.filter(p => p.id !== id);
    setPricingPackages(updated);
    saveLocal('wedding_packages', updated);
  };

  const reorderPackages = async (reorderedPkgs: { id: string; orderIndex: number }[]) => {
    if (isSupabaseMode) {
      for (const item of reorderedPkgs) {
        const { error } = await supabase
          .from('pricing_packages')
          .update({ order_index: item.orderIndex })
          .eq('id', item.id);
        if (error) throw error;
      }
    }

    setPricingPackages(prev => {
      const updated = prev.map(p => {
        const match = reorderedPkgs.find(item => item.id === p.id);
        return match ? { ...p, orderIndex: match.orderIndex } : p;
      }).sort((a, b) => a.orderIndex - b.orderIndex);
      
      saveLocal('wedding_packages', updated);
      return updated;
    });
  };

  // Settings CRUD
  const updateSettings = async (data: Partial<AppDataContextType['settings']>) => {
    if (isSupabaseMode) {
      const { error } = await supabase
        .from('settings')
        .update(mapSettingsToDb(data))
        .eq('id', 1);
      if (error) throw error;
    }

    const updated = { ...settings, ...data };
    setSettings(updated);
    saveLocal('wedding_settings', updated);
  };

  // Booking CRUDS
  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `b-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseMode) {
      const { error } = await supabase.from('bookings').insert({
        id: newBooking.id,
        client_name: newBooking.clientName,
        client_phone: newBooking.clientPhone,
        booking_date: newBooking.bookingDate,
        package_name: newBooking.packageName,
        custom_details: newBooking.customDetails,
        custom_budget: newBooking.customBudget,
        status: newBooking.status,
        created_at: newBooking.createdAt
      });
      if (error) throw error;
    }

    const updated = [...bookings, newBooking];
    setBookings(updated);
    saveLocal('wedding_bookings', updated);

    // Send Telegram Notification asynchronously if enabled
    console.log('Telegram Alert Check:', {
      enabled: settings.telegramNotificationsEnabled,
      hasToken: !!settings.telegramBotToken,
      hasChatId: !!settings.telegramChatId
    });

    const token = settings.telegramBotToken?.trim();
    const chatId = settings.telegramChatId?.trim();

    if (settings.telegramNotificationsEnabled && token && chatId) {
      let message = `<b>🔔 ມີການຈອງຄິວໃໝ່! (New Booking)</b>\n\n` +
        `👤 <b>ຊື່ລູກຄ້າ:</b> ${newBooking.clientName}\n` +
        `📞 <b>ເບີໂທ:</b> ${newBooking.clientPhone}\n` +
        `📅 <b>ວັນທີຈອງ:</b> ${newBooking.bookingDate}\n` +
        `📦 <b>ແພັກເກດ:</b> ${newBooking.packageName || 'ບໍ່ໄດ້ລະບຸ'}\n`;

      if (newBooking.customDetails) {
        message += `📝 <b>ລາຍລະອຽດງານ:</b> ${newBooking.customDetails}\n`;
      }
      if (newBooking.customBudget) {
        message += `💰 <b>ງົບປະມານສະເໜີ:</b> ${newBooking.customBudget}\n`;
      }

      message += `⏰ <b>ເວລາບັນທຶກ:</b> ${new Date(newBooking.createdAt).toLocaleString('lo-LA', { timeZone: 'Asia/Vientiane' })}\n\n` +
        `<i>📱 ກະລຸນາກວດສອບໃນລະບົບ Admin Dashboard</i>`;

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      })
      .then(async (response) => {
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error('Telegram API error response:', response.status, errData);
        } else {
          console.log('Telegram alert sent successfully!');
        }
      })
      .catch((err) => {
        console.error('Failed to send Telegram notification request:', err);
      });
    }

    return newBooking;
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    if (isSupabaseMode) {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    }

    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    saveLocal('wedding_bookings', updated);
    return updated.find(b => b.id === id)!;
  };

  const deleteBooking = async (id: string) => {
    if (isSupabaseMode) {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;
    }

    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    saveLocal('wedding_bookings', updated);
  };

  // Admin Auth Actions
  const adminLogin = async (password: string) => {
    if (isSupabaseMode) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: 'admin@takongwedding.com',
          password: password
        });
        
        if (error) {
          console.error('Supabase Auth error:', error);
          return false;
        }
        
        setIsAdminAuthenticated(true);
        localStorage.setItem('wedding_admin_auth', 'true');
        return true;
      } catch (err) {
        console.error('Supabase Auth exception:', err);
        return false;
      }
    } else {
      // Mock Admin password checking. Default is 'admin123'
      if (password === 'admin123') {
        setIsAdminAuthenticated(true);
        localStorage.setItem('wedding_admin_auth', 'true');
        return true;
      }
      return false;
    }
  };

  const adminLogout = async () => {
    if (isSupabaseMode) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Supabase SignOut exception:', err);
      }
    }
    setIsAdminAuthenticated(false);
    localStorage.removeItem('wedding_admin_auth');
  };

  return (
    <AppDataContext.Provider
      value={{
        albums,
        photos,
        pricingPackages,
        settings,
        bookings,
        isAdminAuthenticated,
        isSupabaseMode,
        language,
        setLanguage,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        addPhotos,
        deletePhoto,
        addPackage,
        updatePackage,
        deletePackage,
        reorderPackages,
        updateSettings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
