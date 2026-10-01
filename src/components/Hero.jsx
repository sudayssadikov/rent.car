import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { locations } from '../data/locations';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Car, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  Search,
  CheckCircle2,
  Headphones,
  Award
} from 'lucide-react';

export default function Hero() {
  const { t, lang, searchFilters, setSearchFilters, openBookingModal } = useApp();

  const [pickup, setPickup] = useState(searchFilters.pickupLocation || 'tas-airport');
  const [dropoff, setDropoff] = useState(searchFilters.dropoffLocation || 'tas-airport');
  const [pickupDate, setPickupDate] = useState(searchFilters.pickupDate);
  const [returnDate, setReturnDate] = useState(searchFilters.returnDate);
  const [category, setCategory] = useState(searchFilters.category || 'all');
  const [sameLocation, setSameLocation] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFilters(prev => ({
      ...prev,
      pickupLocation: pickup,
      dropoffLocation: sameLocation ? pickup : dropoff,
      pickupDate,
      returnDate,
      category
    }));

    // Smooth scroll to fleet section
    const fleetEl = document.getElementById('fleet');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#09090b]">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full"></div>
      
      {/* Subtle Luxury High-Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Badge */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-blue-400 text-xs font-medium tracking-wider mb-6 shadow-inner backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-sans">
            {t.hero.titleStart}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-300">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-10 font-normal">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Interactive Booking Search Console */}
        <div className="max-w-5xl mx-auto mt-2">
          <div className="p-4 sm:p-6 rounded-2xl bg-[#121214]/90 border border-zinc-800 shadow-2xl backdrop-blur-xl cobalt-glow">
            
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Pickup Hub */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t.hero.searchBox.pickupLocation}</span>
                  </label>
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id} className="bg-zinc-900 text-white">
                        {loc.name[lang] || loc.name.uz}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Return Hub (conditional if not same) */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t.hero.searchBox.dropoffLocation}</span>
                  </label>
                  <select
                    disabled={sameLocation}
                    value={sameLocation ? pickup : dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className={`w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 transition-colors ${
                      sameLocation ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id} className="bg-zinc-900 text-white">
                        {loc.name[lang] || loc.name.uz}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pickup Date */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t.hero.searchBox.pickupDate}</span>
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Return Date */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t.hero.searchBox.returnDate}</span>
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

              </div>

              {/* Bottom Row: Checkbox, Category, and Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80">
                <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer self-start sm:self-center">
                  <input
                    type="checkbox"
                    checked={sameLocation}
                    onChange={(e) => setSameLocation(e.target.checked)}
                    className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <span>{t.hero.searchBox.sameLocation}</span>
                </label>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="all">{t.hero.searchBox.allTypes}</option>
                    <option value="supercar">{t.fleet.categories.supercar}</option>
                    <option value="suv">{t.fleet.categories.suv}</option>
                    <option value="business">{t.fleet.categories.business}</option>
                    <option value="electric">{t.fleet.categories.electric}</option>
                    <option value="chauffeur">{t.fleet.categories.chauffeur}</option>
                  </select>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t.hero.searchBox.searchBtn}</span>
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>

        {/* Live Metrics Trust Banner */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-[#121214]/60 border border-zinc-800/80 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">{t.hero.metrics.cars}</div>
              <div className="text-xs text-zinc-400">{t.hero.metrics.carsLabel}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121214]/60 border border-zinc-800/80 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">{t.hero.metrics.support}</div>
              <div className="text-xs text-zinc-400">{t.hero.metrics.supportLabel}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121214]/60 border border-zinc-800/80 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">{t.hero.metrics.insurance}</div>
              <div className="text-xs text-zinc-400">{t.hero.metrics.insuranceLabel}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121214]/60 border border-zinc-800/80 flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">{t.hero.metrics.clients}</div>
              <div className="text-xs text-zinc-400">{t.hero.metrics.clientsLabel}</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
