import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Ship, 
  Clock, 
  Layers 
} from 'lucide-react';
import { RFQFormData } from '../../types';
import { FABRICS_DATA } from '../../data/fabrics';
import { useAppStore } from '../../lib/store';

interface RFQFormProps {
  initialFabricId?: string | null;
}

export const RFQForm: React.FC<RFQFormProps> = ({ initialFabricId }) => {
  const { state, showToast, setRfqPrefillFabricId } = useAppStore();

  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    destinationPort: 'Rotterdam (Port of Rotterdam, NL)',
    incoterm: 'FOB',
    selectedFabricIds: initialFabricId ? [initialFabricId] : state.rfqPrefillFabricId ? [state.rfqPrefillFabricId] : ['rt-101'],
    customFabricCode: '',
    targetQuantityMeters: 5000,
    targetPriceUSD: '',
    requiredDeliveryDate: '',
    applicationUsage: 'Apparel Bulk Production',
    specNotes: '',
    complianceRequirements: ['OEKO-TEX Standard 100'],
    fileName: undefined
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefNumber, setSubmittedRefNumber] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (state.rfqPrefillFabricId) {
      setFormData(prev => ({
        ...prev,
        selectedFabricIds: [state.rfqPrefillFabricId!]
      }));
    }
  }, [state.rfqPrefillFabricId]);

  const ports = [
    'Rotterdam (Port of Rotterdam, NL)',
    'Los Angeles / Long Beach (US)',
    'Hamburg (DE)',
    'Jebel Ali / Dubai (UAE)',
    'Felixstowe / Southampton (UK)',
    'Antwerp (BE)',
    'Singapore (SG)',
    'Chittagong (BD)',
    'Karachi Port (PK)',
    'Nhava Sheva / Mumbai (IN)',
    'Other (Specify in notes)'
  ];

  const incoterms: ('FOB' | 'CIF' | 'CFR' | 'EXW' | 'DDP')[] = ['FOB', 'CIF', 'CFR', 'EXW', 'DDP'];

  const complianceOptions = [
    'OEKO-TEX Standard 100',
    'GOTS Organic Certified',
    'BCI Cotton Scope',
    'GRS Global Recycled Standard',
    'ISO 9001 Factory Audit',
    'Zero Liquid Discharge Audit'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        showToast('File exceeds 15MB limit. Please upload a smaller tech-pack.');
        return;
      }
      setFormData(prev => ({ ...prev, fileName: file.name }));
      showToast(`Attached ${file.name} to RFQ submission.`);
    }
  };

  const handleComplianceToggle = (item: string) => {
    setFormData(prev => {
      const exists = prev.complianceRequirements.includes(item);
      return {
        ...prev,
        complianceRequirements: exists
          ? prev.complianceRequirements.filter(c => c !== item)
          : [...prev.complianceRequirements, item]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // spam bot trap

    if (!formData.fullName || !formData.companyName || !formData.email) {
      showToast('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate enterprise backend rate-limited RFQ submission
    setTimeout(() => {
      const ref = `RFQ-${new Date().getFullYear()}-RT-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRefNumber(ref);
      setIsSubmitting(false);
      showToast(`RFQ Generated Successfully: ${ref}`);
    }, 1200);
  };

  const copyRefNumber = () => {
    if (submittedRefNumber) {
      navigator.clipboard.writeText(submittedRefNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      showToast('Reference code copied to clipboard.');
    }
  };

  if (submittedRefNumber) {
    return (
      <div className="bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 p-8 text-center space-y-6 max-w-2xl mx-auto shadow-2xl animate-scaleUp">
        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            Inquiry Dispatched to Mill Export Division
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Formal RFQ Confirmed
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Your technical request has been routed to the Senior Commercial Merchandiser. An itemized pro-forma costing sheet will be transmitted to <strong className="text-amber-400">{formData.email}</strong> within 18 business hours.
          </p>
        </div>

        {/* Reference Code Box */}
        <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 flex items-center justify-between max-w-sm mx-auto">
          <div className="text-left font-mono">
            <span className="text-[10px] text-stone-500 block uppercase">RFQ Tracking Reference</span>
            <span className="text-lg font-bold text-amber-400">{submittedRefNumber}</span>
          </div>
          <button
            onClick={copyRefNumber}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            aria-label="Copy RFQ reference number"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="pt-4 border-t border-stone-800 text-xs text-stone-500 font-mono flex flex-wrap items-center justify-center gap-6">
          <span>Port: {formData.destinationPort.split(' ')[0]}</span>
          <span>Incoterm: {formData.incoterm}</span>
          <span>Target Volume: {formData.targetQuantityMeters.toLocaleString()}m</span>
        </div>

        <button
          onClick={() => {
            setSubmittedRefNumber(null);
            setRfqPrefillFabricId(null);
          }}
          className="mt-4 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors min-h-[42px]"
        >
          Submit Another Technical Inquiry
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-lg space-y-8 max-w-4xl mx-auto"
      noValidate
    >
      {/* Honeypot for spam bots */}
      <input 
        type="text" 
        value={honeypot} 
        onChange={(e) => setHoneypot(e.target.value)} 
        className="hidden" 
        tabIndex={-1} 
        autoComplete="off" 
      />

      {/* Form Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-amber-700 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
          <FileText className="w-4 h-4" />
          <span>B2B Commercial Sourcing Channel</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Request for Quotation (RFQ)
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
          Provide your target yardage, destination seaport, and quality parameters. Direct manufacturer pricing with zero middleman commissions.
        </p>
      </div>

      {/* Section 1: Fabric Selection & Quantity */}
      <div className="space-y-4">
        <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider border-l-4 border-amber-600 pl-3">
          1. Fabric Specification &amp; Volume
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Select Catalog Fabric *
            </label>
            <select
              value={formData.selectedFabricIds[0] || ''}
              onChange={(e) => setFormData({ ...formData, selectedFabricIds: [e.target.value] })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-600"
            >
              {FABRICS_DATA.map(f => (
                <option key={f.id} value={f.id}>
                  {f.code} - {f.name} ({f.gsm} GSM)
                </option>
              ))}
              <option value="custom">Custom Development (Attach Spec Below)</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Or Custom Mill Reference / Article Code
            </label>
            <input
              type="text"
              value={formData.customFabricCode}
              onChange={(e) => setFormData({ ...formData, customFabricCode: e.target.value })}
              placeholder="e.g. 40x40 / 133x72 Poplin or Buyer Code"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>

        </div>

        {/* Volume & Quick Meter Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="font-semibold text-stone-700 uppercase text-[11px]">
                Target Order Quantity (Meters) *
              </span>
              <span className="text-amber-700 font-bold">
                {formData.targetQuantityMeters.toLocaleString()} Meters (~{Math.round(formData.targetQuantityMeters * 1.09361).toLocaleString()} Yards)
              </span>
            </div>
            
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={formData.targetQuantityMeters}
              onChange={(e) => setFormData({ ...formData, targetQuantityMeters: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {[1000, 3000, 5000, 10000, 25000].map(vol => (
                <button
                  key={vol}
                  type="button"
                  onClick={() => setFormData({ ...formData, targetQuantityMeters: vol })}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
                    formData.targetQuantityMeters === vol
                      ? 'bg-amber-600 text-white border-amber-600 font-bold'
                      : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {vol >= 1000 ? `${vol / 1000}k m` : `${vol}m`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Target Price (USD / Meter)
            </label>
            <input
              type="text"
              value={formData.targetPriceUSD}
              onChange={(e) => setFormData({ ...formData, targetPriceUSD: e.target.value })}
              placeholder="e.g. $4.50 / FOB"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
            <span className="text-[10px] text-stone-400 font-mono mt-1 block">Optional benchmark</span>
          </div>

        </div>
      </div>

      {/* Section 2: Logistics, Port & Delivery */}
      <div className="space-y-4">
        <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider border-l-4 border-amber-600 pl-3">
          2. Logistics &amp; Trade Terms (Incoterms 2020)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Trade Term (Incoterm) *
            </label>
            <select
              value={formData.incoterm}
              onChange={(e) => setFormData({ ...formData, incoterm: e.target.value as any })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600"
            >
              {incoterms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Destination Seaport / Airport *
            </label>
            <select
              value={formData.destinationPort}
              onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-600"
            >
              {ports.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Section 3: Buyer & Company Identification */}
      <div className="space-y-4">
        <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider border-l-4 border-amber-600 pl-3">
          3. Corporate Buyer Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Sarah Jenkins"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Company / Brand Name *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Jenkins Apparel Ltd"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Corporate Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sourcing@jenkinsapparel.com"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 555 019 2834"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Testing & Tech Pack Upload */}
      <div className="space-y-4">
        <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider border-l-4 border-amber-600 pl-3">
          4. Compliance &amp; Tech-Pack Attachment
        </h3>

        {/* Compliance checkboxes */}
        <div>
          <span className="block text-stone-700 text-xs font-semibold mb-2 font-mono uppercase text-[11px]">
            Required Certifications / Test Protocols:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {complianceOptions.map(opt => {
              const checked = formData.complianceRequirements.includes(opt);
              return (
                <label 
                  key={opt}
                  className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                    checked
                      ? 'bg-amber-50 text-amber-900 border-amber-400 font-semibold'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleComplianceToggle(opt)}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* File upload drag/select */}
        <div className="border-2 border-dashed border-stone-300 hover:border-amber-600 rounded-2xl p-6 text-center transition-colors">
          <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
          <p className="text-xs text-stone-700 font-medium">
            Upload Specification Sheet, Color Standards, or Tech-Pack
          </p>
          <p className="text-[11px] text-stone-400 font-mono mt-0.5">
            PDF, AI, DXF, PNG, or JPG (Up to 15MB)
          </p>
          <label className="mt-3 inline-block">
            <span className="px-4 py-2 bg-stone-900 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
              {formData.fileName ? 'Change File' : 'Select File'}
            </span>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.ai,.dxf,.zip"
            />
          </label>
          {formData.fileName && (
            <p className="mt-2 text-xs font-mono text-emerald-700 font-semibold">
              ✓ Attached: {formData.fileName}
            </p>
          )}
        </div>

        {/* Spec notes */}
        <div>
          <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
            Additional Production or Finishing Instructions
          </label>
          <textarea
            rows={3}
            value={formData.specNotes}
            onChange={(e) => setFormData({ ...formData, specNotes: e.target.value })}
            placeholder="Special lab-dip illuminants (e.g. D65 / TL84), custom selvedge lettering, roll length requirements..."
            className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
          />
        </div>

      </div>

      {/* Submit Action */}
      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-stone-500 font-mono">
          🔒 Secure SSL Submission • GDPR Compliant • Direct Mill Contract
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 min-h-[46px] disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Generating RFQ Reference...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Formal RFQ</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
};
