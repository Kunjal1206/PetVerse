import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
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
  Building2,
  ClipboardList,
  UserCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/common/Button';
import PetCard from '../../components/pet/PetCard';
import { getPets } from '../../services/petService';
import { useMode } from '../../context/ModeContext';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    mode, 
    setMode, 
    resetMode, 
    switchToAdopt, 
    switchToHavePet, 
    switchToShelter, 
    isAdopt, 
    isHavePet, 
    isShelter, 
    isUnselected 
  } = useMode();
  const { login } = useAuth();

  const [featuredPets, setFeaturedPets] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [searchSpecies, setSearchSpecies] = useState('');
  const [loadingPets, setLoadingPets] = useState(true);

  // Sync with URL query param if present
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'adopt' || urlMode === 'have_pet' || urlMode === 'care' || urlMode === 'shelter') {
      const normalized = urlMode === 'care' ? 'have_pet' : urlMode;
      if (normalized !== mode) {
        setMode(normalized);
      }
    } else if (urlMode === 'choose' || urlMode === 'select') {
      resetMode();
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetMode = () => {
    resetMode();
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFastShelterLogin = async () => {
    try {
      await login({ email: 'delhi.shelter@petverse.com', password: 'password123' });
      navigate('/shelter/dashboard');
    } catch (err) {
      navigate('/login');
    }
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
    <div className="min-h-screen bg-cream-100/40 pb-20">
      
      {/* =========================================================================
          1. OPENING CHOOSER GATEWAY (INITIAL LANDING SCREEN)
          - Displayed by default when visiting the homepage.
          - Gives the clear 2-3 options as requested by the faculty!
          ========================================================================= */}
      {isUnselected && (
        <motion.div
          key="gateway-screen"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-12"
        >
          {/* Welcome Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-900 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Welcome to PetVerse • India's Intelligent Pet Network</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.15]">
              How would you like to use{' '}
              <span className="text-brand-600 underline decoration-amber-400 decoration-wavy decoration-4">
                PetVerse
              </span>{' '}
              today?
            </h1>

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-medium">
              Please select your primary path below. We'll automatically customize the features, tools, and recommendations to match your exact needs with zero clutter.
            </p>
          </div>

          {/* The 3 Core Options Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            
            {/* OPTION 1: I Want to Adopt a Pet */}
            <div 
              onClick={() => handleSelectMode('adopt')}
              className="group relative rounded-3xl bg-white border-2 border-amber-300 hover:border-amber-500 shadow-premium hover:shadow-2xl transition-all duration-300 p-7 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-300/30 to-amber-500/10 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <Heart className="w-7 h-7 text-amber-600 fill-amber-500/30" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                    Option 1
                  </span>
                </div>

                <div>
                  <h2 className="font-display font-extrabold text-2xl text-charcoal-900 group-hover:text-amber-700 transition-colors">
                    I Want to Adopt
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 leading-relaxed">
                    Looking to welcome a rescue dog or cat into your family. Find compatible companions and apply directly.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-cream-200">
                  <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                    Included Features:
                  </span>
                  <ul className="space-y-2 text-xs text-charcoal-700 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>2-Minute AI Lifestyle & Compatibility Quiz</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>100% Shelter-Verified Dogs, Cats & Puppies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>1-Click Digital Adoption Application Form</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Ethical Adoption Workflow & Meet-and-Greet</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  type="button"
                  onClick={() => handleSelectMode('adopt')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-charcoal-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Adoption Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* OPTION 2: I Already Have a Pet */}
            <div 
              onClick={() => handleSelectMode('have_pet')}
              className="group relative rounded-3xl bg-white border-2 border-teal-300 hover:border-teal-500 shadow-premium hover:shadow-2xl transition-all duration-300 p-7 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-300/30 to-teal-500/10 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <PawPrint className="w-7 h-7 text-teal-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-200">
                    Option 2
                  </span>
                </div>

                <div>
                  <h2 className="font-display font-extrabold text-2xl text-charcoal-900 group-hover:text-teal-700 transition-colors">
                    I Already Have a Pet
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 leading-relaxed">
                    Preventative health schedules, verified homestay boarding, emergency veterinary clinics, grooming & walking.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-cream-200">
                  <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                    Included Features:
                  </span>
                  <ul className="space-y-2 text-xs text-charcoal-700 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Cage-Free Verified Homestay Boarding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>24/7 Emergency Vet Clinic Map & Hotline</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Automated Rabies & Deworming Health Tracker</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>GPS Dog Walking & Professional Grooming Spas</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  type="button"
                  onClick={() => handleSelectMode('have_pet')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Pet Care Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* OPTION 3: Shelter or Service Provider */}
            <div 
              onClick={() => handleSelectMode('shelter')}
              className="group relative rounded-3xl bg-white border-2 border-purple-300 hover:border-purple-500 shadow-premium hover:shadow-2xl transition-all duration-300 p-7 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1 md:col-span-2 lg:col-span-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-purple-500/10 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-7 h-7 text-purple-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
                    Option 3
                  </span>
                </div>

                <div>
                  <h2 className="font-display font-extrabold text-2xl text-charcoal-900 group-hover:text-purple-700 transition-colors">
                    Shelter & Provider
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 leading-relaxed">
                    For animal rescue NGOs, homestay boarding hosts, and veterinary clinics managing welfare services.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-cream-200">
                  <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                    Included Features:
                  </span>
                  <ul className="space-y-2 text-xs text-charcoal-700 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>List Rescue Animals for Adoption</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Review & Screen Adopter Applications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Host Cage-Free Homestay Boarding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Publish Emergency Clinic Timings & Services</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  type="button"
                  onClick={() => handleSelectMode('shelter')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enter Provider Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Quick Platform Guarantees */}
          <div className="pt-6 border-t border-cream-300 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-bold text-charcoal-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Shelter-Verified Listings</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>4.9/5 Caregiver Satisfaction</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>24/7 Live Emergency Network</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Zero Clutter • Switch Options Anytime</span>
            </span>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          TOP PATHWAY BANNER (WHEN AN OPTION HAS BEEN SELECTED)
          - Lets the user / evaluator clearly see which option is active.
          - Contains the "Switch Option / Back to Opening Screen" button!
          ========================================================================= */}
      {mode && (
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-cream-300 py-3 px-4 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">
                Currently Viewing:
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cream-100 border border-cream-300 flex items-center gap-1.5 text-charcoal-900 shadow-xs">
                {isAdopt && (
                  <>
                    <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
                    <span>Option 1: I Want to Adopt</span>
                  </>
                )}
                {isHavePet && (
                  <>
                    <PawPrint className="w-3.5 h-3.5 text-teal-600" />
                    <span>Option 2: I Already Have a Pet</span>
                  </>
                )}
                {isShelter && (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Option 3: Shelter & Care Provider</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetMode}
                className="px-4 py-1.5 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-500 text-charcoal-950 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Return to the opening choice screen"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Switch Option / Back to Opening Screen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. VIEW A: "I WANT TO ADOPT A PET" (OPTION 1 SELECTED)
          - Features the warm hero from the reference image
          - AI Pet Matchmaker Spotlight
          - Search Filter Bar
          - Available Rescue Pets Grid
          - 4-Step Ethical Adoption Process
          ========================================================================= */}
      {isAdopt && (
        <motion.div
          key="adopt-selected-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-16"
        >
          {/* Reference-benchmark Hero for Adoption */}
          <section className="relative overflow-hidden pt-8 pb-16 bg-cream-100/70 border-b border-cream-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[480px]">
                
                {/* Left Content Area */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
                    <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600/30" />
                    <span>Option 1: Adoption & Rescue Network</span>
                  </div>

                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12]">
                    Meet Your Next{' '}
                    <span className="text-brand-900 underline decoration-amber-400 decoration-wavy decoration-4">
                      Best Friend
                    </span>{' '}
                    & Give Them A Forever Home.
                  </h1>

                  <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    Everyone deserves a loving companion. Discover verified, vaccinated shelter dogs and cats ready for adoption across Indian cities.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                    <Link to="/ai-match">
                      <Button size="lg" variant="primary" icon={Compass} className="w-full sm:w-auto font-extrabold bg-amber-400 hover:bg-amber-500 text-charcoal-950 shadow-md">
                        Take 2-Min AI Match Quiz
                      </Button>
                    </Link>
                    <Link to="/adopt">
                      <Button size="lg" variant="outline" icon={Search} className="w-full sm:w-auto font-bold border-charcoal-400 text-charcoal-900 hover:bg-cream-200">
                        Browse All Pets
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-charcoal-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>100% Shelter Verified</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>4.9/5 Adopter Reviews</span>
                    </span>
                  </div>
                </div>

                {/* Right Side: Organic Curved Shape & Charismatic Hero Dog with Floating Avatars */}
                <div className="lg:col-span-6 relative flex items-center justify-center py-6">
                  <div 
                    className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] bg-gradient-to-br from-amber-400 via-amber-400 to-amber-500 shadow-2xl"
                    style={{ borderRadius: '52% 48% 65% 35% / 45% 55% 45% 55%' }}
                  />

                  <div className="relative z-10 w-[280px] h-[340px] sm:w-[360px] sm:h-[420px] flex items-end justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=650"
                      alt="Happy pet companion"
                      className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating Circular Pet Avatar 1 */}
                  <div className="absolute top-4 right-4 sm:right-10 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-sky-400 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=150"
                      alt="Puppy avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Floating Circular Pet Avatar 2 */}
                  <div className="absolute top-1/2 -right-2 sm:right-2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-rose-400 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150"
                      alt="Cat avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Floating Circular Pet Avatar 3 */}
                  <div className="absolute bottom-6 left-0 sm:left-4 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-amber-600 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=150"
                      alt="Rescue pup"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Floating Badge 4 */}
                  <div className="absolute bottom-2 right-6 sm:right-16 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-emerald-500 p-1 flex items-center justify-center text-white">
                    <div className="w-full h-full rounded-full bg-emerald-600 flex flex-col items-center justify-center text-white">
                      <Heart className="w-5 h-5 fill-white/30" />
                      <span className="text-[8px] font-extrabold uppercase tracking-tighter mt-0.5">Rescue</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

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
          3. VIEW B: "I ALREADY HAVE A PET" (OPTION 2 SELECTED)
          - Features the 4 horizontal service cards with ALWAYS-VISIBLE buttons
          - Preventative Healthcare & Vaccination Tracker
          - Interactive Geolocation Map for 24/7 Vets & Parks
          - 24/7 AI Pet Assistant
          ========================================================================= */}
      {isHavePet && (
        <motion.div
          key="have-pet-selected-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-16"
        >
          {/* Pet Parent Care Hero */}
          <section className="relative overflow-hidden pt-8 pb-12 bg-teal-50/50 border-b border-cream-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-900 text-xs font-bold shadow-xs">
                  <PawPrint className="w-3.5 h-3.5 text-teal-700" />
                  <span>Option 2: Pet Parent Care & Wellness Hub</span>
                </div>

                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-tight">
                  Comprehensive Healthcare, Homestay Boarding & Daily Wellness.
                </h1>

                <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-medium">
                  Verified cage-free homestays when you travel, 24/7 emergency trauma clinics, preventative vaccination schedules, and trusted groomers & walkers.
                </p>
              </div>

              {/* 4 Horizontal Floating Service Cards (With ALWAYS-VISIBLE ACTION BUTTONS) */}
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

                      {/* Explicit, high-contrast action button (100% visible before hovering) */}
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
          </section>

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

          {/* Interactive Geolocation Leaflet Map Section (With clearly visible buttons) */}
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

              {/* Eye-Catching Cards */}
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

      {/* =========================================================================
          4. VIEW C: "SHELTER & SERVICE PROVIDER" (OPTION 3 SELECTED)
          - Post a Pet for Adoption
          - Review & Screen Adopter Questionnaires
          - List Homestay Boarding Facility
          - 1-Click Fast Login into Shelter Dashboard
          ========================================================================= */}
      {isShelter && (
        <motion.div
          key="shelter-selected-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12"
        >
          {/* Header Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-purple-700 to-indigo-800 text-white p-8 sm:p-12 shadow-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-purple-100 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Option 3: Shelter, Rescuer & Service Provider Hub</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
              Empowering Rescues, Caregivers & Boarding Hosts.
            </h1>

            <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
              List rescue pets for adoption, manage incoming applications with objective applicant scoring, and publish cage-free homestay boarding or veterinary care.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleFastShelterLogin}
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-charcoal-950 font-extrabold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>1-Click Demo Shelter Login</span>
              </button>

              <Link to="/login">
                <button
                  type="button"
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Manual Provider Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Operational Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">List A Rescue Pet</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Add medical histories, vaccination status, behavior tags, and photos to reach verified adopters across India.
              </p>
              <div className="pt-2">
                <Link to="/shelter/dashboard">
                  <span className="text-xs font-bold text-purple-700 hover:underline inline-flex items-center gap-1">
                    Manage Shelter Pets →
                  </span>
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">Adoption Applications</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Screen applicant questionnaires, verify living space and daily schedule, and schedule meet-and-greets.
              </p>
              <div className="pt-2">
                <Link to="/shelter/dashboard">
                  <span className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
                    View Incoming Applications →
                  </span>
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">Host Homestay or Clinic</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Register as a verified cage-free homestay host or list your veterinary hospital on the 24/7 interactive map.
              </p>
              <div className="pt-2">
                <Link to="/services">
                  <span className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1">
                    Explore Service Hub →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          5. COMMON FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-16">
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
              a: 'Select Option 1 ("I Want to Adopt"), browse shelter pets or take the AI match quiz, and click "Apply to Adopt" to submit your digital questionnaire directly to shelter caretakers.'
            },
            {
              q: 'How does Pet Boarding work if I already have a pet?',
              a: 'Select Option 2 ("I Already Have a Pet"), browse verified caregivers offering cage-free homestays, and submit a booking reservation with your check-in dates.'
            },
            {
              q: 'Can I track health and vaccination reminders for free?',
              a: 'Yes! PetVerse includes an automated health schedule for Rabies boosters, deworming, and vet checkups with zero subscription fees.'
            },
            {
              q: 'How can I switch between different options on the website?',
              a: 'At any time, click "Switch Option / Back to Opening Screen" at the top banner or use the mode switcher pill in the navigation bar to toggle between options.'
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
