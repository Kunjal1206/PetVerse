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
  Star
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
  };

  const careServices = [
    {
      id: 'boarding',
      title: 'Pet Boarding',
      desc: 'Loving cage-free home-stays and safe overnight boarding while you travel.',
      price: 'From ₹700/day',
      image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=400',
      link: '/services/boarding',
      icon: HomeIcon,
      badge: 'Homestay & Kennel'
    },
    {
      id: 'grooming',
      title: 'Pet Grooming & Spa',
      desc: 'Warm baths, hygienic haircuts, nail trimming, and relaxing spa sessions.',
      price: 'From ₹950',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
      link: '/services/category/grooming',
      icon: Scissors,
      badge: 'Home & Parlour'
    },
    {
      id: 'walking',
      title: 'GPS Dog Walking',
      desc: 'Dedicated 45-minute energetic walks with live GPS and photo updates.',
      price: 'From ₹250/walk',
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400',
      link: '/services/category/walking',
      icon: Activity,
      badge: 'Live GPS'
    },
    {
      id: 'vet',
      title: 'Nearby 24/7 Vet Clinics',
      desc: 'Emergency veterinary consultations, core vaccinations, and clinical surgeries.',
      price: 'Consult from ₹600',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400',
      link: '/nearby',
      icon: Stethoscope,
      badge: 'Emergency Open'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* =========================================================================
          HERO & BIFURCATED ENTRY CHOOSER: "WANT TO ADOPT" vs "HAVE A PET"
          Featuring a warm, subtle, photographic pet background that complements the UI
          ========================================================================= */}
      <section className="relative pt-10 pb-12 overflow-hidden bg-gradient-to-b from-brand-50/80 via-cream-100/90 to-cream-100">
        
        {/* Subtle Light Pet Photographic Backdrop (Clean, soft opacity, complements UI) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.11] bg-center bg-cover mix-blend-multiply"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1600')`
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-brand-200 text-brand-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              <span>India’s Unified Companion Platform</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 tracking-tight leading-tight">
              Because Every Pet Deserves{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-accent">
                Love & Lifelong Care
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto leading-relaxed font-medium">
              Select your path below to get personalized adoption matchmaking or everyday preventative healthcare tools.
            </p>
          </div>

          {/* 2 Big Distinct Entry Cards (High-contrast, polished glassmorphic styling) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            
            {/* OPTION 1: WANT TO ADOPT */}
            <button
              type="button"
              onClick={() => handleSelectMode('adopt')}
              className={`text-left p-6 sm:p-7 rounded-3xl border-2 transition-all relative overflow-hidden group flex flex-col justify-between backdrop-blur-sm ${
                isAdopt
                  ? 'bg-white/95 border-brand-500 shadow-premium ring-4 ring-brand-500/15'
                  : 'bg-white/85 border-cream-300 hover:border-brand-300 hover:shadow-md'
              }`}
            >
              {isAdopt && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Active View
                </span>
              )}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Heart className="w-6 h-6 fill-brand-500/20" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                    Option 1 • Prospective Adopters
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900 mt-0.5">
                    I Want to Adopt a Pet
                  </h3>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed font-medium">
                  Take the AI lifestyle compatibility quiz, browse 100% verified shelter rescues, and apply with a digital questionnaire.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-200 flex items-center justify-between text-xs font-bold text-brand-700">
                <span>Explore Adoption Tools & AI Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>

            {/* OPTION 2: ALREADY HAVE A PET */}
            <button
              type="button"
              onClick={() => handleSelectMode('have_pet')}
              className={`text-left p-6 sm:p-7 rounded-3xl border-2 transition-all relative overflow-hidden group flex flex-col justify-between backdrop-blur-sm ${
                isHavePet
                  ? 'bg-white/95 border-teal-600 shadow-premium ring-4 ring-teal-600/15'
                  : 'bg-white/85 border-cream-300 hover:border-teal-300 hover:shadow-md'
              }`}
            >
              {isHavePet && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-teal-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Active View
                </span>
              )}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <PawPrint className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                    Option 2 • Pet Parents
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900 mt-0.5">
                    I Already Have a Pet
                  </h3>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed font-medium">
                  Schedule automated Rabies & deworming reminders, book vetted cage-free homestay boarding, and find 24/7 emergency clinics.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-200 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>Explore Health Schedules & Care Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          DYNAMIC VIEW A: "I WANT TO ADOPT A PET"
          (Clean, Uncluttered, Focused Strictly on Adoption & AI Matchmaking)
          ========================================================================= */}
      {isAdopt && (
        <motion.div
          key="adopt-section"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-16"
        >
          {/* Adoption Hero Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-500 text-white p-8 sm:p-12 shadow-premium relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
                <Heart className="w-96 h-96 fill-white" />
              </div>

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-cream-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>100% Shelter-Verified Ethical Adoption</span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
                  Find Your Soul Companion With Transparent AI Compatibility.
                </h2>

                <p className="text-cream-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  Don't adopt based on impulse photos alone. Answer 7 simple lifestyle questions and our weighted matching engine connects you to pets that thrive in your space and schedule.
                </p>

                {/* Fast Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/ai-match">
                    <Button size="lg" variant="secondary" icon={Compass} className="bg-white text-brand-900 hover:bg-cream-100 shadow-sm font-bold">
                      Take 2-Min AI Match Quiz
                    </Button>
                  </Link>
                  <Link to="/adopt">
                    <Button size="lg" variant="outline" icon={Search} className="border-white/40 text-white hover:bg-white/10 font-semibold">
                      Browse All Pets
                    </Button>
                  </Link>
                </div>

                {/* Quick Search Filter Bar */}
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

          {/* Section: Featured Adoptable Pets */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                  Rescue Companions
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                  Pets Looking for Forever Homes
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
                  Each adoption frees a rescue space for another shelter animal in need.
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

          {/* Section: How Ethical Adoption Works on PetVerse */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-cream-100/90 rounded-3xl p-8 sm:p-12 border border-cream-300 space-y-8">
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
                  {
                    step: '01',
                    title: 'Browse & Filter',
                    desc: 'Filter by species, breed, age, size, and city location from verified partner shelters.'
                  },
                  {
                    step: '02',
                    title: 'Check AI Compatibility',
                    desc: 'Take the 2-minute quiz to see if the pet’s energy matches your home and schedule.'
                  },
                  {
                    step: '03',
                    title: 'Digital Questionnaire',
                    desc: 'Submit your housing details and lifestyle commitment directly to shelter caretakers.'
                  },
                  {
                    step: '04',
                    title: 'Meet & Welcome Home',
                    desc: 'Coordinate a joyful meet-and-greet, finalize paperwork, and bring your companion home.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-cream-300 shadow-xs space-y-2">
                    <span className="text-xl font-display font-extrabold text-brand-500">
                      {item.step}
                    </span>
                    <h4 className="font-display font-bold text-base text-charcoal-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Lost & Found Community Safety Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-amber-500 text-white p-7 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                  Community Safety Alert
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Lost a Pet or Spotted a Stray Rescue?
                </h3>
                <p className="text-amber-100 text-xs max-w-lg">
                  Submit photo alerts with city coordinates. Our community network notifies nearby members in real-time.
                </p>
              </div>

              <Link to="/lost-found">
                <Button size="md" variant="secondary" className="bg-white text-charcoal-900 hover:bg-cream-100 font-bold shrink-0">
                  Open Lost & Found
                </Button>
              </Link>
            </div>
          </section>

          {/* Switcher Footer Callout */}
          <div className="max-w-4xl mx-auto text-center p-6 rounded-3xl bg-cream-100/70 border border-cream-300 space-y-2">
            <p className="text-xs font-semibold text-charcoal-600">
              Already have a furry friend at home?
            </p>
            <button
              onClick={() => handleSelectMode('have_pet')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 underline"
            >
              <PawPrint className="w-3.5 h-3.5" />
              <span>Switch to Pet Parent Portal for vaccination tracking, boarding, and nearby clinics →</span>
            </button>
          </div>
        </motion.div>
      )}


      {/* =========================================================================
          DYNAMIC VIEW B: "I ALREADY HAVE A PET"
          (Clean, High-contrast, Uncluttered, Focused on Preventative Health & Care)
          ========================================================================= */}
      {isHavePet && (
        <motion.div
          key="have-pet-section"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-16"
        >
          {/* Pet Parent Hero Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-teal-800 to-teal-700 text-white p-8 sm:p-12 shadow-premium relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
                <PawPrint className="w-96 h-96 fill-white" />
              </div>

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-teal-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                  <span>Lifelong Preventative Wellness & Certified Caregivers</span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
                  Proactive Health Schedules & Trusted Care For Your Pet.
                </h2>

                <p className="text-teal-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  Never miss an annual Rabies vaccination or deworming tablet. Discover verified cage-free homestay boarding when you travel, and map 24/7 emergency veterinary hospitals.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/dashboard/care">
                    <Button size="lg" variant="secondary" icon={Clock} className="bg-white text-teal-900 hover:bg-cream-100 shadow-sm font-bold">
                      Set Health Reminder
                    </Button>
                  </Link>
                  <Link to="/services/boarding">
                    <Button size="lg" variant="outline" icon={HomeIcon} className="border-white/40 text-white hover:bg-white/10 font-semibold">
                      Book Homestay Boarding
                    </Button>
                  </Link>
                  <Link to="/nearby">
                    <Button size="lg" variant="outline" icon={MapPin} className="border-white/40 text-white hover:bg-white/10 font-semibold">
                      Nearby Emergency Vets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Preventative Health & Vaccination Schedules */}
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
                <h4 className="font-display font-bold text-lg text-charcoal-900">Core Rabies & DHPP</h4>
                <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                  Scheduled annual boosters to maintain essential immunity and municipal compliance in Indian cities.
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

          {/* Section 2: Vetted Care Services Hub (Always visible before hover!) */}
          <section className="bg-cream-200/50 py-14 border-y border-cream-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Verified Care Network
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                  Cage-Free Boarding & Home Care Services
                </h3>
                <p className="text-xs text-charcoal-600">
                  Every caregiver undergoes identity checks, safety verification, and reference reviews.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {careServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.id}
                      to={service.link}
                      className="group rounded-3xl bg-white border border-cream-300 p-5 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="h-36 rounded-2xl overflow-hidden bg-cream-200 relative">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-extrabold uppercase text-teal-800 shadow-xs">
                            {service.badge}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-base text-charcoal-900 group-hover:text-teal-700 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-xs text-charcoal-600 leading-relaxed font-medium">
                          {service.desc}
                        </p>
                      </div>

                      {/* Always-visible price and explore button */}
                      <div className="pt-4 border-t border-cream-200 mt-4 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-teal-900">{service.price}</span>
                        <span className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 font-bold flex items-center gap-1 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <span>Explore</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 3: Interactive Map Preview (Vibrant, high-contrast, always visible before hover!) */}
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
                  Powered by Leaflet and OpenStreetMap. Real-time pinpoints for trauma centers, local rescue shelters, and canine exercise zones across Delhi, Bangalore, Mumbai, Pune, and more.
                </p>
                <div className="pt-2">
                  <Link to="/nearby">
                    <Button size="lg" variant="primary" icon={MapPin} className="bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-lg">
                      Open Live Interactive Map
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Eye-catching Preview Cards (Always high-contrast & visible before hover!) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Nearby Verified Facilities</span>
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white shrink-0">
                      24/7 Open
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Siri Fort Canine Agility Park</p>
                      <p className="text-[11px] text-charcoal-300">August Kranti Marg • 1.8 km away</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white shrink-0">
                      Dog Park
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: 24/7 AI Pet Health Assistant Spotlight */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-brand-50 border border-brand-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800">
                  <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                  <span>24/7 AI Pet Assistant</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900">
                  Instant Answers to Nutrition, Behavior & Daily Health
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

          {/* Switcher Footer Callout */}
          <div className="max-w-4xl mx-auto text-center p-6 rounded-3xl bg-cream-100/70 border border-cream-300 space-y-2">
            <p className="text-xs font-semibold text-charcoal-600">
              Thinking about bringing another companion into your home?
            </p>
            <button
              onClick={() => handleSelectMode('adopt')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900 underline"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Switch to Adoption Portal to explore shelter rescues & AI matching →</span>
            </button>
          </div>
        </motion.div>
      )}


      {/* =========================================================================
          COMMON SECTION: FREQUENTLY ASKED QUESTIONS (Concise & De-cluttered)
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
