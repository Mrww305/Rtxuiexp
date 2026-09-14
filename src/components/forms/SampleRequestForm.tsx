import React, { useState } from 'react';
import { Layers, Truck, CheckCircle2, AlertCircle, X, Plus } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { FABRICS_DATA } from '../../data/fabrics';
import { SampleRequestFormData } from '../../types';

export const SampleRequestForm: React.FC = () => {
  const { state, sampleKitFabrics, removeFromSampleKit, addToSampleKit, showToast } = useAppStore();

  const [formData, setFormData] = useState<SampleRequestFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: 'United States',
    courierProvider: 'DHL',
    courierAccountNumber: '',
    fabricIds: state.sampleKitIds,
    urgentSample: false,
    projectDescription: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const countries = [
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'United Arab Emirates',
    'Japan',
    'South Korea',
    'Australia',
    'Canada',
    'Pakistan',
    'India',
    'Other International'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.sampleKitIds.length === 0) {
      showToast('Please select at least 1 fabric swatch before ordering.');
      return;
    }
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.shippingAddress) {
      showToast('Please complete all mandatory shipping details.');
      return;
    }

    const track = `SAMPLE-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingNumber(track);
    setIsSubmitted(true);
    showToast(`Swatch Kit Request Dispatched: ${track}`);
  };

  if (isSubmitted) {
    return (
      <div className="bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl animate-scaleUp">
        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Sample Preparation Order Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Swatch Kit Dispatched to Sample Room
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Your sample box containing {sampleKitFabrics.length} fabric hangers is being cut and tagged with verified TDS labels. Shipping confirmation sent to <strong className="text-amber-400">{formData.email}</strong>.
          </p>
        </div>

        <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 max-w-sm mx-auto font-mono text-left">
          <span className="text-[10px] text-stone-500 block uppercase">Sample Dispatch Docket</span>
          <span className="text-lg font-bold text-amber-400">{trackingNumber}</span>
          <div className="text-[11px] text-stone-400 mt-2">
            <span>Courier: {formData.courierProvider} Express</span> • <span>Est. Delivery: 3-5 Days</span>
          </div>
        </div>

        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors min-h-[40px]"
        >
          Request Another Swatch Kit
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-lg space-y-8 max-w-4xl mx-auto"
    >
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-amber-700 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
          <Truck className="w-4 h-4" />
          <span>Express Courier Swatch Room</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Request Physical Fabric Swatch Kit
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
          Order authentic A4 fabric swatches with full selvage markings, technical certificates, and lab dip shade cards delivered directly to your design studio.
        </p>
      </div>

      {/* Swatches in kit */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider border-l-4 border-amber-600 pl-3">
            Selected Swatches ({sampleKitFabrics.length} / 6)
          </h3>
          <span className="text-xs font-mono text-stone-500">
            Complimentary international shipping
          </span>
        </div>

        {sampleKitFabrics.length === 0 ? (
          <div className="p-6 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
            No swatches currently added. Please pick fabrics from our catalog.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sampleKitFabrics.map(f => (
              <div key={f.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={f.image} alt={f.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-amber-800 font-bold">{f.code}</span>
                    <p className="text-xs font-semibold text-stone-900 truncate">{f.name}</p>
                    <p className="text-[10px] text-stone-500">{f.gsm} GSM • {f.weave}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromSampleKit(f.id)}
                  className="p-1 text-stone-400 hover:text-rose-600"
                  aria-label={`Remove ${f.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider border-l-4 border-amber-600 pl-3">
          Shipping &amp; Studio Delivery Address
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Recipient Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Marcus Vance"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Design Studio / Brand *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Vance Apparel Atelier"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Corporate Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="marcus@vanceatelier.com"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Contact Phone (For Courier Waybill) *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 555 382 9102"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.shippingAddress}
              onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
              placeholder="Building 4, Suite 300, Fashion District Blvd"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="e.g. New York, London, Milan"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Country *
            </label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            >
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courier preference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
            Courier Partner
          </label>
          <select
            value={formData.courierProvider}
            onChange={(e) => setFormData({ ...formData, courierProvider: e.target.value as any })}
            className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
          >
            <option value="DHL">DHL Express Worldwide</option>
            <option value="FedEx">FedEx International Priority</option>
            <option value="UPS">UPS Worldwide Saver</option>
            <option value="Standard Air">Standard Commercial Air Courier</option>
          </select>
        </div>

        <div>
          <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
            Buyer Courier Account # (Optional for urgent freight)
          </label>
          <input
            type="text"
            value={formData.courierAccountNumber}
            onChange={(e) => setFormData({ ...formData, courierAccountNumber: e.target.value })}
            placeholder="e.g. DHL 96482019"
            className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
        <span className="text-[11px] text-stone-500 font-mono">
          Free dispatch for verified apparel sourcing teams
        </span>
        <button
          type="submit"
          className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-colors flex items-center gap-2 min-h-[44px]"
        >
          <Truck className="w-4 h-4" />
          <span>Dispatch Sample Kit Box</span>
        </button>
      </div>
    </form>
  );
};
