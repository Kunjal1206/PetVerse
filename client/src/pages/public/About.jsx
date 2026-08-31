import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, PawPrint, Users, Building2, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold border border-brand-200">
          <PawPrint className="w-3.5 h-3.5" />
          <span>Our Startup Vision & Mission</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-charcoal-900 leading-tight">
          Reimagining Animal Welfare & Pet Care Across India
        </h1>
        <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
          "Find the right pet. Care for them better. Keep them safe."
        </p>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <h2 className="font-display font-bold text-2xl text-charcoal-900">
            Why We Founded PetVerse
          </h2>
          <p>
            Every year, thousands of healthy dogs and cats enter shelters or live as community street rescues. At the same time, millions of families want to bring a companion into their home, but struggle with opaque adoption processes, mismatched lifestyles, and unverified boarding options when they travel.
          </p>
          <p>
            PetVerse was created as a unified platform. We bring together rescue shelters, AI-guided compatibility matching, verified caregivers, geolocation tools, and proactive medical tracking into one seamless, compassionate digital ecosystem.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-cream-300">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
            alt="PetVerse Mission"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-charcoal-900">Ethical Pet Adoption</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Directly partnering with verified rescue shelters. We promote ethical adoption and anti-abandonment education.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-brand-accent flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-charcoal-900">AI Compatibility</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Transparent algorithmic lifestyle scoring that reduces return rates and ensures happy forever homes.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-charcoal-900">Verified Care Network</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Background-checked boarding hosts, groomers, dog walkers, and emergency vet clinics across major Indian cities.
          </p>
        </div>
      </div>

      {/* Join CTA */}
      <div className="rounded-3xl bg-brand-900 text-white p-10 sm:p-12 text-center space-y-4 shadow-xl">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          Are you a shelter or rescue organization?
        </h2>
        <p className="text-cream-300 text-xs sm:text-sm max-w-xl mx-auto">
          Partner with PetVerse to manage your pet listings, accept digital adoption questionnaires, and expand your reach for free.
        </p>
        <div className="pt-2">
          <Link to="/register">
            <Button variant="accent" size="md">
              Register as Shelter Partner
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
