import React from 'react';
import { CheckCircle2, Clock, Eye, CheckCheck, XCircle } from 'lucide-react';

const ApplicationTimeline = ({ currentStatus = 'pending' }) => {
  const steps = [
    { key: 'pending', label: 'Submitted', icon: Clock },
    { key: 'under_review', label: 'Under Review', icon: Eye },
    { key: 'approved', label: 'Approved', icon: CheckCircle2 },
    { key: 'completed', label: 'Adopted', icon: CheckCheck },
  ];

  if (currentStatus === 'rejected') {
    return (
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs">
        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
        <div>
          <p className="font-bold">Application Status: Not Approved</p>
          <p className="text-rose-600 mt-0.5">The shelter felt another household was a better match for this pet's specific medical or behavioral needs. You are encouraged to apply for other pets!</p>
        </div>
      </div>
    );
  }

  const getStepIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'under_review': return 1;
      case 'approved': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-cream-200 -z-0" />
        
        {/* Active track progress */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-500 transition-all duration-500 -z-0"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  isDone
                    ? 'bg-brand-500 text-white ring-4 ring-brand-100'
                    : 'bg-white text-charcoal-400 border-2 border-cream-300'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 whitespace-nowrap ${
                  isCurrent
                    ? 'text-brand-700 font-bold'
                    : isDone
                    ? 'text-charcoal-800'
                    : 'text-charcoal-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationTimeline;
