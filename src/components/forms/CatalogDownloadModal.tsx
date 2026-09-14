import React, { useState } from 'react';
import { X, Download, CheckCircle, FileText, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../../lib/store';

interface CatalogDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogDownloadModal: React.FC<CatalogDownloadModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useAppStore();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Apparel Brand Buyer');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid corporate email.');
      return;
    }
    setSubmitted(true);
    showToast('Catalog unlocked! Downloading Reshma Tex 2026 Lookbook PDF...');
    
    // Trigger virtual download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', 'Reshma_Tex_Global_Mill_Catalog_2026.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-modal-title"
    >
      <div 
        className="bg-stone-900 text-stone-100 rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-stone-800 shadow-2xl relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center"
          aria-label="Close catalog download"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5 text-amber-500 font-mono text-xs uppercase tracking-wider">
              <Download className="w-4 h-4" />
              <span>Official 2026 Mill Catalog</span>
            </div>

            <h3 id="catalog-modal-title" className="text-xl font-serif font-bold text-white">
              Download Complete Fabric Lookbook &amp; Technical Spec Guide
            </h3>

            <p className="text-stone-400 text-xs leading-relaxed">
              Includes comprehensive yarn specifications, standard colorway charts, weave constructions, MOQs, testing parameters, and FOB indicative price guidelines.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-stone-300 text-xs font-medium mb-1 font-mono uppercase text-[11px]">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sourcing.director@fashionbrand.com"
                  className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-medium mb-1 font-mono uppercase text-[11px]">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Nordic Apparel Group / Zara Vendor"
                  className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-medium mb-1 font-mono uppercase text-[11px]">
                  Your Sourcing Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Apparel Brand Sourcing">Apparel Brand Sourcing</option>
                  <option value="Textile Importer / Wholesaler">Textile Importer / Wholesaler</option>
                  <option value="Garment Manufacturer">Garment Manufacturer</option>
                  <option value="Interior & Contract Designer">Interior &amp; Contract Designer</option>
                  <option value="Independent Designer">Independent Fashion Designer</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-colors shadow-lg min-h-[44px]"
              >
                Instant PDF Download (84 Pages • 18 MB)
              </button>
            </div>

            <p className="text-[10px] text-stone-500 text-center font-mono">
              Zero spam policy. We respect your confidentiality and supplier privacy.
            </p>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Your Download has Started</h3>
            <p className="text-stone-300 text-xs leading-relaxed max-w-sm mx-auto">
              Thank you for your interest in Reshma Tex. The 2026 Mill Catalog has been initiated and a permanent link has been sent to <strong className="text-amber-400">{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors min-h-[40px]"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
