import React from 'react';
import { X, Layers, Trash2, ArrowUpRight, Scale } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { FabricItem } from '../../types';

interface FabricCompareDrawerProps {
  onNavigate: (path: string) => void;
  onSelectFabric: (fabric: FabricItem) => void;
}

export const FabricCompareDrawer: React.FC<FabricCompareDrawerProps> = ({
  onNavigate,
  onSelectFabric,
}) => {
  const { 
    state, 
    compareFabrics, 
    removeCompare, 
    clearCompare, 
    setCompareDrawerOpen, 
    addToSampleKit,
    setRfqPrefillFabricId
  } = useAppStore();

  if (!state.isCompareDrawerOpen || compareFabrics.length === 0) return null;

  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-50 bg-stone-950/95 text-stone-100 backdrop-blur-xl border-t border-stone-800 shadow-2xl animate-slideUp max-h-[85vh] overflow-y-auto"
      role="dialog"
      aria-label="Fabric Technical Comparison Drawer"
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                <span>Technical Fabric Comparison</span>
                <span className="text-xs font-mono bg-stone-800 px-2 py-0.5 rounded text-amber-400">
                  {compareFabrics.length} / 4
                </span>
              </h3>
              <p className="text-xs text-stone-400 font-sans">
                Side-by-side textile metrics for garment specification & sourcing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-stone-400 hover:text-rose-400 px-2.5 py-1.5 rounded hover:bg-stone-900 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={() => setCompareDrawerOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close fabric comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col auto-cols-[240px] sm:auto-cols-[280px] gap-4">
            
            {compareFabrics.map((f) => (
              <div 
                key={f.id}
                className="bg-stone-900 rounded-xl p-4 border border-stone-800 flex flex-col justify-between space-y-3"
              >
                {/* Header & Thumbnail */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                      {f.code}
                    </span>
                    <button
                      onClick={() => removeCompare(f.id)}
                      className="text-stone-400 hover:text-rose-400 p-1"
                      aria-label={`Remove ${f.name} from comparison`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div 
                    className="h-32 rounded-lg overflow-hidden relative cursor-pointer"
                    onClick={() => {
                      setCompareDrawerOpen(false);
                      onSelectFabric(f);
                    }}
                  >
                    <img 
                      src={f.image} 
                      alt={f.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform" 
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                  </div>

                  <h4 
                    onClick={() => {
                      setCompareDrawerOpen(false);
                      onSelectFabric(f);
                    }}
                    className="font-serif font-bold text-sm text-stone-100 hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {f.name}
                  </h4>
                </div>

                {/* Specs List */}
                <div className="space-y-1.5 text-xs text-stone-300 border-t border-stone-800 pt-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-stone-500">GSM:</span>
                    <span className="font-bold text-white">{f.gsm} g/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Weave:</span>
                    <span className="text-amber-300">{f.weave}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Composition:</span>
                    <span className="text-stone-200 text-right truncate max-w-[140px]" title={f.composition}>
                      {f.composition}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Width:</span>
                    <span>{f.widthInches}&quot; ({f.widthCm}cm)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">MOQ:</span>
                    <span className="font-semibold text-white">{f.moqMeters.toLocaleString()}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Lead Time:</span>
                    <span>{f.leadTimeWeeks} Weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Tear Strength:</span>
                    <span>{f.tearStrengthWarpN}N / {f.tearStrengthWeftN}N</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Shrinkage:</span>
                    <span>&lt; {f.shrinkagePercent}%</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-stone-500">Eco-Score:</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded text-[10px]">
                      Grade {f.ecoScore}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-2 border-t border-stone-800 space-y-1.5">
                  <button
                    onClick={() => addToSampleKit(f.id)}
                    className="w-full py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded flex items-center justify-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add to Sample Kit</span>
                  </button>
                  <button
                    onClick={() => {
                      setRfqPrefillFabricId(f.id);
                      setCompareDrawerOpen(false);
                      onNavigate('/request-quote');
                    }}
                    className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase rounded flex items-center justify-center gap-1"
                  >
                    <span>Request RFQ</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};
