import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  PawPrint, 
  Clock, 
  Home as HomeIcon,
  Activity,
  CheckCircle2, 
  ChevronRight, 
  HelpCircle,
  Calendar,
  Bell,
  Stethoscope,
  Scissors,
  Compass,
  MessageSquare,
  Star,
  Shield,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/common/Button';
import PetCard from '../../components/pet/PetCard';
import { getPets } from '../../services/petService';
import { useMode } from '../../context/ModeContext';

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mode, setMode, switchToAdopt, switchToHavePet, isAdopt, isHavePet } = useMode();

  const [featuredPets, setFeaturedPets] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [searchSpecies, setSearchSpecies] = useState('');
  const [loadingPets, setLoadingPets] = useState(true);

  // Sync with URL query param if present
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'adopt' || urlMode === 'care' || urlMode === 'have_pet') {
      const normalized = urlMode === 'care' ? 'have_pet' : urlMode;
      if (normalized !== mode) {
        setMode(normalized);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoadingPets(true);
        const data = await getPets({ limit: 4 });
        setFeaturedPets(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured pets:', err);
      } finally {
        setLoadingPets(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set('city', searchCity);
    if (searchSpecies) params.set('species', searchSpecies);
    navigate(`/adopt?${params.toString()}`);
  };

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    setSearchParams({ mode: selectedMode });
    const el = document.getElementById('mode-details-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroServiceCards = [
    {
      title: 'Dog Walking',
      desc: 'GPS-tracked, dedicated 45-min daily exercise walks.',
      icon: Activity,
      link: '/services/category/walking',
      btnText: 'Book Walk',
      iconBg: 'bg-amber-100 text-amber-800'
    },
    {
      title: 'Dog Grooming',
      desc: 'Warm baths, hygienic haircuts, and relaxing spa sessions.',
      icon: Scissors,
      link: '/services/category/grooming',
      btnText: 'Explore Spas',
      iconBg: 'bg-teal-100 text-teal-800'
    },
    {
      title: 'Nearby 24/7 Vets',
      desc: 'Emergency trauma hospitals, vaccinations & surgery.',
      icon: Stethoscope,
      link: '/nearby',
      btnText: 'Nearby Vets',
      btnHighlight: true,
      iconBg: 'bg-rose-100 text-rose-800'
    },
    {
      title: 'Pet Boarding',
      desc: 'Loving cage-free home-stays and safe overnight stays.',
      icon: HomeIcon,
      link: '/services/boarding',
      btnText: 'Book Homestay',
      btnHighlight: true,
      iconBg: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="space-y-16 pb-20 bg-cream-100/40">
      
      {/* =========================================================================
          HERO SECTION (BENCHMARKED FROM ATTACHED REFERENCE DESIGN)
          - Left: Warm cream background, bold typography, two distinct action buttons
          - Right: Organic curved golden-amber backdrop with hero dog & floating circular avatars
          - Bottom: Horizontal floating service cards with clearly visible action buttons
          ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-cream-100/70 border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
            
            {/* Left Content Area */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>India's AI-Assisted Companion & Care Network</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12]">
                Meet Your Next{' '}
                <span className="text-brand-900 underline decoration-amber-400 decoration-wavy decoration-4">
                  Best Friend
                </span>{' '}
                & Keep Them Safe.
              </h1>

              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Everyone needs a trusted and reliable companion. Discover properly vaccinated, vetted rescue pets or access verified 24/7 emergency veterinary clinics, cage-free homestay boarding, and grooming.
              </p>

              {/* Two Primary Distinct Action Buttons (Matching reference UI) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => handleSelectMode('adopt')}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAdopt
                      ? 'bg-amber-400 hover:bg-amber-500 text-charcoal-900 ring-4 ring-amber-400/20'
                      : 'bg-amber-400 hover:bg-amber-500 text-charcoal-900'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-charcoal-900/20" />
                  <span>I Want to Adopt</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectMode('have_pet')}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isHavePet
                      ? 'bg-brand-600 hover:bg-brand-700 text-white ring-4 ring-brand-600/20'
                      : 'bg-brand-500 hover:bg-brand-600 text-white'
                  }`}
                >
                  <PawPrint className="w-4 h-4" />
                  <span>I Already Have a Pet</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-charcoal-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Shelter Verified</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>4.9/5 Caregiver Rating</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>24/7 Emergency Clinic Map</span>
                </span>
              </div>
            </div>

            {/* Right Side: Organic Curved Shape & Charismatic Hero Dog with Floating Avatars */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-6">
              
              {/* The Bold Organic Curved Shape (Matching the warm golden curve in reference pic) */}
              <div 
                className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] bg-gradient-to-br from-amber-400 via-amber-400 to-amber-500 shadow-2xl"
                style={{
                  borderRadius: '52% 48% 65% 35% / 45% 55% 45% 55%'
                }}
              />

              {/* Center Main Charismatic Dog Image */}
              <div className="relative z-10 w-[300px] h-[360px] sm:w-[380px] sm:h-[440px] flex items-end justify-center">
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=650"
                  alt="Happy pet companion"
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Circular Pet Avatar 1 (Top Right - Blue circle with cute puppy) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 right-4 sm:right-10 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-sky-400 p-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=150"
                  alt="Puppy avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              {/* Floating Circular Pet Avatar 2 (Middle Right - Warm circle with kitten) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-1/2 -right-2 sm:right-2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-rose-400 p-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150"
                  alt="Cat avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              {/* Floating Circular Pet Avatar 3 (Left Bottom - Red circle with rescue pup) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-0 sm:left-4 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-amber-600 p-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=150"
                  alt="Rescue pup"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              {/* Floating Circular Badge 4 (Bottom Right - Green circle with 24/7 Vet Icon) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-2 right-6 sm:right-16 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-emerald-500 p-1 flex items-center justify-center text-white"
              >
                <div className="w-full h-full rounded-full bg-emerald-600 flex flex-col items-center justify-center text-white">
                  <Stethoscope className="w-5 h-5" />
                  <span className="text-[8px] font-extrabold uppercase tracking-tighter mt-0.5">24/7 Vet</span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Bottom Strip of Floating Horizontal Service Cards (Matching reference layout) */}
          <div className="pt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {heroServiceCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-white border border-cream-300 shadow-premium flex flex-col justify-between space-y-3 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base text-charcoal-900">
                          {card.title}
                        </h4>
                        <p className="text-xs text-charcoal-500 line-clamp-2 mt-0.5 font-medium leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>

                    {/* Highly Visible Action Button (100% visible before hovering!) */}
                    <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                        Available Now
                      </span>
                      <Link to={card.link}>
                        <button
                          type="button"
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                            card.btnHighlight
                              ? 'bg-brand-500 hover:bg-brand-600 text-white font-extrabold'
                              : 'bg-cream-100 hover:bg-cream-200 text-charcoal-800'
                          }`}
                        >
                          <span>{card.btnText}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          DYNAMIC PERSONA SECTION (Scroll Target)
          ========================================================================= */}
      <div id="mode-details-section" className="space-y-16">
        
        {/* =========================================================================
            VIEW A: "I WANT TO ADOPT A PET" (When in Adopt Mode)
            ========================================================================= */}
        {isAdopt && (
          <motion.div
            key="adopt-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-16"
          >
            {/* AI Pet Match Quiz Spotlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-brand-600 to-brand-500 text-white p-8 sm:p-12 shadow-premium relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
                  <Heart className="w-96 h-96 fill-white" />
                </div>

                <div className="relative z-10 max-w-3xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-cream-100">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Algorithmic Matching Engine</span>
                  </div>

                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                    Find Compatible Shelter Rescues In 2 Minutes.
                  </h2>

                  <p className="text-cream-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                    We evaluate your home type, daily work hours away, active exercise habits, and presence of children against individual pet energy levels to provide transparent percentage compatibility.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link to="/ai-match">
                      <Button size="lg" variant="secondary" icon={Compass} className="bg-white text-brand-900 hover:bg-cream-100 shadow-sm font-bold">
                        Start AI Match Quiz
                      </Button>
                    </Link>
                    <Link to="/adopt">
                      <Button size="lg" variant="outline" icon={Search} className="border-white/40 text-white hover:bg-white/10 font-semibold">
                        View All Shelter Pets
                      </Button>
                    </Link>
                  </div>

                  {/* Fast Search Filter Bar */}
                  <form
                    onSubmit={handleHeroSearch}
                    className="p-3 bg-white rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl text-charcoal-900 mt-6"
                  >
                    <div className="flex-1 flex items-center gap-2 px-3 py-1.5 w-full">
                      <PawPrint className="w-4 h-4 text-brand-500 shrink-0" />
                      <select
                        value={searchSpecies}
                        onChange={(e) => setSearchSpecies(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
                      >
                        <option value="">Species (Dogs & Cats)</option>
                        <option value="dog">Dogs Only</option>
                        <option value="cat">Cats Only</option>
                      </select>
                    </div>

                    <div className="h-6 w-px bg-cream-300 hidden sm:block" />

                    <div className="flex-1 flex items-center gap-2 px-3 py-1.5 w-full">
                      <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                      <select
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
                      >
                        <option value="">All Indian Cities</option>
                        <option value="Delhi">Delhi NCR</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Jaipur">Jaipur</option>
                      </select>
                    </div>

                    <Button type="submit" size="md" variant="primary" icon={Search} className="w-full sm:w-auto shrink-0 font-bold">
                      Search Pets
                    </Button>
                  </form>
                </div>
              </div>
            </section>

            {/* Featured Adoptable Pets */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                    Available For Adoption
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                    Rescue Companions Ready For A Home
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
                    Every adoption frees a spot in our partner shelters for another rescue in need.
                  </p>
                </div>

                <Link to="/adopt">
                  <Button variant="outline" size="sm" icon={ChevronRight} iconPosition="right">
                    View All 15 Available Pets
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </section>

            {/* 4 Steps of Ethical Adoption */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 border border-cream-300 space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                    Transparent Process
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                    How Adoption Works on PetVerse
                  </h3>
                  <p className="text-xs text-charcoal-600">
                    Simple, respectful, and transparent digital workflow with zero hidden fees.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { step: '01', title: 'Browse & Filter', desc: 'Filter by species, breed, age, size, and city location from verified partner shelters.' },
                    { step: '02', title: 'Check AI Match', desc: 'Take the 2-minute quiz to see if the pet’s energy matches your home and schedule.' },
                    { step: '03', title: 'Digital Application', desc: 'Submit your housing details and lifestyle commitment directly to shelter caretakers.' },
                    { step: '04', title: 'Meet & Welcome Home', desc: 'Coordinate a meet-and-greet, finalize paperwork, and bring your companion home.' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white border border-cream-300 shadow-xs space-y-2">
                      <span className="text-xl font-display font-extrabold text-brand-500">{item.step}</span>
                      <h4 className="font-display font-bold text-base text-charcoal-900">{item.title}</h4>
                      <p className="text-xs text-charcoal-600 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* =========================================================================
            VIEW B: "I ALREADY HAVE A PET" (When in Have Pet Mode)
            ========================================================================= */}
        {isHavePet && (
          <motion.div
            key="have-pet-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-16"
          >
            {/* Preventative Health & Vaccination Schedule Tracker */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Preventative Healthcare
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                    Stay On Top of Vaccinations & Wellness
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
                    Automated schedules that ensure your pet stays protected against preventable illnesses.
                  </p>
                </div>

                <Link to="/dashboard/care">
                  <Button variant="primary" size="sm" icon={Calendar} className="font-bold">
                    Open Health Manager
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-900">Annual Rabies & DHPP</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    Scheduled boosters to maintain essential immunity and municipal compliance in Indian cities.
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-[11px] font-bold">
                      Booster: Every 12 Months
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-900">Quarterly Deworming</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    Timely reminders for broad-spectrum deworming tablets to prevent gastrointestinal parasites.
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-bold">
                      Schedule: Every 3 Months
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                    <PawPrint className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-900">My Pets Medical Log</h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    Log your companion's weight progression, allergies, microchip ID, and diet notes in one place.
                  </p>
                  <div className="pt-2">
                    <Link to="/dashboard/my-pets" className="text-xs font-bold text-teal-700 hover:underline">
                      Manage Pet Profiles →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Geolocation Leaflet Map Section (With prominent, clearly visible buttons) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal-900 to-brand-950 text-white p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-charcoal-800">
                <div className="lg:col-span-7 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
                    Interactive Geolocation Explorer
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                    Locate 24/7 Emergency Animal Hospitals & Dog Parks.
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed max-w-lg">
                    Real-time pinpoints for emergency veterinary trauma centers, rescue shelters, and canine exercise zones across Delhi, Bangalore, Mumbai, Pune, and more.
                  </p>
                  <div className="pt-2">
                    <Link to="/nearby">
                      <Button size="lg" variant="primary" icon={MapPin} className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold shadow-lg">
                        Open Nearby Vet Map
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Always-Visible Eye-Catching Cards */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xl space-y-2.5">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>Verified Nearby Facilities</span>
                      </span>
                      <span className="text-[10px] font-bold text-teal-300 uppercase bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                        Live Database
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Apollo Pet Emergency Hospital</p>
                        <p className="text-[11px] text-charcoal-300">Green Park Extension • 2.4 km away</p>
                      </div>
                      <Link to="/nearby">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-500 hover:bg-rose-600 text-white shrink-0 shadow-xs cursor-pointer inline-block">
                          View on Map
                        </span>
                      </Link>
                    </div>

                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Siri Fort Canine Agility Park</p>
                        <p className="text-[11px] text-charcoal-300">August Kranti Marg • 1.8 km away</p>
                      </div>
                      <Link to="/nearby">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-500 hover:bg-emerald-600 text-white shrink-0 shadow-xs cursor-pointer inline-block">
                          View Park
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 24/7 AI Pet Assistant Spotlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-brand-50 border border-brand-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800">
                    <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                    <span>24/7 AI Pet Care Assistant</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">
                    Instant Answers to Nutrition, Toxic Food Checks & Daily Health
                  </h3>
                  <p className="text-xs text-charcoal-600 max-w-xl leading-relaxed">
                    Wondering if a human food is toxic, how to soothe storm anxiety, or how to potty-train your puppy? Ask our assistant anytime.
                  </p>
                </div>

                <Link to="/dashboard/assistant">
                  <Button size="md" variant="primary" icon={MessageSquare} className="shrink-0 font-bold">
                    Ask AI Assistant
                  </Button>
                </Link>
              </div>
            </section>
          </motion.div>
        )}

      </div>

      {/* =========================================================================
          COMMON FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Quick Answers
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does adoption work on PetVerse?',
              a: 'Select "I Want to Adopt", browse shelter pets or take the AI match quiz, and click "Apply to Adopt" to submit your digital questionnaire directly to shelter caretakers.'
            },
            {
              q: 'How does Pet Boarding work if I already have a pet?',
              a: 'Select "I Already Have a Pet", browse verified caregivers offering cage-free homestays, and submit a booking reservation with your check-in dates.'
            },
            {
              q: 'Can I track health and vaccination reminders for free?',
              a: 'Yes! PetVerse includes an automated health schedule for Rabies boosters, deworming, and vet checkups with zero subscription fees.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-cream-300 shadow-xs space-y-1.5">
              <h4 className="font-display font-bold text-sm text-charcoal-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-accent shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-1">
          <Link to="/faq" className="text-xs font-bold text-brand-600 hover:underline">
            View All FAQs & Support Guidelines →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
