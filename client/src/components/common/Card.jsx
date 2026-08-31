import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-cream-300 bg-white transition-all duration-200 ${
        glass ? 'glassmorphism' : ''
      } ${
        hover
          ? 'hover:-translate-y-1 hover:border-brand-200 hover:shadow-premium-hover cursor-pointer'
          : 'shadow-premium'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
