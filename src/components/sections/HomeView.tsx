import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Droplet, 
  Sun, 
  Sparkles, 
  Globe2, 
  Download, 
  CheckCircle2, 
  Factory, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { ThreadParticleSystem } from '../three/ThreadParticleSystem';
import { InteractiveWeaveCanvas } from '../three/InteractiveWeaveCanvas';
import { FABRICS_DATA } from '../../data/fabrics';
import { COLLECTIONS_DATA } from '../../data/collections';
import { MANUFACTURING_STEPS, MILL_METRICS } from '../../data/capabilities';
import { FabricItem } from '../../types';
import { FabricCard } from '../fabrics/FabricCard';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onSelectFabric: (fabric: FabricItem) => void;
  onOpenCatalogModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectFabric,
  onOpenCatalogModal,
}) => {
  const featuredFabrics = FABRICS_DATA.filter(f => f.isFeatured).slice(0, 4);

  return (
    <div className="space-y-24">
      
      {/* 1. HERO SECTION: Thread particle visual + Manufacturing positioning */}
      <section 
        aria-label="Reshma Tex Introduction and Capabilities"
        className="relative bg-stone-950 text-stone-100 min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20 border-b border-stone-800"
      >
        {/* Animated Background Thread & Microfiber Particle Canvas */}
        <ThreadParticleSystem count={45} className="absolute inset-0 pointer-events-none opacity-40" />

        {/* Ambient Warm Gradient Loom Lighting */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-amber-400 text-xs font-mono tracking-widest uppercase shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Direct Mill Sourcing • Global Export Operations</span>
          </div>

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Architects of Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Woven &amp; Technical Fabrics
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Vertically integrated textile manufacturing supplying luxury apparel brands, technical workwear, and sustainable organic collections across 42+ countries with certified GOTS, OEKO-TEX, and ZLD environmental standards.
          </p>

          {/* Primary Action Button Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            
            <button
              onClick={() => onNavigate('/fabrics')}
              className="px-7 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all active:scale-95 flex items-center gap-2 min-h-[46px]"
            >
              <span>Explore 2026 Fabric Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/request-quote')}
              className="px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all min-h-[46px] flex items-center gap-2"
            >
              <span>Request Formal RFQ</span>
            </button>

            <button
              onClick={onOpenCatalogModal}
              className="px-5 py-3.5 text-stone-300 hover:text-amber-400 text-xs font-mono transition-colors flex items-center gap-1.5 min-h-[46px]"
            >
              <Download className="w-4 h-4 text-amber-500" />
              <span>Download Spec Book (PDF)</span>
            </button>

          </div>

          {/* Mill Operational Key Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left border-t border-stone-800/80 max-w-5xl mx-auto">
            {MILL_METRICS.map((metric, idx) => (
              <div key={idx} className="bg-stone-900/50 p-3 rounded-xl border border-stone-800">
                <span className="text-xl sm:text-2xl font-serif font-bold text-white block">
                  {metric.value}
                </span>
                <span className="text-[11px] font-mono text-stone-400 block mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE 3D MACRO WEAVE ENGINE SECTION */}
      <section 
        aria-label="Interactive Macro Fabric Weave Simulator"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
              Interactive Creative Technology
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              Macro Weave Interlacing Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            Inspect warp and weft yarn tension in real-time. Switch between authentic weave drafts, manipulate yarn dyes, and examine micro-fiber striations.
          </p>
        </div>

        {/* Live Interactive Shader Canvas */}
        <InteractiveWeaveCanvas
          initialPattern="twill"
          initialWarpColor="#1C2D42"
          initialWeftColor="#E7E5E4"
          allowCustomization={true}
        />
      </section>

      {/* 3. FEATURED FABRIC CATALOG SHOWCASE */}
      <section 
        aria-label="Curated Fabrics"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
              Curated Mill Production
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              High-Specification Fabrics
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/fabrics')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-800 hover:text-amber-800 font-bold uppercase transition-colors"
          >
            <span>View All Fabrics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFabrics.map(fabric => (
            <FabricCard
              key={fabric.id}
              fabric={fabric}
              onSelect={onSelectFabric}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* 4. MANUFACTURING PROCESS TIMELINE (8 STAGES) */}
      <section 
        aria-label="Manufacturing Process and Quality Control"
        className="bg-stone-900 text-stone-100 py-20 border-y border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-semibold">
              Quality Assurance Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              From Raw Bale to Container Dispatch
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Every meter produced at Reshma Tex undergoes verified 8-stage processing adhering to AATCC, ASTM D5430 4-Point grading, and ISO 9001 certified protocols.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MANUFACTURING_STEPS.slice(0, 8).map((step) => (
              <div 
                key={step.stepNumber}
                className="bg-stone-950 p-6 rounded-2xl border border-stone-800 hover:border-amber-600/50 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 uppercase">
                      Stage {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 space-y-1 text-[11px] font-mono">
                  <div className="text-stone-500">
                    <span className="text-stone-400">Machines:</span> {step.machinery}
                  </div>
                  <div className="text-amber-400">
                    <span>QC Check:</span> {step.qualityCheck}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('/capabilities')}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Complete Mill Machinery &amp; Testing Specs</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. SEASONAL LOOKBOOKS TEASER */}
      <section 
        aria-label="Seasonal Collections"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
              Curated Forecast
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              Seasonal Fabric Collections
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/collections')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-800 hover:text-amber-800 font-bold uppercase transition-colors"
          >
            <span>Browse All Lookbooks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLECTIONS_DATA.slice(0, 2).map((col) => (
            <div 
              key={col.id}
              onClick={() => onNavigate('/collections')}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 h-80 sm:h-96 cursor-pointer border border-stone-200 shadow-md"
            >
              <img 
                src={col.coverImage} 
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  {col.season}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 max-w-lg">
                  {col.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {col.themeColors.map((c, i) => (
                      <span key={i} className="w-3.5 h-3.5 rounded-full border border-stone-600" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                    Explore Lookbook &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SUSTAINABILITY & ESG COMMITMENT BANNER */}
      <section 
        aria-label="Sustainability and Environmental Impact"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-8 sm:p-14 border border-emerald-800/80 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700 text-emerald-300 text-xs font-mono uppercase tracking-wider">
              <Droplet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Liquid Discharge (ZLD) Certified</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Responsible Mills. 94% Water Recycled. Zero Compromises.
            </h2>

            <p className="text-emerald-200 text-sm sm:text-base leading-relaxed">
              Reshma Tex operates an advanced biological membrane effluent treatment plant with mechanical vapor recompression. Clean solar arrays generate 3.8 MW, eliminating thousands of tons of annual carbon emissions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono">
              <div className="bg-emerald-900/50 p-3 rounded-xl border border-emerald-800">
                <span className="text-2xl font-bold text-white">94%</span>
                <span className="text-[11px] text-emerald-300 block">Water Re-use</span>
              </div>
              <div className="bg-emerald-900/50 p-3 rounded-xl border border-emerald-800">
                <span className="text-2xl font-bold text-white">3.8 MW</span>
                <span className="text-[11px] text-emerald-300 block">Solar Rooftop</span>
              </div>
              <div className="bg-emerald-900/50 p-3 rounded-xl border border-emerald-800">
                <span className="text-2xl font-bold text-white">100%</span>
                <span className="text-[11px] text-emerald-300 block">ZDHC Chemicals</span>
              </div>
              <div className="bg-emerald-900/50 p-3 rounded-xl border border-emerald-800">
                <span className="text-2xl font-bold text-white">GOTS</span>
                <span className="text-[11px] text-emerald-300 block">Traceable Cotton</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/sustainability')}
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Read Sustainability &amp; ESG Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUICK RFQ CALLOUT */}
      <section className="bg-stone-100 py-16 border-t border-stone-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
            Ready to Accelerate Your Fabric Supply Chain?
          </h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto leading-relaxed">
            Direct mill pricing, reliable shipping to North America, Europe, Asia, and the Middle East, with full lab dip and sample hanger assistance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/request-quote')}
              className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all min-h-[44px]"
            >
              Start Request for Quotation
            </button>
            <button
              onClick={() => onNavigate('/request-sample')}
              className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all min-h-[44px]"
            >
              Order Sample Swatch Kit
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
