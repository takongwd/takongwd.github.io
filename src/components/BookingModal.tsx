import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import type { Booking } from '../context/AppDataContext';
import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../utils/translations';

export const BookingModal: React.FC = () => {
  const { bookings, addBooking, settings, language, pricingPackages } = useAppData();
  const t = translations[language];
  const [searchParams] = useSearchParams();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [validationError, setValidationError] = useState('');

  // Anti-spam / Bot prevention states
  const [honeypot, setHoneypot] = useState('');
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');

  // Custom Proposed Package states
  const [customDetails, setCustomDetails] = useState('');
  const [customBudget, setCustomBudget] = useState('');

  const generateCaptcha = React.useCallback(() => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1); // 1-9
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1); // 1-9
    setCaptchaInput('');
  }, []);

  React.useEffect(() => {
    generateCaptcha();
  }, [selectedDate, generateCaptcha]);

  React.useEffect(() => {
    const pkgId = searchParams.get('package');
    if (pkgId) {
      setSelectedPackageId(pkgId);
    }
  }, [searchParams]);

  const getOriginalPrice = (priceStr: string): string => {
    const digits = priceStr.replace(/[^0-9]/g, '');
    if (!digits) return '';
    const num = parseInt(digits, 10);
    const originalNum = Math.round(num * 1.3);
    const formatted = originalNum.toLocaleString('en-US');
    if (priceStr.toUpperCase().includes('THB')) {
      return `${formatted} THB`;
    } else if (priceStr.includes('$')) {
      return `$${formatted}`;
    } else {
      const suffix = priceStr.replace(/[0-9,\s]/g, '');
      return `${formatted} ${suffix}`.trim();
    }
  };

  // Helper: Get days of month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Bilingual calendar labels - short abbreviations to prevent text wrapping on mobile
  const weekdays = language === 'en' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['ອາ.', 'ຈ.', 'ອ.', 'ພ.', 'ພຫ.', 'ສ.', 'ສ.'];

  const monthNames = language === 'en'
    ? [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    : [
        'ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ',
        'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'
      ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Check if date is booked
  const isDateBooked = (dateStr: string) => {
    return bookings.some(b => b.bookingDate === dateStr && b.status !== 'cancelled');
  };

  const handleDateClick = (day: number) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    
    // Disable selecting past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(year, month, day);
    if (targetDate < today) return;

    if (isDateBooked(dateStr)) {
      setValidationError(language === 'en' ? 'This date has already been booked.' : 'ວັນທີນີ້ຖືກຈອງເຕັມແລ້ວ.');
      setSelectedDate('');
    } else {
      setSelectedDate(dateStr);
      setValidationError('');
      setBookingSuccess(null);
    }
  };
 
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 8) {
      setPhone(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      setValidationError(t.bookingNoDateSelected);
      return;
    }
    if (!selectedPackageId) {
      setValidationError(language === 'en' ? 'Please select a package.' : 'ກະລຸນາເລືອກແພັກເກດ.');
      return;
    }
    if (selectedPackageId === 'custom') {
      if (!customBudget.trim()) {
        setValidationError(language === 'en' ? 'Please specify your proposed budget.' : 'ກະລຸນາປ້ອນລາຄາ ຫຼື ງົບປະມານທີ່ສະເໜີ.');
        return;
      }
    }
    if (!name || !phone) {
      setValidationError(language === 'en' ? 'Please fill out all contact fields.' : 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ.');
      return;
    }
    if (phone.length !== 8) {
      setValidationError(language === 'en' ? 'Phone number must be exactly 8 digits.' : 'ເບີໂທລະສັບຕ້ອງມີ 8 ຕົວເລກ.');
      return;
    }

    // 1. Honeypot Validation (Spam bot trap)
    if (honeypot) {
      // Silently accept and pretend success to throw off spam bots
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setBookingSuccess({
          id: `b-mock-${Date.now()}`,
          clientName: name,
          clientEmail: '',
          clientPhone: `+856 20 ${phone.slice(0, 4)} ${phone.slice(4)}`,
          bookingDate: selectedDate,
          packageName: selectedPackageId === 'custom' 
            ? (language === 'en' ? 'Custom Proposed Package' : 'ສະເໜີແພັກເກດເອງ')
            : 'Custom Package',
          customDetails: selectedPackageId === 'custom' ? customDetails : undefined,
          customBudget: selectedPackageId === 'custom' ? customBudget : undefined,
          status: 'pending',
          createdAt: new Date().toISOString()
        });
        setName('');
        setPhone('');
        setSelectedDate('');
        setSelectedPackageId('');
        setCustomDetails('');
        setCustomBudget('');
      }, 1200);
      return;
    }

    // 2. Cooldown check (Rate limiting: 1 booking request per 60 seconds per browser session)
    const lastBooking = localStorage.getItem('last_booking_timestamp');
    const now = Date.now();
    if (lastBooking && now - parseInt(lastBooking, 10) < 60000) {
      const waitSec = Math.ceil((60000 - (now - parseInt(lastBooking, 10))) / 1000);
      setValidationError(
        language === 'en'
          ? `Please wait ${waitSec} seconds before submitting another booking request.`
          : `ກະລຸນາລໍຖ້າອີກ ${waitSec} ວິນາທີ ກ່ອນຈະທຳການຈອງອີກຄັ້ງ.`
      );
      return;
    }

    // 3. CAPTCHA verification (Basic math challenge)
    if (parseInt(captchaInput, 10) !== captchaNum1 + captchaNum2) {
      setValidationError(
        language === 'en'
          ? 'Verification answer is incorrect. Please try again.'
          : 'ຄຳຕອບຢືນຢັນຕົວຕົນບໍ່ຖືກຕ້ອງ. ກະລຸນາລອງໃໝ່.'
      );
      generateCaptcha();
      return;
    }
 
    setIsSubmitting(true);
    setValidationError('');
 
    try {
      const isCustom = selectedPackageId === 'custom';
      const chosenPkg = isCustom ? null : pricingPackages.find(p => p.id === selectedPackageId);
      const newBooking = await addBooking({
        clientName: name,
        clientEmail: '',
        clientPhone: `+856 20 ${phone.slice(0, 4)} ${phone.slice(4)}`, // formatted cleanly
        bookingDate: selectedDate,
        packageName: isCustom 
          ? (language === 'en' ? 'Custom Proposed Package' : 'ສະເໜີແພັກເກດເອງ')
          : (chosenPkg ? chosenPkg.name : 'Custom Package'),
        customDetails: customDetails.trim() ? customDetails : undefined,
        customBudget: isCustom ? customBudget : undefined
      });

      // Save submission timestamp to local storage to activate rate limiting
      localStorage.setItem('last_booking_timestamp', Date.now().toString());

      setBookingSuccess(newBooking);
      setName('');
      setPhone('');
      setSelectedDate('');
      setSelectedPackageId('');
      setCustomDetails('');
      setCustomBudget('');
    } catch (err) {
      setValidationError('Error processing booking.');
    } finally {
      setIsSubmitting(false);
      generateCaptcha();
    }
  };

  // Generate calendar days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-3"></div>);
  }
  for (let day = 1; day <= totalDays; day++) {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    const booked = isDateBooked(dateStr);
    
    const targetDate = new Date(year, month, day);
    const isPast = targetDate < today;
    const isSelected = selectedDate === dateStr;

    let dayClass = 'py-2.5 px-1 sm:p-3 text-center text-xs font-semibold rounded-lg cursor-pointer transition-all duration-200 ';
    if (isPast) {
      dayClass += 'text-white/20 cursor-not-allowed';
    } else if (booked) {
      dayClass += 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20';
    } else if (isSelected) {
      dayClass += 'bg-gold text-black shadow-lg shadow-gold/20 scale-105';
    } else {
      dayClass += 'hover:bg-gold/10 hover:text-gold text-white bg-dark-card border border-dark-border';
    }

    calendarDays.push(
      <button
        key={`day-${day}`}
        onClick={() => !isPast && handleDateClick(day)}
        disabled={isPast}
        type="button"
        className={dayClass}
      >
        <span className="block">{day}</span>
        {booked && !isPast && (
          <span className="w-1 h-1 bg-red-400 rounded-full mx-auto mt-0.5 block"></span>
        )}
      </button>
    );
  }

  return (
    <section id="booking" className="py-24 px-4 bg-[#050505] border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-medium block mb-3">
            {t.bookingSubtitle}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide">
            {t.bookingTitle}
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Calendar Area */}
          <div className="lg:col-span-7 glass-effect p-4 sm:p-8 rounded-lg shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-xl text-white font-medium tracking-wider">
                {monthNames[month]} {year}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 border border-white/10 hover:border-gold/50 rounded text-dark-text-muted hover:text-white transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 border border-white/10 hover:border-gold/50 rounded text-dark-text-muted hover:text-white transition-all cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-4">
              {weekdays.map(d => (
                <span key={d} className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider sm:tracking-widest text-gold opacity-80">
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays}
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-dark-border">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-dark-card border border-dark-border rounded"></span>
                <span className="text-[10px] uppercase tracking-wider text-dark-text-muted">{t.bookingAvailable}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-500/10 border border-red-500/25 rounded"></span>
                <span className="text-[10px] uppercase tracking-wider text-dark-text-muted">{t.bookingFull}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-gold rounded"></span>
                <span className="text-[10px] uppercase tracking-wider text-dark-text-muted">{t.bookingSelected}</span>
              </div>
            </div>
          </div>

          {/* Form and Payment Details Area */}
          <div className="lg:col-span-5">
            {bookingSuccess ? (
              // Success Screen with WhatsApp Contact Button!
              <div className="glass-effect p-8 rounded-lg border border-gold/30 text-center animate-fade-in space-y-6">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-gold" />
                </div>
                
                <div>
                  <h3 className="font-serif text-3xl text-white font-light mb-3">
                    {language === 'en' ? 'Booking Submitted!' : 'ສົ່ງຂໍ້ມູນການຈອງສຳເລັດ!'}
                  </h3>
                  <p className="text-sm text-dark-text-muted leading-relaxed max-w-md mx-auto">
                    {language === 'en' 
                      ? 'Your booking request is saved. Please tap the button below to contact our admin team on WhatsApp to finalize details and confirm your date.' 
                      : 'ລະບົບໄດ້ບັນທຶກຂໍ້ມູນການຈອງຂອງທ່ານແລ້ວ. ກະລຸນາກົດປຸ່ມດ້ານລຸ່ມເພື່ອຕິດຕໍ່ຫາແອັດມິນຜ່ານ WhatsApp ເພື່ອຢືນຢັນຄິວ ແລະ ມັດຈຳ.'}
                  </p>
                </div>

                {/* Booking summary card */}
                <div className="bg-[#050505] p-5 rounded-lg border border-dark-border text-left space-y-3 text-sm">
                  <div className="flex justify-between border-b border-dark-border/40 pb-2">
                    <span className="text-dark-text-muted">{language === 'en' ? 'Client Name' : 'ຊື່ລູກຄ້າ'}</span>
                    <span className="font-semibold text-white">{bookingSuccess.clientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-dark-border/40 pb-2">
                    <span className="text-dark-text-muted">{language === 'en' ? 'Date Reserved' : 'ວັນທີຈອງ'}</span>
                    <span className="font-semibold text-gold font-mono">{bookingSuccess.bookingDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-dark-border/40 pb-2">
                    <span className="text-dark-text-muted">{language === 'en' ? 'Selected Package' : 'ແພັກເກດທີ່ເລືອກ'}</span>
                    <span className="font-semibold text-white text-right max-w-[180px] truncate">{bookingSuccess.packageName || 'Not Specified'}</span>
                  </div>
                  {bookingSuccess.customDetails && (
                    <div className="flex flex-col border-b border-dark-border/40 pb-2 text-xs space-y-1">
                      <span className="text-dark-text-muted">{language === 'en' ? 'Proposed Details' : 'ລາຍລະອຽດທີ່ສະເໜີ'}</span>
                      <span className="font-semibold text-white italic bg-[#0d0d0f] p-2 border border-dark-border rounded">{bookingSuccess.customDetails}</span>
                    </div>
                  )}
                  {bookingSuccess.customBudget && (
                    <div className="flex justify-between border-b border-dark-border/40 pb-2 text-xs">
                      <span className="text-dark-text-muted">{language === 'en' ? 'Proposed Budget' : 'ງົບປະມານສະເໜີ'}</span>
                      <span className="font-semibold text-emerald-400 font-mono">{bookingSuccess.customBudget}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 text-xs">
                    <span className="text-dark-text-muted">{language === 'en' ? 'Contact Phone' : 'ເບີໂທລະສັບ'}</span>
                    <span className="font-semibold text-white font-mono">{bookingSuccess.clientPhone}</span>
                  </div>
                </div>

                {/* WhatsApp & Facebook Page Confirmation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      language === 'en'
                        ? `Hi! I have booked a shoot on the Takong Wedding website.\n\n👤 Name: ${bookingSuccess.clientName}\n📅 Booking Date: ${bookingSuccess.bookingDate}\n📦 Selected Package: ${bookingSuccess.packageName || 'Custom Package'}${bookingSuccess.customDetails ? `\n📝 Details: ${bookingSuccess.customDetails}` : ''}${bookingSuccess.customBudget ? `\n💰 Budget: ${bookingSuccess.customBudget}` : ''}\n📞 Phone: ${bookingSuccess.clientPhone}\n\nPlease confirm my booking. Thank you!`
                        : `ສະບາຍດີ! ຂ້ອຍໄດ້ກົດຈອງວັນຖ່າຍຮູບຜ່ານເວັບໄຊ້ Takong Wedding ແລ້ວ.\n\n👤 ຊື່ລູກຄ້າ: ${bookingSuccess.clientName}\n📅 ວັນທີຈອງ: ${bookingSuccess.bookingDate}\n📦 ແພັກເກດທີ່ເລືອກ: ${bookingSuccess.packageName || 'ແພັກເກດກຳນົດເອງ'}${bookingSuccess.customDetails ? `\n📝 ລາຍລະອຽດ: ${bookingSuccess.customDetails}` : ''}${bookingSuccess.customBudget ? `\n💰 ງົບປະມານ: ${bookingSuccess.customBudget}` : ''}\n📞 ເບີໂທ: ${bookingSuccess.clientPhone}\n\nກະລຸນາກວດສອບ ແລະ ຢືນຢັນຄິວໃຫ້ແນ່. ຂອບໃຈ!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded shadow-lg shadow-emerald-600/20 hover:scale-102 transition-all duration-300 cursor-pointer"
                  >
                    <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.601 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
                    <span>{language === 'en' ? 'Confirm WhatsApp' : 'ຢືນຢັນ WhatsApp'}</span>
                  </a>
                  
                  <a
                    href={settings.facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 flex-1 py-4 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded shadow-lg shadow-blue-600/20 hover:scale-102 transition-all duration-300 cursor-pointer"
                  >
                    <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span>{language === 'en' ? 'Visit Facebook' : 'ເບິ່ງ Facebook'}</span>
                  </a>
                </div>

                {/* Reset button to let them book again */}
                <button
                  onClick={() => setBookingSuccess(null)}
                  className="text-xs uppercase tracking-widest text-dark-text-muted hover:text-white transition-colors block mx-auto py-1"
                >
                  &larr; {language === 'en' ? 'Back to Calendar' : 'ກັບຄືນໜ້າປະຕິທິນ'}
                </button>
              </div>
            ) : (
              // Standard Booking Form
              <div className="glass-effect p-6 sm:p-8 rounded-lg shadow-2xl border border-dark-border">
                <h3 className="font-serif text-2xl text-white font-light mb-6 tracking-wide">
                  {t.bookingDetailsTitle}
                </h3>

                {selectedDate ? (
                  <div className="mb-6 bg-gold/5 border border-gold/20 p-4.5 rounded-lg flex items-center space-x-3.5">
                    <CalendarIcon className="h-6 w-6 text-gold" />
                    <div>
                      <span className="text-xs text-dark-text-muted uppercase tracking-widest block font-semibold">{t.bookingSelectedDate}</span>
                      <span className="text-base font-bold text-gold">{selectedDate}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 bg-white/5 p-4.5 rounded-lg flex items-center space-x-3.5 border border-dashed border-dark-border">
                    <CalendarIcon className="h-6 w-6 text-dark-text-muted" />
                    <span className="text-sm text-dark-text-muted font-medium">
                      {t.bookingNoDateSelected}
                    </span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-dark-text-muted font-bold mb-2.5">
                      {language === 'en' ? 'Select Package / Service' : 'ເລືອກແພັກເກດ / ບໍລິການ'}
                    </label>
                    <select
                      value={selectedPackageId}
                      onChange={e => setSelectedPackageId(e.target.value)}
                      required
                      className="w-full bg-[#050505] border border-dark-border hover:border-gold/30 focus:border-gold focus:outline-none rounded px-4.5 py-3.5 text-sm tracking-wider transition-all text-white"
                    >
                      <option value="" className="bg-[#0d0d0f]">{language === 'en' ? '-- Choose a package --' : '-- ກະລຸນາເລືອກແພັກເກດ --'}</option>
                      {pricingPackages.map(pkg => {
                        const original = getOriginalPrice(pkg.price);
                        const priceText = original ? `${original} ➔ ${pkg.price}` : pkg.price;
                        return (
                          <option key={pkg.id} value={pkg.id} className="bg-[#0d0d0f]">
                            {pkg.name} ({priceText})
                          </option>
                        );
                      })}
                      <option value="custom" className="bg-[#0d0d0f] text-gold font-bold">
                        {language === 'en' ? '★ Propose Custom Package / Budget' : '★ ສະເໜີແພັກເກດເອງ / ງົບປະມານຂອງທ່ານ'}
                      </option>
                    </select>

                    {/* Display Custom Proposed Package Forms */}
                    {selectedPackageId === 'custom' && (
                      <div className="mt-3.5 bg-[#0d0d0f] border border-gold/15 p-4.5 rounded text-xs sm:text-sm space-y-3.5 animate-fade-in text-left">
                        <div className="border-b border-white/5 pb-2">
                          <span className="font-semibold text-gold tracking-wide uppercase text-xs sm:text-sm">
                            {language === 'en' ? 'Custom Proposed Package' : 'ສະເໜີແພັກເກດເອງ'}
                          </span>
                        </div>
                        
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">
                            {language === 'en' ? 'What events do you want to shoot? (e.g. Birthday party, Graduation)' : 'ງານທີ່ຕ້ອງການໃຫ້ຖ່າຍ (ຕົວຢ່າງ: ຖ່າຍງານວັນເກີດ, ງານຮັບໃບປະລິຍາ, ງານລ້ຽງ)'}
                          </label>
                          <textarea
                            value={customDetails}
                            onChange={e => setCustomDetails(e.target.value)}
                            required
                            rows={3}
                            placeholder={language === 'en' 
                              ? "Describe your custom event details, hours needed, photo style..." 
                              : "ຕົວຢ່າງ: ຖ່າຍງານວັນເກີດ, ງານຮັບໃບປະລິຍາ, ງານລ້ຽງບໍລິສັດ. ບອກລາຍລະອຽດ, ຈຳນວນຊົ່ວໂມງ ຫຼື ສິ່ງທີ່ຕ້ອງການ..."}
                            className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-dark-text-muted font-bold mb-2">
                            {language === 'en' ? 'Proposed Budget / Price' : 'ງົບປະມານ / ລາຄາທີ່ເຈົ້າສະເໜີມາ'}
                          </label>
                          <input
                            type="text"
                            value={customBudget}
                            onChange={e => setCustomBudget(e.target.value)}
                            required
                            placeholder={language === 'en' ? "e.g. 5,000 THB or 4,000,000 LAK" : "ຕົວຢ່າງ: 5,000 THB ຫຼື 4,000,000 ກີບ"}
                            className="w-full bg-[#050505] border border-dark-border focus:border-gold focus:outline-none rounded px-4 py-2.5 text-xs tracking-wider transition-all text-white font-mono"
                          />
                        </div>
                      </div>
                    )}

                    {/* Display Package Details */}
                    {selectedPackageId && pricingPackages.find(p => p.id === selectedPackageId) && (() => {
                      const pkg = pricingPackages.find(p => p.id === selectedPackageId)!;
                      return (
                        <div className="mt-3.5 bg-[#0d0d0f] border border-gold/15 p-4.5 rounded text-xs sm:text-sm space-y-2.5 animate-fade-in text-left">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-semibold text-gold tracking-wide uppercase text-xs sm:text-sm">{pkg.name}</span>
                            <div className="flex items-center space-x-2.5">
                              {getOriginalPrice(pkg.price) && (
                                <span className="text-white/30 line-through text-[11px] sm:text-xs font-normal">
                                  {getOriginalPrice(pkg.price)}
                                </span>
                              )}
                              <span className="text-white font-bold whitespace-nowrap ml-2">{pkg.price}</span>
                            </div>
                          </div>
                          {pkg.description && (
                            <p className="text-dark-text-muted italic text-[11px] sm:text-xs">{pkg.description}</p>
                          )}
                          <ul className="space-y-1.5 pt-1">
                            {pkg.features.slice(0, 4).map((feat, i) => (
                              <li key={i} className="flex items-start text-white/90">
                                <span className="text-gold mr-2 shrink-0">✓</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                            {pkg.features.length > 4 && (
                              <li className="text-[11px] sm:text-xs text-dark-text-muted italic pl-4.5">
                                + {pkg.features.length - 4} {language === 'en' ? 'more features' : 'ລາຍລະອຽດເພີ່ມເຕີມ'}
                              </li>
                            )}
                          </ul>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Event Details — visible for ALL booking types */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-dark-text-muted font-bold mb-2.5">
                      {language === 'en' ? 'Event Details (Optional)' : 'ລາຍລະອຽດງານ (ເພີ່ມເຕີມ)'}
                    </label>
                    <p className="text-[10px] text-dark-text-muted mb-2 leading-relaxed">
                      {language === 'en'
                        ? 'e.g. Event time · Morning venue (ceremony location / home address) · Evening venue (reception hall / hotel name) · Other special requests'
                        : 'ຕົວຢ່າງ: ເວລາງານ · ສະຖານທີ່ຕອນເຊົ້າ (ສະຖານທີ່ພິທີ / ທີ່ຢູ່ບ້ານ) · ສະຖານທີ່ຕອນແລງ (ຫ້ອງຮັບແຂກ / ຊື່ໂຮງແຮມ) · ສິ່ງທີ່ຕ້ອງການເພີ່ມເຕີມ'}
                    </p>
                    <textarea
                      value={customDetails}
                      onChange={e => setCustomDetails(e.target.value)}
                      rows={4}
                      placeholder={language === 'en'
                        ? 'e.g.\nTime: 08:00 AM ceremony · 18:00 reception\nMorning: Bride\'s home, Ban Phonsavan, Vientiane\nEvening: Lao Plaza Hotel, Vientiane\nOther: Need outdoor shots at sunset...'
                        : 'ຕົວຢ່າງ:\nເວລາ: ພິທີ 08:00 ເຊົ້າ · ງານລ້ຽງ 18:00 ແລງ\nຕອນເຊົ້າ: ບ້ານເຈົ້າສາວ, ບ້ານໂພນສະຫວັນ, ວຽງຈັນ\nຕອນແລງ: ໂຮງແຮມລາວພລາຊ່າ, ວຽງຈັນ\nອື່ນໆ: ຕ້ອງການຖ່າຍນອກສະຖານທີ່ຕອນທ່ຽງ...'}
                      className="w-full bg-[#050505] border border-dark-border hover:border-gold/30 focus:border-gold focus:outline-none rounded px-4.5 py-3 text-sm tracking-wider transition-all text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-dark-text-muted font-bold mb-2.5">
                      {t.bookingNameLabel}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      placeholder={t.bookingNamePlaceholder}
                      className="w-full bg-[#050505] border border-dark-border hover:border-gold/30 focus:border-gold focus:outline-none rounded px-4.5 py-3.5 text-sm tracking-wider transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-dark-text-muted font-bold mb-2.5">
                      {t.bookingPhoneLabel}
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4.5 text-sm font-semibold text-white/50 select-none font-mono">
                        +856 20
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                        placeholder="XXXXXXXX"
                        className="w-full bg-[#050505] border border-dark-border hover:border-gold/30 focus:border-gold focus:outline-none rounded pl-24 pr-4.5 py-3.5 text-sm tracking-widest font-mono transition-all text-white"
                      />
                    </div>
                    <p className="text-[10px] text-dark-text-muted mt-1.5 font-light italic">
                      {language === 'en' ? 'Enter exactly 8 digits of your mobile number.' : 'ກະລຸນາປ້ອນຕົວເລກເບີໂທລະສັບຂອງທ່ານໃຫ້ຄົບ 8 ຕົວເລກ.'}
                    </p>
                  </div>

                  {/* Honeypot Field (invisible bot trap) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url_field"
                      value={honeypot}
                      onChange={e => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Math CAPTCHA Code verification */}
                  {selectedDate && (
                    <div className="bg-gold/5 border border-gold/15 p-4.5 rounded-lg space-y-3 animate-fade-in text-left">
                      <label className="block text-xs uppercase tracking-widest text-dark-text-muted font-bold">
                        {language === 'en' ? 'Bot Verification' : 'ຢືນຢັນຕົວຕົນ (ປ້ອງກັນບັອດ)'}
                      </label>
                      <div className="flex items-center gap-3.5">
                        <span className="text-sm font-bold font-mono text-gold bg-[#050505] border border-dark-border px-4 py-3 rounded shrink-0 select-none">
                          {captchaNum1} + {captchaNum2} =
                        </span>
                        <input
                          type="number"
                          value={captchaInput}
                          onChange={e => setCaptchaInput(e.target.value)}
                          required
                          placeholder="?"
                          className="w-full bg-[#050505] border border-dark-border hover:border-gold/30 focus:border-gold focus:outline-none rounded px-4.5 py-3 text-sm font-mono text-white text-center"
                        />
                      </div>
                      <p className="text-[10px] text-dark-text-muted font-light italic">
                        {language === 'en' ? 'Please solve this simple math to confirm you are human.' : 'ກະລຸນາຕອບຄຳຖາມຄະນິດສາດນີ້ ເພື່ອຢືນຢັນວ່າທ່ານບໍ່ແມ່ນບັອດ.'}
                      </p>
                    </div>
                  )}
 
                  {validationError && (
                    <p className="text-sm text-red-400 font-semibold bg-red-950/20 border border-red-500/20 p-4 rounded text-left">
                      {validationError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 text-sm font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 bg-gold-gradient text-black hover:scale-102 cursor-pointer shadow-lg shadow-gold/15 disabled:bg-dark-border disabled:text-dark-text-muted disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t.bookingProcessing : t.bookingSubmit}
                  </button>

                  {/* Social Inquiry Buttons (WhatsApp & Facebook Page) */}
                  <div className="text-center mt-7 pt-6 border-t border-dark-border/40">
                    <span className="text-xs uppercase tracking-widest text-dark-text-muted block mb-3.5 font-bold">
                      {language === 'en' ? 'Have questions? Contact our team' : 'ຫຼື ຕ້ອງການສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ?'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* WhatsApp Button */}
                      <a
                        href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          language === 'en' 
                            ? `Hi! I would like to inquire about booking a shooting date on the Takong Wedding website.`
                            : `ສະບາຍດີ! ຂ້ອຍຢາກສອບຖາມຂໍ້ມູນເພີ່ມເຕີມກ່ຽວກັບການຈອງວັນຖ່າຍຮູບ.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-4 py-3.5 text-xs font-bold uppercase tracking-widest border border-gold/30 text-gold hover:bg-gold/5 transition-all duration-300 rounded cursor-pointer"
                      >
                        <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.601 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
                        <span>WhatsApp</span>
                      </a>

                      {/* Facebook Button */}
                      <a
                        href={settings.facebookPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-4 py-3.5 text-xs font-bold uppercase tracking-widest border border-gold/30 text-gold hover:bg-gold/5 transition-all duration-300 rounded cursor-pointer"
                      >
                        <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        <span>Facebook Page</span>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
