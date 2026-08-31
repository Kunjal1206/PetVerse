import React from 'react';
import Rating from '../common/Rating';
import { User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-charcoal-900">
              {review.user_name || 'Pet Parent'}
            </p>
            <p className="text-[10px] text-charcoal-400">
              {review.created_at ? new Date(review.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Verified Review'}
            </p>
          </div>
        </div>
        <Rating value={review.rating} size="sm" />
      </div>

      <p className="text-xs text-charcoal-700 leading-relaxed italic">
        "{review.comment}"
      </p>
    </div>
  );
};

export default ReviewCard;
