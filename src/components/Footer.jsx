import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  PhoneCall, 
  Send, 
  ShieldCheck, 
  Check, 
  MapPin,
  Clock
} from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer() {
  const { t } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSent(false), 5000);
    }
  };

  return (
    <footer className="bg-[#09090b] border-t border-zinc-800/80 pt-16 pb-12 relative overflow-hidden text-zinc-400">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-blue-600/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-mono">
                DRIVE<span className="text-blue-500">.UZ</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-bold">+998 71 200-00-00</span>
                <span className="text-zinc-500 font-sans">(24/7 Bepul konsyerj)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Toshkent shahri, Mirabad Avenue & Toshkent City</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>Dam olish kunlarisiz, 24 soat uzluksiz</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.fleetLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#fleet" className="hover:text-white hover:text-blue-400 transition-colors">
                  Sport & Superkarlar
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white hover:text-blue-400 transition-colors">
                  Premial SUV & Geländewagen
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white hover:text-blue-400 transition-colors">
                  Mercedes-Maybach S-Class
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white hover:text-blue-400 transition-colors">
                  Elektromobillar (Zeekr, Taycan)
                </a>
              </li>
              <li>
                <a href="#chauffeur" className="hover:text-white hover:text-blue-400 transition-colors">
                  VIP Shaxsiy Haydovchi
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Standards */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.companyLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  {t.nav.locations}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <span className="text-emerald-400 flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Kasko 100% Sug'urta</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-xs text-zinc-400">
              {t.footer.newsletterDesc}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t.footer.emailPlaceholder}
                  className="w-full bg-[#121214] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {newsletterSent && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Muvaffaqiyatli obuna bo'ldingiz!</span>
                </div>
              )}
            </form>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://t.me/driveuz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>@driveuz_vip</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quick Switchers */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {CURRENT_YEAR} DRIVE.UZ Luxury Fleet. {t.footer.rights}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-zinc-400">Toshkent, O'zbekiston</span>
            <span>•</span>
            <span className="text-zinc-400">Sixt & Hertz Global Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
