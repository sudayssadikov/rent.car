import React from 'react';
import { useApp } from '../context/AppContext';
import { locations } from '../data/locations';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Check, 
  Sparkles, 
  Navigation,
  ArrowRight
} from 'lucide-react';

export default function LocationsHubSection() {
  const { t, lang, searchFilters, setSearchFilters } = useApp();

  const handleSelectHub = (hubId) => {
    setSearchFilters(prev => ({
      ...prev,
      pickupLocation: hubId,
      dropoffLocation: hubId
    }));
    const heroEl = document.getElementById('fleet');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="locations" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-xs font-medium mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.locations.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.locations.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4">
            {t.locations.subtitle}
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => {
            const isSelected = searchFilters.pickupLocation === loc.id;
            return (
              <div
                key={loc.id}
                className={`p-6 rounded-3xl bg-[#121214] border transition-all duration-300 flex flex-col justify-between shadow-xl ${
                  isSelected 
                    ? 'border-blue-500 shadow-blue-950/30 ring-1 ring-blue-500/50' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      {loc.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>24/7 Ochiq</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {loc.name[lang] || loc.name.uz}
                  </h3>

                  <p className="text-xs text-zinc-400 mb-4 flex items-start gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">
                    {loc.phone}
                  </span>

                  <button
                    onClick={() => handleSelectHub(loc.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      isSelected 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700'
                    }`}
                  >
                    <span>{isSelected ? 'Tanlangan' : 'Bu yerdan olish'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
