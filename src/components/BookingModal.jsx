import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { locations } from '../data/locations';
import { cars } from '../data/cars';
import { 
  X, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft,
  Download,
  CheckCircle2
} from 'lucide-react';

export default function BookingModal() {
  const { 
    isBookingOpen, 
    closeBookingModal, 
    activeBookingCar, 
    t, 
    lang, 
    formatPrice, 
    searchFilters,
    addBooking
  } = useApp();

  // Wizard active step (1 to 4, step 5 is voucher success)
  const [step, setStep] = useState(1);

  // Selected car (defaults to activeBookingCar or first car)
  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);

  const effectiveCarId = activeBookingCar ? activeBookingCar.id : selectedCarId;
  const car = cars.find(c => c.id === effectiveCarId) || cars[0];

  // Step 1: Trip route & dates
  const [pickupHub, setPickupHub] = useState(searchFilters.pickupLocation || 'tas-airport');
  const [returnHub, setReturnHub] = useState(searchFilters.dropoffLocation || 'tas-airport');
  const [pickupDate, setPickupDate] = useState(searchFilters.pickupDate || '2026-10-02');
  const [returnDate, setReturnDate] = useState(searchFilters.returnDate || '2026-10-05');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnTime, setReturnTime] = useState('10:00');

  // Step 2: Protection plan & Addons
  const [protection, setProtection] = useState('premium'); // 'basic' | 'premium' | 'vip'
  const [addons, setAddons] = useState({
    driver: false,      // $60 / day
    childSeat: false,   // $10 / day
    unlimitedKm: false, // $35 / day
    airportMeet: false, // $25 flat
    starlinkWifi: false // $12 / day
  });

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  // Step 3: Driver details
  const [driverInfo, setDriverInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    driverLicense: '',
    passportNumber: '',
    flightNumber: '',
    notes: '',
    agreedTerms: true
  });

  // Step 4: Payment method
  const [paymentMethod, setPaymentMethod] = useState('payme'); // 'payme' | 'card' | 'cash'

  // Confirmed voucher result
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calculate rental duration in days
  const calculateDays = () => {
    const start = new Date(pickupDate).getTime();
    const end = new Date(returnDate).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 1;
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff);
  };

  const days = calculateDays();

  // Price calculations in USD
  const baseRate = car.pricePerDay * days;
  
  let protectionDailyRate = 0;
  if (protection === 'premium') protectionDailyRate = 35;
  if (protection === 'vip') protectionDailyRate = 70;
  const protectionTotal = protectionDailyRate * days;

  let addonsTotal = 0;
  if (addons.driver) addonsTotal += 60 * days;
  if (addons.childSeat) addonsTotal += 10 * days;
  if (addons.unlimitedKm) addonsTotal += 35 * days;
  if (addons.airportMeet) addonsTotal += 25;
  if (addons.starlinkWifi) addonsTotal += 12 * days;

  const subtotal = baseRate + protectionTotal + addonsTotal;
  const discountAmount = promoApplied ? subtotal * 0.10 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'DRIVEUZ10') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!driverInfo.fullName || !driverInfo.phone) {
      alert('Iltimos, ism va telefon raqamingizni kiriting.');
      setStep(3);
      return;
    }

    const voucherReference = `DRIVE-UZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      voucherId: voucherReference,
      createdAt: new Date().toISOString(),
      car: {
        id: car.id,
        name: car.name,
        brand: car.brand,
        image: car.images[0]
      },
      trip: {
        pickupHub,
        returnHub,
        pickupDate,
        returnDate,
        pickupTime,
        returnTime,
        days
      },
      protection,
      addons,
      pricing: {
        baseRate,
        protectionTotal,
        addonsTotal,
        discountAmount,
        grandTotal
      },
      driverInfo,
      paymentMethod
    };

    addBooking(newBooking);
    setConfirmedBooking(newBooking);
    setStep(5); // Success voucher screen
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    closeBookingModal();
  };

  if (!isBookingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#121214] border border-zinc-800 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-[#18181b]/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {t.bookingModal.title}
              </h2>
              <span className="text-xs text-zinc-400">
                {car.brand} {car.name}
              </span>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Indicator Bar (only for steps 1-4) */}
        {step <= 4 && (
          <div className="px-6 pt-5 pb-3 border-b border-zinc-800/80 bg-[#141416]">
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: 1, label: t.bookingModal.step1 },
                { num: 2, label: t.bookingModal.step2 },
                { num: 3, label: t.bookingModal.step3 },
                { num: 4, label: t.bookingModal.step4 }
              ].map(s => (
                <div key={s.num} className="flex flex-col gap-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= s.num ? 'bg-blue-600' : 'bg-zinc-800'
                  }`} />
                  <span className={`text-[10px] sm:text-xs truncate font-medium ${
                    step === s.num ? 'text-blue-400 font-bold' : step > s.num ? 'text-zinc-300' : 'text-zinc-500'
                  }`}>
                    {s.num}. {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Body Container */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">

          {/* STEP 1: ROUTE & DATES */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Car Selection Dropdown / Selector */}
              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-2">
                  Tanlangan Avtomobil
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#18181b] border border-zinc-800">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{car.name}</div>
                    <div className="text-xs font-mono text-blue-400">{formatPrice(car.pricePerDay)} / kun</div>
                  </div>
                  <select
                    value={effectiveCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    {cars.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pickup & Dropoff Hubs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t.bookingModal.pickupInfo}</span>
                  </label>
                  <select
                    value={pickupHub}
                    onChange={(e) => setPickupHub(e.target.value)}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name[lang] || loc.name.uz}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t.bookingModal.returnInfo}</span>
                  </label>
                  <select
                    value={returnHub}
                    onChange={(e) => setReturnHub(e.target.value)}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name[lang] || loc.name.uz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800 space-y-2">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Olish Sanasi va Vaqti</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800 space-y-2">
                  <div className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Qaytarish Sanasi va Vaqti</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Duration Summary Banner */}
              <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-between">
                <span className="text-xs text-blue-300">Ijara muddati:</span>
                <span className="text-sm font-mono font-bold text-white">
                  {days} {t.calculator.days}
                </span>
              </div>

            </div>
          )}

          {/* STEP 2: PROTECTION & ADD-ONS */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Protection Packages */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                  {t.calculator.protectionPlan}
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Basic */}
                  <div 
                    onClick={() => setProtection('basic')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      protection === 'basic' 
                        ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-600/20' 
                        : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">
                        {t.calculator.protectionPlans.basic.name}
                      </span>
                      {protection === 'basic' && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mb-3">
                      {t.calculator.protectionPlans.basic.desc}
                    </p>
                    <div className="text-xs font-mono font-bold text-zinc-300">
                      Bepul (Kiritilgan)
                    </div>
                  </div>

                  {/* Premium Kasko */}
                  <div 
                    onClick={() => setProtection('premium')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                      protection === 'premium' 
                        ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-600/20' 
                        : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-blue-600 text-[9px] font-bold text-white uppercase tracking-wider">
                      Tavsiya
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">
                        {t.calculator.protectionPlans.premium.name}
                      </span>
                      {protection === 'premium' && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mb-3">
                      {t.calculator.protectionPlans.premium.desc}
                    </p>
                    <div className="text-xs font-mono font-bold text-blue-400">
                      +{formatPrice(35)} / kun
                    </div>
                  </div>

                  {/* VIP Zero Deposit */}
                  <div 
                    onClick={() => setProtection('vip')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      protection === 'vip' 
                        ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-600/20' 
                        : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">
                        {t.calculator.protectionPlans.vip.name}
                      </span>
                      {protection === 'vip' && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mb-3">
                      {t.calculator.protectionPlans.vip.desc}
                    </p>
                    <div className="text-xs font-mono font-bold text-blue-400">
                      +{formatPrice(70)} / kun
                    </div>
                  </div>

                </div>
              </div>

              {/* Add-ons Checklist */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                  {t.calculator.addons}
                </label>

                <div className="space-y-2.5">
                  
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.driver}
                        onChange={(e) => setAddons(prev => ({ ...prev, driver: e.target.checked }))}
                        className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-zinc-200">
                        {t.calculator.addonsList.driver}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      +{formatPrice(60 * days)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.childSeat}
                        onChange={(e) => setAddons(prev => ({ ...prev, childSeat: e.target.checked }))}
                        className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-zinc-200">
                        {t.calculator.addonsList.childSeat}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      +{formatPrice(10 * days)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.unlimitedKm}
                        onChange={(e) => setAddons(prev => ({ ...prev, unlimitedKm: e.target.checked }))}
                        className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-zinc-200">
                        {t.calculator.addonsList.unlimitedKm}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      +{formatPrice(35 * days)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.airportMeet}
                        onChange={(e) => setAddons(prev => ({ ...prev, airportMeet: e.target.checked }))}
                        className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-zinc-200">
                        {t.calculator.addonsList.airportMeet}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      +{formatPrice(25)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#18181b] border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.starlinkWifi}
                        onChange={(e) => setAddons(prev => ({ ...prev, starlinkWifi: e.target.checked }))}
                        className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-zinc-200">
                        {t.calculator.addonsList.starlinkWifi}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      +{formatPrice(12 * days)}
                    </span>
                  </label>

                </div>
              </div>

            </div>
          )}

          {/* STEP 3: DRIVER PROFILE */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1">
                    {t.bookingModal.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={driverInfo.fullName}
                    onChange={(e) => setDriverInfo({ ...driverInfo, fullName: e.target.value })}
                    placeholder={t.bookingModal.fullNamePlaceholder}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1">
                    {t.bookingModal.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={driverInfo.phone}
                    onChange={(e) => setDriverInfo({ ...driverInfo, phone: e.target.value })}
                    placeholder={t.bookingModal.phonePlaceholder}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1">
                    {t.bookingModal.email}
                  </label>
                  <input
                    type="email"
                    value={driverInfo.email}
                    onChange={(e) => setDriverInfo({ ...driverInfo, email: e.target.value })}
                    placeholder={t.bookingModal.emailPlaceholder}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1">
                    {t.bookingModal.driverLicense}
                  </label>
                  <input
                    type="text"
                    value={driverInfo.driverLicense}
                    onChange={(e) => setDriverInfo({ ...driverInfo, driverLicense: e.target.value })}
                    placeholder={t.bookingModal.driverLicensePlaceholder}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1">
                    {t.bookingModal.passportNumber}
                  </label>
                  <input
                    type="text"
                    value={driverInfo.passportNumber}
                    onChange={(e) => setDriverInfo({ ...driverInfo, passportNumber: e.target.value })}
                    placeholder={t.bookingModal.passportPlaceholder}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1">
                    {t.bookingModal.flightNumber}
                  </label>
                  <input
                    type="text"
                    value={driverInfo.flightNumber}
                    onChange={(e) => setDriverInfo({ ...driverInfo, flightNumber: e.target.value })}
                    placeholder="HY 272 (Ixtiyoriy)"
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">
                  {t.bookingModal.specialNotes}
                </label>
                <textarea
                  rows="2"
                  value={driverInfo.notes}
                  onChange={(e) => setDriverInfo({ ...driverInfo, notes: e.target.value })}
                  placeholder={t.bookingModal.specialNotesPlaceholder}
                  className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={driverInfo.agreedTerms}
                  onChange={(e) => setDriverInfo({ ...driverInfo, agreedTerms: e.target.checked })}
                  className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span>{t.bookingModal.agreementText}</span>
              </label>

            </div>
          )}

          {/* STEP 4: PAYMENT & CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                  {t.bookingModal.paymentMethod}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <div
                    onClick={() => setPaymentMethod('payme')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'payme'
                        ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-600/20'
                        : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <CreditCard className="w-4 h-4 text-blue-400" />
                      {paymentMethod === 'payme' && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="text-xs font-bold text-white">Payme / Click / Uzum</div>
                    <div className="text-[10px] text-zinc-400">Milliy Humo va UzCard</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-600/20'
                        : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <CreditCard className="w-4 h-4 text-blue-400" />
                      {paymentMethod === 'card' && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="text-xs font-bold text-white">Visa / Mastercard</div>
                    <div className="text-[10px] text-zinc-400">Xalqaro to'lov kartalari</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-600/20'
                        : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      {paymentMethod === 'cash' && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="text-xs font-bold text-white">Naqd to'lov</div>
                    <div className="text-[10px] text-zinc-400">Avtomobilni qabul qilganda</div>
                  </div>

                </div>
              </div>

              {/* Promo code input */}
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800 flex items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t.calculator.promoPlaceholder}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-blue-500 flex-1"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
                >
                  {t.calculator.applyPromo}
                </button>
              </div>

              {promoApplied && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.calculator.promoSuccess}</span>
                </div>
              )}
              {promoError && (
                <div className="text-xs text-rose-400">
                  {t.calculator.promoError}
                </div>
              )}

              {/* Live Price Breakdown Summary Box */}
              <div className="p-4 rounded-2xl bg-[#18181b] border border-zinc-800 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  {t.calculator.summaryTitle}
                </div>

                <div className="flex justify-between text-xs text-zinc-300">
                  <span>{t.calculator.baseRate} ({days} kun):</span>
                  <span className="font-mono">{formatPrice(baseRate)}</span>
                </div>

                {protectionTotal > 0 && (
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>{t.calculator.insuranceRate}:</span>
                    <span className="font-mono">+{formatPrice(protectionTotal)}</span>
                  </div>
                )}

                {addonsTotal > 0 && (
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>{t.calculator.addonsRate}:</span>
                    <span className="font-mono">+{formatPrice(addonsTotal)}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                    <span>{t.calculator.discount} (10%):</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">{t.calculator.totalPrice}:</span>
                  <span className="text-2xl font-black font-mono text-white">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: SUCCESS & OFFICIAL VOUCHER */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {t.bookingModal.successTitle}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2">
                  {t.bookingModal.successMessage}
                </p>
              </div>

              {/* Digital Rental Voucher Card */}
              <div className="p-5 rounded-2xl bg-[#18181b] border border-zinc-700/80 text-left max-w-lg mx-auto shadow-2xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold font-mono text-white">DRIVE.UZ</span>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">VIP VOUCHER</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {confirmedBooking.voucherId}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Mijoz:</span>
                    <span className="font-bold text-white">{confirmedBooking.driverInfo.fullName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Telefon:</span>
                    <span className="font-mono text-white">{confirmedBooking.driverInfo.phone}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Avtomobil:</span>
                    <span className="font-bold text-blue-400">{confirmedBooking.car.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Ijara muddati:</span>
                    <span className="font-mono text-white">{confirmedBooking.trip.days} kun</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Olish sanasi:</span>
                    <span className="font-mono text-white">{confirmedBooking.trip.pickupDate} ({confirmedBooking.trip.pickupTime})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Jami summa:</span>
                    <span className="font-mono font-bold text-white">{formatPrice(confirmedBooking.pricing.grandTotal)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>To'lov usuli: {paymentMethod.toUpperCase()}</span>
                  <span className="text-emerald-400 font-medium">Holati: Tasdiqlangan</span>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.bookingModal.downloadVoucher}</span>
                </button>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  {t.bookingModal.closeModal}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Wizard Footer Navigation Controls (steps 1-4) */}
        {step <= 4 && (
          <div className="p-5 border-t border-zinc-800 bg-[#18181b] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-800 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.bookingModal.backBtn}</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.bookingModal.nextBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.bookingModal.confirmBtn}</span>
              </button>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
