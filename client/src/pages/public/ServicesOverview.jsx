import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../../components/services/ServiceCard';
import { Sparkles, ShieldCheck, Heart, Clock, Award } from 'lucide-react';
import Button from '../../components/common/Button';

const ServicesOverview = () => {
  const services = [
    {
      id: 'boarding',
      title: 'Pet Boarding & Homestay',
      subtitle: 'Overnight Care While You Travel',
      description: 'Cage-free homestays, verified hosts, and 24/7 care monitoring so your pet feels at home.',
      benefits: ['24/7 CCTV & photo updates', 'Verified background checked hosts', 'Emergency vet coverage'],
      priceStarting: '₹700 / day',
      image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=600',
      link: '/services/boarding'
    },
    {
      id: 'sitting',
      title: 'In-House Pet Sitting',
      subtitle: 'Care In Your Own Home',
      description: 'Professional caretakers visit your home for feeding, medication, cuddles, and litter cleaning.',
      benefits: ['Maintains pet routine at home', 'Feeding & watering plants', 'GPS check-in/out logs'],
      priceStarting: '₹500 / visit',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600',
      link: '/services/category/sitting'
    },
    {
      id: 'grooming',
      title: 'Pet Spa & Grooming',
      subtitle: 'Hygiene & Styling',
      description: 'Soothing organic bubble baths, stylized haircuts, nail clipping, and ear cleaning.',
      benefits: ['Organic hypoallergenic shampoos', 'Stress-free handling', 'Full coat de-shedding'],
      priceStarting: '₹950 / session',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600',
      link: '/services/category/grooming'
    },
    {
      id: 'walking',
      title: 'Daily Dog Walking',
      subtitle: 'Exercise & Sensory Stimulation',
      description: 'Dedicated 45-minute daily walks with trained walkers. Real-time GPS path sharing.',
      benefits: ['Double-leash safety protocol', 'Live route sharing', 'Energy burn & socializing'],
      priceStarting: '₹250 / walk',
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600',
      link: '/services/category/walking'
    },
    {
      id: 'training',
      title: 'Obedience & Training',
      subtitle: 'Behavioral Mastery',
      description: 'Certified behaviorists for puppy socialization, leash walking, and advanced obedience.',
      benefits: ['Positive reinforcement only', 'Custom home routines', 'Leash pulling correction'],
      priceStarting: '₹1500 / session',
      image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=600',
      link: '/services/category/training'
    },
    {
      id: 'vet',
      title: 'Veterinary Clinics',
      subtitle: 'Medical Health & Surgery',
      description: 'Connect with verified diagnostic clinics, senior surgeons, and vaccination centers.',
      benefits: ['In-house pharmacy', 'Digital health records', 'On-call emergency assistance'],
      priceStarting: '₹600 / consult',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600',
      link: '/nearby'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold border border-brand-200">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
          <span>Professional Pet Care Discovery</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-charcoal-900">
          Everything Your Pet Needs to Stay Happy & Healthy
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
          Book verified pet boarding, in-house sitters, experienced dog walkers, spa groomers, and licensed veterinarians across India.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>

      {/* Trust Guarantee Section */}
      <div className="rounded-3xl bg-brand-900 text-white p-8 sm:p-12 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-brand-accent" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-base text-white">100% Background Checked</h3>
            <p className="text-xs text-cream-300/80 leading-relaxed">
              Every host and caregiver passes thorough identity and premise safety verification.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 text-rose-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-base text-white">Pet Safety Coverage</h3>
            <p className="text-xs text-cream-300/80 leading-relaxed">
              All bookings include complementary veterinary emergency support protection.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-amber-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-base text-white">Daily Photo Updates</h3>
            <p className="text-xs text-cream-300/80 leading-relaxed">
              Receive timely photos, videos, and walking logs directly on your phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
