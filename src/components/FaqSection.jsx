import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronDown, PhoneCall, MessageCircle } from 'lucide-react';

export default function FaqSection() {
  const { t } = useApp();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-xs font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-[#121214] border-blue-500/50 shadow-xl shadow-blue-950/20' 
                    : 'bg-[#121214]/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.q}
                  </span>
                  <div className={`p-1 rounded-full transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-400 bg-blue-500/10' : 'text-zinc-500'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Help Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Boshqa savolingiz bormi?</h4>
            <p className="text-xs text-zinc-400">Bizning konsyerj xizmatimiz 24/7 rejimida har doim aloqada.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/driveuz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold border border-blue-500/30 flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Telegram Chat</span>
            </a>
            <a
              href="tel:+998712000000"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Qo'ng'iroq</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
