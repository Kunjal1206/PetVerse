import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  className = '',
  id,
  required,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          required={required}
          className={`w-full rounded-xl border bg-cream-50/50 text-charcoal-900 placeholder:text-charcoal-400 py-2.5 text-sm transition-all duration-200 ${
            Icon ? 'pl-10 pr-3.5' : 'px-3.5'
          } ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-cream-300 hover:border-brand-200 focus:border-brand-500 focus:ring-brand-500/20'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-charcoal-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
