import React from 'react';
import Badge from '../common/Badge';

const StatusBadge = ({ status = 'pending', className = '' }) => {
  const statusMap = {
    pending: { label: 'Pending Review', variant: 'warning' },
    under_review: { label: 'Under Review', variant: 'info' },
    approved: { label: 'Approved', variant: 'success' },
    rejected: { label: 'Not Approved', variant: 'danger' },
    completed: { label: 'Adopted / Completed', variant: 'brand' },
  };

  const current = statusMap[status] || { label: status, variant: 'neutral' };

  return (
    <Badge variant={current.variant} dot size="sm" className={className}>
      {current.label}
    </Badge>
  );
};

export default StatusBadge;
