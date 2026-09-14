// Journal and textile industry articles for Reshma Tex
// Note: Mark: TODO: Replace with real company blog and editorial content.

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Textile Engineering' | 'Sustainability' | 'Market Trends' | 'Sourcing Guide';
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  summary: string;
  coverImage: string;
  content: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'understanding-4-point-system-fabric-inspection',
    title: 'De-Mystifying the ASTM D5430 4-Point System for Woven Fabrics',
    category: 'Textile Engineering',
    date: 'October 12, 2025',
    readTime: '6 min read',
    author: 'Tariq Mehmood',
    authorRole: 'Head of Quality Assurance',
    summary: 'A technical deep-dive into how defect points are allocated, calculated per 100 square yards, and how to negotiate acceptable quality thresholds with your apparel mill.',
    coverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    content: [
      'For global apparel brands sourcing millions of meters of fabric annually, dimensional consistency and visual defect tolerances dictate cut-to-ship ratios. The ASTM D5430 standard (commonly known as the 4-point system) remains the gold standard in fabric inspection.',
      'Defects up to 3 inches incur 1 point; 3 to 6 inches incur 2 points; 6 to 9 inches incur 3 points; and defects exceeding 9 inches (or holes) receive 4 points. The total points are normalized against fabric width and roll length.',
      'At Reshma Tex, our automated camera inspection combined with master inspector double-checks keeps average points below 16 per 100 sq. yards, well beyond commercial Class A thresholds.'
    ]
  },
  {
    id: 'art-02',
    slug: 'cold-pad-batch-dyeing-benefits',
    title: 'Why Cold Pad-Batch Dyeing is Transforming Sustainable Wovens',
    category: 'Sustainability',
    date: 'November 04, 2025',
    readTime: '5 min read',
    author: 'Dr. Ayesha Siddiqui',
    authorRole: 'Chief Chemical Technologist',
    summary: 'How cold pad-batch technology slashes water consumption by 65% and salt usage by 50% while improving color leveling and tensile fabric strength.',
    coverImage: 'https://images.unsplash.com/photo-1603251578711-3290ca1a0187?q=80&w=800&auto=format&fit=crop',
    content: [
      'Traditional exhaust dyeing in jet vessels subjects delicate woven fibers to intense hydraulic turbulence and thermal stress at 98°C. Cold Pad-Batch (CPB) dyeing replaces this with controlled room-temperature pad application followed by slow batch rotation.',
      'Because the dye fix occurs at ambient temperature over 8 to 16 hours, cotton cellulose fibers preserve their natural elongation, tensile tenacity, and surface sheen.',
      'The result for apparel designers is a fabric with richer color depth, zero crease marks, and significantly reduced carbon footprint.'
    ]
  },
  {
    id: 'art-03',
    slug: 'navigating-cotton-yarn-count-gsm-relationships',
    title: 'The Buyer’s Guide: Decoding Yarn Counts (Ne) vs GSM and Fabric Drape',
    category: 'Sourcing Guide',
    date: 'January 18, 2026',
    readTime: '7 min read',
    author: 'Rashid Khan',
    authorRole: 'VP of International Sourcing',
    summary: 'Why an 80s/2 120 GSM poplin feels worlds apart from a 30s single-yarn 120 GSM plain weave. A clear reference for textile product managers.',
    coverImage: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop',
    content: [
      'One of the most common pitfalls when developing tech-packs is specifying GSM without defining yarn count, twist factor, or reed/pick density.',
      'Two fabrics can both measure 130 GSM, yet one has the crisp, dry snap of high-twist compact yarn, while the other exhibits soft fluid drape. Understanding the English cotton count (Ne) and compact spinning differences is essential for flawless bulk production.',
      'Our team assists international brand sourcing departments in mapping exact hand-feel benchmarks to verifiable yarn constructions.'
    ]
  }
];
