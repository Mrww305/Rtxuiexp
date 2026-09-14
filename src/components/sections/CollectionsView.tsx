import React, { useState } from 'react';
import { Download, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { COLLECTIONS_DATA } from '../../data/collections';
import { FABRICS_DATA } from '../../data/fabrics';
import { CollectionItem, FabricItem } from '../../types';

interface CollectionsViewProps {
  onSelectFabric: (fabric: FabricItem) => void;
  onNavigate: (path: string) => void;
  onOpenCatalogModal: () => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onSelectFabric,
  onNavigate,
  onOpenCatalogModal,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem>(COLLECTIONS_DATA[0]);

  // Find fabrics matching this collection
  const collectionFabrics = FABRICS_DATA.filter(f => selectedCollection.featuredFabricIds.includes(f.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
            Curated Mill Forecasts
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
            Seasonal Collections &amp; Lookbooks
          </h1>
          <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Forecasting color directions, yarn innovations, and tactile surface structures crafted by our in-house trend and textile engineering team.
          </p>
        </div>

        <button
          onClick={onOpenCatalogModal}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 min-h-[42px] transition-colors"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Download All Lookbooks (PDF)</span>
        </button>
      </div>

      {/* Collection Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLLECTIONS_DATA.map((col) => {
          const isSelected = selectedCollection.id === col.id;
          return (
            <div
              key={col.id}
              onClick={() => setSelectedCollection(col)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-amber-950/10 border-amber-600 shadow-md ring-1 ring-amber-600/30'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-800 font-bold uppercase">{col.season}</span>
                <span className="text-stone-500">{col.featuredFabricIds.length} Fabrics</span>
              </div>

              <h2 className="text-lg font-serif font-bold text-stone-900">
                {col.title}
              </h2>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {col.description}
              </p>

              <div className="flex items-center gap-1.5 pt-1">
                {col.themeColors.map((color, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-stone-300 shadow-xs"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Collection Spotlight Hero */}
      <div className="bg-stone-950 text-white rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Visual Moodboard Photo */}
          <div className="relative h-72 sm:h-96 lg:h-auto min-h-[360px] overflow-hidden bg-stone-900">
            <img
              src={selectedCollection.coverImage}
              alt={selectedCollection.title}
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Collection Details & Narrative */}
          <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{selectedCollection.season} Trend Direction</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {selectedCollection.title}
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {selectedCollection.description}
              </p>

              {/* Tagline / Inspiration Points */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                  Curation Directive:
                </span>
                <p className="text-xs text-stone-300 font-medium italic">
                  &ldquo;{selectedCollection.tagline}&rdquo;
                </p>
              </div>

              {/* Palette */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                  Harmonized Color Story:
                </span>
                <div className="flex items-center gap-2">
                  {selectedCollection.themeColors.map((hex, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800">
                      <span className="w-3.5 h-3.5 rounded-full border border-stone-600" style={{ backgroundColor: hex }} />
                      <span className="text-[10px] font-mono text-stone-300">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-stone-400">
                Ready for seasonal sample dispatch
              </span>
              <button
                onClick={onOpenCatalogModal}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 min-h-[38px]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Lookbook PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Fabrics featured in this collection */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Fabrics Featured in {selectedCollection.title}
          </h2>
          <span className="text-xs font-mono text-stone-500">
            {collectionFabrics.length} Articles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionFabrics.map((fabric) => (
            <div
              key={fabric.id}
              onClick={() => onSelectFabric(fabric)}
              className="group bg-white rounded-2xl border border-stone-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
            >
              <img
                src={fabric.image}
                alt={fabric.name}
                className="w-20 h-20 rounded-xl object-cover border border-stone-200 flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {fabric.code}
                </span>
                <h3 className="text-sm font-serif font-bold text-stone-900 truncate group-hover:text-amber-800 transition-colors">
                  {fabric.name}
                </h3>
                <p className="text-xs text-stone-500 truncate">
                  {fabric.composition}
                </p>
                <p className="text-[11px] font-mono text-stone-400">
                  {fabric.gsm} GSM • {fabric.weave}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

