import React, { useState, useMemo } from 'react';
import { 
  Grid, 
  List, 
  RotateCcw, 
  Layers, 
  FileText, 
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { FABRICS_DATA } from '../../data/fabrics';
import { FabricItem, FilterState } from '../../types';
import { FabricCard } from '../fabrics/FabricCard';
import { FabricFilters } from '../fabrics/FabricFilters';

interface FabricsViewProps {
  onSelectFabric: (fabric: FabricItem) => void;
  onNavigate: (path: string) => void;
  onOpenCatalogModal: () => void;
}

export const FabricsView: React.FC<FabricsViewProps> = ({
  onSelectFabric,
  onNavigate,
  onOpenCatalogModal,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const initialFilters: FilterState = {
    category: '',
    weave: '',
    finish: '',
    certification: '',
    minGsm: 80,
    maxGsm: 450,
    minMoq: 0,
    maxMoq: 2000,
    searchQuery: '',
    sortBy: 'featured'
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Filter & Sort Logic
  const filteredFabrics = useMemo(() => {
    return FABRICS_DATA.filter(fabric => {
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = fabric.name.toLowerCase().includes(q);
        const matchesCode = fabric.code.toLowerCase().includes(q);
        const matchesComp = fabric.composition.toLowerCase().includes(q);
        const matchesCat = fabric.category.toLowerCase().includes(q);
        const matchesWeave = fabric.weave.toLowerCase().includes(q);
        const matchesApp = fabric.recommendedApplications.some(a => a.toLowerCase().includes(q));
        if (!matchesName && !matchesCode && !matchesComp && !matchesCat && !matchesWeave && !matchesApp) {
          return false;
        }
      }

      // Category
      if (filters.category && fabric.category !== filters.category) {
        return false;
      }

      // Weave
      if (filters.weave && !fabric.weave.toLowerCase().includes(filters.weave.toLowerCase().replace(' weave', ''))) {
        return false;
      }

      // GSM
      if (fabric.gsm < filters.minGsm || fabric.gsm > filters.maxGsm) {
        return false;
      }

      // MOQ
      if (fabric.moqMeters > filters.maxMoq) {
        return false;
      }

      // Certification
      if (filters.certification && !fabric.certifications.some(c => c.toLowerCase().includes(filters.certification.toLowerCase()))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'gsm-asc') return a.gsm - b.gsm;
      if (filters.sortBy === 'gsm-desc') return b.gsm - a.gsm;
      if (filters.sortBy === 'moq-asc') return a.moqMeters - b.moqMeters;
      if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      // 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
            Certified Manufacturing Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
            Fabric Explorer
          </h1>
          <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Filter our certified textile collection by composition, GSM weight, weave construction, and international sustainability accreditations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCatalogModal}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-2 min-h-[40px] transition-colors"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Download Spec PDF</span>
          </button>
          <button
            onClick={() => onNavigate('/request-sample')}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs font-bold uppercase tracking-wider min-h-[40px] transition-colors shadow-sm"
          >
            Order Swatches
          </button>
        </div>
      </div>

      {/* Filter Controls Panel */}
      <FabricFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        totalResultsCount={filteredFabrics.length}
      />

      {/* Fabrics Listing Results */}
      {filteredFabrics.length === 0 ? (
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-12 text-center space-y-4">
          <Layers className="w-12 h-12 mx-auto text-stone-400 stroke-[1.5]" />
          <h3 className="text-lg font-serif font-bold text-stone-800">
            No Fabrics Matched Your Current Filters
          </h3>
          <p className="text-stone-500 text-xs max-w-md mx-auto leading-relaxed">
            Try loosening your GSM range, clearing your search query, or resetting weave parameters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFabrics.map((fabric) => (
            <FabricCard
              key={fabric.id}
              fabric={fabric}
              onSelect={onSelectFabric}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}

      {/* Sourcing Assistance Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-stone-800 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-serif font-bold text-white">
            Need a Custom Yarn Blend or Proprietary Finish?
          </h3>
          <p className="text-xs text-stone-400 max-w-xl leading-relaxed">
            Our in-house R&amp;D laboratory engineers custom yarn counts, DWR water-repellency, anti-microbial coatings, and bespoke weave constructions for orders exceeding 3,000 meters.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/request-quote')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-colors whitespace-nowrap min-h-[42px]"
        >
          Consult R&amp;D Engineers
        </button>
      </div>

    </div>
  );
};
