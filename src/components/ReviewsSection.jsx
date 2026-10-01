import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquareQuote, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const { t } = useApp();

  return (
    <section id="reviews" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-xs font-medium mb-4">
            <Star className="w-3.5 h-3.5 fill-blue-400" />
            <span>{t.reviews.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.reviews.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.reviews.items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#121214] border border-zinc-800 flex flex-col justify-between shadow-xl relative"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author & Car info */}
              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <span className="text-[11px] text-zinc-400 block">{item.role}</span>
                </div>
                <span className="text-[11px] font-mono font-medium text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  {item.car}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Trust Statement */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Verified Customer Reviews • Google Business 4.98/5 • Trustpilot Rated</span>
        </div>

      </div>
    </section>
  );
}
