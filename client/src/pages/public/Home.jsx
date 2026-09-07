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
  MessageSquare
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
      icon: HomeIcon
    },
    {
      id: 'grooming',
      title: 'Pet Grooming & Spa',
      desc: 'Warm baths, hygienic haircuts, nail trimming, and relaxing spa sessions.',
      price: 'From ₹950',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
      link: '/services/category/grooming',
      icon: Scissors
    },
    {
      id: 'walking',
      title: 'GPS Dog Walking',
      desc: 'Dedicated 45-minute energetic walks with live GPS and photo updates.',
      price: 'From ₹250/walk',
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400',
      link: '/services/category/walking',
      icon: Activity
    },
    {
      id: 'vet',
      title: 'Nearby 24/7 Vet Clinics',
      desc: 'Emergency veterinary consultations, core vaccinations, and clinical surgeries.',
      price: 'Consult from ₹600',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400',
      link: '/nearby',
      icon: Stethoscope
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* =========================================================================
          TOP BIFURCATED ENTRY CHOOSER: "WANT TO ADOPT" vs "HAVE A PET"
          (Fulfilling the Professor's core architectural feedback)
          ========================================================================= */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>Choose Your Journey on PetVerse</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900 tracking-tight">
            How can we help you today?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500">
            Select your need below to view tailored, organized tools without any clutter.
          </p>
        </div>

        {/* 2 Big Distinct Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          
          {/* OPTION 1: WANT TO ADOPT */}
          <button
            type="button"
            onClick={() => handleSelectMode('adopt')}
            className={`text-left p-6 sm:p-7 rounded-3xl border-2 transition-all relative overflow-hidden group flex flex-col justify-between ${
              isAdopt
                ? 'bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-white border-brand-500 shadow-premium ring-2 ring-brand-500/20'
                : 'bg-white border-cream-300 hover:border-brand-300 hover:shadow-md'
            }`}
          >
            {isAdopt && (
              <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                Active View
              </span>
            )}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 fill-brand-500/20" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                  Option 1 • Prospective Adopters
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900 mt-0.5">
                  I Want to Adopt a Pet
                </h3>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Take the AI lifestyle compatibility quiz, browse verified shelter rescues across India, and apply online.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-200/80 flex items-center justify-between text-xs font-bold text-brand-700">
              <span>Explore Adoption Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </button>

          {/* OPTION 2: ALREADY HAVE A PET */}
          <button
            type="button"
            onClick={() => handleSelectMode('have_pet')}
            className={`text-left p-6 sm:p-7 rounded-3xl border-2 transition-all relative overflow-hidden group flex flex-col justify-between ${
              isHavePet
                ? 'bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-white border-teal-600 shadow-premium ring-2 ring-teal-600/20'
                : 'bg-white border-cream-300 hover:border-teal-300 hover:shadow-md'
            }`}
          >
            {isHavePet && (
              <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                Active View
              </span>
            )}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PawPrint className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Option 2 • Pet Parents
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal-900 mt-0.5">
                  I Already Have a Pet
                </h3>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Manage automated vaccination reminders, book cage-free homestay boarding, and locate nearby 24/7 emergency clinics.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-200/80 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Explore Care & Health Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </button>
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

                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
                  Find Your Soul Companion With Transparent AI Compatibility.
                </h1>

                <p className="text-cream-200 text-sm sm:text-base leading-relaxed max-w-2xl">
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
                    <Button size="lg" variant="outline" icon={Search} className="border-white/40 text-white hover:bg-white/10">
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

                  <Button type="submit" size="md" variant="primary" icon={Search} className="w-full sm:w-auto shrink-0">
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
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                  Pets Looking for Forever Homes
                </h2>
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
            <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 border border-cream-300 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                  Transparent Process
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                  How Adoption Works on PetVerse
                </h2>
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
                    <h3 className="font-display font-bold text-base text-charcoal-900">
                      {item.title}
                    </h3>
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
          (Clean, Uncluttered, Focused Strictly on Preventative Health & Pet Care)
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

                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
                  Proactive Health Schedules & Trusted Care For Your Pet.
                </h1>

                <p className="text-teal-100 text-sm sm:text-base leading-relaxed max-w-2xl">
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
                    <Button size="lg" variant="outline" icon={HomeIcon} className="border-white/40 text-white hover:bg-white/10">
                      Book Homestay Boarding
                    </Button>
                  </Link>
                  <Link to="/nearby">
                    <Button size="lg" variant="outline" icon={MapPin} className="border-white/40 text-white hover:bg-white/10">
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
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                  Stay On Top of Vaccinations & Wellness
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
                  Automated schedules that ensure your pet stays protected against preventable illnesses.
                </p>
              </div>

              <Link to="/dashboard/care">
                <Button variant="primary" size="sm" icon={Calendar}>
                  Open Health Manager
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal-900">Core Rabies & DHPP</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
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
                <h3 className="font-display font-bold text-lg text-charcoal-900">Quarterly Deworming</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
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
                <h3 className="font-display font-bold text-lg text-charcoal-900">My Pets Medical Log</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
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

          {/* Section 2: Vetted Care Services Hub (Boarding, Grooming, Walking, Vet) */}
          <section className="bg-cream-200/50 py-14 border-y border-cream-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Verified Care Network
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
                  Cage-Free Boarding & Home Care Services
                </h2>
                <p className="text-xs text-charcoal-600">
                  Every caregiver undergoes identity checks, safety verification, and reference reviews.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {careServices.map((service) => (
                  <Link
                    key={service.id}
                    to={service.link}
                    className="group rounded-3xl bg-white border border-cream-300 p-5 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="h-36 rounded-2xl overflow-hidden bg-cream-200">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-display font-bold text-base text-charcoal-900 group-hover:text-teal-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-charcoal-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-cream-200 mt-4 flex items-center justify-between text-xs">
                      <span className="font-bold text-teal-800">{service.price}</span>
                      <span className="text-teal-600 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Interactive Map Preview (Nearby 24/7 Vets & Dog Parks) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-charcoal-900 text-white p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  Interactive Geolocation Engine
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                  Locate 24/7 Emergency Animal Hospitals & Dog Parks.
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-400 leading-relaxed max-w-lg">
                  Powered by Leaflet and OpenStreetMap. Filter verified emergency veterinary trauma centers, community dog parks, and rescue shelters with direct calling and routing.
                </p>
                <div className="pt-2">
                  <Link to="/nearby">
                    <Button size="lg" variant="secondary" icon={MapPin} className="bg-white text-charcoal-900 hover:bg-cream-100 font-bold">
                      Open Live Interactive Map
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-charcoal-800 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-charcoal-300 pb-2 border-b border-white/10">
                    <span className="font-bold">Active City Coverage:</span>
                    <span className="text-teal-400">Delhi, Bangalore, Mumbai + 4 more</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <span className="font-semibold text-white">Apollo Pet Emergency Hospital</span>
                      <span className="text-rose-400 font-bold">24/7 Open</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <span className="font-semibold text-white">Central Canine Play Park</span>
                      <span className="text-emerald-400 font-bold">Off-Leash Zone</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: 24/7 AI Pet Health Assistant Spotlight */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-brand-50 border border-brand-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
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
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900">
            Frequently Asked Questions
          </h2>
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
