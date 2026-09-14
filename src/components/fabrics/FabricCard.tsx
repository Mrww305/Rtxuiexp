import React from 'react';
import { 
  Layers, 
  Check, 
  ArrowUpRight, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { FabricItem } from '../../types';
import { useAppStore } from '../../lib/store';

interface FabricCardProps {
  fabric: FabricItem;
  onSelect: (fabric: FabricItem) => void;
  onNavigate: (path: string) => void;
}

export const FabricCard: React.FC<FabricCardProps> = ({ fabric, onSelect, onNavigate }) => {
  const { 
    state, 
    addToSampleKit, 
    removeFromSampleKit, 
    toggleCompare, 
    toggleFavorite,
    setRfqPrefillFabricId
  } = useAppStore();

  const isInSampleKit = state.sampleKitIds.includes(fabric.id);
  const isCompared = state.compareIds.includes(fabric.id);
  const isFavorite = state.favoriteIds.includes(fabric.id);

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRfqPrefillFabricId(fabric.id);
    onNavigate('/request-quote');
  };

  return (
    <article 
      className="group bg-white rounded-2xl border border-stone-200 hover:border-amber-600/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
      aria-labelledby={`fabric-title-${fabric.id}`}
    >
      {/* Top Image Stage */}
      <div 
        className="relative h-56 sm:h-64 overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onSelect(fabric)}
      >
        <img 
          src={fabric.image} 
          alt={`${fabric.name} - ${fabric.weave} fabric texture swatch`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-stone-900/80 backdrop-blur-md text-amber-400 border border-stone-700 text-[11px] font-mono px-2.5 py-1 rounded-full font-bold">
            {fabric.code}
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(fabric.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center ${
                isFavorite 
                  ? 'bg-rose-500 text-white shadow-md' 
                  : 'bg-stone-900/60 text-stone-200 hover:bg-stone-900 hover:text-white'
              }`}
              aria-label={isFavorite ? `Remove ${fabric.name} from favorites` : `Save ${fabric.name} to favorites`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom image overlay specs */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-stone-900/80 px-2 py-0.5 rounded backdrop-blur-sm border border-stone-700">
              {fabric.gsm} GSM
            </span>
            <span className="bg-stone-900/80 px-2 py-0.5 rounded backdrop-blur-sm border border-stone-700">
              {fabric.widthInches}&quot; / {fabric.widthCm}cm
            </span>
          </div>
          <span className="bg-amber-600/90 text-stone-950 font-bold px-2 py-0.5 rounded text-[11px] uppercase">
            {fabric.weave}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Certifications */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-amber-700 font-medium font-mono uppercase text-[11px] tracking-wider">
              {fabric.category}
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {fabric.certifications[0]}
            </span>
          </div>

          {/* Title */}
          <h3 
            id={`fabric-title-${fabric.id}`}
            onClick={() => onSelect(fabric)}
            className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
          >
            {fabric.name}
          </h3>

          {/* Composition */}
          <p className="text-xs text-stone-600 mt-1 font-medium">
            {fabric.composition}
          </p>

          <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
            {fabric.description}
          </p>
        </div>

        {/* Colorway preview swatches */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="font-mono">Colorways ({fabric.colorways.length})</span>
            <span className="font-mono text-stone-400">MOQ: {fabric.moqMeters.toLocaleString()}m</span>
          </div>
          <div className="flex items-center gap-1.5">
            {fabric.colorways.map((cw, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-stone-300 shadow-sm"
                style={{ backgroundColor: cw.hex }}
                title={`${cw.name} (${cw.pantoneCode})`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Actions & Compare Checkbox */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          
          {/* Compare toggle */}
          <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer hover:text-stone-900 select-none">
            <input 
              type="checkbox"
              checked={isCompared}
              onChange={() => toggleCompare(fabric.id)}
              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
            />
            <span className="font-mono text-[11px]">Compare</span>
          </label>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {/* Add to Sample Kit */}
            <button
              onClick={() => {
                if (isInSampleKit) {
                  removeFromSampleKit(fabric.id);
                } else {
                  addToSampleKit(fabric.id);
                }
              }}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors min-h-[38px] ${
                isInSampleKit
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
              }`}
              aria-label={isInSampleKit ? `Remove ${fabric.code} from sample kit` : `Add ${fabric.code} to sample kit`}
              title={isInSampleKit ? 'In your sample kit' : 'Add to sample kit'}
            >
              {isInSampleKit ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5 text-amber-600" />}
              <span className="text-[11px]">{isInSampleKit ? 'Added' : 'Sample'}</span>
            </button>

            {/* Request Quote Button */}
            <button
              onClick={handleRequestQuote}
              className="px-3 py-2 bg-stone-900 hover:bg-amber-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1 min-h-[38px]"
            >
              <span>Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </article>
  );
};
