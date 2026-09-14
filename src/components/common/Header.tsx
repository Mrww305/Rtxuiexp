import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  FileText, 
  PhoneCall, 
  ShoppingBag, 
  Search 
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { state, setSampleKitOpen } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or ESC
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { label: 'Fabrics', path: '/fabrics' },
    { label: 'Collections', path: '/collections' },
    { label: 'Capabilities', path: '/capabilities' },
    { label: 'Sustainability', path: '/sustainability' },
    { label: 'Certifications', path: '/certifications' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'UR', name: 'اردو (Urdu)' },
    { code: 'AR', name: 'العربية (Arabic)' },
    { code: 'FR', name: 'Français (French)' },
  ];

  return (
    <header 
      role="banner"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-stone-900/95 text-stone-100 backdrop-blur-md shadow-md border-b border-stone-800 py-3' 
          : 'bg-stone-900 text-stone-100 border-b border-stone-800 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded p-1 group"
          aria-label="Reshma Tex Home"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-600 text-stone-950 flex items-center justify-center font-bold font-serif text-xl tracking-wider shadow-inner group-hover:bg-amber-500 transition-colors">
            RT
          </div>
          <div>
            <div className="text-xl font-bold tracking-widest font-serif uppercase flex items-center gap-1.5">
              <span>RESHMA</span>
              <span className="text-amber-500 font-light">TEX</span>
            </div>
            <p className="text-[10px] tracking-wider text-stone-400 uppercase font-mono">
              Global Textile Mills • Est. 1988
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav 
          role="navigation" 
          aria-label="Main Navigation" 
          className="hidden lg:flex items-center space-x-1 xl:space-x-2"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-400 bg-stone-800/80 font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 min-h-[40px]"
              aria-label={`Current language is ${selectedLang}. Click to toggle language menu`}
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isLangOpen && (
              <div 
                className="absolute right-0 mt-1 w-44 bg-stone-900 border border-stone-700 rounded-lg shadow-xl py-1 z-50 text-xs"
                role="menu"
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    role="menuitem"
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-stone-800 flex items-center justify-between ${
                      selectedLang === lang.code ? 'text-amber-400 font-bold bg-stone-800/50' : 'text-stone-300'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="font-mono text-[10px] text-stone-500">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sample Swatch Kit Drawer Trigger */}
          <button
            onClick={() => setSampleKitOpen(true)}
            className="relative p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 transition-colors flex items-center gap-1.5 text-xs min-h-[40px] px-3"
            aria-label={`Sample Swatch Kit Drawer, currently contains ${state.sampleKitIds.length} swatches`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline font-medium">Sample Kit</span>
            {state.sampleKitIds.length > 0 && (
              <span className="bg-amber-500 text-stone-950 font-bold text-[11px] px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {state.sampleKitIds.length}
              </span>
            )}
          </button>

          {/* Primary Request a Quote CTA */}
          <button
            onClick={() => onNavigate('/request-quote')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold rounded-lg text-xs tracking-wide uppercase shadow-md transition-transform active:scale-95 flex items-center gap-1.5 min-h-[40px]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => setSampleKitOpen(true)}
            className="relative p-2 rounded-md bg-stone-800 text-amber-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open Sample Kit"
          >
            <Layers className="w-5 h-5" />
            {state.sampleKitIds.length > 0 && (
              <span className="absolute top-1 right-1 bg-amber-500 text-stone-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {state.sampleKitIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md bg-stone-800 text-stone-200 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-[65px] bg-stone-950/95 backdrop-blur-lg z-50 p-6 flex flex-col justify-between overflow-y-auto border-t border-stone-800 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Navigation</p>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-3 px-4 rounded-lg text-base font-medium flex items-center justify-between min-h-[44px] ${
                  currentPath === item.path
                    ? 'bg-amber-950/50 text-amber-400 border border-amber-800/60 font-semibold'
                    : 'text-stone-200 hover:bg-stone-900'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-stone-600 text-sm font-mono">&rarr;</span>
              </button>
            ))}

            <div className="pt-4 border-t border-stone-800 space-y-2">
              <button
                onClick={() => {
                  onNavigate('/request-quote');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-amber-600 text-stone-950 font-bold rounded-lg uppercase tracking-wider text-sm flex items-center justify-center gap-2 min-h-[44px]"
              >
                <FileText className="w-4 h-4" />
                <span>Request a Quote (RFQ)</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('/request-sample');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-stone-800 text-stone-200 font-semibold rounded-lg text-sm flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Request Swatch Sample Box</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
            <span>Direct B2B Hotline: +1-800-737-4628</span>
            <span className="font-mono text-amber-500">ISO & OEKO-TEX</span>
          </div>
        </div>
      )}
    </header>
  );
};
