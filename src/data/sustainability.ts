// Sustainability disclosures and environmental data for Reshma Tex
// Note: Mark: TODO: Replace with official annual ESG report metrics from Reshma Tex Sustainability Office.

export interface SustainabilityPillar {
  id: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  initiatives: string[];
}

export const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    id: 'water-stewardship',
    title: 'Zero Liquid Discharge (ZLD) Water Stewardship',
    metric: '94%',
    metricLabel: 'Process Water Recycled & Reused',
    description: 'Our biological effluent treatment plant combined with multi-stage reverse osmosis and mechanical vapor recompression crystallizers recovers 94% of wet-processing water back into the dyehouse.',
    initiatives: [
      'Membrane bioreactor biological digestion of dyes and sizing agents',
      'High-recovery reverse osmosis producing permeate water with TDS < 100 ppm',
      'Sludge salt crystallization preventing groundwater contamination',
      'ZDHC Wastewater Guidelines Level 3 compliance audited quarterly'
    ]
  },
  {
    id: 'renewable-energy',
    title: 'Clean Solar Energy & Thermal Heat Recovery',
    metric: '3.8 MW',
    metricLabel: 'Onsite Solar PV Capacity',
    description: 'Rooftop photovoltaic arrays generate clean electricity supplying daytime spinning and weaving demand. Flue gas heat exchangers recover exhaust thermal energy to preheat boiler feedwater.',
    initiatives: [
      '12,000+ Monocrystalline solar panels installed across weaving sheds',
      'Thermal economizers recovering 1.4 Gcal/hr of waste chimney heat',
      'Biomass fuel blend utilizing agricultural husk instead of high-sulfur coal',
      '42% reduction in greenhouse gas emissions per meter of finished fabric since 2021'
    ]
  },
  {
    id: 'circular-fibers',
    title: 'Certified Organic & Circular Fibers',
    metric: '68%',
    metricLabel: 'Of Total Volume in Sustainable Fibers',
    description: 'We prioritize fibers that nourish rather than deplete agricultural ecosystems: certified organic cotton, European flax, recycled polyester from certified ocean plastic, and closed-loop Tencel™.',
    initiatives: [
      '100% pesticide-free GOTS cotton sourcing with traceable digital ginning receipts',
      'Post-consumer PET bottle recycling certified under GRS 4.0',
      'Regenerative cotton pilot projects working directly with farming cooperatives',
      'Zero virgin polyester policy across all shirting and fashion blends by 2027'
    ]
  },
  {
    id: 'safe-chemistry',
    title: 'Clean Chemistry & Worker Health',
    metric: '100%',
    metricLabel: 'Non-Hazardous Dyes & Auxiliaries',
    description: 'We enforce an absolute ban on alkylphenol ethoxylates (APEOs), perfluorinated compounds (PFAS), heavy metal mordants, and banned azo dyes throughout our chemical recipe inventory.',
    initiatives: [
      'Pre-screened chemical management registered on the ZDHC Gateway',
      'Bluesign-approved dyestuff selection for deep color fastness without toxic mordants',
      'Automated computerized dye dispensing to prevent worker inhalation risks',
      'Continuous occupational air quality monitoring in all finishing halls'
    ]
  }
];

export const ESG_TARGETS_2030 = [
  { target: 'Net Zero Water Waste', progress: 94, unit: '%' },
  { target: '100% Renewable Electricity', progress: 62, unit: '%' },
  { target: 'Traceable Organic/Recycled Fiber Share', progress: 74, unit: '%' },
  { target: 'Scope 1 & 2 Carbon Reduction', progress: 48, unit: '%' }
];
