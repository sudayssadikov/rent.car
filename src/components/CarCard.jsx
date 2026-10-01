import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Zap, 
  Gauge, 
  Users, 
  Fuel, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';

export default function CarCard({ car }) {
  const { 
    t, 
    formatPrice, 
    isFavorite, 
    toggleFavorite, 
    openBookingModal, 
    openDetailModal 
  } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = car.images && car.images.length > 0 ? car.images : [
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85"
  ];

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group relative rounded-2xl bg-[#121214] border border-zinc-800 hover:border-zinc-700/80 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-950/20">
      
      {/* Top Image & Interactive Badge Bar */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-zinc-950">
        
        {/* Car Image with Hover Zoom */}
        <img
          src={images[activeImgIndex]}
          alt={car.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Ambient Dark Gradient on bottom of image for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900/90 text-white border border-zinc-700/80 backdrop-blur-md">
            {car.modelYear}
          </span>
          {car.isPopular && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md shadow-blue-600/30">
              <Sparkles className="w-3 h-3" />
              <span>VIP Pick</span>
            </span>
          )}
        </div>

        {/* Wishlist / Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(car.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-zinc-300 hover:text-rose-500 backdrop-blur-md border border-zinc-800 transition-transform active:scale-90 z-10"
          title={isFavorite(car.id) ? t.fleet.removeFromFav : t.fleet.addToFav}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite(car.id) ? 'text-rose-500 fill-rose-500' : ''
            }`} 
          />
        </button>

        {/* Image Carousel Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeImgIndex === i ? 'bg-blue-500 w-4' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Car Brand, Title & Rating */}
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-blue-400">
              {car.brand}
            </span>
            <div className="flex items-center gap-1 font-mono text-white">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{car.rating}</span>
              <span className="text-zinc-500">({car.tripsCount})</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {car.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-normal">
            {car.tagline}
          </p>
        </div>

        {/* Technical Specs Pill Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#18181b] border border-zinc-800/70">
            <Gauge className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[10px] text-zinc-500 block leading-none">Quvvat</span>
              <span className="text-xs font-mono font-semibold text-zinc-200 truncate block">
                {car.specs.power}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#18181b] border border-zinc-800/70">
            <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[10px] text-zinc-500 block leading-none">0-100 km/h</span>
              <span className="text-xs font-mono font-semibold text-zinc-200 truncate block">
                {car.specs.acceleration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#18181b] border border-zinc-800/70">
            <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[10px] text-zinc-500 block leading-none">Sig'im</span>
              <span className="text-xs font-mono font-semibold text-zinc-200 truncate block">
                {car.specs.seats} {t.fleet.seatsCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#18181b] border border-zinc-800/70">
            <Fuel className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[10px] text-zinc-500 block leading-none">Yoqilg'i</span>
              <span className="text-xs font-mono font-semibold text-zinc-200 truncate block">
                {car.specs.fuel.split(' ')[0]}
              </span>
            </div>
          </div>

        </div>

        {/* Pricing Line and Cancellation Pill */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-end justify-between">
          <div>
            <span className="text-[11px] text-zinc-400 block mb-0.5">
              {t.fleet.deposit}: {formatPrice(car.deposit)}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-white tracking-tight">
                {formatPrice(car.pricePerDay)}
              </span>
              <span className="text-xs text-zinc-400 font-sans">
                / {t.fleet.perDay}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>Kasko 100%</span>
          </div>
        </div>

        {/* Action Buttons: Batafsil & Bron Qilish */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => openDetailModal(car)}
            className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-800 hover:border-zinc-700 transition-colors text-center"
          >
            {t.fleet.viewDetails}
          </button>

          <button
            type="button"
            onClick={() => openBookingModal(car)}
            className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-1.5 text-center"
          >
            <span>{t.fleet.quickBook}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
