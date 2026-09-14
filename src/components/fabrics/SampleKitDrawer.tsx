import React from 'react';
import { X, Layers, Trash2, ArrowRight, PackageCheck, Truck } from 'lucide-react';
import { useAppStore } from '../../lib/store';

interface SampleKitDrawerProps {
  onNavigate: (path: string) => void;
}

export const SampleKitDrawer: React.FC<SampleKitDrawerProps> = ({ onNavigate }) => {
  const { 
    state, 
    sampleKitFabrics, 
    removeFromSampleKit, 
    clearSampleKit, 
    setSampleKitOpen 
  } = useAppStore();

  if (!state.isSampleKitOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-kit-drawer-title"
    >
      <div 
        className="w-full max-w-md bg-stone-900 text-stone-100 h-full shadow-2xl flex flex-col justify-between border-l border-stone-800 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 id="sample-kit-drawer-title" className="font-serif font-bold text-base text-white">
                Swatch Sample Kit
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                {sampleKitFabrics.length} / 6 Complimentary Swatches Selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setSampleKitOpen(false)}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close Sample Kit Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Swatch List Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {sampleKitFabrics.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-stone-400">
              <Layers className="w-12 h-12 mx-auto text-stone-600 stroke-[1.5]" />
              <p className="text-sm font-medium text-stone-300">Your Swatch Kit is currently empty.</p>
              <p className="text-xs max-w-xs mx-auto leading-relaxed">
                Explore our fabric catalog and click &quot;Sample&quot; on any fabric to add up to 6 custom swatches for express delivery.
              </p>
              <button
                onClick={() => {
                  setSampleKitOpen(false);
                  onNavigate('/fabrics');
                }}
                className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase rounded-lg transition-colors"
              >
                Browse Fabrics
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono pb-1">
                <span>Selected Swatch Hangers</span>
                <button
                  onClick={clearSampleKit}
                  className="hover:text-rose-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              {sampleKitFabrics.map((fabric) => (
                <div 
                  key={fabric.id}
                  className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 flex items-center justify-between gap-3 group hover:border-amber-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={fabric.image} 
                      alt={fabric.name}
                      className="w-12 h-12 rounded-lg object-cover border border-stone-700 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-amber-400 font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                        {fabric.code}
                      </span>
                      <h4 className="text-xs font-serif font-bold text-stone-100 truncate mt-0.5">
                        {fabric.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate">
                        {fabric.composition} • {fabric.gsm} GSM
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromSampleKit(fabric.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-stone-800 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center flex-shrink-0"
                    aria-label={`Remove ${fabric.name} swatch from kit`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Express delivery note */}
              <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800/80 text-xs text-stone-400 space-y-1.5 font-mono">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-[11px]">
                  <Truck className="w-4 h-4" />
                  <span>Express Global Courier Dispatch</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-400">
                  Shipped directly via DHL Express / FedEx Priority. Generous A4 swatch cuts with verified technical spec labels and color shade cards.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Drawer Bottom CTA */}
        {sampleKitFabrics.length > 0 && (
          <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-2">
            <button
              onClick={() => {
                setSampleKitOpen(false);
                onNavigate('/request-sample');
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg min-h-[44px]"
            >
              <span>Order Sample Swatch Kit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-stone-500 font-mono">
              Complimentary for verified apparel brands, designers & importers
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
