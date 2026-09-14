// Type definitions for Reshma Tex Global Textile Manufacturing Platform

export type WeaveType = 
  | 'Plain Weave' 
  | 'Twill Weave' 
  | 'Satin Weave' 
  | 'Jacquard' 
  | 'Circular Knit' 
  | 'Rib Knit' 
  | 'Waffle / Honeycomb' 
  | 'Dobby' 
  | 'Ripstop';

export type FabricCategory = 
  | 'Shirting & Suiting' 
  | 'Bottomweight & Denim' 
  | 'Sustainable & Organic' 
  | 'Active & Performance' 
  | 'Luxury & Eveningwear' 
  | 'Home & Contract Textile' 
  | 'Workwear & Technical';

export type FinishType = 
  | 'Bio-Polished Enzyme' 
  | 'Mercerized' 
  | 'Sanforized' 
  | 'Peach Skin Carbon Finish' 
  | 'Water Repellent (C0 DWR)' 
  | 'Brushed Back' 
  | 'Silicone Softener' 
  | 'Flame Retardant' 
  | 'Anti-Bacterial Silver Ion';

export interface Colorway {
  name: string;
  hex: string;
  pantoneCode: string;
}

export interface FabricItem {
  id: string;
  code: string;
  name: string;
  category: FabricCategory;
  composition: string;
  gsm: number;
  widthInches: number;
  widthCm: number;
  weave: WeaveType;
  finish: FinishType;
  yarnCount: string;
  construction: string;
  moqMeters: number;
  leadTimeWeeks: number;
  pricePerMeterEstimatedUSD: number;
  certifications: string[];
  recommendedApplications: string[];
  colorways: Colorway[];
  image: string;
  highResSwatch: string;
  tearStrengthWarpN?: number;
  tearStrengthWeftN?: number;
  shrinkagePercent?: number;
  ecoScore: 'A+' | 'A' | 'B+';
  description: string;
  inStockMeters?: number;
  isFeatured?: boolean;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  season: string;
  tagline: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  featuredFabricIds: string[];
  themeColors: string[];
  lookbookPdfUrl: string;
}

export interface CertificationItem {
  id: string;
  code: string;
  name: string;
  issuer: string;
  validThrough: string;
  category: 'Environmental' | 'Social' | 'Quality' | 'Chemical Safety';
  logo: string;
  scope: string;
  testingStandards: string[];
  verificationUrl: string;
  documentPlaceholderUrl: string;
}

export interface ManufacturingStep {
  stepNumber: number;
  title: string;
  subTitle: string;
  machinery: string;
  capacity: string;
  qualityCheck: string;
  description: string;
  iconName: string;
}

export interface RFQFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  destinationPort: string;
  incoterm: 'FOB' | 'CIF' | 'CFR' | 'EXW' | 'DDP';
  selectedFabricIds: string[];
  customFabricCode?: string;
  targetQuantityMeters: number;
  targetPriceUSD?: string;
  requiredDeliveryDate: string;
  applicationUsage: string;
  specNotes: string;
  complianceRequirements: string[];
  fileName?: string;
}

export interface SampleRequestFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  courierAccountNumber?: string;
  courierProvider?: 'DHL' | 'FedEx' | 'UPS' | 'Standard Air';
  fabricIds: string[];
  urgentSample: boolean;
  projectDescription?: string;
}

export interface DealerInquiryData {
  contactPerson: string;
  organizationName: string;
  email: string;
  territory: string;
  annualTurnoverUSD: string;
  clientBaseDescription: string;
  message: string;
}

export interface FilterState {
  category: string;
  weave: string;
  finish: string;
  certification: string;
  minGsm: number;
  maxGsm: number;
  minMoq: number;
  maxMoq: number;
  searchQuery: string;
  sortBy: 'featured' | 'gsm-asc' | 'gsm-desc' | 'moq-asc' | 'name-asc';
}
