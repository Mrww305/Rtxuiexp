import React, { useState } from 'react';
import { 
  Droplet, 
  Sun, 
  Recycle, 
  ShieldCheck, 
  Leaf, 
  Sparkles, 
  Calculator, 
  ArrowRight,
  Download
} from 'lucide-react';
import { SUSTAINABILITY_PILLARS, ESG_TARGETS_2030 } from '../../data/sustainability';

interface SustainabilityViewProps {
  onNavigate: (path: string) => void;
  onOpenCatalogModal: () => void;
}

export const SustainabilityView: React.FC<SustainabilityViewProps> = ({
  onNavigate,
  onOpenCatalogModal,
}) => {
  const [calcMeters, setCalcMeters] = useState(10000);

  // Benchmarks: standard conventional dyeing uses ~120L water/meter. Reshma Tex ZLD reuses 94%, so net freshwater draw is only ~12L/meter!
  const conventionalWaterLitres = calcMeters * 120;
  const reshmaTexWaterLitres = calcMeters * 12;
  const waterSavedLitres = conventionalWaterLitres - reshmaTexWaterLitres;
  const co2SavedKg = Math.round(calcMeters * 0.45);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-800 tracking-widest font-semibold block mb-1">
            Environmental Stewardship &amp; ESG
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
            Sustainable Textile Engineering
          </h1>
          <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Zero Liquid Discharge (ZLD) effluent recycling, 3.8 MW rooftop photovoltaic arrays, and traceable GOTS organic cotton farming.
          </p>
        </div>

        <button
          onClick={onOpenCatalogModal}
          className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-xl text-xs font-semibold flex items-center gap-2 min-h-[42px] transition-colors"
        >
          <Download className="w-4 h-4 text-emerald-300" />
          <span>Download 2026 ESG Report (PDF)</span>
        </button>
      </div>

      {/* Sustainability 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SUSTAINABILITY_PILLARS.map((pillar) => (
          <div 
            key={pillar.id}
            className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">
                  {pillar.metric}
                </span>
                <span className="text-xs font-mono text-stone-500 uppercase">
                  {pillar.metricLabel}
                </span>
              </div>

              <h2 className="text-xl font-serif font-bold text-stone-900">
                {pillar.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-1.5">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block font-semibold">
                Measurable Milestones:
              </span>
              <ul className="space-y-1 text-xs text-stone-700">
                {pillar.initiatives.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Sourcing Impact Calculator */}
      <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-8 sm:p-12 border border-emerald-800 shadow-2xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Buyer Eco-Savings Modeling Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Calculate Your Order&apos;s Water &amp; Carbon Savings
          </h2>
          <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed">
            Estimate the net conservation impact of shifting your fabric order from conventional sub-continental finishing to Reshma Tex&apos;s ZLD closed-loop facility.
          </p>
        </div>

        {/* Input slider */}
        <div className="space-y-2 bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800">
          <div className="flex items-center justify-between font-mono text-xs text-white">
            <span>Proposed Production Order Size:</span>
            <span className="text-lg font-bold text-emerald-300">
              {calcMeters.toLocaleString()} Meters
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={calcMeters}
            onChange={(e) => setCalcMeters(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-emerald-400">
            <span>Small Capsule (1,000m)</span>
            <span>Commercial Program (50,000m)</span>
            <span>High-Volume Bulk (100,000m)</span>
          </div>
        </div>

        {/* Savings results display */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-center">
          <div className="bg-emerald-900/80 p-6 rounded-2xl border border-emerald-700">
            <Droplet className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-white block">
              {(waterSavedLitres / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}k Litres
            </span>
            <span className="text-xs text-emerald-300 mt-1 block">
              Freshwater Diverted &amp; Preserved
            </span>
          </div>

          <div className="bg-emerald-900/80 p-6 rounded-2xl border border-emerald-700">
            <Sun className="w-8 h-8 mx-auto text-amber-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-white block">
              {(co2SavedKg / 1000).toFixed(2)} Metric Tons
            </span>
            <span className="text-xs text-emerald-300 mt-1 block">
              CO₂ Emissions Eliminated via Solar
            </span>
          </div>

          <div className="bg-emerald-900/80 p-6 rounded-2xl border border-emerald-700">
            <ShieldCheck className="w-8 h-8 mx-auto text-emerald-300 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-white block">
              100% Zero
            </span>
            <span className="text-xs text-emerald-300 mt-1 block">
              Harmful Effluent Discharged
            </span>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('/request-quote')}
            className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-colors shadow-lg"
          >
            Quote This Sustainable Production Run
          </button>
        </div>
      </div>

      {/* 2030 ESG Target Progress Bars */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-mono uppercase text-emerald-800 font-semibold tracking-wider">
            Accountability Roadmap
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            2030 Science-Based Sustainability Targets
          </h2>
        </div>

        <div className="space-y-5">
          {ESG_TARGETS_2030.map((target, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-stone-900 text-sm">{target.target}</span>
                <span className="font-mono text-emerald-800 font-bold">
                  {target.progress}{target.unit} Verified
                </span>
              </div>
              
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${target.progress}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-stone-400">
                <span>Current verified milestone</span>
                <span>{target.progress}% Achieved</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
