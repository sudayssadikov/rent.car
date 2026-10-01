import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Crown, 
  Plane, 
  Briefcase, 
  Compass, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function VipChauffeurSection() {
  const { t, openBookingModal } = useApp();

  const benefits = [
    "Ko'p tilli professional haydovchilar (O'zbek, Rus, Ingliz)",
    "Diplomatik protokol va to'liq maxfiylik kafolati",
    "Salonda muzlatilgan premium suv, yangi matbuot va Starlink Wi-Fi",
    "Aeroport VIP terminalida parvozni kuzatib kutib olish (Flight Tracking)"
  ];

  return (
    <section id="chauffeur" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-xs font-medium mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>{t.chauffeur.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.chauffeur.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4">
            {t.chauffeur.subtitle}
          </p>
        </div>

        {/* 3 Main Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-8 rounded-3xl bg-[#121214] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.chauffeur.services[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {t.chauffeur.services[0].desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-zinc-800 text-xs font-mono text-zinc-500">
              Terminal 2 • CIP / VIP Hall
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#121214] border border-blue-500/30 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl cobalt-glow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/25 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/40">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.chauffeur.services[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {t.chauffeur.services[1].desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-zinc-800 text-xs font-mono text-blue-400">
              Diplomatic Standard • 24/7 Standby
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#121214] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.chauffeur.services[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {t.chauffeur.services[2].desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-zinc-800 text-xs font-mono text-zinc-500">
              Toshkent • Samarqand • Amirsoy
            </div>
          </div>

        </div>

        {/* Banner with Chauffeur Standards and Call CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#121214] via-[#151518] to-[#121214] border border-zinc-800 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <span>DRIVE.UZ Shaxsiy Haydovchilik Standartlari</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a
              href="tel:+998712000000"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold border border-zinc-800 flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>+998 71 200-00-00</span>
            </a>

            <button
              onClick={() => openBookingModal(null)}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.chauffeur.callConcierge}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
