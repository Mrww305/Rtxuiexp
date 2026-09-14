import React from 'react';
import { Shield, CheckCircle, Scale, Eye } from 'lucide-react';

export const AccessibilityView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-stone-800">
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
          VPAT &amp; Digital Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Accessibility Statement (WCAG 2.2 Level AA)
        </h1>
        <p className="text-stone-500 text-xs font-mono mt-1">
          Last comprehensive conformance audit: Q1 2026
        </p>
      </div>

      <div className="prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4">
        <p>
          Reshma Tex is dedicated to providing an accessible, barrier-free digital procurement platform for textile buyers, garment technicians, and sourcing teams worldwide. We adhere rigorously to the <strong>W3C Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong> and Section 508 standards.
        </p>

        <h2 className="text-lg font-serif font-bold text-stone-900 pt-2">
          Engineering Conformance Measures
        </h2>
        <ul className="list-disc list-inside space-y-2 text-stone-700">
          <li><strong>Keyboard Navigation:</strong> All interactive elements, modal drawers, fabric filter sliders, and swatch selectors are 100% operable via keyboard (<kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-xs">Tab</kbd>, <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-xs">Shift+Tab</kbd>, <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-xs">Enter</kbd>, <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-xs">Space</kbd>, and <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-xs">Esc</kbd>).</li>
          <li><strong>High-Visibility Focus Rings:</strong> Enforced 3px solid amber focus rings with 2px offset on all interactive controls conforming to WCAG 2.2 Criterion 2.4.11 (Focus Appearance).</li>
          <li><strong>Skip Navigation:</strong> Direct skip-link present as the first focusable element on every page to bypass repetitive header navigation and jump directly to <code>#main-content</code>.</li>
          <li><strong>Color Contrast Ratios:</strong> All body copy exceeds the 4.5:1 minimum contrast threshold against light backgrounds (minimum 7:1 for headline copy). Pure grayscale contrast checks verified.</li>
          <li><strong>Reduced Motion (prefers-reduced-motion):</strong> All 3D thread animations, canvas weaves, and drawer transitions respect operating system reduced-motion user preferences.</li>
          <li><strong>Assistive Technology &amp; Screen Readers:</strong> Rich ARIA landmarks, roles, live regions for toast alerts, and descriptive alt attributes for microscopic weave imagery.</li>
        </ul>

        <h2 className="text-lg font-serif font-bold text-stone-900 pt-2">
          Accessibility Feedback &amp; Assistance
        </h2>
        <p>
          If you encounter any barrier while configuring fabric specifications or requesting swatches, please contact our digital accessibility team at <a href="mailto:accessibility@reshmatex.com" className="text-amber-800 underline font-semibold">accessibility@reshmatex.com</a>.
        </p>
      </div>
    </div>
  );
};

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-stone-800">
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
          Data Governance &amp; GDPR
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Privacy Policy &amp; Data Security
        </h1>
        <p className="text-stone-500 text-xs font-mono mt-1">Effective: January 2026</p>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
        <p>
          Reshma Tex (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects the confidentiality and proprietary nature of textile sourcing projects. This Privacy Policy governs information collected through www.reshmatex.com.
        </p>

        <h2 className="text-lg font-serif font-bold text-stone-900 pt-2">1. Data Collected for Sourcing &amp; Swatch Delivery</h2>
        <p>
          When submitting an RFQ, downloading mill lookbooks, or ordering physical swatch kits, we collect corporate contact details including buyer names, business email addresses, company name, shipping destination, and optional tech-pack attachments.
        </p>

        <h2 className="text-lg font-serif font-bold text-stone-900 pt-2">2. Confidentiality of Tech-Packs &amp; Formulations</h2>
        <p>
          All buyer-submitted tech-packs, CAD drafts, Pantone color targets, and weave draft specifications are treated as strictly confidential proprietary trade secrets protected under non-disclosure protocols.
        </p>

        <h2 className="text-lg font-serif font-bold text-stone-900 pt-2">3. Zero Third-Party Monetization</h2>
        <p>
          Reshma Tex does not sell, lease, or distribute commercial buyer data to third-party marketing brokers. Data is strictly utilized for commercial quote calculation and international courier dispatch (DHL Express / FedEx).
        </p>
      </div>
    </div>
  );
};

export const TermsOfTradeView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-stone-800">
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
          Commercial Procurement Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          International Terms of Trade (Incoterms 2020)
        </h1>
        <p className="text-stone-500 text-xs font-mono mt-1">Applicable to all commercial export contracts</p>
      </div>

      <div className="text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
        <h2 className="text-lg font-serif font-bold text-stone-900">1. Commercial Invoicing &amp; Incoterms</h2>
        <p>
          All quotations are tendered in US Dollars (USD) or Euros (EUR) on FOB Karachi / Port Qasim basis unless explicitly negotiated as CIF, CFR, or DDP. Governed by ICC Incoterms 2020 rules.
        </p>

        <h2 className="text-lg font-serif font-bold text-stone-900">2. Fabric Quality Inspection Standards</h2>
        <p>
          Finished fabrics are inspected in conformity with the ASTM D5430 Standard Test Method for Visually Inspecting and Grading Fabrics (4-Point System). The maximum allowable penalty points per 100 linear yards shall not exceed 28 points for first-quality commercial fabric.
        </p>

        <h2 className="text-lg font-serif font-bold text-stone-900">3. Yardage &amp; Width Tolerances</h2>
        <p>
          In accordance with global textile manufacturing standards, commercial yardage tolerances for custom weaving runs are +/- 5% of order quantity. Usable cuttable width is guaranteed within a tolerance of +/- 0.5 inches.
        </p>
      </div>
    </div>
  );
};
