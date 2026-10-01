import React from 'react';
import { useApp } from '../context/AppContext';
import { cars } from '../data/cars';
import { 
  X, 
  Heart, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  Car
} from 'lucide-react';

export default function FavoritesDrawer() {
  const { 
    isFavoritesOpen, 
    setIsFavoritesOpen, 
    favorites, 
    toggleFavorite, 
    formatPrice, 
    openBookingModal,
    t
  } = useApp();

  if (!isFavoritesOpen) return null;

  const favoriteCars = cars.filter(c => favorites.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#121214] border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{t.nav.favorites}</h3>
                <span className="text-xs text-zinc-400 font-mono">
                  {favoriteCars.length} ta saqlangan avtomobil
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsFavoritesOpen(false)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {favoriteCars.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="text-sm font-semibold text-zinc-400">
                  Hali hech qanday avtomobil saqlanmagan
                </div>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Avtoparkimizdagi o'zingizga ma'qul modellarni yurakcha belgisi orqali saqlab qo'yishingiz mumkin.
                </p>
                <button
                  onClick={() => setIsFavoritesOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-600/30"
                >
                  Avtoparkni Ko'rish
                </button>
              </div>
            ) : (
              favoriteCars.map(car => (
                <div
                  key={car.id}
                  className="p-3.5 rounded-2xl bg-[#18181b] border border-zinc-800 flex gap-3.5 items-center relative group"
                >
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-20 h-16 object-cover rounded-xl border border-zinc-700/60 shrink-0"
                  />

                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 block leading-tight">
                      {car.brand}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {car.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-white block mt-1">
                      {formatPrice(car.pricePerDay)} <span className="text-[10px] text-zinc-500 font-sans">/ kun</span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        setIsFavoritesOpen(false);
                        openBookingModal(car);
                      }}
                      className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center shadow-md shadow-blue-600/20"
                      title="Bron qilish"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(car.id)}
                      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-rose-500 border border-zinc-800"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {favoriteCars.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-[#18181b]/60">
              <button
                onClick={() => {
                  setIsFavoritesOpen(false);
                  openBookingModal(favoriteCars[0]);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Birinchi Avtomobilni Bron Qilish</span>
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
