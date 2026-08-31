import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Button from '../common/Button';

const ProviderCard = ({ provider, onBookNow }) => {
  return (
    <Card hover className="p-5 flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={provider.image_url || 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=200'}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover border border-cream-300"
            />
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 bg-brand-accent text-white p-1 rounded-full shadow-xs" title="Verified Provider">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h4 className="font-display font-bold text-base text-charcoal-900 truncate group-hover:text-brand-600 transition-colors">
                {provider.name}
              </h4>
            </div>

            <p className="text-xs text-charcoal-500 font-medium capitalize">
              {provider.type} Care Specialist • {provider.experience} yrs exp
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <Rating value={Number(provider.rating)} size="sm" showCount />
            </div>
          </div>
        </div>

        {/* About Snippet */}
        <p className="text-xs text-charcoal-600 line-clamp-2 my-3.5 leading-relaxed">
          {provider.about}
        </p>

        {/* Key Details Bar */}
        <div className="p-3 bg-cream-100 rounded-xl space-y-1.5 text-xs text-charcoal-700">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-charcoal-500">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400" /> Location:
            </span>
            <span className="font-semibold text-charcoal-800">{provider.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-charcoal-500">
              <Calendar className="w-3.5 h-3.5 text-charcoal-400" /> Next Available:
            </span>
            <span className="font-semibold text-emerald-700">
              {provider.available_dates && provider.available_dates.length > 0
                ? new Date(provider.available_dates[0]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                : 'Available this week'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Pricing & Action */}
      <div className="pt-4 border-t border-cream-200 mt-4 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-charcoal-400 block uppercase font-semibold">Rate</span>
          <span className="text-base font-display font-bold text-brand-900">
            ₹{Number(provider.price).toFixed(0)} <span className="text-xs font-normal text-charcoal-500">/ day</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/services/provider/${provider.id}`}>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </Link>
          {onBookNow && (
            <Button variant="primary" size="sm" onClick={() => onBookNow(provider)}>
              Book
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProviderCard;
