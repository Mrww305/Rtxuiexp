# Reshma Tex — Global Textile & Fabric Manufacturing Platform

[![WCAG 2.2 AA Compliant](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-success)](./docs/accessibility-audit.md)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel%20%7C%20GitHub-blue)](#deployment)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](tsconfig.json)

A modern, high-performance web platform built for **Reshma Tex** (https://www.reshmatex.com) — a premier vertical textile, fabric, and garment manufacturing and export enterprise.

Designed to serve international apparel brands, garment buying houses, technical textile specifiers, and fabric sourcing managers with interactive 3D weave inspection, full catalog filtering, instant RFQ quoting, physical swatch kit ordering, and transparent ESG disclosures.

---

## Key Modules & Functional Architecture

1. **Interactive 3D Weave Engine & Microscopic Canvas**:
   - Algorithmic GPU canvas visualizing Plain Weave, Twill, Satin, Honeycomb, and Ripstop thread interlacing in real time.
   - Dynamic pick/warp density, tension displacement, and thread refraction calculations.
   - Interactive zoom with thread-level magnification and tactile shade adjustments.

2. **Enterprise Fabric Explorer & Catalog**:
   - Multi-parameter filtering by Category, Weave, Finish, Certification, GSM range slider, and MOQ thresholds.
   - Side-by-side technical comparison drawer contrasting warp/weft tear strengths (ASTM D1424), shrinkage tolerances, and yarn counts (Ne).
   - Dynamic search with instantaneous multi-attribute indexing.

3. **Physical Swatch & Sample Kit Management**:
   - Persistent swatch cart allowing buyers to compile custom fabric swatch binders.
   - Expedited international courier dispatch form supporting DHL Express, FedEx, and UPS billing accounts.

4. **Commercial B2B RFQ (Request for Quotation) Flow**:
   - Comprehensive commercial quoting wizard with Incoterms 2020 (FOB Karachi, CIF, CFR, DDP).
   - Container load estimation, destination port routing, technical specification file upload, and compliance checkboxes.

5. **Vertical Mill Capabilities & Quality Control**:
   - 8-stage manufacturing process walkthrough from HVI 1000 fiber screening to automated 4-point ASTM D5430 camera grading.
   - Detailed machinery inventory (Tsudakoma air-jet looms, Monforts continuous dyeing, Brückner stenters, Datacolor 800 spectrophotometers).
   - In-house accredited laboratory test matrix (AATCC 61, ASTM D1424, ASTM D4966).

6. **Sustainability & Zero Liquid Discharge (ZLD)**:
   - Interactive Buyer Eco-Savings Calculator modeling freshwater preservation and CO₂ avoidance.
   - 2030 Science-Based Target milestones tracking verified water recycling (94%) and solar generation (3.8 MW).

7. **Certifications & Audit Compliance**:
   - OEKO-TEX® Standard 100 Class I & II, GOTS 7.0 Organic, Better Cotton Initiative (BCI), Global Recycled Standard (GRS 4.0), ISO 9001:2015, and ZDHC Gateway.
   - Online verification links and accreditation scope disclosures.

---

## Accessibility & Performance Standards

- **WCAG 2.2 Level AA Verified**:
  - Enforced 3px high-contrast solid focus rings with 2px offset.
  - `#main-content` skip-link for keyboard users.
  - Fully navigable via keyboard (<kbd>Tab</kbd>, <kbd>Shift+Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd>, <kbd>Esc</kbd>).
  - High contrast color palette exceeding WCAG AA minimum contrast ratio of 4.5:1 for body copy and 7:1 for headers.
  - Full `prefers-reduced-motion` compliance.
- See the comprehensive [Accessibility Audit Report](./docs/accessibility-audit.md).
- See the [Performance Budget Documentation](./docs/performance-budget.md).

---

## Getting Started & Local Development

```bash
# Clone repository
git clone https://github.com/reshmatex/reshmatex-web.git
cd reshmatex-web

# Install dependencies
npm install

# Run development server
npm run dev

# Run TypeScript validation and linter
npm run lint

# Build for production
npm run build
```

---

## Deployment to Vercel

This repository is pre-configured for zero-config Vercel deployment:
1. Import repository into Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

---

© 2026 Reshma Tex. All rights reserved. Global Textile & Garment Manufacturing.
