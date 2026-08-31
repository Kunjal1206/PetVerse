import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({
  value = 0,
  max = 5,
  onChange,
  size = 'md', // sm | md | lg
  showCount = false,
  count = 0,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6'
  };

  const isInteractive = typeof onChange === 'function';

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.round(value);

          return (
            <button
              key={index}
              type="button"
              disabled={!isInteractive}
              onClick={() => isInteractive && onChange(starValue)}
              className={`${
                isInteractive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
              } p-0.5`}
            >
              <Star
                className={`${sizeStyles[size]} ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-charcoal-200 fill-cream-100'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs font-semibold text-charcoal-700 ml-1">
          {Number(value).toFixed(1)} {count > 0 && <span className="text-charcoal-400 font-normal">({count})</span>}
        </span>
      )}
    </div>
  );
};

export default Rating;
