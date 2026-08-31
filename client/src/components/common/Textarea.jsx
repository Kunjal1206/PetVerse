import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  rows = 4,
  className = '',
  id,
  required,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        className={`w-full rounded-xl border bg-cream-50/50 text-charcoal-900 placeholder:text-charcoal-400 p-3.5 text-sm transition-all duration-200 resize-y ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-cream-300 hover:border-brand-200 focus:border-brand-500 focus:ring-brand-500/20'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-xs text-charcoal-500">{helperText}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
