import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext(null);

const CURRENCY_RATES = {
  USD: { rate: 1, symbol: '$', suffix: '' },
  UZS: { rate: 12850, symbol: '', suffix: " so'm" },
  EUR: { rate: 0.92, symbol: '€', suffix: '' }
};

export function AppProvider({ children }) {
  // 1. Language state
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('driveuz_lang') || 'uz';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('driveuz_lang', newLang);
  };

  const t = translations[lang] || translations.uz;

  // 2. Currency state
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem('driveuz_currency') || 'USD';
  });

  const setCurrency = (curr) => {
    setCurrencyState(curr);
    localStorage.setItem('driveuz_currency', curr);
  };

  const formatPrice = (usdAmount) => {
    if (typeof usdAmount !== 'number' || isNaN(usdAmount)) return '$0';
    const config = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = Math.round(usdAmount * config.rate);
    const formattedNum = converted.toLocaleString();
    return `${config.symbol}${formattedNum}${config.suffix}`;
  };

  // 3. Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('driveuz_favorites');
      return saved ? JSON.parse(saved) : ['porsche-911-gt3rs', 'mercedes-amg-g63'];
    } catch {
      return ['porsche-911-gt3rs', 'mercedes-amg-g63'];
    }
  });

  useEffect(() => {
    localStorage.setItem('driveuz_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  const isFavorite = (carId) => favorites.includes(carId);

  // 4. Modal states
  const [activeBookingCar, setActiveBookingCar] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeDetailCar, setActiveDetailCar] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // 5. Global search filters
  const [searchFilters, setSearchFilters] = useState({
    category: 'all',
    brand: 'all',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 1500,
    transmission: 'all',
    seats: 'all',
    sortBy: 'popular',
    pickupLocation: 'tas-airport',
    dropoffLocation: 'tas-airport',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    returnDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]
  });

  // 6. Confirmed reservations in localStorage
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('driveuz_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addBooking = (bookingData) => {
    const updated = [bookingData, ...bookings];
    setBookings(updated);
    localStorage.setItem('driveuz_bookings', JSON.stringify(updated));
  };

  const openBookingModal = (car = null) => {
    setActiveBookingCar(car);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
  };

  const openDetailModal = (car) => {
    setActiveDetailCar(car);
    setIsDetailOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
  };

  return (
    <AppContext.Provider value={{
      lang,
      setLang,
      t,
      currency,
      setCurrency,
      formatPrice,
      favorites,
      toggleFavorite,
      isFavorite,
      isFavoritesOpen,
      setIsFavoritesOpen,
      activeBookingCar,
      setActiveBookingCar,
      isBookingOpen,
      openBookingModal,
      closeBookingModal,
      activeDetailCar,
      openDetailModal,
      closeDetailModal,
      isDetailOpen,
      searchFilters,
      setSearchFilters,
      bookings,
      addBooking
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
