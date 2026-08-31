import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({
  tabs = [], // [{ id, label, icon: Icon, count }]
  activeTab,
  onChange,
  variant = 'pills', // pills | underline
  className = ''
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 overflow-x-auto scrollbar-hide ${
        variant === 'underline' ? 'border-b border-cream-300 pb-px' : 'p-1.5 bg-cream-200/70 rounded-2xl'
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-xl select-none ${
              isActive
                ? variant === 'pills'
                  ? 'text-brand-900 font-semibold shadow-sm'
                  : 'text-brand-600 font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-white/40'
            }`}
          >
            {isActive && variant === 'pills' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-white rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            {isActive && variant === 'underline' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              <span>{tab.label}</span>
              {typeof tab.count !== 'undefined' && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-brand-100 text-brand-800'
                      : 'bg-cream-300 text-charcoal-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
