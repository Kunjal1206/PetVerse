import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart, Shield, Sparkles, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-900 text-cream-200 pt-16 pb-12 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-accent flex items-center justify-center text-white shadow-sm">
                <PawPrint className="w-5 h-5 fill-white/20" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Pet<span className="text-brand-accent">Verse</span>
              </span>
            </Link>
            <p className="text-sm text-cream-300/80 leading-relaxed max-w-sm">
              "Find the right pet. Care for them better. Keep them safe."
              PetVerse connects rescue shelters, loving pet parents, and verified caregivers across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-800/80 text-xs text-brand-200 border border-brand-700">
                <Shield className="w-3.5 h-3.5 text-brand-accent" /> 100% Verified Caregivers
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-800/80 text-xs text-brand-200 border border-brand-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Pet Match
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wider uppercase">
              Pet Adoption
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/adopt" className="text-cream-300 hover:text-white transition-colors">
                  Browse Pets
                </Link>
              </li>
              <li>
                <Link to="/ai-match" className="text-cream-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>AI Pet Match</span>
                  <span className="px-1 py-0.2 text-[9px] bg-brand-accent text-white rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/adopt?species=dog" className="text-cream-300 hover:text-white transition-colors">
                  Adopt Dogs
                </Link>
              </li>
              <li>
                <Link to="/adopt?species=cat" className="text-cream-300 hover:text-white transition-colors">
                  Adopt Cats
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="text-cream-300 hover:text-white transition-colors">
                  Lost & Found Pets
                </Link>
              </li>
            </ul>
          </div>

          {/* Pet Care Services */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wider uppercase">
              Pet Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/boarding" className="text-cream-300 hover:text-white transition-colors">
                  Pet Boarding
                </Link>
              </li>
              <li>
                <Link to="/services/grooming" className="text-cream-300 hover:text-white transition-colors">
                  Pet Grooming
                </Link>
              </li>
              <li>
                <Link to="/services/walking" className="text-cream-300 hover:text-white transition-colors">
                  Dog Walking
                </Link>
              </li>
              <li>
                <Link to="/services/training" className="text-cream-300 hover:text-white transition-colors">
                  Pet Training
                </Link>
              </li>
              <li>
                <Link to="/nearby" className="text-cream-300 hover:text-white transition-colors">
                  Nearby Vet Clinics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wider uppercase">
              PetVerse
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-cream-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cream-300 hover:text-white transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-cream-300 hover:text-white transition-colors">
                  Register Shelter
                </Link>
              </li>
              <li className="pt-2 text-xs text-cream-400/80">
                <span className="block font-medium text-cream-300">Support Hours:</span>
                9:00 AM - 8:00 PM IST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <p>© {new Date().getFullYear()} PetVerse Inc. All rights reserved. Designed with compassion for every pet.</p>
          <div className="flex items-center gap-6">
            <span>Built for loving pet parents & shelters</span>
            <span className="flex items-center gap-1 text-rose-400">
              <Heart className="w-3.5 h-3.5 fill-current" /> Adopt Don't Shop
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
