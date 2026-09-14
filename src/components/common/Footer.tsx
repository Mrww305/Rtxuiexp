import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  ExternalLink 
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenCatalogModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCatalogModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const { showToast } = useAppStore();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid corporate email.');
      return;
    }
    setNewsletterSubmitted(true);
    showToast('Subscribed! Company catalog link sent to your email.');
  };

  return (
    <footer 
      role="contentinfo"
      className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Brand, B2B Catalog Download Gate, and Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-stone-950 flex items-center justify-center font-bold font-serif text-xl tracking-wider">
                RT
              </div>
              <span className="text-2xl font-bold font-serif tracking-wider text-white">
                RESHMA <span className="text-amber-500 font-light">TEX</span>
              </span>
            </div>
            
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              A vertically integrated global textile and fabric manufacturing enterprise. 
              Supplying high-performance wovens, certified organic linens, circular knits, and contract textiles to leading fashion brands and apparel importers across 42+ countries.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> OEKO-TEX Standard 100
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> GOTS Organic
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Quick Newsletter & Catalog Download Gate */}
          <div className="lg:col-span-4 bg-stone-900/60 p-6 rounded-2xl border border-stone-800">
            <h3 className="text-white font-serif text-lg font-semibold mb-2 flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-500" /> 
              Download 2026 Mill Catalog
            </h3>
            <p className="text-stone-400 text-xs mb-4 leading-relaxed">
              Receive the complete 84-page fabric specification lookbook with yarn count tables, MOQ matrices, and pricing tiers.
            </p>

            {newsletterSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-3 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>Catalog sent! You can also download direct via the modal.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="corporate.buyer@brand.com"
                    className="bg-stone-950 border border-stone-700 text-stone-100 px-3 py-2 text-xs rounded-lg flex-1 focus:outline-none focus:border-amber-500"
                    required
                    aria-label="Corporate email for catalog download"
                  />
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-4 py-2 text-xs rounded-lg transition-colors min-h-[40px]"
                  >
                    Get PDF
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onOpenCatalogModal}
                  className="text-[11px] text-stone-400 hover:text-amber-400 underline underline-offset-4"
                >
                  Or preview spec sheet directly &rarr;
                </button>
              </form>
            )}
          </div>

          {/* Direct Sales Hotline */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-serif text-base font-semibold">Global Sales Desks</h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Industrial Textile Zone, Faisalabad / Surat Hub</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:+18007374628" className="hover:text-white transition-colors">+1-800-737-4628 (Direct B2B)</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="mailto:export@reshmatex.com" className="hover:text-white transition-colors">export@reshmatex.com</a>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://wa.me/18007374628?text=Hello%20Reshma%20Tex%20Sales%20Team%2C%20I%20would%20like%20to%20inquire%20about%20fabric%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-900/60 text-xs font-mono transition-colors"
              >
                <span>WhatsApp B2B Desk</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Middle Tier: Structured Sitemaps & Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs">
          
          <div>
            <h4 className="font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">Fabrics & Weaves</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('/fabrics')} className="hover:text-white">Organic Poplins & Shirtings</button></li>
              <li><button onClick={() => onNavigate('/fabrics')} className="hover:text-white">Bull Denim & Twill Weaves</button></li>
              <li><button onClick={() => onNavigate('/fabrics')} className="hover:text-white">Belgian Flax Linen Blends</button></li>
              <li><button onClick={() => onNavigate('/fabrics')} className="hover:text-white">Recycled Active Interlock</button></li>
              <li><button onClick={() => onNavigate('/fabrics')} className="hover:text-white">Technical Cordura Ripstop</button></li>
              <li><button onClick={() => onNavigate('/fabrics')} className="hover:text-white">Botanical Jacquard Drapery</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">Manufacturing</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('/capabilities')} className="hover:text-white">Air-Jet & Rapier Looms</button></li>
              <li><button onClick={() => onNavigate('/capabilities')} className="hover:text-white">Cold Pad-Batch Dyeing</button></li>
              <li><button onClick={() => onNavigate('/capabilities')} className="hover:text-white">ASTM 4-Point QC Testing Lab</button></li>
              <li><button onClick={() => onNavigate('/sustainability')} className="hover:text-white">Zero Liquid Discharge (ZLD)</button></li>
              <li><button onClick={() => onNavigate('/sustainability')} className="hover:text-white">3.8 MW Solar Energy Plant</button></li>
              <li><button onClick={() => onNavigate('/certifications')} className="hover:text-white">Testing Reports & Standards</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">Buyer Services</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('/request-quote')} className="hover:text-white font-semibold text-amber-400">Request a Quote (RFQ)</button></li>
              <li><button onClick={() => onNavigate('/request-sample')} className="hover:text-white">Order Swatch Kit Box</button></li>
              <li><button onClick={() => onNavigate('/collections')} className="hover:text-white">Seasonal Lookbooks</button></li>
              <li><button onClick={() => onNavigate('/dealers')} className="hover:text-white">Distributors & Dealers</button></li>
              <li><button onClick={() => onNavigate('/journal')} className="hover:text-white">Textile Engineering Journal</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">Corporate & Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-white">Heritage & Leadership</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-white">Global Mill Coordinates</button></li>
              <li><button onClick={() => onNavigate('/accessibility')} className="hover:text-white">Accessibility Statement (WCAG 2.2)</button></li>
              <li><button onClick={() => onNavigate('/privacy')} className="hover:text-white">Privacy & Data Policy</button></li>
              <li><button onClick={() => onNavigate('/cookies')} className="hover:text-white">Cookie Consent Preferences</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <p>© {new Date().getFullYear()} Reshma Tex (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Incoterms 2020 Compliant</span>
            <span>•</span>
            <span>Exporting Worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
