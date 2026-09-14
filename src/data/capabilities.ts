// Manufacturing capabilities and process timeline for Reshma Tex
// Note: Mark: TODO: Replace with real mill capacity, machinery rosters, and factory photographs.
import { ManufacturingStep } from '../types';

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    stepNumber: 1,
    title: 'Raw Material Selection & High-Volume Fiber Testing',
    subTitle: 'Traceable GOTS cotton bales, European flax, and GRS recycled filament',
    machinery: 'Zellweger Uster HVI 1000 & AFIS Pro Fiber Testers',
    capacity: '1,200 Tons fiber throughput monthly',
    qualityCheck: 'Fiber length uniformity, micronaire, maturity ratio, trash content < 1.2%',
    description: 'Every incoming shipment undergoes high-speed automated fiber analysis. Cotton bales are tested for tensile strength, elongation, and neps count before clearance into the blowroom.',
    iconName: 'Sparkles'
  },
  {
    stepNumber: 2,
    title: 'Precision Spinning & Combing',
    subTitle: 'Ring-spun, compact-spun, and rotor yarns from 10s to 120s count',
    machinery: 'Rieter G38 Compact Ring Frames & Murata Vortex Spinning',
    capacity: '65,000 Spindles active 24/7',
    qualityCheck: 'Uster Classimat yarn fault detection, hairiness index < 3.8, evenness CV% < 10.5%',
    description: 'Advanced pneumatic compacting condenses protruding fibers into the yarn body, reducing hairiness by 45% and elevating tensile tenacity for high-speed weaving.',
    iconName: 'Orbit'
  },
  {
    stepNumber: 3,
    title: 'High-Speed Weaving & Knitting Looms',
    subTitle: 'Air-jet, rapier, and electronic jacquard looms up to 340cm width',
    machinery: 'Picanol OmniPlus-i air-jet, Toyota JAT810, Staubli Electronic Jacquards',
    capacity: '3.8 Million Meters woven fabric monthly',
    qualityCheck: 'On-loom warp tension sensors, laser filling detectors, zero weft mispicks',
    description: 'Computer-controlled high-efficiency air-jet insertion speeds up to 1,200 RPM enable dense poplins, heavy twills, canvas, and intricate custom dobby textures with flawless selvedges.',
    iconName: 'Grid'
  },
  {
    stepNumber: 4,
    title: 'Low-Liquor Dyeing & Continuous Bleaching',
    subTitle: 'Cold Pad-Batch (CPB) and high-temperature jet dyeing with closed-loop dye recycling',
    machinery: 'Monforts Thermex, Benninger CPB, Thies iMaster HT Dyeing vessels',
    capacity: '120,000 Meters continuous dyed daily',
    qualityCheck: 'Datacolor 800 spectrophotometer Delta E < 0.5 under D65, TL84, CWF illuminants',
    description: 'Cold pad-batch reactive dyeing cuts water usage by 65% compared to traditional beck dyeing, producing exceptional color leveling and deep penetration without fiber stress.',
    iconName: 'Droplet'
  },
  {
    stepNumber: 5,
    title: 'Functional Finishing & Mechanical Calendering',
    subTitle: 'Mercerizing, sanforizing, carbon emerizing, and C0 DWR coatings',
    machinery: 'Brückner Stenter frames, Monforts Toptex compressive shrinkage lines',
    capacity: '100% in-house chemical and physical finishing lines',
    qualityCheck: 'Residual shrinkage < 2.0% in warp and weft across 5 home wash cycles',
    description: 'Controlled moisture and compressive rubber belt sanforizers eliminate shrinkage surprises. Bio-polishing baths remove surface micro-fibrils for permanent pill resistance.',
    iconName: 'Sliders'
  },
  {
    stepNumber: 6,
    title: 'In-House Accredited Testing Laboratory',
    subTitle: 'AATCC, ASTM, and ISO accredited testing on every production dye-lot',
    machinery: 'Instron Universal Tensile Tester, Martindale Abrasion, Atlas Xenon Fade-Ometer',
    capacity: '100% dye-lot testing with digital Certificate of Analysis (COA)',
    qualityCheck: 'Washing fastness (Grade 4-5), Crocking dry/wet (Grade 4/3.5), Pilling Grade 4.5',
    description: 'Our physical and wet chemistry testing facility produces certified lab reports accompanying every export consignment, ensuring buyer conformance prior to vessel departure.',
    iconName: 'Microscope'
  },
  {
    stepNumber: 7,
    title: 'Automated 4-Point System Inspection',
    subTitle: 'Computerized inspection tables with high-frequency LED surface scanners',
    machinery: 'Uster Fabriscan & Darooma Automated 4-Point Grading Stations',
    capacity: '100% fabric roll footage inspected and mapped',
    qualityCheck: 'Penalty points < 18 points per 100 sq. yards (exceeding ASTM D5430 Class A)',
    description: 'Every meter is inspected under 1,500 lux calibrated lighting. Barcoded defect mapping pinpoints flaws to generate roll-specific cut plans for client apparel factories.',
    iconName: 'CheckCircle2'
  },
  {
    stepNumber: 8,
    title: 'Moisture-Barrier Packaging & Global Export',
    subTitle: 'Vacuum polyethylene wrapping, barcoded roll tracking, container stuffing',
    machinery: 'Automatic vacuum roll packing & container loading docks',
    capacity: 'Direct container dispatch to Karachi, Nhava Sheva, Mundra, and direct airfreight',
    qualityCheck: 'Moisture content controlled at 6.5 - 7.5%, desiccant packs sealed in rolls',
    description: 'Heavy gauge UV-resistant poly-wrap preserves fabric freshness across sea voyages to Rotterdam, Los Angeles, Hamburg, Dubai, and Singapore.',
    iconName: 'Truck'
  }
];

