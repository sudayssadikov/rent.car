import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw
} from 'lucide-react';

export default function FleetFilter({ totalResults }) {
  const { t, searchFilters, setSearchFilters, formatPrice } = useApp();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    { id: 'all', label: t.fleet.categories.all },
    { id: 'supercar', label: t.fleet.categories.supercar },
    { id: 'suv', label: t.fleet.categories.suv },
    { id: 'business', label: t.fleet.categories.business },
    { id: 'electric', label: t.fleet.categories.electric },
    { id: 'chauffeur', label: t.fleet.categories.chauffeur }
  ];

  const brands = [
    'all',
    'Porsche',
    'Mercedes-Benz',
    'BMW',
    'Audi',
    'Chevrolet',
    'Cadillac',
    'Land Rover',
    'Zeekr',
  ];

  const handleCategoryChange = (catId) => {
    setSearchFilters(prev => ({ ...prev, category: catId }));
  };

  const handleBrandChange = (brand) => {
    setSearchFilters(prev => ({ ...prev, brand }));
  };

  const handleSortChange = (e) => {
    setSearchFilters(prev => ({ ...prev, sortBy: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setSearchFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setSearchFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const resetAllFilters = () => {
    setSearchFilters(prev => ({
      ...prev,
      category: 'all',
      brand: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 1500,
      transmission: 'all',
      seats: 'all',
      sortBy: 'popular'
    }));
  };

  const isFiltered = 
    searchFilters.category !== 'all' ||
    searchFilters.brand !== 'all' ||
    searchFilters.searchQuery !== '' ||
    searchFilters.maxPrice < 1500 ||
    searchFilters.transmission !== 'all' ||
    searchFilters.seats !== 'all';

  return (
    <div className="space-y-6">
      
      {/* Top Search & Category Pills Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isActive = searchFilters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          
          {/* Live Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilters.searchQuery}
              onChange={handleSearchChange}
              placeholder={t.fleet.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchFilters.searchQuery && (
              <button
                onClick={() => setSearchFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Select */}
          <select
            value={searchFilters.sortBy}
            onChange={handleSortChange}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="popular">{t.fleet.sortOptions.popular}</option>
            <option value="priceAsc">{t.fleet.sortOptions.priceAsc}</option>
            <option value="priceDesc">{t.fleet.sortOptions.priceDesc}</option>
            <option value="power">{t.fleet.sortOptions.power}</option>
          </select>

          {/* Advanced Filter Toggle Button */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              showAdvanced || isFiltered
                ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Kengaytirilgan filtrlar"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filtr</span>
          </button>

          {/* Reset Filters button if any active */}
          {isFiltered && (
            <button
              onClick={resetAllFilters}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors"
              title={t.fleet.resetFilters}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

      {/* Advanced Filter Drawer / Panel */}
      {showAdvanced && (
        <div className="p-5 rounded-2xl bg-[#121214] border border-zinc-800 shadow-xl space-y-5 animate-in fade-in duration-200">
          
          {/* Brand Filter Pills */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2.5">
              Brend bo'yicha:
            </span>
            <div className="flex flex-wrap gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    searchFilters.brand === brand
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  {brand === 'all' ? t.fleet.allCategories : brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 border-t border-zinc-800/80">
            
            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-400">{t.fleet.priceRange}</span>
                <span className="font-mono font-bold text-white">
                  Max: {formatPrice(searchFilters.maxPrice || 1500)}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="50"
                value={searchFilters.maxPrice || 1500}
                onChange={handlePriceChange}
                className="w-full accent-blue-600 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Transmission Filter */}
            <div>
              <span className="text-xs text-zinc-400 block mb-2">{t.fleet.transmission}</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSearchFilters(prev => ({ 
                    ...prev, 
                    transmission: prev.transmission === 'auto' ? 'all' : 'auto' 
                  }))}
                  className={`py-1.5 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
                    searchFilters.transmission === 'auto'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800/50 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.fleet.transAuto}
                </button>
                <button
                  onClick={() => setSearchFilters(prev => ({ 
                    ...prev, 
                    transmission: prev.transmission === 'manual' ? 'all' : 'manual' 
                  }))}
                  className={`py-1.5 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
                    searchFilters.transmission === 'manual'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800/50 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.fleet.transManual}
                </button>
              </div>
            </div>

            {/* Seats Filter */}
            <div>
              <span className="text-xs text-zinc-400 block mb-2">{t.fleet.seats}</span>
              <div className="flex gap-2">
                {[2, 4, 5, 6, 7].map(num => (
                  <button
                    key={num}
                    onClick={() => setSearchFilters(prev => ({
                      ...prev,
                      seats: prev.seats === num ? 'all' : num
                    }))}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium border text-center transition-colors ${
                      searchFilters.seats === num
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'bg-zinc-800/50 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Results Counter and Active Indicators */}
      <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
        <div>
          <span className="font-mono font-bold text-white">{totalResults}</span>{' '}
          <span>{t.fleet.resultsCount}</span>
        </div>
        {isFiltered && (
          <button
            onClick={resetAllFilters}
            className="text-blue-400 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.fleet.resetFilters}</span>
          </button>
        )}
      </div>

    </div>
  );
}
