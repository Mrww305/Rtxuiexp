import React from 'react';
import { Factory, Award, Globe, Users, History, Shield } from 'lucide-react';
import { MILL_METRICS } from '../../data/capabilities';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const milestones = [
    { year: '1988', title: 'Foundation & Shuttle Looms', desc: 'Established as an indigenous weaving enterprise producing raw gray greige fabric for domestic textile houses.' },
    { year: '1998', title: 'Transition to Rapier & Air-Jet Technology', desc: 'Commissioned first automated high-speed looms from Tsudakoma Japan, initiating export programs.' },
    { year: '2008', title: 'Vertical Continuous Dyeing Mill', desc: 'Integrated state-of-the-art continuous dyeing range with Monforts stenters and in-house color laboratory.' },
    { year: '2016', title: 'Zero Liquid Discharge (ZLD) Commissioning', desc: 'Installed multi-stage biological RO and evaporation plants, achieving 94% water recycling.' },
    { year: '2022', title: '3.8 MW Solar Rooftop & GOTS Expansion', desc: 'Transitioned over 60% of daily manufacturing power to clean renewable photovoltaic energy.' },
    { year: '2026', title: 'Digital Loom Telemetry & Global B2B Hub', desc: 'Launched real-time roll tracking, 3D weave visualization, and expedited global swatch fulfillment.' }
  ];

  const leadership = [
    { name: 'Muhammad Tariq', role: 'Chairman & Chief Executive', bio: 'Over 38 years leading vertical textile integration, export trade agreements, and modernization.' },
    { name: 'Dr. Sarah Tariq', role: 'Head of Textile Engineering & R&D', bio: 'PhD in Polymer & Textile Chemistry from University of Manchester; leads eco-finishing formulations.' },
    { name: 'Rashid Kamal', role: 'Director of Global Commercial Sourcing', bio: 'Former apparel sourcing executive with 20+ years managing US and European brand relationships.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-mono uppercase text-amber-700 tracking-widest font-semibold block mb-1">
          Our Heritage &amp; Infrastructure
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900">
          About Reshma Tex
        </h1>
        <p className="text-stone-600 text-sm mt-2 max-w-3xl leading-relaxed">
          For over 35 years, Reshma Tex has united time-honored weaving craftsmanship with modern computerized air-jet technology, engineering world-class textiles for leading apparel houses worldwide.
        </p>
      </div>

      {/* Hero Visual & Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 h-80 sm:h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
            alt="Reshma Tex precision industrial loom facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white font-mono text-xs">
            <span className="bg-amber-600/90 text-stone-950 px-2 py-0.5 rounded font-bold uppercase text-[10px] mr-2">
              Mill Campus 01
            </span>
            <span>450,000 Sq. Ft. Integrated Weaving Complex</span>
          </div>
        </div>

        <div className="space-y-5 text-stone-700 text-sm leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            A Global Partner in Textile Precision
          </h2>
          <p>
            Founded on the pillars of unyielding yarn integrity, ethical employee welfare, and cutting-edge machinery, Reshma Tex has grown from a humble shuttle-loom shed into a premier export house.
          </p>
          <p>
            Our mills run 24 hours a day under rigorous Japanese 5S and Total Quality Management (TQM) protocols. We maintain strict control over every stage of production—from fiber blending and warp sizing to continuous cold pad-batch dyeing and computerized 4-point fabric grading.
          </p>
          <div className="pt-2 grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-xl font-bold text-stone-900 block">45M+</span>
              <span className="text-stone-500">Meters Produced Annually</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-xl font-bold text-stone-900 block">42+</span>
              <span className="text-stone-500">Export Destinations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-mono uppercase text-amber-700 font-semibold tracking-wider">
            35+ Year Timeline
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Evolution of Industrial Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
              <span className="text-amber-800 font-mono font-bold text-lg">{m.year}</span>
              <h3 className="text-base font-serif font-bold text-stone-900">{m.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-mono uppercase text-amber-700 font-semibold tracking-wider">
            Executive Leadership
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Guided by Textile Innovators
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {leadership.map((l, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-lg flex items-center justify-center">
                {l.name[0]}
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900">{l.name}</h3>
                <span className="text-xs font-mono text-amber-800 font-semibold">{l.role}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{l.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-serif font-bold">Schedule an In-Person Mill Tour</h3>
          <p className="text-xs text-stone-400">
            Our facilities welcome brand quality auditors, technical teams, and commercial buyers.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase text-xs rounded-xl transition-colors whitespace-nowrap min-h-[42px]"
        >
          Contact Export Desk
        </button>
      </div>

    </div>
  );
};