export const MILL_METRICS = [
  { label: 'Annual Fabric Capacity', value: '45+ Million', unit: 'Meters / Year', detail: 'Vertically integrated spinning, weaving, and continuous finishing.' },
  { label: 'Active Weaving Looms', value: '380+', unit: 'Air-jet & Rapier', detail: 'High-speed Japanese Tsudakoma & Toyota air-jets operating 24/7.' },
  { label: 'Export Destinations', value: '42+', unit: 'Countries Worldwide', detail: 'North America, Europe, UK, Japan, Australia, and GCC.' },
  { label: 'Water Recycling Rate', value: '94%', unit: 'Zero Liquid Discharge', detail: 'Biological RO & mechanical vapor recompression.' },
  { label: 'Rooftop Solar Generation', value: '3.8 MW', unit: 'Clean Energy', detail: 'Supplies 62% of daytime spinning and weaving power.' },
  { label: 'Average Buyer Lead Time', value: '21 Days', unit: 'From Lab-Dip Approval', detail: 'Fast-track strike-offs and rapid container dispatch.' }
];

export const MACHINERY_LIST = [
  { type: 'Air-Jet Weaving', brand: 'Tsudakoma ZAX9200i Master', count: '180 Looms', origin: 'Japan', specs: '1,100 RPM pick rate, reed width up to 340cm, electronic dobby' },
  { type: 'Continuous Dyeing', brand: 'Monforts Thermex 6500', count: '2 Continuous Ranges', origin: 'Germany', specs: 'Econtrol & pad-dry-pad-steam dyeing with automated color titration' },
  { type: 'Cold Pad-Batch', brand: 'Benninger Küsters Bleach & Dye', count: '4 High-Extraction Heads', origin: 'Switzerland', specs: 'High-uniformity liquor pickup with 65% water reduction' },
  { type: 'Stenter & Finishing', brand: 'Brückner Power-Frame', count: '3 Dual-Energy Lines', origin: 'Germany', specs: 'Multi-zone heat-setting, moisture sensors, Mahlo weft straightener' },
  { type: 'Compact Spinning', brand: 'Rieter G38 Compact Ring', count: '65,000 Spindles', origin: 'Switzerland', specs: 'Counts 16s to 120s combed organic cotton with low hairiness' },
  { type: 'Sanforizing Pre-Shrink', brand: 'Monforts Toptex 8000', count: '2 High-Speed Ranges', origin: 'Germany', specs: 'Controlled residual shrinkage < 2% across 5 wash cycles' },
  { type: 'Color Spectroscopy', brand: 'Datacolor 800 Benchtop', count: '4 Laboratory Units', origin: 'USA', specs: 'Delta E < 0.4 pass threshold across D65, TL84, CWF illuminants' },
  { type: 'Automated 4-Point', brand: 'Uster Fabriscan High-Speed', count: '6 Optical Scanner Lines', origin: 'Switzerland', specs: 'Computerized defect mapping and barcoded roll classification' }
];

export const LAB_TESTS = [
  { standard: 'AATCC 61 (2A)', testName: 'Colorfastness to Commercial Laundering', description: 'Assesses shade change and staining onto multi-fiber adjacent fabrics after multiple rigorous washes.', passCriteria: 'Grade 4.0 - 5.0' },
  { standard: 'ASTM D1424', testName: 'Elmendorf Tear Strength', description: 'Measures force required to propagate a single-rip tear in warp and weft fabric specimens.', passCriteria: '> 18 N Warp / > 15 N Weft' },
  { standard: 'ASTM D4966', testName: 'Martindale Abrasion & Surface Wear', description: 'Evaluates surface fiber fuzzing, pilling, and thread breakdown under controlled circular friction.', passCriteria: '> 30,000 Cycles without breakdown' },
  { standard: 'AATCC 8 / 116', testName: 'Colorfastness to Crocking (Rubbing)', description: 'Determines the degree of color transfer from colored textiles to white test cloths dry and wet.', passCriteria: 'Grade 4.5 Dry / Grade 4.0 Wet' }
];

