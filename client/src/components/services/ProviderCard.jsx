import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Calendar, ArrowRight, Home } from 'lucide-react';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Button from '../common/Button';

const ProviderCard = ({ provider, onBookNow }) => {
  return (
    <Card hover className="p-5 flex flex-col justify-between group border-cream-300 shadow-sm hover:shadow-premium transition-all">
      <div>
        {/* Top Header */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={provider.image_url || 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=200'}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover border border-cream-300 shadow-xs"
            />
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 bg-teal-600 text-white p-1 rounded-full shadow-xs" title="Verified Provider">
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

            <p className="text-xs text-charcoal-500 font-medium capitalize mt-0.5">
              {provider.type} Care Specialist • {provider.experience} yrs exp
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <Rating value={Number(provider.rating)} size="sm" showCount />
            </div>
          </div>
        </div>

        {/* About Snippet */}
        <p className="text-xs text-charcoal-600 line-clamp-2 my-3.5 leading-relaxed font-normal">
          {provider.about}
        </p>

        {/* Key Details Bar */}
        <div className="p-3 bg-cream-100 rounded-2xl space-y-1.5 text-xs text-charcoal-700 border border-cream-200">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-charcoal-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-500" /> Location:
            </span>
            <span className="font-bold text-charcoal-900">{provider.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-charcoal-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-teal-600" /> Availability:
            </span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              {provider.available_dates && provider.available_dates.length > 0
                ? new Date(provider.available_dates[0]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                : 'Immediate Slots Open'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Pricing & Prominent Action Buttons (100% visible before hover) */}
      <div className="pt-4 border-t border-cream-200 mt-4 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-charcoal-500 block uppercase font-bold tracking-wider">Daily Rate</span>
          <span className="text-lg font-display font-extrabold text-brand-900">
            ₹{Number(provider.price).toFixed(0)} <span className="text-xs font-normal text-charcoal-500">/ day</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/services/provider/${provider.id}`}>
            <Button variant="outline" size="sm" className="font-semibold text-charcoal-700 border-cream-300 hover:bg-cream-100">
              Profile
            </Button>
          </Link>
          {onBookNow && (
            <button
              type="button"
              onClick={() => onBookNow(provider)}
              className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Book Homestay</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProviderCard;
