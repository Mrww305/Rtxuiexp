import React, { useState } from 'react';
import { Globe, Building, CheckCircle2, Shield, Send, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const DealersView: React.FC = () => {
  const { showToast } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    territory: 'Europe / UK',
    annualVolume: '$500k - $2M USD',
    warehouseSqFt: '10,000 - 50,000 sq.ft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Distribution inquiry submitted to Corporate Strategic Development.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
          Authorized Representation Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
          International Dealers &amp; Distributors
        </h1>
        <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
          Join our accredited network of global textile importers, stockists, and regional fabric distributors with direct mill allocations and marketing collateral support.
        </p>
      </div>

      {/* Program Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <Globe className="w-6 h-6 text-amber-600" />
          <h3 className="font-serif font-bold text-stone-900 text-lg">Territorial Exclusivity</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Eligible partners receive designated geographic territory protection for select registered fabric articles and branded seasonal collections.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <Building className="w-6 h-6 text-amber-600" />
          <h3 className="font-serif font-bold text-stone-900 text-lg">Priority Loom Allocation</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Reserved monthly weaving schedules on Japanese air-jet looms, guaranteeing compressed lead times and zero seasonal bottleneck delays.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <Shield className="w-6 h-6 text-amber-600" />
          <h3 className="font-serif font-bold text-stone-900 text-lg">Marketing &amp; Swatch Kits</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Continuous delivery of premium custom-branded fabric swatch binders, shade cards, and digital high-res marketing assets for your sales team.
          </p>
        </div>
      </div>

      {/* Distributor Application Form */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-10 max-w-3xl mx-auto shadow-sm">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Apply for Reshma Tex Dealership &amp; Distribution
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Please provide company verification details for our commercial trade committee review.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                  Enterprise / Firm Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. EuroTex Wholesale GmbH"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                  Authorized Principal / Officer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Hans Zimmerman"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="zimmerman@eurotex.de"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                  Target Sourcing Territory
                </label>
                <select
                  value={formData.territory}
                  onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-600"
                >
                  <option value="Europe / UK">Europe &amp; UK</option>
                  <option value="North America (US / Canada)">North America (US / Canada)</option>
                  <option value="Middle East & GCC">Middle East &amp; GCC</option>
                  <option value="Australia & New Zealand">Australia &amp; New Zealand</option>
                  <option value="Latin America">Latin America</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase text-xs rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Submit Dealership Credentials</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-10 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-serif font-bold text-stone-900">Application Submitted</h3>
            <p className="text-stone-600 text-xs max-w-md mx-auto">
              Your dealership credentials have been transmitted to our Global Business Development Division. A representative will contact you with dealer terms within 48 hours.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
