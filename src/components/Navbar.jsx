import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Car, 
  Heart, 
  Globe, 
  DollarSign, 
  PhoneCall, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Navbar() {
  const { 
    lang, 
    setLang, 
    t, 
    currency, 
    setCurrency, 
    favorites, 
    setIsFavoritesOpen, 
    openBookingModal 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currDropdownOpen, setCurrDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'uz', label: "O'zbekcha", flag: "🇺🇿" },
    { code: 'ru', label: "Русский", flag: "🇷🇺" },
    { code: 'en', label: "English", flag: "🇬🇧" }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'UZS', symbol: "so'm", label: "UZS (so'm)" },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#09090b]/85 backdrop-blur-xl border-b border-zinc-800 shadow-2xl py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-blue-500 blur-sm opacity-30 -z-10 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white font-mono flex items-center gap-1.5">
                DRIVE<span className="text-blue-500">.UZ</span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-sans">
                Luxury Fleet
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#fleet" 
              className="text-sm font-medium text-zinc-300 hover:text-white hover:text-blue-400 transition-colors"
            >
              {t.nav.fleet}
            </a>
            <a 
              href="#calculator" 
              className="text-sm font-medium text-zinc-300 hover:text-white hover:text-blue-400 transition-colors"
            >
              {t.nav.calculator}
            </a>
            <a 
              href="#chauffeur" 
              className="text-sm font-medium text-zinc-300 hover:text-white hover:text-blue-400 transition-colors"
            >
              {t.nav.chauffeur}
            </a>
            <a 
              href="#locations" 
              className="text-sm font-medium text-zinc-300 hover:text-white hover:text-blue-400 transition-colors"
            >
              {t.nav.locations}
            </a>
            <a 
              href="#faq" 
              className="text-sm font-medium text-zinc-300 hover:text-white hover:text-blue-400 transition-colors"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrDropdownOpen(!currDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {currDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 py-1.5 bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl z-50 backdrop-blur-xl">
                  {currencies.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code);
                        setCurrDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-zinc-800/60 transition-colors ${
                        currency === curr.code ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-zinc-300'
                      }`}
                    >
                      <span>{curr.label}</span>
                      {currency === curr.code && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="uppercase">{lang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 py-1.5 bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl z-50 backdrop-blur-xl">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 hover:bg-zinc-800/60 transition-colors ${
                        lang === l.code ? 'text-blue-400 font-semibold bg-blue-500/10' : 'text-zinc-300'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-rose-400 hover:border-zinc-700 transition-colors"
              title={t.nav.favorites}
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => openBookingModal(null)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-lg shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.bookNow}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-5 rounded-2xl bg-[#121214] border border-zinc-800 shadow-2xl flex flex-col gap-4 animate-in fade-in duration-200">
            <nav className="flex flex-col gap-3">
              <a 
                href="#fleet" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-blue-400 py-1"
              >
                {t.nav.fleet}
              </a>
              <a 
                href="#calculator" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-blue-400 py-1"
              >
                {t.nav.calculator}
              </a>
              <a 
                href="#chauffeur" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-blue-400 py-1"
              >
                {t.nav.chauffeur}
              </a>
              <a 
                href="#locations" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-blue-400 py-1"
              >
                {t.nav.locations}
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-blue-400 py-1"
              >
                {t.nav.faq}
              </a>
            </nav>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              {/* Mobile Language Switcher */}
              <div className="flex gap-1.5">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-2.5 py-1 text-xs rounded-md ${
                      lang === l.code ? 'bg-blue-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {l.flag} {l.code.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Mobile Currency Switcher */}
              <div className="flex gap-1">
                {currencies.map(c => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`px-2 py-1 text-xs font-mono rounded-md ${
                      currency === c.code ? 'bg-blue-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal(null);
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.bookNow}</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
