import React, { useState, useEffect } from 'react';
import { 
  X, 
  Layers, 
  Check, 
  Download, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Maximize2,
  Minimize2,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { FabricItem, Colorway } from '../../types';
import { useAppStore } from '../../lib/store';
import { Fabric360Viewer } from '../three/Fabric360Viewer';
import { InteractiveWeaveCanvas, WeavePattern } from '../three/InteractiveWeaveCanvas';

interface FabricDetailModalProps {
  fabric: FabricItem | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const FabricDetailModal: React.FC<FabricDetailModalProps> = ({
  fabric,
  onClose,
  onNavigate,
}) => {
  const { state, addToSampleKit, removeFromSampleKit, setRfqPrefillFabricId, showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<'360' | 'weave' | 'specs'>('360');
  const [selectedColorway, setSelectedColorway] = useState<Colorway | null>(null);

  useEffect(() => {
    if (fabric && fabric.colorways.length > 0) {
      setSelectedColorway(fabric.colorways[0]);
    }
  }, [fabric]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!fabric) return null;

  const isInSampleKit = state.sampleKitIds.includes(fabric.id);

  // Map weave string to canvas pattern
  const getWeavePattern = (weave: string): WeavePattern => {
    const lower = weave.toLowerCase();
    if (lower.includes('twill')) return 'twill';
    if (lower.includes('satin')) return 'satin';
    if (lower.includes('basket')) return 'basket';
    if (lower.includes('ripstop')) return 'ripstop';
    return 'plain';
  };

  const handleDownloadSpecSheet = () => {
    // Generates a clean browser print preview or spec sheet
    showToast(`Generating certified TDS (Technical Data Sheet) for ${fabric.code}...`);
    window.print();
  };

  const handleRequestQuote = () => {
    setRfqPrefillFabricId(fabric.id);
    onClose();
    onNavigate('/request-quote');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fabric-modal-title"
    >
      <div 
        className="bg-white text-stone-900 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative animate-scaleUp flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-xs font-bold px-2.5 py-1 rounded-md">
              {fabric.code}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
              {fabric.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close fabric details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-8 flex-1">
          
          {/* Main Visual & Interactive Viewer Stage */}
          <div className="space-y-3">
            
            {/* View Mode Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-2">
              <div className="flex items-center gap-2" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === '360'}
                  onClick={() => setActiveTab('360')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                    activeTab === '360'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  360° Fabric Close-Up
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'weave'}
                  onClick={() => setActiveTab('weave')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                    activeTab === 'weave'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Interactive Macro Weave Loom
                </button>
              </div>

              <span className="text-xs font-mono text-stone-400 hidden sm:inline">
                Weave Draft: {fabric.weave}
              </span>
            </div>

            {/* Interactive Viewer Tab Display */}
            {activeTab === '360' ? (
              <Fabric360Viewer 
                imageSrc={fabric.highResSwatch} 
                fabricName={fabric.name} 
                weaveType={fabric.weave}
              />
            ) : (
              <InteractiveWeaveCanvas
                initialPattern={getWeavePattern(fabric.weave)}
                initialWarpColor={selectedColorway?.hex || '#1C2D42'}
                initialWeftColor="#E7E5E4"
                allowCustomization={true}
              />
            )}

            {/* Colorway Selector */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-stone-500 uppercase text-[11px] font-semibold">
                  Lab Dip Colorways ({fabric.colorways.length}):
                </span>
                <span className="font-semibold text-stone-900">
                  {selectedColorway?.name} ({selectedColorway?.pantoneCode})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {fabric.colorways.map((cw, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColorway(cw)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform shadow-sm min-w-[32px] min-h-[32px] ${
                      selectedColorway?.name === cw.name 
                        ? 'border-amber-600 scale-110 ring-2 ring-amber-500/30' 
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: cw.hex }}
                    aria-label={`Select ${cw.name} colorway`}
                    title={`${cw.name} - ${cw.pantoneCode}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Fabric Specifications Grid */}
          <div className="space-y-4">
            <div>
              <h2 id="fabric-modal-title" className="text-2xl font-serif font-bold text-stone-900">
                {fabric.name}
              </h2>
              <p className="text-stone-600 text-sm mt-1 leading-relaxed">
                {fabric.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Composition</span>
                <span className="font-semibold text-stone-900">{fabric.composition}</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Weight (GSM)</span>
                <span className="font-semibold text-stone-900">{fabric.gsm} g/m²</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Cuttable Width</span>
                <span className="font-semibold text-stone-900">{fabric.widthInches}&quot; ({fabric.widthCm} cm)</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Yarn Count</span>
                <span className="font-semibold text-stone-900">{fabric.yarnCount}</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Weave Draft</span>
                <span className="font-semibold text-stone-900">{fabric.weave}</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Finishing Chemistry</span>
                <span className="font-semibold text-stone-900">{fabric.finish}</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Minimum Order (MOQ)</span>
                <span className="font-semibold text-stone-900">{fabric.moqMeters.toLocaleString()} Meters</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px]">Production Lead Time</span>
                <span className="font-semibold text-stone-900">{fabric.leadTimeWeeks} Weeks</span>
              </div>
            </div>

            {/* Quality & Laboratory Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-mono block text-[11px]">Tear Strength (ISO 13937-1)</span>
                <span className="font-bold text-stone-800 text-sm mt-0.5 block">
                  Warp: {fabric.tearStrengthWarpN}N | Weft: {fabric.tearStrengthWeftN}N
                </span>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-mono block text-[11px]">Dimensional Stability</span>
                <span className="font-bold text-stone-800 text-sm mt-0.5 block">
                  Residual Shrinkage &lt; {fabric.shrinkagePercent}%
                </span>
              </div>
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-700 font-mono block text-[11px]">Environmental Eco-Score</span>
                <span className="font-bold text-emerald-800 text-sm mt-0.5 block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Grade {fabric.ecoScore} (Low Carbon Footprint)
                </span>
              </div>
            </div>

            {/* Recommended Garment Applications */}
            <div>
              <span className="text-xs font-mono uppercase text-stone-500 tracking-wider block mb-2 font-semibold">
                Recommended Apparel & Textile Applications:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {fabric.recommendedApplications.map((app, i) => (
                  <span 
                    key={i} 
                    className="bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-full border border-stone-200 font-medium"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications List */}
            <div>
              <span className="text-xs font-mono uppercase text-stone-500 tracking-wider block mb-2 font-semibold">
                Compliance Certifications:
              </span>
              <div className="flex flex-wrap gap-2">
                {fabric.certifications.map((cert, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-3 py-1 rounded-lg font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="sticky bottom-0 bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 z-20">
          
          <button
            onClick={handleDownloadSpecSheet}
            className="px-4 py-2.5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 min-h-[42px] transition-colors"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Download Spec Sheet (PDF)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isInSampleKit) {
                  removeFromSampleKit(fabric.id);
                } else {
                  addToSampleKit(fabric.id);
                }
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 min-h-[42px] transition-colors ${
                isInSampleKit
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-stone-200 hover:bg-stone-300 text-stone-900'
              }`}
            >
              {isInSampleKit ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4 text-amber-700" />}
              <span>{isInSampleKit ? 'In Swatch Kit' : 'Add to Swatch Kit'}</span>
            </button>

            <button
              onClick={handleRequestQuote}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-bold uppercase tracking-wider min-h-[42px] transition-colors shadow-md"
            >
              Request Quote (RFQ)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
