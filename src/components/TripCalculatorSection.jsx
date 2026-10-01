import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { cars } from '../data/cars';
import { 
  Calculator, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Percent, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function TripCalculatorSection() {
  const { t, formatPrice, openBookingModal } = useApp();

  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);
  const [days, setDays] = useState(3);
  const [protection, setProtection] = useState('premium'); // 'basic' | 'premium' | 'vip'
  const [addons, setAddons] = useState({
    driver: false,
    childSeat: false,
    unlimitedKm: false,
    airportMeet: true,
    starlinkWifi: false
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const selectedCar = cars.find(c => c.id === selectedCarId) || cars[0];

  // Pricing calculations
  const baseRate = selectedCar.pricePerDay * days;
  
  let protectionDaily = 0;
  if (protection === 'premium') protectionDaily = 35;
  if (protection === 'vip') protectionDaily = 70;
  const protectionTotal = protectionDaily * days;

  let addonsTotal = 0;
  if (addons.driver) addonsTotal += 60 * days;
  if (addons.childSeat) addonsTotal += 10 * days;
  if (addons.unlimitedKm) addonsTotal += 35 * days;
  if (addons.airportMeet) addonsTotal += 25;
  if (addons.starlinkWifi) addonsTotal += 12 * days;

  const subtotal = baseRate + protectionTotal + addonsTotal;
  const discount = promoApplied ? subtotal * 0.10 : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DRIVEUZ10') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  const handleProceed = () => {
    openBookingModal(selectedCar);
  };

  return (
    <section id="calculator" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-xs font-medium mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Vehicle Selection */}
            <div className="p-5 rounded-2xl bg-[#121214] border border-zinc-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                1. {t.calculator.carSelect}
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                {cars.map(c => {
                  const isSelected = c.id === selectedCarId;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCarId(c.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected 
                          ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-600/20' 
                          : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <img src={c.images[0]} alt={c.name} className="w-12 h-10 object-cover rounded-md" />
                      <div className="overflow-hidden flex-1">
                        <div className="text-xs font-bold text-white truncate">{c.name}</div>
                        <div className="text-[11px] font-mono text-blue-400">{formatPrice(c.pricePerDay)} / kun</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Duration Slider */}
            <div className="p-5 rounded-2xl bg-[#121214] border border-zinc-800 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  2. {t.calculator.duration}
                </label>
                <span className="text-lg font-mono font-black text-blue-400">
                  {days} {t.calculator.days}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-blue-600 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>1 kun</span>
                <span>7 kun (Haftalik)</span>
                <span>14 kun</span>
                <span>30 kun (Oylik -15%)</span>
              </div>
            </div>

            {/* 3. Protection Packages */}
            <div className="p-5 rounded-2xl bg-[#121214] border border-zinc-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                3. {t.calculator.protectionPlan}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'basic', label: t.calculator.protectionPlans.basic.name, price: 'Kiritilgan' },
                  { id: 'premium', label: t.calculator.protectionPlans.premium.name, price: `+${formatPrice(35)}/kun` },
                  { id: 'vip', label: t.calculator.protectionPlans.vip.name, price: `+${formatPrice(70)}/kun` }
                ].map(p => (
                  <div
                    key={p.id}
                    onClick={() => setProtection(p.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      protection === p.id
                        ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-600/20'
                        : 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-1">{p.label}</div>
                    <div className="text-[11px] font-mono text-zinc-400">{p.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Addons */}
            <div className="p-5 rounded-2xl bg-[#121214] border border-zinc-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                4. {t.calculator.addons}
              </label>

              <div className="space-y-2">
                {[
                  { key: 'driver', label: t.calculator.addonsList.driver, cost: formatPrice(60 * days) },
                  { key: 'childSeat', label: t.calculator.addonsList.childSeat, cost: formatPrice(10 * days) },
                  { key: 'unlimitedKm', label: t.calculator.addonsList.unlimitedKm, cost: formatPrice(35 * days) },
                  { key: 'airportMeet', label: t.calculator.addonsList.airportMeet, cost: formatPrice(25) },
                  { key: 'starlinkWifi', label: t.calculator.addonsList.starlinkWifi, cost: formatPrice(12 * days) }
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-[#18181b] border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addons[item.key]}
                        onChange={(e) => setAddons(prev => ({ ...prev, [item.key]: e.target.checked }))}
                        className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0 w-4 h-4"
                      />
                      <span className="text-xs text-zinc-200">{item.label}</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-semibold">+{item.cost}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Price Breakdown Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            
            <div className="p-6 rounded-3xl bg-[#121214] border border-zinc-800 shadow-2xl space-y-6 cobalt-glow">
              
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                <img
                  src={selectedCar.images[0]}
                  alt={selectedCar.name}
                  className="w-16 h-12 object-cover rounded-xl border border-zinc-700"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedCar.name}</h3>
                  <span className="text-xs font-mono text-blue-400">{formatPrice(selectedCar.pricePerDay)} / kun</span>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t.calculator.promoPlaceholder}
                  className="bg-[#18181b] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-blue-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
                >
                  {t.calculator.applyPromo}
                </button>
              </form>

              {promoApplied && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.calculator.promoSuccess}</span>
                </div>
              )}
              {promoError && (
                <div className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                  {t.calculator.promoError}
                </div>
              )}

              {/* Line Items */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>{t.calculator.baseRate} ({days} kun):</span>
                  <span className="font-mono font-medium">{formatPrice(baseRate)}</span>
                </div>

                {protectionTotal > 0 && (
                  <div className="flex justify-between text-zinc-300">
                    <span>{t.calculator.insuranceRate}:</span>
                    <span className="font-mono font-medium">+{formatPrice(protectionTotal)}</span>
                  </div>
                )}

                {addonsTotal > 0 && (
                  <div className="flex justify-between text-zinc-300">
                    <span>{t.calculator.addonsRate}:</span>
                    <span className="font-mono font-medium">+{formatPrice(addonsTotal)}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>{t.calculator.discount} (10%):</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="pt-4 border-t border-zinc-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-zinc-400 block">{t.calculator.totalPrice}</span>
                  <span className="text-xs text-zinc-500">Barcha soliqlar va Kasko bilan</span>
                </div>
                <span className="text-3xl font-black font-mono text-white">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.calculator.proceedBtn}</span>
              </button>

              <div className="text-center text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>0% yashirin to'lovlar • 24 soat ichida bekor qilish bepul</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
