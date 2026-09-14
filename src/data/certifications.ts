// Certifications & compliance dataset for Reshma Tex
// Note: Mark: TODO: Replace with real official certificate registration numbers & PDF audit reports from Reshma Tex QA Director.
import { CertificationItem } from '../types';

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'cert-oeko',
    code: 'OEKO-TEX-STD-100',
    name: 'OEKO-TEX® Standard 100 (Class I & II)',
    issuer: 'OEKO-TEX International Association',
    validThrough: '2026-12-31',
    category: 'Chemical Safety',
    logo: '🛡️',
    scope: 'Certified free from harmful levels of over 100 toxic chemicals, formaldehydes, azo dyes, heavy metals, and chlorinated phenols. Compliant with EU REACH Annex XVII.',
    testingStandards: ['ISO 17050-1', 'REACH SVHC Candidate List', 'AATCC Test Method 112'],
    verificationUrl: 'https://www.oeko-tex.com/en/label-check',
    documentPlaceholderUrl: '#'
  },
  {
    id: 'cert-gots',
    code: 'GOTS-ORG-008',
    name: 'Global Organic Textile Standard (GOTS Version 7.0)',
    issuer: 'Control Union Certifications B.V.',
    validThrough: '2026-10-15',
    category: 'Environmental',
    logo: '🌱',
    scope: 'Ensures organic status of textiles from harvesting of raw fibers through environmentally and socially responsible manufacturing up to labeling.',
    testingStandards: ['GOTS 7.0 Ecological Criteria', 'GMO Free DNA Testing', 'Zero Hazardous Chemicals'],
    verificationUrl: 'https://global-standard.org/public-database',
    documentPlaceholderUrl: '#'
  },
  {
    id: 'cert-bci',
    code: 'BCI-SUPP-492',
    name: 'Better Cotton Initiative (BCI)',
    issuer: 'Better Cotton Platform',
    validThrough: '2027-01-20',
    category: 'Environmental',
    logo: '🌿',
    scope: 'Supports sustainable farming practices, water stewardship, soil health conservation, and fair working conditions across cotton farming supply chain.',
    testingStandards: ['BCI Production Principles', 'Mass Balance Chain of Custody'],
    verificationUrl: 'https://bettercotton.org',
    documentPlaceholderUrl: '#'
  },
  {
    id: 'cert-grs',
    code: 'GRS-REC-114',
    name: 'Global Recycled Standard (GRS 4.0)',
    issuer: 'IDFL Laboratory and Institute',
    validThrough: '2026-11-30',
    category: 'Environmental',
    logo: '♻️',
    scope: 'Verifies recycled content percentage (minimum 50% for certified products) and monitors strict social, environmental, and chemical processing criteria.',
    testingStandards: ['GRS 4.0 Chain of Custody', 'Post-Consumer Fiber Tracking'],
    verificationUrl: 'https://textileexchange.org/standards/global-recycled-standard/',
    documentPlaceholderUrl: '#'
  },
  {
    id: 'cert-iso9001',
    code: 'ISO-9001-2015',
    name: 'ISO 9001:2015 Quality Management Systems',
    issuer: 'SGS International Accreditation',
    validThrough: '2027-06-18',
    category: 'Quality',
    logo: '⚙️',
    scope: 'Certified factory operating standards covering loom preventive maintenance, yarn lot testing, 4-point fabric inspection, and batch traceability.',
    testingStandards: ['ISO 9001:2015', 'ASTM D5430 4-Point System', 'AATCC Shrinkage Matrix'],
    verificationUrl: 'https://www.iso.org',
    documentPlaceholderUrl: '#'
  },
  {
    id: 'cert-iso14001',
    code: 'ISO-14001-2015',
    name: 'ISO 14001:2015 Environmental Management',
    issuer: 'TUV Rheinland',
    validThrough: '2027-04-12',
    category: 'Environmental',
    logo: '🌍',
    scope: 'Continuous monitoring of water discharge, boiler stack emissions, thermal energy heat recovery, and hazardous waste containment.',
    testingStandards: ['ISO 14001:2015', 'ZDHC Wastewater Guidelines Level 3', 'Air Quality Monitoring'],
    verificationUrl: 'https://www.tuv.com',
    documentPlaceholderUrl: '#'
  }
];
