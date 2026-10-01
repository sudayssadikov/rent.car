import React, { useMemo } from 'react';
import { useApp } from './context/AppContext';
import { cars } from './data/cars';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FleetFilter from './components/FleetFilter';
import CarCard from './components/CarCard';
import CarDetailModal from './components/CarDetailModal';
import BookingModal from './components/BookingModal';
import TripCalculatorSection from './components/TripCalculatorSection';
import VipChauffeurSection from './components/VipChauffeurSection';
import LocationsHubSection from './components/LocationsHubSection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import FavoritesDrawer from './components/FavoritesDrawer';
import Footer from './components/Footer';
import { Sparkles, Car } from 'lucide-react';

export default function App() {
  const { t, searchFilters } = useApp();

  // Filter and sort the cars list with precision
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // 1. Category filter
      if (searchFilters.category !== 'all' && car.category !== searchFilters.category) {
        return false;
      }

      // 2. Brand filter
      if (searchFilters.brand !== 'all' && car.brand.toLowerCase() !== searchFilters.brand.toLowerCase()) {
        return false;
      }

      // 3. Search query filter
      if (searchFilters.searchQuery.trim() !== '') {
        const query = searchFilters.searchQuery.toLowerCase().trim();
        const matchName = car.name.toLowerCase().includes(query);
        const matchBrand = car.brand.toLowerCase().includes(query);
        const matchTagline = car.tagline.toLowerCase().includes(query);
        const matchPower = car.specs.power.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchTagline && !matchPower) {
          return false;
        }
      }

      // 4. Max price filter
      if (searchFilters.maxPrice && car.pricePerDay > searchFilters.maxPrice) {
        return false;
      }

      // 5. Seats filter
      if (searchFilters.seats !== 'all') {
        const targetSeats = Number(searchFilters.seats);
        if (car.specs.seats !== targetSeats) {
          return false;
        }
      }

      // 6. Transmission filter
      if (searchFilters.transmission !== 'all') {
        const isAuto = !car.specs.transmission.toLowerCase().includes('manual') && 
                       !car.specs.transmission.toLowerCase().includes('mexanika');
        if (searchFilters.transmission === 'auto' && !isAuto) return false;
        if (searchFilters.transmission === 'manual' && isAuto) return false;
      }

      return true;
    }).sort((a, b) => {
      if (searchFilters.sortBy === 'priceAsc') {
        return a.pricePerDay - b.pricePerDay;
      }
      if (searchFilters.sortBy === 'priceDesc') {
        return b.pricePerDay - a.pricePerDay;
      }
      if (searchFilters.sortBy === 'power') {
        const getPowerNum = (str) => parseInt(str.replace(/[^0-9]/g, '')) || 0;
        return getPowerNum(b.specs.power) - getPowerNum(a.specs.power);
      }
      // Default: 'popular'
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [searchFilters]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* 1. Glassmorphism Sticky Navbar */}
      <Navbar />

      {/* 2. Hero Section with Interactive Trip Console & Live Metrics */}
      <Hero />

      {/* 3. Main Fleet / Catalog Section */}
      <section id="fleet" className="py-24 bg-[#09090b] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.fleet.sectionBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t.fleet.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3">
              {t.fleet.subtitle}
            </p>
          </div>

          {/* Advanced Filter Toolbar */}
          <FleetFilter totalResults={filteredCars.length} />

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 my-8 rounded-3xl bg-[#121214] border border-zinc-800 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 mb-4">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Avtomobil topilmadi
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto px-4">
                {t.fleet.noResults}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* 4. Interactive Live Trip Calculator Section */}
      <TripCalculatorSection />

      {/* 5. VIP Chauffeur & Diplomatic Service Section */}
      <VipChauffeurSection />

      {/* 6. Executive Locations & Delivery Hubs in Uzbekistan */}
      <LocationsHubSection />

      {/* 7. Client Reviews & Trust Badges */}
      <ReviewsSection />

      {/* 8. FAQ Accordion */}
      <FaqSection />

      {/* 9. Luxury Dark Footer */}
      <Footer />

      {/* Overlays / Modals */}
      <CarDetailModal />
      <BookingModal />
      <FavoritesDrawer />

    </div>
  );
}
