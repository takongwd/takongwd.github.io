import React, { useState, useEffect } from 'react';
import { useAppData } from '../context/AppDataContext';
import type { Album, PricingPackage } from '../context/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { 
  FolderHeart, CalendarRange, Settings, 
  Trash2, Edit2, Upload, Calendar, Clock, Check, X,
  Award, User, Phone, Mail, Image as ImageIcon,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';

const toLocalDateTimeString = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const pad = (num: number) => String(num).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const AdminDashboard: React.FC = () => {
  const { 
    albums, photos, pricingPackages, settings, bookings, isAdminAuthenticated, adminLogout,
    addAlbum, updateAlbum, deleteAlbum, addPhotos, deletePhoto, reorderPhotos,
    addPackage, updatePackage, deletePackage, reorderPackages, updateSettings,
    updateBookingStatus, deleteBooking
  } = useAppData();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'albums' | 'pricing' | 'bookings'>('overview');

  // Auth Guard
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);


  const [showCreateForm, setShowCreateForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [pendingPhotos, setPendingPhotos] = useState<string[]>([]);

  // Image Compression helper (reduces files to max 1200px and 0.75 quality)
  const compressAndReadFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const MAX_DIM = 1200;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        URL.revokeObjectURL(img.src);
        resolve(compressedBase64);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(img.src);
        reject(err);
      };
    });
  };

  const handleSingleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress('Compressing and optimizing cover image...');
    try {
      const compressed = await compressAndReadFile(file);
      callback(compressed);
    } catch (err) {
      console.error(err);
      alert('Failed to compress image');
    } finally {
      setUploadProgress(null);
    }
  };

  const handlePhotoFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadProgress(`Processing 0 of ${files.length} images...`);
    const compressedList: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        setUploadProgress(`Compressing and optimizing image ${i + 1} of ${files.length}...`);
        const compressed = await compressAndReadFile(files[i]);
        compressedList.push(compressed);
      } catch (err) {
        console.error('Error compressing image:', err);
      }
    }

    setUploadProgress(null);
    setPendingPhotos(prev => [...prev, ...compressedList]);
  };

  // --- Sub-State for Album CRUD ---
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDesc, setAlbumDesc] = useState('');
  const [albumCover, setAlbumCover] = useState('');
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null);
  
  // --- Sub-State for Photo Manager ---
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [photoUrlsInput, setPhotoUrlsInput] = useState('');
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editTimestamp, setEditTimestamp] = useState<string>('');

  // --- Sub-State for Pricing & Hero Settings ---
  const [promoText, setPromoText] = useState(settings.promotionText);
  const [bankName, setBankName] = useState(settings.bankName);
  const [bankAccName, setBankAccName] = useState(settings.bankAccountName);
  const [bankAccNum, setBankAccNum] = useState(settings.bankAccountNumber);
  const [qrCodeUrl, setQrCodeUrl] = useState(settings.qrCodeUrl);
  const [heroBgUrl, setHeroBgUrl] = useState(settings.heroBackgroundUrl || '');
  const [telegramNotificationsEnabled, setTelegramNotificationsEnabled] = useState(settings.telegramNotificationsEnabled || false);
  const [telegramBotToken, setTelegramBotToken] = useState(settings.telegramBotToken || '');
  const [telegramChatId, setTelegramChatId] = useState(settings.telegramChatId || '');
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);

  // Promo Popup Settings
  const [promoPopupEnabled, setPromoPopupEnabled] = useState(settings.promoPopupEnabled ?? true);
  const [promoPopupTitle, setPromoPopupTitle] = useState(settings.promoPopupTitle || '');
  const [promoPopupPkg1Name, setPromoPopupPkg1Name] = useState(settings.promoPopupPkg1Name || '');
  const [promoPopupPkg1Price, setPromoPopupPkg1Price] = useState(settings.promoPopupPkg1Price || '');
  const [promoPopupPkg1OrigPrice, setPromoPopupPkg1OrigPrice] = useState(settings.promoPopupPkg1OrigPrice || '');
  const [promoPopupPkg1Desc, setPromoPopupPkg1Desc] = useState(settings.promoPopupPkg1Desc || '');
  const [promoPopupPkg2Name, setPromoPopupPkg2Name] = useState(settings.promoPopupPkg2Name || '');
  const [promoPopupPkg2Price, setPromoPopupPkg2Price] = useState(settings.promoPopupPkg2Price || '');
  const [promoPopupPkg2OrigPrice, setPromoPopupPkg2OrigPrice] = useState(settings.promoPopupPkg2OrigPrice || '');
  const [promoPopupPkg2Desc, setPromoPopupPkg2Desc] = useState(settings.promoPopupPkg2Desc || '');

  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgDesc, setPkgDesc] = useState('');
  const [pkgFeatures, setPkgFeatures] = useState('');
  const [pkgIsPopular, setPkgIsPopular] = useState(false);
  const [pkgCategory, setPkgCategory] = useState<'main' | 'addon'>('main');
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);

  // Sync settings states on load
  useEffect(() => {
    setPromoText(settings.promotionText);
    setBankName(settings.bankName);
    setBankAccName(settings.bankAccountName);
    setBankAccNum(settings.bankAccountNumber);
    setQrCodeUrl(settings.qrCodeUrl);
    setHeroBgUrl(settings.heroBackgroundUrl || '');
    setTelegramNotificationsEnabled(settings.telegramNotificationsEnabled || false);
    setTelegramBotToken(settings.telegramBotToken || '');
    setTelegramChatId(settings.telegramChatId || '');
    setPromoPopupEnabled(settings.promoPopupEnabled ?? true);
    setPromoPopupTitle(settings.promoPopupTitle || '');
    setPromoPopupPkg1Name(settings.promoPopupPkg1Name || '');
    setPromoPopupPkg1Price(settings.promoPopupPkg1Price || '');
    setPromoPopupPkg1OrigPrice(settings.promoPopupPkg1OrigPrice || '');
    setPromoPopupPkg1Desc(settings.promoPopupPkg1Desc || '');
    setPromoPopupPkg2Name(settings.promoPopupPkg2Name || '');
    setPromoPopupPkg2Price(settings.promoPopupPkg2Price || '');
    setPromoPopupPkg2OrigPrice(settings.promoPopupPkg2OrigPrice || '');
    setPromoPopupPkg2Desc(settings.promoPopupPkg2Desc || '');
  }, [settings]);

  // Auto-scroll to Album Form when opened or editing
  useEffect(() => {
    if (showCreateForm || editingAlbumId) {
      const timer = setTimeout(() => {
        const el = document.getElementById('album-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showCreateForm, editingAlbumId]);

  // Auto-scroll to Photo Manager when an album is selected
  useEffect(() => {
    if (selectedAlbumId) {
      const timer = setTimeout(() => {
        const el = document.getElementById('photo-manager');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedAlbumId]);

  if (!isAdminAuthenticated) return null;

  // --- Handlers ---
  const handleSaveAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumTitle) return;

    if (editingAlbumId) {
      await updateAlbum(editingAlbumId, {
        title: albumTitle,
        description: albumDesc,
        coverUrl: albumCover
      });
      setEditingAlbumId(null);
    } else {
      await addAlbum(albumTitle, albumDesc, albumCover);
    }

    setAlbumTitle('');
    setAlbumDesc('');
    setAlbumCover('');
    setShowCreateForm(false); // Hide form after saving
  };

  const handleEditAlbum = (album: Album) => {
    setEditingAlbumId(album.id);
    setAlbumTitle(album.title);
    setAlbumDesc(album.description);
    setAlbumCover(album.coverUrl);
    setShowCreateForm(true); // Expand form when editing
  };

  const handleCancelAlbumEdit = () => {
    setEditingAlbumId(null);
    setAlbumTitle('');
    setAlbumDesc('');
    setAlbumCover('');
    setShowCreateForm(false);
  };

  const handleDeleteAlbum = async (id: string, title: string) => {
    const confirmDelete = window.confirm(
      `ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບອັນລະບັ້ມ "${title}"?\nການລຶບນີ້ຈະເຮັດໃຫ້ອັນລະບັ້ມ ແລະ ຮູບພາບທັງໝົດໃນນີ້ຖືກລຶບອອກຖາວອນ.\n\nAre you sure you want to delete the album "${title}"?\nThis will permanently delete the album and all photos inside it.`
    );
    if (confirmDelete) {
      await deleteAlbum(id);
      if (selectedAlbumId === id) {
        setSelectedAlbumId(null);
      }
    }
  };

  const handleAddPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbumId) return;

    // 1. Gather pasted URLs
    const urlsFromInput = photoUrlsInput
      .split(/[\n,]/)
      .map(url => url.trim())
      .filter(url => url.length > 0);

    // 2. Combine with pending uploaded photos
    const allUrls = [...urlsFromInput, ...pendingPhotos];

    if (allUrls.length > 0) {
      setUploadProgress(`Saving ${allUrls.length} photos to album...`);
      try {
        await addPhotos(selectedAlbumId, allUrls);
        setPhotoUrlsInput('');
        setPendingPhotos([]);
      } catch (err) {
        console.error(err);
        alert('Failed to save photos to database');
      } finally {
        setUploadProgress(null);
      }
    }
  };

  const handleMovePhoto = async (photo: any, direction: 'left' | 'right') => {
    if (!selectedAlbumId) return;
    const albumPhotos = [...photos]
      .filter(p => p.albumId === selectedAlbumId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const index = albumPhotos.findIndex(p => p.id === photo.id);
    if (direction === 'left' && index > 0) {
      const targetPhoto = albumPhotos[index - 1];
      let photoTime = new Date(targetPhoto.createdAt).getTime();
      let targetTime = new Date(photo.createdAt).getTime();
      if (photoTime === targetTime) {
        photoTime += 1000;
      }
      await reorderPhotos([
        { id: photo.id, createdAt: new Date(photoTime).toISOString() },
        { id: targetPhoto.id, createdAt: new Date(targetTime).toISOString() }
      ]);
    } else if (direction === 'right' && index < albumPhotos.length - 1) {
      const targetPhoto = albumPhotos[index + 1];
      let photoTime = new Date(targetPhoto.createdAt).getTime();
      let targetTime = new Date(photo.createdAt).getTime();
      if (photoTime === targetTime) {
        photoTime -= 1000;
      }
      await reorderPhotos([
        { id: photo.id, createdAt: new Date(photoTime).toISOString() },
        { id: targetPhoto.id, createdAt: new Date(targetTime).toISOString() }
      ]);
    }
  };

  const handleUpdatePhotoTime = async (photoId: string, customTimeStr: string) => {
    if (!customTimeStr) return;
    try {
      const parsedDate = new Date(customTimeStr);
      if (isNaN(parsedDate.getTime())) {
        alert("Invalid date format. Please use a valid date.");
        return;
      }
      setUploadProgress("Updating photo timestamp...");
      await reorderPhotos([
        { id: photoId, createdAt: parsedDate.toISOString() }
      ]);
      setEditingPhotoId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update photo timestamp");
    } finally {
      setUploadProgress(null);
    }
  };

  const handleBulkSort = async (sortType: 'newest' | 'oldest' | 'alphabetical' | 'shuffle') => {
    if (!selectedAlbumId) return;
    const albumPhotos = [...photos].filter(p => p.albumId === selectedAlbumId);
    if (albumPhotos.length === 0) return;

    if (sortType === 'newest') {
      albumPhotos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortType === 'oldest') {
      albumPhotos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortType === 'alphabetical') {
      albumPhotos.sort((a, b) => a.url.localeCompare(b.url));
    } else if (sortType === 'shuffle') {
      for (let i = albumPhotos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [albumPhotos[i], albumPhotos[j]] = [albumPhotos[j], albumPhotos[i]];
      }
    }

    // Assign new timestamps in descending order spaced by 1 minute
    const baseTime = Date.now();
    const updates = albumPhotos.map((p, idx) => ({
      id: p.id,
      createdAt: new Date(baseTime - idx * 60000).toISOString()
    }));

    setUploadProgress("Sorting photos...");
    try {
      await reorderPhotos(updates);
    } catch (err) {
      console.error("Failed to sort photos:", err);
      alert("Failed to sort photos. Please try again.");
    } finally {
      setUploadProgress(null);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings({
        promotionText: promoText,
        bankName,
        bankAccountName: bankAccName,
        bankAccountNumber: bankAccNum,
        qrCodeUrl,
        heroBackgroundUrl: heroBgUrl,
        telegramNotificationsEnabled,
        telegramBotToken,
        telegramChatId,
        promoPopupEnabled,
        promoPopupTitle,
        promoPopupPkg1Name,
        promoPopupPkg1Price,
        promoPopupPkg1OrigPrice,
        promoPopupPkg1Desc,
        promoPopupPkg2Name,
        promoPopupPkg2Price,
        promoPopupPkg2OrigPrice,
        promoPopupPkg2Desc
      });
      alert('Settings & Payment parameters updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings. If you are using Supabase mode, please make sure you have executed the new SQL migration script (supabase_promo_setup.sql) in your Supabase SQL Editor to add the required table columns!');
    }
  };
 
  const handleTestTelegramAlert = async () => {
    if (!telegramBotToken || !telegramChatId) {
      alert('ກະລຸນາປ້ອນ Bot Token ແລະ Chat ID ກ່ອນທົດສອບ.');
      return;
    }
 
    setIsTestingTelegram(true);
    const trimmedToken = telegramBotToken.trim();
    const trimmedChatId = telegramChatId.trim();
 
    try {
      const message = `<b>🔔 ທົດສອບການເຊື່ອມຕໍ່ Telegram Bot (Connection Test)</b>\n\n` +
        `ລະບົບແຈ້ງເຕືອນການຈອງຂອງເວັບໄຊ້ <b>Takong Wedding</b> ເຊື່ອມຕໍ່ກັບບັອດຂອງທ່ານສຳເລັດແລ້ວ! 🎉\n\n` +
        `⏰ ເວລາທົດສອບ: ${new Date().toLocaleString('lo-LA', { timeZone: 'Asia/Vientiane' })}`;
 
      const response = await fetch(`https://api.telegram.org/bot${trimmedToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: trimmedChatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });
 
      const data = await response.json();
 
      if (response.ok && data.ok) {
        alert('✅ ເຊື່ອມຕໍ່ສຳເລັດ! ຂໍ້ຄວາມທົດສອບໄດ້ຖືກສົ່ງເຂົ້າ Telegram ຂອງທ່ານແລ້ວ.');
      } else {
        alert(`❌ ສົ່ງຂໍ້ຄວາມທົດສອບບໍ່ສຳເລັດ!\n\nລະຫັດຜິດພາດ: ${response.status}\nລາຍລະອຽດ: ${data.description || 'ບໍ່ມີຂໍ້ມູນ'}\n\n(ກະລຸນາກວດສອບຄືນວ່າ ໄດ້ກົດ Start ບັອດແລ້ວ ຫຼື ໃສ່ Chat ID ຖືກຕ້ອງ ຫຼື ບໍ່)`);
      }
    } catch (err: any) {
      console.error(err);
      alert('❌ ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່ເຄືອຂ່າຍ: ' + (err.message || err));
    } finally {
      setIsTestingTelegram(false);
    }
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgName || !pkgPrice) return;

    const featuresArray = pkgFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const pkgData = {
      name: pkgName,
      price: pkgPrice,
      description: pkgDesc,
      features: featuresArray,
      isPopular: pkgIsPopular,
      category: pkgCategory,
      orderIndex: editingPkgId ? pricingPackages.find(p => p.id === editingPkgId)?.orderIndex || 0 : pricingPackages.length
    };

    if (editingPkgId) {
      await updatePackage(editingPkgId, pkgData);
      setEditingPkgId(null);
    } else {
      await addPackage(pkgData);
    }

    setPkgName('');
    setPkgPrice('');
    setPkgDesc('');
    setPkgFeatures('');
    setPkgIsPopular(false);
    setPkgCategory('main');
  };

  const handleEditPackage = (pkg: PricingPackage) => {
    setEditingPkgId(pkg.id);
    setPkgName(pkg.name);
    setPkgPrice(pkg.price);
    setPkgDesc(pkg.description);
    setPkgFeatures(pkg.features.join('\n'));
    setPkgIsPopular(pkg.isPopular);
    setPkgCategory(pkg.category || 'main');

    // Scroll to the edit form smoothly
    setTimeout(() => {
      document.getElementById('package-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleMovePackage = async (pkg: PricingPackage, direction: 'up' | 'down') => {
    const sameCategoryPkgs = [...pricingPackages]
      .filter(p => (p.category || 'main') === (pkg.category || 'main'))
      .sort((a, b) => a.orderIndex - b.orderIndex);
    const index = sameCategoryPkgs.findIndex(p => p.id === pkg.id);
    
    if (direction === 'up' && index > 0) {
      const prevPkg = sameCategoryPkgs[index - 1];
      await reorderPackages([
        { id: pkg.id, orderIndex: prevPkg.orderIndex },
        { id: prevPkg.id, orderIndex: pkg.orderIndex }
      ]);
    } else if (direction === 'down' && index < sameCategoryPkgs.length - 1) {
      const nextPkg = sameCategoryPkgs[index + 1];
      await reorderPackages([
        { id: pkg.id, orderIndex: nextPkg.orderIndex },
        { id: nextPkg.id, orderIndex: pkg.orderIndex }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-[#f5f5f7] flex flex-col">
      <Navbar isAdmin={true} onLogout={adminLogout} />

      {uploadProgress && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="p-6 rounded-lg bg-dark-card border border-gold/30 flex flex-col items-center max-w-sm text-center space-y-4 shadow-2xl">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-gold border-t-transparent"></div>
            <p className="text-sm font-semibold text-white tracking-wide">{uploadProgress}</p>
          </div>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* Dashboard Header Banner */}
        <div className="mb-10 p-6 rounded-lg glass-effect border border-gold/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-white font-medium tracking-wide">
              Studio Dashboard
            </h1>
            <p className="text-xs text-dark-text-muted mt-1 uppercase tracking-wider">
              Control Panel & Content Manager
            </p>
          </div>
          <div className="text-[10px] tracking-widest uppercase bg-gold/10 border border-gold/20 text-gold px-3.5 py-2 rounded">
            Authenticated: Administrator
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Menu */}
          <aside className="lg:col-span-3 space-y-2.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3.5 px-5 py-4 text-xs font-semibold uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-gold-gradient text-black font-bold shadow-lg shadow-gold/15'
                  : 'bg-dark-card border border-dark-border hover:bg-dark-card-hover hover:border-gold/30 text-dark-text-muted hover:text-white'
              }`}
            >
              <Award className="h-4.5 w-4.5" />
              <span>Overview</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('albums');
                setSelectedAlbumId(null);
              }}
              className={`w-full flex items-center space-x-3.5 px-5 py-4 text-xs font-semibold uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'albums'
                  ? 'bg-gold-gradient text-black font-bold shadow-lg shadow-gold/15'
                  : 'bg-dark-card border border-dark-border hover:bg-dark-card-hover hover:border-gold/30 text-dark-text-muted hover:text-white'
              }`}
            >
              <FolderHeart className="h-4.5 w-4.5" />
              <span>Albums & Photos</span>
            </button>
            
            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center space-x-3.5 px-5 py-4 text-xs font-semibold uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'pricing'
                  ? 'bg-gold-gradient text-black font-bold shadow-lg shadow-gold/15'
                  : 'bg-dark-card border border-dark-border hover:bg-dark-card-hover hover:border-gold/30 text-dark-text-muted hover:text-white'
              }`}
            >
              <Settings className="h-4.5 w-4.5" />
              <span>Pricing & QR Code</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-5 py-4 text-xs font-semibold uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'bookings'
                  ? 'bg-gold-gradient text-black font-bold shadow-lg shadow-gold/15'
                  : 'bg-dark-card border border-dark-border hover:bg-dark-card-hover hover:border-gold/30 text-dark-text-muted hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <CalendarRange className="h-4.5 w-4.5" />
                <span>Bookings</span>
              </div>
              {bookings.filter(b => b.status === 'pending').length > 0 && (
                <span className="px-2 py-0.5 text-[9px] bg-gold text-black rounded font-bold">
                  {bookings.filter(b => b.status === 'pending').length}
                </span>
              )}
            </button>
          </aside>

          {/* Right Main Panel Content */}
          <main className="lg:col-span-9">

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                {/* Stats Panel */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-lg bg-dark-card border border-dark-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-dark-text-muted uppercase tracking-widest block font-medium">Active Albums</span>
                      <span className="text-3xl font-serif font-semibold text-white mt-1 block">{albums.length}</span>
                    </div>
                    <div className="p-3.5 rounded bg-gold/5 border border-gold/10 text-gold">
                      <FolderHeart className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="p-6 rounded-lg bg-dark-card border border-dark-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-dark-text-muted uppercase tracking-widest block font-medium">Total Captures</span>
                      <span className="text-3xl font-serif font-semibold text-white mt-1 block">{photos.length}</span>
                    </div>
                    <div className="p-3.5 rounded bg-gold/5 border border-gold/10 text-gold">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="p-6 rounded-lg bg-dark-card border border-dark-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-dark-text-muted uppercase tracking-widest block font-medium">Pending Bookings</span>
                      <span className="text-3xl font-serif font-semibold text-gold mt-1 block">
                        {bookings.filter(b => b.status === 'pending').length}
                      </span>
                    </div>
                    <div className="p-3.5 rounded bg-gold/5 border border-gold/10 text-gold">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Quick actions & bookings teaser */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Bookings shortcut panel */}
                  <div className="p-6 rounded-lg bg-dark-card border border-dark-border">
                    <h3 className="font-serif text-lg text-white font-medium mb-4 tracking-wider flex items-center justify-between">
                      <span>Recent Booking Actions</span>
                      <span className="text-[9px] uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 border border-gold/20 rounded">
                        Latest
                      </span>
                    </h3>
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((b) => (
                        <div key={b.id} className="p-3 rounded bg-black/40 border border-dark-border flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white block">{b.clientName}</span>
                            <span className="text-dark-text-muted text-[10px] block mt-0.5">{b.bookingDate} {b.packageName ? `| ${b.packageName}` : ''}</span>
                          </div>
                          <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider rounded font-bold ${
                            b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            b.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-gold/10 text-gold border border-gold/20'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                      ))}
                      <button
                        onClick={() => setActiveTab('bookings')}
                        className="w-full text-center py-2.5 text-[10px] uppercase tracking-widest font-semibold text-gold border border-gold/10 hover:border-gold/30 hover:bg-gold/5 rounded transition-all cursor-pointer"
                      >
                        Manage All Bookings &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Pricing quick editor */}
                  <div className="p-6 rounded-lg bg-dark-card border border-dark-border flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg text-white font-medium mb-2 tracking-wider">
                        Pricing Summary
                      </h3>
                      <p className="text-xs text-dark-text-muted leading-relaxed font-light mb-6">
                        You currently have <strong className="text-white">{pricingPackages.length} active package tiers</strong>. 
                        Your promotional text is currently live on the front page.
                      </p>
                      <div className="p-4 rounded bg-black/40 border border-dark-border text-xs leading-relaxed italic text-gold-light font-light mb-6">
                        "{settings.promotionText}"
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('pricing')}
                      className="w-full text-center py-2.5 text-[10px] uppercase tracking-widest font-semibold text-gold border border-gold/10 hover:border-gold/30 hover:bg-gold/5 rounded transition-all cursor-pointer"
                    >
                      Update Package Prices &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ALBUMS & PHOTOS */}
            {activeTab === 'albums' && (
              <div className="space-y-10 animate-fade-in">
                
                {/* Album Management Form Toggle */}
                {!editingAlbumId && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowCreateForm(prev => !prev)}
                      className="px-5 py-3 border border-gold/45 text-gold hover:text-black hover:bg-gold-gradient text-xs font-semibold uppercase tracking-widest rounded hover:scale-102 transition-all cursor-pointer flex items-center space-x-2 shadow-lg shadow-gold/5"
                    >
                      <span>{showCreateForm ? '− Hide Create Album Form' : '＋ Create New Portfolio Album'}</span>
                    </button>
                  </div>
                )}

                {/* Album Management Form */}
                {(showCreateForm || editingAlbumId) && (
                  <div id="album-form" className="p-6 rounded-lg bg-dark-card border border-dark-border animate-fade-in">
                    <h3 className="font-serif text-lg text-white font-medium mb-6 tracking-wider">
                      {editingAlbumId ? 'Edit Album Properties' : 'Create New Portfolio Album'}
                    </h3>
                    <form onSubmit={handleSaveAlbum} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Album Title</label>
                        <input
                          type="text"
                          value={albumTitle}
                          onChange={e => setAlbumTitle(e.target.value)}
                          required
                          placeholder="e.g. Traditional Ceremony Vientiane"
                          className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Cover Photo URL / Base64</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={albumCover}
                            onChange={e => setAlbumCover(e.target.value)}
                            placeholder="Image URL or upload file"
                            className="flex-grow bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                          />
                          <label className="p-2.5 bg-[#121215] border border-dark-border hover:border-gold/45 rounded cursor-pointer text-dark-text-muted hover:text-white transition-all">
                            <Upload className="h-4.5 w-4.5" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => handleSingleFileUpload(e, setAlbumCover)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      
                      {albumCover && (
                        <div className="sm:col-span-2 space-y-2">
                          <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold">Cover Photo Preview</label>
                          <div className="relative aspect-video w-full sm:max-w-md rounded overflow-hidden border border-gold/20 bg-[#050505]">
                            <img src={albumCover} alt="Cover Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setAlbumCover('')}
                              className="absolute top-2 right-2 p-1.5 bg-black/70 border border-white/10 hover:border-red-500 hover:text-red-400 rounded text-white transition-all cursor-pointer text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Short Description / Subtitle</label>
                        <textarea
                          value={albumDesc}
                          onChange={e => setAlbumDesc(e.target.value)}
                          rows={2}
                          placeholder="Provide an elegant description for this portfolio collection..."
                          className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                        />
                      </div>
                      <div className="sm:col-span-2 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={handleCancelAlbumEdit}
                          className="px-5 py-2.5 text-xs uppercase tracking-widest border border-white/10 hover:border-white/20 text-white rounded cursor-pointer transition-all"
                        >
                          Cancel / Hide
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest rounded hover:scale-102 cursor-pointer transition-all"
                        >
                          {editingAlbumId ? 'Save Changes' : 'Create Album'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Photo Manager (Only active if an album is selected) */}
                {selectedAlbumId && (
                  <div id="photo-manager" className="p-6 rounded-lg bg-dark-card border border-gold/25 animate-fade-in space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-dark-border/40">
                      <h3 className="font-serif text-lg text-white font-medium tracking-wider">
                        Manage Photos: <span className="text-gold font-light">{albums.find(a => a.id === selectedAlbumId)?.title}</span>
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedAlbumId(null);
                          setPendingPhotos([]);
                        }}
                        className="p-1.5 border border-white/10 hover:border-white/20 rounded text-dark-text-muted hover:text-white text-[10px] uppercase tracking-widest cursor-pointer"
                      >
                        Close Manager
                      </button>
                    </div>

                    {/* Photo Uploader */}
                    <form onSubmit={handleAddPhotos} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">
                            Option A: Select & Upload Local Images (Fast & Compressed)
                          </label>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-dark-border hover:border-gold/40 rounded-lg cursor-pointer bg-[#050505] hover:bg-gold/5 transition-all p-4">
                            <Upload className="h-7 w-7 text-dark-text-muted group-hover:text-gold mb-2" />
                            <span className="text-xs text-dark-text-muted font-medium text-center">
                              Tap to select photo(s) from camera roll
                            </span>
                            <span className="text-[9px] text-dark-text-muted/60 mt-1 uppercase tracking-wider">
                              Supports multiple file upload
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handlePhotoFilesSelect}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">
                            Option B: Paste Web Image URLs (Separated by comma or new line)
                          </label>
                          <textarea
                            value={photoUrlsInput}
                            onChange={e => setPhotoUrlsInput(e.target.value)}
                            rows={4}
                            placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
                            className="w-full h-32 bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                          />
                        </div>
                      </div>

                      {/* Pending upload list preview */}
                      {pendingPhotos.length > 0 && (
                        <div className="space-y-3 p-4 rounded bg-black/30 border border-gold/15 animate-fade-in">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                              Selected Images to Add ({pendingPhotos.length})
                            </span>
                            <button
                              type="button"
                              onClick={() => setPendingPhotos([])}
                              className="text-[9px] uppercase tracking-widest text-red-400 hover:underline cursor-pointer"
                            >
                              Clear List
                            </button>
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 max-h-48 overflow-y-auto p-1 scroll-smooth">
                            {pendingPhotos.map((url, idx) => (
                              <div key={idx} className="relative aspect-square rounded border border-dark-border overflow-hidden bg-black/40 group">
                                <img src={url} alt="Pending upload preview" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setPendingPhotos(prev => prev.filter((_, i) => i !== idx))}
                                  className="absolute top-1 right-1 p-1 bg-black/70 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all cursor-pointer"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={pendingPhotos.length === 0 && !photoUrlsInput.trim()}
                          className="w-full sm:w-auto px-8 py-3.5 bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest rounded hover:scale-102 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold/10"
                        >
                          Save Photos to Album
                        </button>
                      </div>
                    </form>

                    {/* Photos list in album */}
                    <div className="space-y-6">
                      {/* Free Sorting Options Panel */}
                      <div className="p-4 rounded bg-[#090909] border border-gold/15 space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold">
                              Sorting Options / ຈັດລຽງຮູບພາບດ່ວນ
                            </h4>
                            <p className="text-[9px] text-dark-text-muted font-light mt-0.5 uppercase tracking-wide">
                              Bulk sort all photos in this album or move individual photos below.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleBulkSort('newest')}
                              className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-gold/30 text-[9px] text-white hover:text-gold uppercase tracking-widest rounded transition-all cursor-pointer font-semibold"
                            >
                              Newest First
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBulkSort('oldest')}
                              className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-gold/30 text-[9px] text-white hover:text-gold uppercase tracking-widest rounded transition-all cursor-pointer font-semibold"
                            >
                              Oldest First
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBulkSort('alphabetical')}
                              className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-gold/30 text-[9px] text-white hover:text-gold uppercase tracking-widest rounded transition-all cursor-pointer font-semibold"
                            >
                              Filename (A-Z)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBulkSort('shuffle')}
                              className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-gold/30 text-[9px] text-white hover:text-gold uppercase tracking-widest rounded transition-all cursor-pointer font-semibold"
                            >
                              Shuffle
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-dark-text-muted font-bold mb-4">
                          Album Photos ({photos.filter(p => p.albumId === selectedAlbumId).length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                          {[...photos]
                            .filter(p => p.albumId === selectedAlbumId)
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((photo, idx, arr) => (
                            <div key={photo.id} className="relative group rounded border border-dark-border overflow-hidden bg-[#050505] aspect-square">
                              <img src={photo.url} alt="Sub-gallery" className="w-full h-full object-cover" />
                              
                              {/* Overlay for time-editing */}
                              {editingPhotoId === photo.id ? (
                                <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-2 space-y-2 z-10 animate-fade-in">
                                  <span className="text-[9px] uppercase tracking-wider text-gold font-bold">
                                    Set Sort Time
                                  </span>
                                  <input
                                    type="datetime-local"
                                    value={editTimestamp}
                                    onChange={e => setEditTimestamp(e.target.value)}
                                    className="w-full bg-[#111] border border-gold/30 text-white text-[10px] rounded px-1.5 py-1 focus:outline-none focus:border-gold font-mono"
                                  />
                                  <div className="flex justify-center gap-1 w-full">
                                    <button
                                      onClick={() => handleUpdatePhotoTime(photo.id, editTimestamp)}
                                      className="flex-grow py-1 bg-gold text-black rounded text-[9px] font-bold uppercase tracking-wider hover:bg-gold/80 transition-all flex items-center justify-center gap-1 cursor-pointer"
                                    >
                                      <Check className="h-3 w-3" /> Save
                                    </button>
                                    <button
                                      onClick={() => setEditingPhotoId(null)}
                                      className="px-1.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              ) : null}

                              {/* Top right delete button (quick action) */}
                              <button
                                onClick={() => {
                                  const confirmDel = window.confirm("ລຶບຮູບພາບນີ້ແທ້ບໍ? / Are you sure you want to delete this photo?");
                                  if (confirmDel) {
                                    deletePhoto(photo.id);
                                  }
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-black/70 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all cursor-pointer z-1"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>

                              {/* Hover/Touch Bottom Action Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xs border-t border-gold/15 py-1.5 px-2 flex items-center justify-around transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-1">
                                {/* Move Left Button */}
                                <button
                                  onClick={() => handleMovePhoto(photo, 'left')}
                                  disabled={idx === 0}
                                  className="p-1 text-white hover:text-gold transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                                  title="Move Left (Newer)"
                                >
                                  <ChevronLeft className="h-4.5 w-4.5" />
                                </button>

                                {/* Clock / Edit timestamp */}
                                <button
                                  onClick={() => {
                                    setEditingPhotoId(photo.id);
                                    setEditTimestamp(toLocalDateTimeString(photo.createdAt));
                                  }}
                                  className="p-1 text-white hover:text-gold transition-all cursor-pointer"
                                  title="Set Sort Time"
                                >
                                  <Clock className="h-4 w-4" />
                                </button>

                                {/* Move Right Button */}
                                <button
                                  onClick={() => handleMovePhoto(photo, 'right')}
                                  disabled={idx === arr.length - 1}
                                  className="p-1 text-white hover:text-gold transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                                  title="Move Right (Older)"
                                >
                                  <ChevronRight className="h-4.5 w-4.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Album List */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-white font-medium tracking-wider mb-2">
                    Active Portfolio Albums ({albums.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {albums.map((album) => (
                      <div key={album.id} className="p-5 rounded-lg bg-dark-card border border-dark-border flex flex-col justify-between">
                        <div>
                          <div className="aspect-video w-full rounded overflow-hidden bg-black mb-4 border border-dark-border">
                            <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
                          </div>
                          <h4 className="font-serif text-lg text-white font-semibold mb-1">{album.title}</h4>
                          <p className="text-xs text-dark-text-muted font-light leading-relaxed mb-4">{album.description}</p>
                          <div className="text-[10px] text-dark-text-muted tracking-wide mb-4">
                            Photos count: {photos.filter(p => p.albumId === album.id).length}
                          </div>
                        </div>

                        <div className="flex gap-2.5 pt-4 border-t border-dark-border/40">
                          <button
                            onClick={() => setSelectedAlbumId(album.id)}
                            className="flex-grow py-2 text-center text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/5 border border-gold/20 hover:border-gold hover:text-black hover:bg-gold-gradient rounded transition-all cursor-pointer"
                          >
                            Manage Photos
                          </button>
                          <button
                            onClick={() => handleEditAlbum(album)}
                            className="p-2 border border-white/10 hover:border-gold/30 text-dark-text-muted hover:text-white rounded transition-all cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteAlbum(album.id, album.title)}
                            className="p-2 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRICING & SETTINGS & QR CODE */}
            {activeTab === 'pricing' && (
              <div className="space-y-10 animate-fade-in">
                {/* Global promotion & Bank QR settings form */}
                <div className="p-6 rounded-lg bg-dark-card border border-dark-border">
                  <h3 className="font-serif text-lg text-white font-medium mb-6 tracking-wider">
                    Settings & Payment Information
                  </h3>
                  <form onSubmit={handleSaveSettings} className="space-y-5">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Front Page Promotion Banner Text</label>
                      <textarea
                        value={promoText}
                        onChange={e => setPromoText(e.target.value)}
                        rows={2}
                        placeholder="Write a custom active discount/promo banner text..."
                        className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">WhatsApp Contact Link</label>
                        <input
                          type="text"
                          value={settings.whatsappNumber}
                          onChange={e => updateSettings({ whatsappNumber: e.target.value })}
                          className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Facebook Page URL</label>
                        <input
                          type="text"
                          value={settings.facebookPageUrl}
                          onChange={e => updateSettings({ facebookPageUrl: e.target.value })}
                          className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                        />
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-dark-border my-6" />

                    {/* Hero Landing Background Image ("Background Dock") */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-sm text-gold tracking-wide">Hero Landing Background Image ("Background Dock")</h4>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        <div className="md:col-span-8 space-y-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Background Image URL</label>
                            <input
                              type="text"
                              value={heroBgUrl}
                              onChange={e => setHeroBgUrl(e.target.value)}
                              placeholder="Paste a direct image URL (https://...)"
                              className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                            />
                            <p className="text-[10px] text-dark-text-muted mt-1 font-light italic">
                              Paste any direct web image URL, or upload a custom image file from your device.
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <label className="flex items-center space-x-2 px-4 py-2.5 border border-dark-border hover:border-gold/30 bg-[#050505] hover:bg-gold/5 text-[10px] font-bold uppercase tracking-widest text-dark-text-muted hover:text-white rounded cursor-pointer transition-all">
                              <Upload className="h-4 w-4" />
                              <span>Upload Background Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleSingleFileUpload(e, setHeroBgUrl)}
                                className="hidden"
                              />
                            </label>
                            {heroBgUrl && heroBgUrl !== 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000' && (
                              <button
                                type="button"
                                onClick={() => setHeroBgUrl('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000')}
                                className="px-4 py-2.5 border border-red-500/20 hover:border-red-500/50 bg-red-950/10 hover:bg-red-950/20 text-[10px] font-bold uppercase tracking-widest text-red-400 rounded cursor-pointer transition-all"
                              >
                                Reset to Default
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-4 flex flex-col items-center">
                          <span className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2 w-full text-left sm:text-center">Live Preview</span>
                          <div className="relative w-full aspect-video rounded overflow-hidden border border-dark-border bg-[#050505] flex items-center justify-center">
                            {heroBgUrl ? (
                              <>
                                <img src={heroBgUrl} alt="Hero Background Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <span className="font-serif text-[10px] text-white uppercase tracking-[0.2em]">TAKONG PREVIEW</span>
                                </div>
                              </>
                            ) : (
                              <span className="text-xs text-dark-text-muted font-light">No Image Selected</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-dark-border my-6" />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      {/* Bank Fields */}
                      <div className="md:col-span-8 space-y-4">
                        <h4 className="font-serif text-sm text-gold tracking-wide mb-2">Bank Details for Deposit</h4>
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Bank Name</label>
                          <input
                            type="text"
                            value={bankName}
                            onChange={e => setBankName(e.target.value)}
                            className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Account Name</label>
                          <input
                            type="text"
                            value={bankAccName}
                            onChange={e => setBankAccName(e.target.value)}
                            className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Account Number</label>
                          <input
                            type="text"
                            value={bankAccNum}
                            onChange={e => setBankAccNum(e.target.value)}
                            className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                          />
                        </div>
                      </div>

                      {/* QR Uploader */}
                      <div className="md:col-span-4 flex flex-col items-center">
                        <h4 className="font-serif text-sm text-gold tracking-wide mb-4">Payment QR Code</h4>
                        <div className="p-3 bg-white rounded-lg mb-4 shadow-lg border border-dark-border/40">
                          <img src={qrCodeUrl} alt="Bank QR code preview" className="w-32 h-32 object-contain" />
                        </div>
                        
                        <label className="flex items-center space-x-2 px-4 py-2.5 border border-dark-border hover:border-gold/30 bg-[#050505] hover:bg-gold/5 text-[10px] font-bold uppercase tracking-widest text-dark-text-muted hover:text-white rounded cursor-pointer transition-all">
                          <Upload className="h-4 w-4" />
                          <span>Upload QR image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleSingleFileUpload(e, setQrCodeUrl)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
 
                    <div className="w-full h-[1px] bg-dark-border my-6" />

                    <div className="space-y-6">
                      <h4 className="font-serif text-sm text-gold tracking-wide">
                        ໂປຣໂມຊັ່ນໜ້າທຳອິດ (First-Visit Promo Popup Settings)
                      </h4>
                      <p className="text-[11px] text-dark-text-muted font-light leading-relaxed">
                        ກຳນົດຄ່າແຈ້ງເຕືອນໂປຣໂມຊັ່ນທີ່ຈະສະແດງຂຶ້ນມາໃນໜ້າທຳອິດຂອງເວັບໄຊ້ ເມື່ອລູກຄ້າເຂົ້າມາເບິ່ງເທື່ອທຳອິດ (Customizable Promo Popup).
                      </p>

                      <div className="flex items-center space-x-2 py-2">
                        <input
                          type="checkbox"
                          id="promoPopupEnabled"
                          checked={promoPopupEnabled}
                          onChange={e => setPromoPopupEnabled(e.target.checked)}
                          className="rounded accent-gold h-4 w-4 bg-[#050505] border-dark-border focus:ring-0"
                        />
                        <label htmlFor="promoPopupEnabled" className="text-xs text-dark-text-muted select-none cursor-pointer">
                          <span className="font-semibold text-white/90">ເປີດໃຊ້ງານປ໊ອບອັບໂປຣໂມຊັ່ນ</span> (Enable Promotion Popup)
                        </label>
                      </div>

                      {promoPopupEnabled && (
                        <div className="space-y-4 animate-fade-in">
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">
                              ຫົວຂໍ້ປ໊ອບອັບ (Promo Popup Title)
                            </label>
                            <input
                              type="text"
                              value={promoPopupTitle}
                              onChange={e => setPromoPopupTitle(e.target.value)}
                              className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                              placeholder="e.g. ໂປຣໂມຊັ່ນຖ່າຍຮູບແຕ່ງງານ 2026"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            {/* Package 1 */}
                            <div className="p-4 rounded-lg bg-black/40 border border-dark-border space-y-4">
                              <h5 className="font-serif text-xs text-gold uppercase tracking-widest font-semibold">
                                ແພັກເກດທີ 1 (Package 1)
                              </h5>
                              <div>
                                <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                  ຊື່ແພັກເກດ (Package Name)
                                </label>
                                <input
                                  type="text"
                                  value={promoPopupPkg1Name}
                                  onChange={e => setPromoPopupPkg1Name(e.target.value)}
                                  className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs tracking-wider transition-all"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                    ລາຄາໂປຣ (Promo Price)
                                  </label>
                                  <input
                                    type="text"
                                    value={promoPopupPkg1Price}
                                    onChange={e => setPromoPopupPkg1Price(e.target.value)}
                                    className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs tracking-wider transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                    ລາຄາປົກກະຕິ (Original Price)
                                  </label>
                                  <input
                                    type="text"
                                    value={promoPopupPkg1OrigPrice}
                                    onChange={e => setPromoPopupPkg1OrigPrice(e.target.value)}
                                    className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs tracking-wider transition-all"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                  ລາຍລະອຽດແພັກເກດ (Package Description)
                                </label>
                                <textarea
                                  value={promoPopupPkg1Desc}
                                  onChange={e => setPromoPopupPkg1Desc(e.target.value)}
                                  rows={3}
                                  className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs transition-all resize-none"
                                />
                              </div>
                            </div>

                            {/* Package 2 */}
                            <div className="p-4 rounded-lg bg-gold/5 border border-gold/15 space-y-4">
                              <h5 className="font-serif text-xs text-gold uppercase tracking-widest font-semibold">
                                ແພັກເກດທີ 2 (Package 2)
                              </h5>
                              <div>
                                <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                  ຊື່ແພັກເກດ (Package Name)
                                </label>
                                <input
                                  type="text"
                                  value={promoPopupPkg2Name}
                                  onChange={e => setPromoPopupPkg2Name(e.target.value)}
                                  className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs tracking-wider transition-all"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                    ລາຄາໂປຣ (Promo Price)
                                  </label>
                                  <input
                                    type="text"
                                    value={promoPopupPkg2Price}
                                    onChange={e => setPromoPopupPkg2Price(e.target.value)}
                                    className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs tracking-wider transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                    ລາຄາປົກກະຕິ (Original Price)
                                  </label>
                                  <input
                                    type="text"
                                    value={promoPopupPkg2OrigPrice}
                                    onChange={e => setPromoPopupPkg2OrigPrice(e.target.value)}
                                    className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs tracking-wider transition-all"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[8px] uppercase tracking-widest text-dark-text-muted font-bold mb-1">
                                  ລາຍລະອຽດແພັກເກດ (Package Description)
                                </label>
                                <textarea
                                  value={promoPopupPkg2Desc}
                                  onChange={e => setPromoPopupPkg2Desc(e.target.value)}
                                  rows={3}
                                  className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-3 py-2 text-xs transition-all resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full h-[1px] bg-dark-border my-6" />

                    <div className="space-y-4">
                      <h4 className="font-serif text-sm text-gold tracking-wide">
                        ລະບົບແຈ້ງເຕືອນການຈອງຜ່ານ Telegram (Telegram Booking Alerts)
                      </h4>
                      <p className="text-[11px] text-dark-text-muted font-light leading-relaxed">
                        ຕັ້ງຄ່າເພື່ອໃຫ້ລະບົບສົ່ງຂໍ້ຄວາມແຈ້ງເຕືອນໄປຫາ Telegram ຂອງແອັດມິນທັນທີທີ່ມີການຈອງວັນທີເຂົ້າມາ.
                      </p>
                      
                      <div className="flex items-center space-x-2 py-2">
                        <input
                          type="checkbox"
                          id="telegramNotificationsEnabled"
                          checked={telegramNotificationsEnabled}
                          onChange={e => setTelegramNotificationsEnabled(e.target.checked)}
                          className="rounded accent-gold h-4 w-4 bg-[#050505] border-dark-border focus:ring-0"
                        />
                        <label htmlFor="telegramNotificationsEnabled" className="text-xs text-dark-text-muted select-none">
                          ເປີດໃຊ້ງານການແຈ້ງເຕືອນ (Enable Telegram Alerts)
                        </label>
                      </div>
 
                      {telegramNotificationsEnabled && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">
                                Telegram Bot Token (ໂທເຄັນບັອດ)
                              </label>
                              <input
                                type="password"
                                value={telegramBotToken}
                                onChange={e => setTelegramBotToken(e.target.value)}
                                placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                                className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                              />
                              <p className="text-[10px] text-dark-text-muted mt-1 font-light italic">
                                ສ້າງບັອດຈາກ @BotFather ເພື່ອຮັບ Token ຂອງບັອດ.
                              </p>
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">
                                Telegram Chat ID (ໄອດີແຊັດ)
                              </label>
                              <input
                                type="text"
                                value={telegramChatId}
                                onChange={e => setTelegramChatId(e.target.value)}
                                placeholder="e.g. -100123456789 or 987654321"
                                className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                              />
                              <p className="text-[10px] text-dark-text-muted mt-1 font-light italic">
                                ໄອດີຂອງແຊັດສ່ວນຕົວ ຫຼື ກຸ່ມທີ່ຈະໃຫ້ແຈ້ງເຕືອນ (ສາມາດເອົາຈາກ @userinfobot).
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-start pt-2">
                            <button
                              type="button"
                              onClick={handleTestTelegramAlert}
                              disabled={isTestingTelegram || !telegramBotToken || !telegramChatId}
                              className="px-5 py-2.5 bg-gold/10 hover:bg-gold/25 border border-gold/30 text-gold text-xs uppercase tracking-widest rounded hover:scale-102 transition-all duration-200 cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isTestingTelegram ? 'ກຳລັງທົດສອບ...' : 'ທົດລອງສົ່ງຂໍ້ຄວາມ (Test Telegram Alert)'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-dark-border/40">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest rounded hover:scale-102 cursor-pointer transition-all"
                      >
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>

                {/* Package CRUD Form */}
                <div 
                  id="package-form" 
                  className={`p-6 rounded-lg transition-all duration-500 ${
                    editingPkgId 
                      ? 'bg-[#141417] border border-gold/40 shadow-lg shadow-gold/5' 
                      : 'bg-dark-card border border-dark-border'
                  }`}
                >
                  <h3 className="font-serif text-lg text-white font-medium mb-6 tracking-wider">
                    {editingPkgId ? 'Edit Package Tier' : 'Add New Pricing Package'}
                  </h3>
                  <form onSubmit={handleSavePackage} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Package Name</label>
                        <input
                          type="text"
                          value={pkgName}
                          onChange={e => setPkgName(e.target.value)}
                          required
                          placeholder="e.g. Gold Heritage Package"
                          className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Investment Price</label>
                        <input
                          type="text"
                          value={pkgPrice}
                          onChange={e => setPkgPrice(e.target.value)}
                          required
                          placeholder="e.g. $1,290"
                          className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Category / ໝວດໝູ່</label>
                        <select
                          value={pkgCategory}
                          onChange={e => setPkgCategory(e.target.value as 'main' | 'addon')}
                          className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                        >
                          <option value="main">Wedding Package (ແພັກເກດຖ່າຍຮູບຫຼັກ)</option>
                          <option value="addon">Photo Booth Add-on (ບໍລິການ Photo Booth ເສີມ)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Short Subtitle / Description</label>
                      <input
                        type="text"
                        value={pkgDesc}
                        onChange={e => setPkgDesc(e.target.value)}
                        placeholder="e.g. Full day coverage including reception"
                        className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">Package Features (One feature per line)</label>
                      <textarea
                        value={pkgFeatures}
                        onChange={e => setPkgFeatures(e.target.value)}
                        rows={4}
                        placeholder="8 Hours Shooting&#10;2 Photographers&#10;Bound Canvas Album"
                        className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pb-2">
                      <input
                        type="checkbox"
                        id="pkgPopular"
                        checked={pkgIsPopular}
                        onChange={e => setPkgIsPopular(e.target.checked)}
                        className="rounded accent-gold h-4 w-4 bg-[#050505] border-dark-border focus:ring-0"
                      />
                      <label htmlFor="pkgPopular" className="text-xs text-dark-text-muted select-none">
                        Highlight as "Most Selected" (Adds a gold glow and tag)
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      {editingPkgId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPkgId(null);
                            setPkgName('');
                            setPkgPrice('');
                            setPkgDesc('');
                            setPkgFeatures('');
                            setPkgIsPopular(false);
                            setPkgCategory('main');
                          }}
                          className="px-5 py-2.5 text-xs uppercase tracking-widest border border-white/10 hover:border-white/20 text-white rounded cursor-pointer transition-all"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest rounded hover:scale-102 cursor-pointer transition-all"
                      >
                        {editingPkgId ? 'Save Package' : 'Create Package'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Package tiers summary */}
                <div className="space-y-6">
                  <h3 className="font-serif text-lg text-white font-medium tracking-wider border-b border-dark-border pb-2">
                    Existing Package Tiers / ລາຍການແພັກເກດທັງໝົດ
                  </h3>
                  
                  <div className="space-y-8">
                    {/* Category 1: Wedding Packages */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold flex items-center justify-between bg-gold/5 px-4 py-2 border border-gold/15 rounded">
                        <span>Wedding Packages (ແພັກເກດຖ່າຍຮູບຫຼັກ)</span>
                        <span className="text-[10px] text-dark-text-muted font-mono bg-black/40 px-2 py-0.5 rounded">
                          {pricingPackages.filter(p => (p.category || 'main') === 'main').length} items
                        </span>
                      </h4>
                      <div className="space-y-3">
                        {pricingPackages.filter(p => (p.category || 'main') === 'main').map((pkg) => {
                          const sameCategory = pricingPackages.filter(p => (p.category || 'main') === 'main');
                          const pkgIndex = sameCategory.findIndex(p => p.id === pkg.id);
                          const isFirst = pkgIndex === 0;
                          const isLast = pkgIndex === sameCategory.length - 1;

                          return (
                            <div key={pkg.id} className="p-4 rounded-lg bg-dark-card border border-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <div>
                                <div className="flex items-center flex-wrap gap-2.5">
                                  <span className="font-serif text-base text-white font-semibold">{pkg.name}</span>
                                  <span className="text-xs text-gold font-mono">{pkg.price}</span>
                                  {pkg.isPopular && (
                                    <span className="px-2 py-0.5 text-[8px] bg-gold text-black rounded font-bold uppercase tracking-wider">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-dark-text-muted mt-1 font-light">{pkg.description}</p>
                              </div>
                              <div className="flex gap-2 items-center self-end sm:self-auto shrink-0">
                                {/* Order actions */}
                                <div className="flex gap-1 bg-black/40 border border-dark-border/40 p-0.5 rounded">
                                  <button
                                    type="button"
                                    onClick={() => handleMovePackage(pkg, 'up')}
                                    disabled={isFirst}
                                    className="p-1 text-dark-text-muted hover:text-white rounded disabled:opacity-25 hover:bg-gold/10 disabled:hover:bg-transparent transition-all cursor-pointer"
                                    title="Move Up"
                                  >
                                    <ChevronUp className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMovePackage(pkg, 'down')}
                                    disabled={isLast}
                                    className="p-1 text-dark-text-muted hover:text-white rounded disabled:opacity-25 hover:bg-gold/10 disabled:hover:bg-transparent transition-all cursor-pointer"
                                    title="Move Down"
                                  >
                                    <ChevronDown className="h-4 w-4" />
                                  </button>
                                </div>

                                <div className="h-6 w-[1px] bg-dark-border mx-1" />

                                <button
                                  type="button"
                                  onClick={() => handleEditPackage(pkg)}
                                  className="p-2 border border-white/10 hover:border-gold/30 text-dark-text-muted hover:text-white rounded transition-all cursor-pointer"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deletePackage(pkg.id)}
                                  className="p-2 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {pricingPackages.filter(p => (p.category || 'main') === 'main').length === 0 && (
                          <p className="text-xs text-dark-text-muted italic py-4 text-center border border-dashed border-dark-border/45 rounded">
                            No packages in this category.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category 2: Photo Booth Add-ons */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-semibold flex items-center justify-between bg-gold/5 px-4 py-2 border border-gold/15 rounded">
                        <span>Photo Booth Add-ons (ບໍລິການ Photo Booth ເສີມ)</span>
                        <span className="text-[10px] text-dark-text-muted font-mono bg-black/40 px-2 py-0.5 rounded">
                          {pricingPackages.filter(p => p.category === 'addon').length} items
                        </span>
                      </h4>
                      <div className="space-y-3">
                        {pricingPackages.filter(p => p.category === 'addon').map((pkg) => {
                          const sameCategory = pricingPackages.filter(p => p.category === 'addon');
                          const pkgIndex = sameCategory.findIndex(p => p.id === pkg.id);
                          const isFirst = pkgIndex === 0;
                          const isLast = pkgIndex === sameCategory.length - 1;

                          return (
                            <div key={pkg.id} className="p-4 rounded-lg bg-dark-card border border-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <div>
                                <div className="flex items-center flex-wrap gap-2.5">
                                  <span className="font-serif text-base text-white font-semibold">{pkg.name}</span>
                                  <span className="text-xs text-gold font-mono">{pkg.price}</span>
                                  {pkg.isPopular && (
                                    <span className="px-2 py-0.5 text-[8px] bg-gold text-black rounded font-bold uppercase tracking-wider">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-dark-text-muted mt-1 font-light">{pkg.description}</p>
                              </div>
                              <div className="flex gap-2 items-center self-end sm:self-auto shrink-0">
                                {/* Order actions */}
                                <div className="flex gap-1 bg-black/40 border border-dark-border/40 p-0.5 rounded">
                                  <button
                                    type="button"
                                    onClick={() => handleMovePackage(pkg, 'up')}
                                    disabled={isFirst}
                                    className="p-1 text-dark-text-muted hover:text-white rounded disabled:opacity-25 hover:bg-gold/10 disabled:hover:bg-transparent transition-all cursor-pointer"
                                    title="Move Up"
                                  >
                                    <ChevronUp className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMovePackage(pkg, 'down')}
                                    disabled={isLast}
                                    className="p-1 text-dark-text-muted hover:text-white rounded disabled:opacity-25 hover:bg-gold/10 disabled:hover:bg-transparent transition-all cursor-pointer"
                                    title="Move Down"
                                  >
                                    <ChevronDown className="h-4 w-4" />
                                  </button>
                                </div>

                                <div className="h-6 w-[1px] bg-dark-border mx-1" />

                                <button
                                  type="button"
                                  onClick={() => handleEditPackage(pkg)}
                                  className="p-2 border border-white/10 hover:border-gold/30 text-dark-text-muted hover:text-white rounded transition-all cursor-pointer"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deletePackage(pkg.id)}
                                  className="p-2 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {pricingPackages.filter(p => p.category === 'addon').length === 0 && (
                          <p className="text-xs text-dark-text-muted italic py-4 text-center border border-dashed border-dark-border/45 rounded">
                            No packages in this category.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BOOKINGS MANAGER */}
            {activeTab === 'bookings' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif text-lg text-white font-medium tracking-wider mb-2">
                  Client Shoot Bookings ({bookings.length})
                </h3>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-5 rounded-lg bg-dark-card border border-dark-border space-y-4">
                      
                      {/* Client info & status header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-dark-border/40">
                        <div className="flex items-center space-x-3">
                          <div className="p-2.5 rounded bg-black/40 border border-dark-border text-gold">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-serif text-base text-white font-semibold">{booking.clientName}</h4>
                            <div className="flex items-center space-x-2 text-[10px] text-dark-text-muted mt-0.5 uppercase tracking-wider">
                              <Calendar className="h-3.5 w-3.5 text-gold/60" />
                              <span>Date: {booking.bookingDate}</span>
                            </div>
                            {booking.packageName && (
                              <div className="text-[10px] text-gold font-medium mt-1 uppercase tracking-wider">
                                Package: {booking.packageName}
                              </div>
                            )}
                            {booking.customDetails && (
                              <div className="text-[10px] text-white/80 font-normal mt-1 max-w-md bg-black/30 border border-dark-border/40 p-2 rounded">
                                <strong>Details:</strong> <span className="italic">{booking.customDetails}</span>
                              </div>
                            )}
                            {booking.customBudget && (
                              <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                                <strong>Proposed Price:</strong> {booking.customBudget}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <span className={`px-3 py-1 text-[9px] uppercase tracking-wider rounded font-bold ${
                          booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse' :
                          booking.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-gold/10 text-gold border border-gold/20'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      {/* Contact fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center space-x-2.5 text-dark-text-muted">
                          <Phone className="h-4 w-4 text-gold/60" />
                          <span>Phone: <strong className="text-white">{booking.clientPhone}</strong></span>
                        </div>
                        {booking.clientEmail && (
                          <div className="flex items-center space-x-2.5 text-dark-text-muted">
                            <Mail className="h-4 w-4 text-gold/60" />
                            <span>Email: <strong className="text-white">{booking.clientEmail}</strong></span>
                          </div>
                        )}
                      </div>

                      {/* Booking management actions */}
                      <div className="flex justify-between items-center pt-3 border-t border-dark-border/40 text-[10px] tracking-widest uppercase text-dark-text-muted">
                        <span>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</span>
                        
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="flex items-center space-x-1.5 px-3 py-2 border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded transition-all cursor-pointer font-bold"
                              >
                                <Check className="h-3.5 w-3.5" />
                                <span>Confirm</span>
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="flex items-center space-x-1.5 px-3 py-2 border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all cursor-pointer font-bold"
                              >
                                <X className="h-3.5 w-3.5" />
                                <span>Cancel</span>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="p-2 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {bookings.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-dark-border rounded-lg">
                      <p className="text-dark-text-muted text-sm tracking-wide">
                        No bookings found. Dates will show up here when booked from the main site!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
