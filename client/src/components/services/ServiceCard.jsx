import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';

const ServiceCard = ({
  id,
  title,
  subtitle,
  description,
  benefits = [],
  priceStarting = '₹500',
  icon: Icon,
  image,
  link
}) => {
  return (
    <Card hover className="overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Service Visual Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-cream-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />
          
          <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-700 shadow-sm">
            {Icon && <Icon className="w-5 h-5" />}
          </div>

          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-white/90 px-2 py-0.5 rounded-md">
                Verified Care
              </span>
              <h3 className="text-lg font-display font-bold text-white mt-1">
                {title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-cream-300 block">From</span>
              <span className="text-sm font-bold text-white">{priceStarting}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-charcoal-600 leading-relaxed">
            {description}
          </p>

          <div className="space-y-1.5 pt-1">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-charcoal-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link
          to={link || `/services/category/${id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-500 hover:text-white text-brand-800 font-semibold text-xs transition-all duration-200"
        >
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCard;
