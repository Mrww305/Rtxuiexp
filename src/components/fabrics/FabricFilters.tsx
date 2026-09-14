import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  SlidersHorizontal,
  Tag,
  Check
} from 'lucide-react';
import { FilterState } from '../../types';

interface FabricFiltersProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

export const FabricFilters: React.FC<FabricFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResultsCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    'All Categories',
    'Shirting & Suiting',
    'Bottomweight & Denim',
    'Sustainable & Organic',
    'Active & Performance',
    'Luxury & Eveningwear',
    'Home & Contract Textile',
    'Workwear & Technical'
  ];

  const weaves = [
    'All Weaves',
    'Plain Weave',
    'Twill Weave',
    'Satin Weave',
    'Jacquard',
    'Circular Knit',
    'Ripstop',
    'Waffle / Honeycomb'
  ];

  const certifications = [
    'All Certifications',
    'OEKO-TEX Standard 100',
    'GOTS Organic',
    'BCI Cotton',
    'GRS (Global Recycled Standard)',
    'ISO 9001'
  ];

  const activeFiltersCount = 
    (filters.category ? 1 : 0) +
    (filters.weave ? 1 : 0) +
    (filters.finish ? 1 : 0) +
    (filters.certification ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.minGsm > 80 || filters.maxGsm < 450 ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
      
      {/* Top Search & Primary Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by fabric name, code (e.g. RT-POP), composition, or end-use..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
            aria-label="Search fabric catalog"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort selector & filter toggle */}
        <div className="flex items-center gap-2">
          
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
            className="px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:border-amber-600 min-h-[42px]"
            aria-label="Sort fabric results"
          >
            <option value="featured">Sort: Curated Featured</option>
            <option value="gsm-asc">Weight: Low to High (GSM)</option>
            <option value="gsm-desc">Weight: High to Low (GSM)</option>
            <option value="moq-asc">MOQ: Low to High</option>
            <option value="name-asc">Alphabetical: A to Z</option>
          </select>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[42px] ${
              isExpanded || activeFiltersCount > 0
                ? 'bg-amber-950 text-amber-300 border-amber-800'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
            aria-expanded={isExpanded}
            aria-label="Toggle advanced textile filter parameters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={onReset}
              className="p-2.5 text-stone-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
              title="Reset all filters"
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

      {/* Category Pills Quick Strip */}
      <div 
        className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none"
        role="tablist"
        aria-label="Fabric Category Quick Select"
      >
        {categories.map((cat) => {
          const isSelected = (filters.category === '' && cat === 'All Categories') || filters.category === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChange({ ...filters, category: cat === 'All Categories' ? '' : cat })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors min-h-[34px] ${
                isSelected
                  ? 'bg-stone-900 text-white font-semibold shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Advanced Collapsible Filter Panel */}
      {isExpanded && (
        <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs animate-fadeIn">
          
          {/* Weave Selector */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1.5 font-mono uppercase text-[11px]">
              Weave Construction
            </label>
            <select
              value={filters.weave}
              onChange={(e) => onChange({ ...filters, weave: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
            >
              {weaves.map(w => (
                <option key={w} value={w === 'All Weaves' ? '' : w}>{w}</option>
              ))}
            </select>
          </div>

          {/* Certification Selector */}
          <div>
            <label className="block text-stone-700 font-semibold mb-1.5 font-mono uppercase text-[11px]">
              Required Certification
            </label>
            <select
              value={filters.certification}
              onChange={(e) => onChange({ ...filters, certification: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
            >
              {certifications.map(c => (
                <option key={c} value={c === 'All Certifications' ? '' : c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Weight / GSM Range Slider */}
          <div>
            <div className="flex items-center justify-between text-stone-700 font-semibold mb-1.5 font-mono text-[11px]">
              <span className="uppercase">Fabric Weight (GSM)</span>
              <span className="text-amber-700">{filters.minGsm} - {filters.maxGsm} g/m²</span>
            </div>
            <div className="space-y-1">
              <input
                type="range"
                min="80"
                max="450"
                step="10"
                value={filters.maxGsm}
                onChange={(e) => onChange({ ...filters, maxGsm: Number(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer"
                aria-label="Maximum GSM weight"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>Light (80g)</span>
                <span>Medium (220g)</span>
                <span>Heavy (450g)</span>
              </div>
            </div>
          </div>

          {/* Minimum Order Quantity (MOQ) Filter */}
          <div>
            <div className="flex items-center justify-between text-stone-700 font-semibold mb-1.5 font-mono text-[11px]">
              <span className="uppercase">Maximum MOQ</span>
              <span className="text-amber-700">{filters.maxMoq.toLocaleString()} meters</span>
            </div>
            <div className="space-y-1">
              <input
                type="range"
                min="300"
                max="2000"
                step="100"
                value={filters.maxMoq}
                onChange={(e) => onChange({ ...filters, maxMoq: Number(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer"
                aria-label="Maximum MOQ limit"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>Sampling (300m)</span>
                <span>Medium (1000m)</span>
                <span>Bulk (2000m+)</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Results counter & active pills */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-1 font-mono">
        <span>
          Showing <strong className="text-stone-900">{totalResultsCount}</strong> verified technical fabrics
        </span>
        {activeFiltersCount > 0 && (
          <span className="text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {activeFiltersCount} active filter criteria
          </span>
        )}
      </div>

    </div>
  );
};
