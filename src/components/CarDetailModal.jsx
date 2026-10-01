import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Check, 
  Gauge, 
  Zap, 
  Users, 
  Fuel, 
  ArrowRight,
  Heart,
  Sparkles,
  Info
} from 'lucide-react';

export default function CarDetailModal() {
  const { 
    isDetailOpen, 
    closeDetailModal, 
    activeDetailCar: car, 
    t, 
    lang, 
    formatPrice, 
    isFavorite, 
    toggleFavorite,
    openBookingModal
  } = useApp();

  const [activePhoto, setActivePhoto] = useState(0);

  if (!isDetailOpen || !car) return null;

  const images = car.images && car.images.length > 0 ? car.images : [
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85"
  ];

  const handleStartBooking = () => {
    closeDetailModal();
    openBookingModal(car);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Card Window */}
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-[#121214] border border-zinc-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-[#18181b]/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
              {car.brand}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {car.name} ({car.modelYear})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(car.id)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-rose-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFavorite(car.id) ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={closeDetailModal}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Main Gallery Display */}
          <div className="space-y-3">
            <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-zinc-950 relative border border-zinc-800/80">
              <img
                src={images[activePhoto] || images[0]}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-mono text-white border border-white/10">
                {activePhoto + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`h-16 w-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activePhoto === idx ? 'border-blue-500 scale-95' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {car.description[lang] || car.description.uz}
            </p>
          </div>

          {/* Detailed Specs Grid */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              <span>{t.carDetails.specsTitle}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Dvigatel quvvati</span>
                <span className="text-sm font-mono font-bold text-white">{car.specs.power}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">0-100 km/h tezlanish</span>
                <span className="text-sm font-mono font-bold text-white">{car.specs.acceleration}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Maksimal tezlik</span>
                <span className="text-sm font-mono font-bold text-white">{car.specs.topSpeed}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Uzatmalar qutisi</span>
                <span className="text-sm font-medium text-white truncate block">{car.specs.transmission}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Yoqilg'i / Zaryad</span>
                <span className="text-sm font-medium text-white">{car.specs.fuel}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">O'rindiqlar soni</span>
                <span className="text-sm font-mono font-bold text-white">{car.specs.seats} kishilik</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Tortish tizimi</span>
                <span className="text-sm font-mono font-bold text-white">{car.specs.drivetrain}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#18181b] border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Sarf / Masofa</span>
                <span className="text-sm font-mono font-bold text-white">{car.specs.fuelConsumption}</span>
              </div>
            </div>
          </div>

          {/* Standout Features */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{t.carDetails.featuresTitle}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {car.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs sm:text-sm text-zinc-200">
                  <Check className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Included in Rental & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
            
            {/* Included */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.carDetails.includedTitle}</span>
              </h4>
              <ul className="space-y-2">
                {t.carDetails.includedItems.map((item, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>{t.carDetails.requirementsTitle}</span>
              </h4>
              <ul className="space-y-2">
                {t.carDetails.requirements.map((item, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-5 border-t border-zinc-800 bg-[#18181b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-zinc-400 block">
              {t.fleet.deposit}: {formatPrice(car.deposit)}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-mono text-white">
                {formatPrice(car.pricePerDay)}
              </span>
              <span className="text-xs text-zinc-400">
                / {t.fleet.perDay}
              </span>
            </div>
          </div>

          <button
            onClick={handleStartBooking}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.carDetails.bookNowBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
