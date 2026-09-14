import React from 'react';
import { 
  Factory, 
  Cpu, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  ShieldCheck, 
  Download 
} from 'lucide-react';
import { MANUFACTURING_STEPS, MACHINERY_LIST, LAB_TESTS, MILL_METRICS } from '../../data/capabilities';

interface CapabilitiesViewProps {
  onNavigate: (path: string) => void;
  onOpenCatalogModal: () => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({
  onNavigate,
  onOpenCatalogModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
            Manufacturing Infrastructure
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
            Industrial Capabilities &amp; QC
          </h1>
          <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
            State-of-the-art Japanese air-jet looms, German continuous finishing ranges, and accredited laboratory instrumentation delivering global export consistency.
          </p>
        </div>

        <button
          onClick={onOpenCatalogModal}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 min-h-[42px] transition-colors"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Download Mill Capability Spec (PDF)</span>
        </button>
      </div>

      {/* Mill Metrics KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {MILL_METRICS.map((m, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 block">
              {m.value}
            </span>
            <span className="text-xs font-mono text-amber-800 font-semibold uppercase block mt-1">
              {m.label}
            </span>
            <p className="text-[11px] text-stone-500 mt-1 leading-snug">
              {m.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Primary Machinery Fleet Breakdown */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-mono uppercase text-amber-700 font-semibold tracking-wider">
            Production Assets
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Machinery &amp; Looms Fleet
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MACHINERY_LIST.map((m, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {m.type}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  Origin: {m.origin}
                </span>
              </div>

              <h3 className="text-base font-serif font-bold text-stone-900">
                {m.brand}
              </h3>

              <div className="pt-2 border-t border-stone-100 space-y-1 text-xs font-mono">
                <div className="text-stone-700">
                  <strong>Count:</strong> {m.count}
                </div>
                <div className="text-stone-500 text-[11px] leading-relaxed">
                  {m.specs}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manufacturing Workflow (8 Stages Deep Dive) */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-mono uppercase text-amber-700 font-semibold tracking-wider">
            Standard Operating Procedures
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            End-to-End Vertical Manufacturing Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MANUFACTURING_STEPS.map((step) => (
            <div 
              key={step.stepNumber}
              className="bg-stone-50 p-6 rounded-2xl border border-stone-200 hover:border-amber-600/40 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-stone-900 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                    0{step.stepNumber}
                  </span>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {step.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone-500 uppercase">
                  Stage {step.stepNumber}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {step.description}
              </p>

              <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-stone-400 uppercase text-[10px] block">Machinery:</span>
                  <span className="font-semibold text-stone-800">{step.machinery}</span>
                </div>
                <div>
                  <span className="text-amber-800 uppercase text-[10px] block font-bold">Quality Checkpoint:</span>
                  <span className="font-semibold text-amber-900">{step.qualityCheck}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accredited Textile Laboratory Testing */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 border border-stone-800 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider block mb-1">
            Physical &amp; Analytical Testing
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            ISO / AATCC / ASTM Accredited Laboratory
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Every production dye lot undergoes comprehensive physical, colorfastness, and chemical safety testing prior to fabric roll inspection and release.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LAB_TESTS.map((t, idx) => (
            <div key={idx} className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 font-bold bg-stone-900 px-2 py-0.5 rounded border border-stone-800 block w-fit">
                {t.standard}
              </span>
              <h3 className="text-sm font-serif font-bold text-white">
                {t.testName}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t.description}
              </p>
              <div className="text-[11px] font-mono text-emerald-400 pt-1">
                Benchmark: {t.passCriteria}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-stone-400 font-mono">
            Full certified lab test reports provided with every commercial Bill of Lading.
          </p>
          <button
            onClick={() => onNavigate('/request-quote')}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-colors min-h-[42px]"
          >
            Request Factory Audit &amp; Lab Tour
          </button>
        </div>
      </div>

    </div>
  );
};
