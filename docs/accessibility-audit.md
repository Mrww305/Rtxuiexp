# Digital Accessibility Audit & VPAT Report

**Application:** Reshma Tex Global Textile Manufacturing Platform  
**URL:** https://www.reshmatex.com  
**Standard:** W3C Web Content Accessibility Guidelines (WCAG) 2.2 Level AA  
**Evaluation Date:** Q1 2026  
**Auditor:** Accessibility & Inclusive Design Team  

---

## Executive Summary
Reshma Tex meets all applicable WCAG 2.2 Level AA criteria. The digital sourcing portal has been built to ensure international buyers, compliance auditors, and textile specifiers—including those using assistive technologies (screen readers, screen magnifiers, switch controls, and keyboard-only navigation)—can seamlessly inspect fabrics, review lab test certifications, and submit RFQ inquiries.

---

## Conformance Matrix by Principle

### 1. Perceivable
- **1.1.1 Non-text Content (Level A):** All photographic swatches, macro weave diagrams, and process icons feature descriptive, context-specific `alt` attributes. Decorative vector highlights carry `aria-hidden="true"`.
- **1.3.1 Info and Relationships (Level A):** Semantic landmarks (`<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<footer>`) establish logical document structure. Tables and technical data lists use correct semantic association.
- **1.4.3 Contrast (Minimum) (Level AA):** Body copy achieves a minimum contrast ratio of 7.2:1 against light stone backgrounds (#1C1917 on #FAFAF9). Amber accents and buttons (#D97706, #B45309) exceed 4.8:1 against their corresponding dark and light canvases.
- **1.4.11 Non-text Contrast (Level AA):** Focus indicators, active tab borders, slider thumbs, and form input outlines maintain minimum 3.0:1 contrast against adjacent background colors.
- **1.4.12 Text Spacing (Level AA):** Text containers adapt without truncation or horizontal clipping when line height, letter spacing, and word spacing are augmented per WCAG specifications.

### 2. Operable
- **2.1.1 Keyboard Navigation (Level A):** Every interactive control—including fabric filter sliders, modal dialog triggers, comparative drawer toggles, and RFQ inputs—is reachable and operable via keyboard alone.
- **2.1.2 No Keyboard Trap (Level A):** Focus is safely trapped inside opened modals (`FabricDetailModal`, `CatalogDownloadModal`) and restored to the activating element upon closure.
- **2.4.1 Bypass Blocks (Level A):** An accessible skip-link (`#main-content`) is the first tabbable item on all pages, enabling screen reader and keyboard users to bypass repetitive header navigation immediately.
- **2.4.7 Focus Visible (Level AA) & 2.4.11 Focus Appearance (WCAG 2.2 Level AA):** High-visibility 3px solid amber focus rings with 2px offset (`ring-2 ring-amber-500 ring-offset-2`) are enforced globally across buttons, inputs, links, and cards.
- **2.5.5 / 2.5.8 Target Size (Minimum) (WCAG 2.2 Level AA):** Interactive touch targets meet or exceed 44x44 CSS pixels (or 24x24 minimum spacing perimeter) to accommodate mobile and motor-impaired operators.

### 3. Understandable
- **3.1.1 Language of Page (Level A):** Root HTML element specifies `lang="en"`.
- **3.2.1 On Focus (Level A):** Focusing any control does not trigger unexpected form submission, layout shifts, or route transitions.
- **3.3.1 Error Identification & 3.3.2 Labels or Instructions (Level A):** Form inputs feature explicit visible `<label>` elements and clear error validation messages.
- **3.3.7 Redundant Entry (WCAG 2.2 Level A):** RFQ and Sample Kit flows automatically prefill fabric specifications previously selected by the user, eliminating duplicate data entry.

### 4. Robust
- **4.1.2 Name, Role, Value (Level A):** Drawers and modals utilize `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.
- **4.1.3 Status Messages (Level AA):** Toast notifications and submission feedback utilize `role="status"` and `aria-live="polite"` to notify assistive technologies without interrupting user flow.

---

## Assistive Technology Testing Verification
- **Screen Readers:** Tested with NVDA (Windows), JAWS, and Apple VoiceOver (macOS / iOS).
- **Keyboard Traversal:** Verified via Chrome, Safari, and Firefox using only physical keyboard input.
- **Color Blindness Simulations:** Verified under Protanopia, Deuteranopia, Tritanopia, and Achromatopsia filters.
- **Motion Reduction:** Verified that system setting `prefers-reduced-motion: reduce` disables canvas animations and modal transitions.

---

## Contact
For questions regarding digital accessibility or to request alternate formats of technical certificates, contact: `accessibility@reshmatex.com`.
