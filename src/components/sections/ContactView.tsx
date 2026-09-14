import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Globe, MessageSquare } from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const ContactView: React.FC = () => {
  const { showToast } = useAppStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'General Export Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const exportDesks = [
    {
      region: 'North America Commercial Desk',
      rep: 'David Miller / Sarah Tariq',
      email: 'us-sales@reshmatex.com',
      phone: '+1 (212) 555-0189',
      hours: '08:00 - 17:00 EST'
    },
    {
      region: 'Europe & UK Sourcing Desk',
      rep: 'Marcus Vance / Elena Rostova',
      email: 'eu-sales@reshmatex.com',
      phone: '+44 20 7946 0912',
      hours: '09:00 - 18:00 CET'
    },
    {
      region: 'Middle East & Gulf Desk',
      rep: 'Tariq Al-Mansoor',
      email: 'uae-sales@reshmatex.com',
      phone: '+971 4 389 2011',
      hours: '09:00 - 18:00 GST'
    },
    {
      region: 'Global Mill Headquarters',
      rep: 'Central Commercial Division',
      email: 'export@reshmatex.com',
      phone: '+92 (21) 3506-8900',
      hours: '24/7 Operations Support'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our Export Liaison desk.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
          Global Commercial Communications
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
          Contact Reshma Tex
        </h1>
        <p className="text-stone-600 text-sm mt-2 max-w-2xl leading-relaxed">
          Connect directly with our regional commercial desks or factory mill headquarters for custom inquiries, technical specifications, and factory visit scheduling.
        </p>
      </div>

      {/* Global Regional Desks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {exportDesks.map((desk, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-fit">
              {desk.region}
            </span>
            <h3 className="font-serif font-bold text-stone-900 text-base">{desk.rep}</h3>
            
            <div className="space-y-1.5 text-xs text-stone-600 font-mono pt-2 border-t border-stone-100">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <a href={`mailto:${desk.email}`} className="hover:text-amber-800 truncate">{desk.email}</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <a href={`tel:${desk.phone}`} className="hover:text-amber-800">{desk.phone}</a>
              </div>
              <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{desk.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Contact Form & Factory Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Send Direct Mill Inquiry
              </h2>
              <p className="text-xs text-stone-500">
                Guaranteed commercial reply within 18 business hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Jenkins"
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
                    placeholder="marcus@fashionbrand.com"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Jenkins Apparel Group"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-amber-600"
                  >
                    <option value="General Export Inquiry">General Export Inquiry</option>
                    <option value="Sample Swatch Question">Sample Swatch Question</option>
                    <option value="Factory Audit Request">Factory Audit Request</option>
                    <option value="Custom Yarn Development">Custom Yarn Development</option>
                    <option value="Distribution Partnership">Distribution Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 text-xs font-semibold mb-1 font-mono uppercase text-[11px]">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your fabric requirements, quantities, or specific questions..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 min-h-[42px]"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-stone-900">Message Received</h3>
              <p className="text-stone-600 text-xs max-w-sm mx-auto">
                Thank you, {formData.name}. Our export team has logged your transmission and will follow up promptly via email.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-200"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Factory Locations & Head Office Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-2xl border border-stone-800 space-y-5">
            <h2 className="text-xl font-serif font-bold text-white">
              Mill Facilities &amp; HQ
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-amber-400 font-bold uppercase block text-[11px]">
                  Campus 01: Air-Jet Weaving &amp; Grey Yard
                </span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  Plot 42-45, Industrial Estate, Sector 12, Textile Corridor, Sindh, PK
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-stone-800">
                <span className="text-amber-400 font-bold uppercase block text-[11px]">
                  Campus 02: Continuous Dyeing &amp; ZLD Plant
                </span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  Plot 108-112, Phase II Heavy Industrial Zone, Eco-Parkway, Sindh, PK
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-stone-800">
                <span className="text-amber-400 font-bold uppercase block text-[11px]">
                  Seaport Logistics Gateway
                </span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  Direct corridor to Karachi Port / Port Qasim (QICT Container Terminal). Average port turnaround: 24-48 hours from mill gate.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
