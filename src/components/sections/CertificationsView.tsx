import React from 'react';
import { ShieldCheck, ExternalLink, Download, FileCheck, CheckCircle2 } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../../data/certifications';

interface CertificationsViewProps {
  onOpenCatalogModal: () => void;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({ onOpenCatalogModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-800 tracking-widest font-semibold block mb-1">
            Compliance &amp; Accredited Audits
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
            Global Certifications
          </h1>
          <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
            All Reshma Tex manufacturing sites are audited annually by independent international testing bodies, certifying chemical safety, fiber authenticity, and environmental management.
          </p>
        </div>

        <button
          onClick={onOpenCatalogModal}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 min-h-[42px] transition-colors"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download Audit Docket (ZIP)</span>
        </button>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS_DATA.map((cert) => (
          <div 
            key={cert.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono text-stone-400">
                  Valid thru: {cert.validThrough}
                </span>
              </div>

              <h2 className="text-lg font-serif font-bold text-stone-900">
                {cert.name}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed">
                {cert.scope}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Cert Body:</span>
                <span className="font-semibold text-stone-800">{cert.issuer}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>License #:</span>
                <span className="font-bold text-amber-800">{cert.code}</span>
              </div>
              <div className="pt-1 text-[11px] text-stone-600">
                <strong className="text-stone-700 block uppercase text-[10px]">Testing Standards:</strong>
                <span className="line-clamp-2">{cert.testingStandards.join(' • ')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-mono text-emerald-800 hover:text-emerald-900 font-semibold flex items-center gap-1"
              >
                <span>Verify Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="text-[11px] font-mono text-stone-400 bg-stone-50 px-2 py-0.5 rounded">
                Active Status
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Social & Ethical Audits Section */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-8 space-y-6">
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Social Labor Standards &amp; Ethical Workplace Audits
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Beyond technical fabric compliance, Reshma Tex enforces progressive labor welfare, fair wages, zero child or forced labor, and comprehensive workplace safety verified under Sedex SMETA 4-Pillar and WRAP Gold certifications.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
            <strong className="block text-stone-900">SMETA 4-Pillar</strong>
            <span className="text-stone-500 text-[11px]">Sedex Certified Ethical Audit</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
            <strong className="block text-stone-900">WRAP Gold Level</strong>
            <span className="text-stone-500 text-[11px]">Worldwide Responsible Accredited Production</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
            <strong className="block text-stone-900">Fair Wages &amp; Benefits</strong>
            <span className="text-stone-500 text-[11px]">Healthcare &amp; Education Subsidies</span>
          </div>
        </div>
      </div>

    </div>
  );
};
