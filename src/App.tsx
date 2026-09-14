import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SkipLink } from './components/common/SkipLink';
import { Toast } from './components/common/Toast';
import { CookieConsent } from './components/common/CookieConsent';
import { FabricDetailModal } from './components/fabrics/FabricDetailModal';
import { FabricCompareDrawer } from './components/fabrics/FabricCompareDrawer';
import { SampleKitDrawer } from './components/fabrics/SampleKitDrawer';
import { CatalogDownloadModal } from './components/forms/CatalogDownloadModal';
import { RFQForm } from './components/forms/RFQForm';
import { SampleRequestForm } from './components/forms/SampleRequestForm';

// Sections
import { HomeView } from './components/sections/HomeView';
import { FabricsView } from './components/sections/FabricsView';
import { CollectionsView } from './components/sections/CollectionsView';
import { CapabilitiesView } from './components/sections/CapabilitiesView';
import { SustainabilityView } from './components/sections/SustainabilityView';
import { CertificationsView } from './components/sections/CertificationsView';
import { AboutView } from './components/sections/AboutView';
import { ContactView } from './components/sections/ContactView';
import { JournalView } from './components/sections/JournalView';
import { DealersView } from './components/sections/DealersView';
import { AccessibilityView, PrivacyPolicyView, TermsOfTradeView } from './components/sections/LegalViews';

import { FabricItem } from './types';
import { FABRICS_DATA } from './data/fabrics';

export default function App() {
  // Navigation path state with hash fallback for static SPA preview compatibility
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedFabric, setSelectedFabric] = useState<FabricItem | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState<boolean>(false);

  // Synchronize path on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPath(hash.startsWith('/') ? hash : `/${hash}`);
      } else if (window.location.pathname && window.location.pathname !== '/') {
        setCurrentPath(window.location.pathname);
      } else {
        setCurrentPath('/');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFabric = (fabric: FabricItem) => {
    setSelectedFabric(fabric);
  };

  // Render view corresponding to currentPath
  const renderView = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return (
          <HomeView
            onNavigate={navigate}
            onSelectFabric={handleSelectFabric}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        );

      case '/fabrics':
        return (
          <FabricsView
            onSelectFabric={handleSelectFabric}
            onNavigate={navigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        );

      case '/collections':
        return (
          <CollectionsView
            onSelectFabric={handleSelectFabric}
            onNavigate={navigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        );

      case '/capabilities':
        return (
          <CapabilitiesView
            onNavigate={navigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        );

      case '/sustainability':
        return (
          <SustainabilityView
            onNavigate={navigate}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        );

      case '/certifications':
        return (
          <CertificationsView
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        );

      case '/about':
        return (
          <AboutView onNavigate={navigate} />
        );

      case '/contact':
        return (
          <ContactView />
        );

      case '/dealers':
        return (
          <DealersView />
        );

      case '/journal':
        return (
          <JournalView />
        );

      case '/request-quote':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <RFQForm />
          </div>
        );

      case '/request-sample':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <SampleRequestForm />
          </div>
        );

      case '/accessibility':
        return <AccessibilityView />;

      case '/privacy':
        return <PrivacyPolicyView />;

      case '/terms':
        return <TermsOfTradeView />;

      default:
        // Fallback for fabric deep link e.g. /fabrics/rt-101
        if (currentPath.startsWith('/fabrics/')) {
          const code = currentPath.replace('/fabrics/', '').toLowerCase();
          const matched = FABRICS_DATA.find(f => f.code.toLowerCase() === code || f.id.toLowerCase() === code);
          if (matched) {
            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <button
                  onClick={() => navigate('/fabrics')}
                  className="text-xs font-mono text-amber-800 hover:underline font-semibold"
                >
                  &larr; Back to all fabrics
                </button>
                <div className="p-8 bg-white rounded-2xl border border-stone-200">
                  <h1 className="text-3xl font-serif font-bold text-stone-900">{matched.name}</h1>
                  <p className="text-stone-600 mt-2">{matched.description}</p>
                </div>
              </div>
            );
          }
        }

        return (
          <HomeView
            onNavigate={navigate}
            onSelectFabric={handleSelectFabric}
            onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* 1. Accessible Skip Navigation Anchor */}
      <SkipLink targetId="main-content" />

      {/* 2. Global Accessible Header Navigation */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* 3. Main Landmark Content Container */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {renderView()}
      </main>

      {/* 4. Global Semantic Footer */}
      <Footer onNavigate={navigate} onOpenCatalogModal={() => setIsCatalogModalOpen(true)} />

      {/* 5. Modals and Drawers */}
      <FabricDetailModal
        fabric={selectedFabric}
        onClose={() => setSelectedFabric(null)}
        onNavigate={navigate}
      />

      <FabricCompareDrawer
        onNavigate={navigate}
        onSelectFabric={handleSelectFabric}
      />

      <SampleKitDrawer onNavigate={navigate} />

      <CatalogDownloadModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />

      {/* 6. Notifications & GDPR/Cookie Preferences */}
      <Toast />
      <CookieConsent />
    </div>
  );
}
