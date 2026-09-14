import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('reshmatex_cookie_consent');
      if (!consent) {
        // Show banner after brief delay
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('reshmatex_cookie_consent', JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem('reshmatex_cookie_consent', JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('reshmatex_cookie_consent', JSON.stringify({
        essential: true,
        analytics,
        marketing,
        timestamp: new Date().toISOString()
      }));
    } catch {}
    setIsPreferencesOpen(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      role="region" 
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-stone-900/95 text-stone-200 backdrop-blur-md p-5 rounded-2xl border border-stone-700 shadow-2xl animate-slideUp text-xs"
    >
      {!isPreferencesOpen ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-serif text-sm font-semibold text-white">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Privacy & Cookie Preferences</span>
          </div>

          <p className="text-stone-400 leading-relaxed">
            Reshma Tex uses functional cookies for our fabric comparison and swatch kit drawers, plus privacy-first anonymous analytics to optimize global export routing.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg transition-colors min-h-[36px]"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg transition-colors min-h-[36px]"
            >
              Essential Only
            </button>
            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="px-2.5 py-2 text-stone-400 hover:text-white underline underline-offset-4 flex items-center gap-1 ml-auto min-h-[36px]"
            >
              <Settings className="w-3 h-3" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <span className="font-semibold text-white">Granular Cookie Controls</span>
            <button onClick={() => setIsPreferencesOpen(false)} className="text-stone-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between bg-stone-950 p-2 rounded border border-stone-800">
              <div>
                <p className="font-semibold text-stone-200">Strictly Necessary</p>
                <p className="text-[10px] text-stone-400">Cart, Sample Kit, Security, Navigation</p>
              </div>
              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase">Always On</span>
            </div>

            <div className="flex items-center justify-between bg-stone-950 p-2 rounded border border-stone-800">
              <div>
                <p className="font-semibold text-stone-200">Anonymous Analytics</p>
                <p className="text-[10px] text-stone-400">Plausible aggregate page visits, zero PII</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-4 h-4 rounded border-stone-700 text-amber-600 focus:ring-amber-500"
                aria-label="Toggle analytics cookies"
              />
            </div>

            <div className="flex items-center justify-between bg-stone-950 p-2 rounded border border-stone-800">
              <div>
                <p className="font-semibold text-stone-200">Marketing & Inquiry Sync</p>
                <p className="text-[10px] text-stone-400">Saves your company profile across RFQs</p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-4 h-4 rounded border-stone-700 text-amber-600 focus:ring-amber-500"
                aria-label="Toggle marketing cookies"
              />
            </div>
          </div>

          <button
            onClick={handleSavePreferences}
            className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg transition-colors mt-2 min-h-[36px]"
          >
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
};
