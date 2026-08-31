import React from 'react';

export const Skeleton = ({
  className = '',
  variant = 'rectangular', // text | circular | rectangular | card
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 rounded-md w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    card: 'h-64 rounded-2xl w-full'
  };

  return (
    <div
      className={`animate-pulse bg-cream-300/60 ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
};

export const PetCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-3 shadow-premium space-y-3">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-2 p-1">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-1/4 rounded-full" />
        </div>
        <Skeleton className="h-3 w-3/4" />
        <div className="flex gap-1.5 pt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
