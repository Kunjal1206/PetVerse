import React from 'react';
import Card from '../../components/common/Card';
import { BarChart3, TrendingUp, Users, Heart, ShieldCheck } from 'lucide-react';

const AdminStats = () => {
  const cityDistribution = [
    { city: 'Delhi NCR', count: 42, percent: 35 },
    { city: 'Bangalore', count: 32, percent: 28 },
    { city: 'Mumbai', count: 24, percent: 20 },
    { city: 'Pune', count: 12, percent: 10 },
    { city: 'Chandigarh / Jaipur / Hyd', count: 9, percent: 7 },
  ];

  const speciesBreakdown = [
    { type: 'Dogs (Indie / Desi)', count: 54, percent: 60, color: 'bg-brand-500' },
    { type: 'Cats (Domestic Shorthair)', count: 26, percent: 28, color: 'bg-teal-500' },
    { type: 'Purebred Rescues', count: 12, percent: 12, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-cream-300">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Platform Statistics & Growth Analytics
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Adoption completion velocity, regional distribution, and caregiver booking volume.
        </p>
      </div>

      {/* 2 Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* City Breakdown */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              Regional Active Adopter Spread
            </h3>
            <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
              7 Major Cities
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {cityDistribution.map((c, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-charcoal-800">
                  <span>{c.city}</span>
                  <span>{c.percent}% ({c.count} users)</span>
                </div>
                <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Species Distribution */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              Rescue Species Breakdown
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              High Placement Rate
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {speciesBreakdown.map((s, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-semibold text-charcoal-800">
                  <span>{s.type}</span>
                  <span>{s.percent}%</span>
                </div>
                <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full`}
                    style={{ width: `${s.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Impact Numbers */}
      <div className="rounded-3xl bg-brand-900 text-white p-8 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <p className="font-display font-extrabold text-4xl text-white">94%</p>
          <p className="text-xs text-cream-300">AI Compatibility Success Rate</p>
        </div>
        <div className="space-y-1">
          <p className="font-display font-extrabold text-4xl text-white">100%</p>
          <p className="text-xs text-cream-300">Verified Shelter Partners</p>
        </div>
        <div className="space-y-1">
          <p className="font-display font-extrabold text-4xl text-white">&lt; 48 hrs</p>
          <p className="text-xs text-cream-300">Average Adoption Review Turnaround</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
