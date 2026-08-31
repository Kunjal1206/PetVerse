import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary', // primary | secondary | outline | ghost | danger | accent
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl select-none';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 shadow-sm'
  };

  const variantStyles = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow focus:ring-brand-500 active:scale-[0.98]',
    secondary: 'bg-cream-200 hover:bg-cream-300 text-charcoal-800 focus:ring-brand-300 active:scale-[0.98]',
    accent: 'bg-brand-accent hover:bg-teal-700 text-white shadow-sm focus:ring-brand-accent active:scale-[0.98]',
    outline: 'border border-brand-200 bg-white hover:bg-brand-50 text-brand-700 focus:ring-brand-500 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-brand-50 text-brand-700 focus:ring-brand-500',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 active:scale-[0.98]'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};

export default Button;
