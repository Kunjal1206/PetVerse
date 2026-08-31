import React from 'react';
import { Sparkles } from 'lucide-react';

const CompatibilityBadge = ({ score = 85, showLabel = true, className = '' }) => {
  let colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let badgeText = 'High Match';

  if (score >= 90) {
    colorClass = 'bg-teal-50 text-teal-800 border-teal-200';
    badgeText = 'Perfect Match';
  } else if (score < 70) {
    colorClass = 'bg-amber-50 text-amber-800 border-amber-200';
    badgeText = 'Moderate Match';
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold shadow-xs ${colorClass} ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
      <span>{score}% {showLabel && <span className="font-normal opacity-90">• {badgeText}</span>}</span>
    </div>
  );
};

export default CompatibilityBadge;
