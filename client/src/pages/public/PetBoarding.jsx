import React, { useState, useEffect } from 'react';
import { getProviders } from '../../services/providerService';
import ProviderCard from '../../components/services/ProviderCard';
import BookingModal from '../../components/services/BookingModal';
import ReviewCard from '../../components/services/ReviewCard';
import Button from '../../components/common/Button';
import { 
  ShieldCheck, 
  Search, 
  MapPin, 
  Calendar, 
  Heart, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  PawPrint,
  Home,
  UserCheck,
  PhoneCall,
  Sparkles
} from 'lucide-react';

const PetBoarding = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState(null);
  
  // Search Form State
  const [searchCity, setSearchCity] = useState('');
  const [petType, setPetType] = useState('dog');
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);

  useEffect(() => {
    const fetchBoardingProviders = async () => {
      try {
        setLoading(true);
        const data = await getProviders({ type: 'boarding', city: searchCity });
        setProviders(data);
      } catch (err) {
        console.error('Failed to load boarding hosts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardingProviders();
  }, [searchCity]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const el = document.getElementById('hosts-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const demoReviews = [
    {
      id: '1',
      user_name: 'Amit Joshi (Mumbai)',
      rating: 5,
      comment: 'Karan took care of our Labrador Rocky like his own! Received daily video updates of him playing in the garden. Completely stress-free vacation for us.',
      created_at: '2026-08-25'
    },
    {
      id: '2',
      user_name: 'Priya Patel (Bangalore)',
      rating: 5,
      comment: 'Our cat Misty stayed at homestay boarding in Indiranagar. The rooms are air conditioned and clean. Super happy with PetVerse verified hosts!',
      created_at: '2026-08-20'
    },
    {
      id: '3',
      user_name: 'Neha Kapoor (Chandigarh)',
      rating: 5,
      comment: 'Transparent pricing, no hidden fees, and the host even administered daily ear drops without any hassle. Highly recommend!',
      created_at: '2026-08-18'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO & SEARCH PANEL */}
      <section className="relative pt-12 pb-20 bg-gradient-to-b from-brand-50/80 via-cream-100 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>100% Background-Checked Homestay & Boarding</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 leading-tight">
              Trusted Care While You’re Away.
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto">
              Find verified pet hosts and cage-free boarding options where your furry best friend can stay safe, comfortable, and pampered.
            </p>
          </div>

          {/* Search Panel */}
          <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              
              {/* City */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Location / City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                  <select
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="">All Indian Cities</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
              </div>

              {/* Pet Type */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Pet Type
                </label>
                <div className="relative">
                  <PawPrint className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="dog">Dog (Any size)</option>
                    <option value="cat">Cat (Indoor)</option>
                    <option value="other">Other Small Pet</option>
                  </select>
                </div>
              </div>

              {/* Check In */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Check Out */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Search CTA */}
              <div>
                <Button type="submit" variant="primary" size="md" icon={Search} className="w-full h-10 shadow-sm">
                  Find Boarding
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. BOARDING SERVICE TYPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">Homestay Boarding</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Your pet stays at a verified pet lover's home with dedicated room space, couch privileges, and constant human companionship.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">Resort & Kennel Facility</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Expansive play lawns, swimming pools for dogs, air-conditioned suites, and on-site vet support.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal-900">In-Home Pet Sitting</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Caregiver visits your house so cats and anxious pets stay relaxed in their own familiar environment.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CARE YOU CAN TRUST (TRUST PILLARS) */}
      <section className="bg-cream-200/60 py-16 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Safety First
            </span>
            <h2 className="font-display font-bold text-3xl text-charcoal-900">
              Care You Can Trust
            </h2>
            <p className="text-sm text-charcoal-600">
              We vet every caregiver with the same rigorous standard we'd expect for our own beloved pets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Verified Caregivers', desc: 'Government ID, address proof, and house sanitation inspections.', icon: ShieldCheck },
              { title: 'Background Checked', desc: 'Prior experience and criminal background check completed.', icon: UserCheck },
              { title: 'Transparent Reviews', desc: '100% genuine reviews from pet parents who booked on PetVerse.', icon: Sparkles },
              { title: 'Emergency Support', desc: '24/7 on-call veterinary assistance and hospital tie-ups.', icon: PhoneCall },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-sm space-y-2">
                  <Icon className="w-7 h-7 text-brand-500 mb-2" />
                  <h4 className="font-display font-bold text-base text-charcoal-900">{p.title}</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Simple Booking
          </span>
          <h2 className="font-display font-bold text-3xl text-charcoal-900">
            How Pet Boarding Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Search', desc: 'Enter your city and travel dates to browse verified pet hosts.' },
            { step: '02', title: 'Compare', desc: 'Read genuine reviews, check photos, pricing, and safety amenities.' },
            { step: '03', title: 'Request Booking', desc: 'Reserve dates instantly with zero upfront hidden fees.' },
            { step: '04', title: 'Relax', desc: 'Enjoy your trip while receiving daily photos and video check-ins.' },
          ].map((s, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3 relative">
              <span className="font-display font-extrabold text-3xl text-brand-200 block">
                {s.step}
              </span>
              <h4 className="font-display font-bold text-lg text-charcoal-900">{s.title}</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AVAILABLE CAREGIVERS LISTING */}
      <section id="hosts-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Top Rated Hosts
            </span>
            <h2 className="font-display font-bold text-3xl text-charcoal-900">
              Verified Boarding Caregivers
            </h2>
          </div>

          <span className="text-xs text-charcoal-500 font-semibold">
            Showing {providers.length} verified hosts in {searchCity || 'India'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onBookNow={(p) => setSelectedProviderForBooking(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. REVIEWS FROM REAL PET PARENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Verified Experiences
          </span>
          <h2 className="font-display font-bold text-3xl text-charcoal-900">
            What Pet Parents Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoReviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </section>

      {/* 7. BOARDING FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="font-display font-bold text-2xl text-charcoal-900 text-center">
          Boarding FAQs
        </h3>
        <div className="space-y-3">
          {[
            { q: 'What do I need to pack for my pet’s stay?', a: 'Please pack their regular food, favorite toy or bed for scent comfort, leash, and any medications with instructions.' },
            { q: 'What if my pet needs medical attention during boarding?', a: 'All PetVerse hosts have direct on-call access to local partnered veterinary clinics. You will be alerted immediately in case of any health change.' },
            { q: 'Can I do a meet-and-greet with the host before booking?', a: 'Yes! We encourage a quick meet-and-greet or video consultation so you and your pet feel 100% confident.' }
          ].map((f, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-cream-300 space-y-1.5 shadow-xs">
              <h4 className="font-bold text-sm text-charcoal-900">{f.q}</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedProviderForBooking && (
        <BookingModal
          provider={selectedProviderForBooking}
          isOpen={!!selectedProviderForBooking}
          onClose={() => setSelectedProviderForBooking(null)}
          onSuccess={() => setSelectedProviderForBooking(null)}
        />
      )}
    </div>
  );
};

export default PetBoarding;
