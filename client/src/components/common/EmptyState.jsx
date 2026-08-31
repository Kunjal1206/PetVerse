import React from 'react';
import Button from './Button';
import { HeartOff } from 'lucide-react';

const EmptyState = ({
  icon: Icon = HeartOff,
  title = 'No results found',
  description = 'Try adjusting your filters or search terms to find what you are looking for.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white border border-dashed border-cream-300 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-cream-100 flex items-center justify-center text-brand-500 mb-4 border border-cream-200">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-display font-semibold text-charcoal-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-charcoal-500 max-w-md mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
