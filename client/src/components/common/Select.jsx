import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  className = '',
  id,
  required,
  children,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={`w-full rounded-xl border bg-cream-50/50 text-charcoal-900 px-3.5 py-2.5 text-sm transition-all duration-200 cursor-pointer ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-cream-300 hover:border-brand-200 focus:border-brand-500 focus:ring-brand-500/20'
          } ${className}`}
          {...props}
        >
          {children ? (
            children
          ) : (
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          )}
        </select>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-charcoal-500">{helperText}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
