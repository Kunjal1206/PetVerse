import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Award,
  CheckCircle2,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import PetCard from '../../components/pet/PetCard';
import { getPets } from '../../services/petService';

const Home = () => {
  const navigate = useNavigate();
  const [featuredPets, setFeaturedPets] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [searchSpecies, setSearchSpecies] = useState('');
  const [loadingPets, setLoadingPets] = useState(true);

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

  const serviceCategories = [
    {
      id: 'boarding',
      title: 'Pet Boarding',
      desc: 'Loving home-stays and safe overnight boarding while you travel.',
      price: '₹700/day',
      image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=400',
      link: '/services/boarding'
    },
    {
      id: 'grooming',
      title: 'Pet Grooming',
      desc: 'Baths, hygienic haircuts, and relaxing spa sessions at home or parlour.',
      price: '₹950',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
      link: '/services/category/grooming'
    },
    {
      id: 'walking',
      title: 'Dog Walking',
      desc: 'GPS-tracked, dedicated 45-minute exercise walks for energetic dogs.',
      price: '₹250/walk',
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400',
      link: '/services/category/walking'
    },
    {
      id: 'training',
      title: 'Pet Training',
      desc: 'Positive reinforcement, potty training, and obedience coaching.',
      price: '₹1500',
      image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400',
      link: '/services/category/training'
    },
    {
      id: 'vet',
      title: 'Veterinary Clinics',
      desc: 'Senior veterinary consultations, vaccinations, and emergency care.',
      price: '₹600',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400',
      link: '/nearby'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-brand-50/70 via-cream-100 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                <span>AI-Assisted Pet Adoption & Verified Pet Care</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 leading-[1.15] tracking-tight">
                Because Every Pet Deserves the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-accent">
                  Right Home
                </span>{' '}
                & the Right Care.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover pets that match your lifestyle, find trusted pet services, and manage your pet's everyday care — all in one place.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/adopt" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" icon={Heart} className="w-full sm:w-auto">
                    Find Your Pet
                  </Button>
                </Link>
                <Link to="/services" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" icon={Sparkles} className="w-full sm:w-auto">
                    Explore Pet Care
                  </Button>
                </Link>
              </div>

              {/* Fast Search Filter Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="p-3 bg-white rounded-3xl border border-cream-300 shadow-premium flex flex-col sm:flex-row items-center gap-2.5 max-w-xl mx-auto lg:mx-0 mt-6"
              >
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 w-full">
                  <PawPrint className="w-4 h-4 text-brand-500 shrink-0" />
                  <select
                    value={searchSpecies}
                    onChange={(e) => setSearchSpecies(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-charcoal-800 focus:outline-none cursor-pointer"
                  >
                    <option value="">Any Species (Dogs & Cats)</option>
                    <option value="dog">Dogs</option>
                    <option value="cat">Cats</option>
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
                  Search
                </Button>
              </form>

              {/* Social Proof Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-medium text-charcoal-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  <span>100% Shelter Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Weighted AI Matching</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Free Health Timelines</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream-200">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
                    alt="Happy pets on PetVerse"
                    className="w-full h-[440px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-semibold text-brand-100 uppercase tracking-wider">Meet Rocky & Simba</p>
                    <p className="font-display font-bold text-lg">Rescued & thriving in loving homes</p>
                  </div>
                </div>

                {/* Floating AI Match Badge Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-6 -left-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-cream-300 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-accent flex items-center justify-center font-bold text-sm">
                    96%
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">AI Compatibility Match</p>
                    <p className="text-[10px] text-charcoal-500">Perfect for Apartment living</p>
                  </div>
                </motion.div>

                {/* Floating Verified Shelter Badge Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-cream-300 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Delhi Paws Haven</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">Verified Rescue Shelter</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. AI PET MATCH QUIZ TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 to-brand-500 text-white p-8 sm:p-12 shadow-xl overflow-hidden">
          {/* Subtle background paw decor */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
            <PawPrint className="w-96 h-96" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Smart Pet Lifestyle Matching</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                Not sure which pet is right for you?
              </h2>
              <p className="text-cream-200 text-sm sm:text-base max-w-xl leading-relaxed">
                Take our 2-minute lifestyle quiz. We weigh your living space, daily activity, away hours, and family dynamics to find your soul match with transparent reasons.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link to="/ai-match">
                <Button size="lg" variant="secondary" icon={Sparkles} className="bg-white text-brand-900 hover:bg-cream-100 shadow-md">
                  Take AI Match Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PETS FOR ADOPTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
              <Heart className="w-3.5 h-3.5" />
              <span>Ready for Adoption</span>
            </div>
            <h2 className="font-display font-bold text-3xl text-charcoal-900">
              Meet Pets Waiting for You
            </h2>
            <p className="text-sm text-charcoal-600 mt-1">
              Every adoption directly frees a shelter spot for another rescue in need.
            </p>
          </div>

          <Link to="/adopt">
            <Button variant="outline" size="sm" icon={ChevronRight} iconPosition="right">
              View All Available Pets
            </Button>
          </Link>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>

      {/* 4. PET CARE SERVICES DISCOVERY (BENCHMARKED UX) */}
      <section className="bg-cream-200/60 py-16 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Comprehensive Care Ecosystem
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal-900">
              Trusted Pet Services Near You
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              From homestay boarding while you travel to veterinary appointments and grooming, discover verified pet care professionals.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {serviceCategories.map((service) => (
              <Link
                key={service.id}
                to={service.link}
                className="group rounded-3xl bg-white border border-cream-300 p-5 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-32 rounded-2xl overflow-hidden bg-cream-200">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal-900 group-hover:text-brand-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-cream-200 mt-4 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-700">{service.price}</span>
                  <span className="text-brand-600 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY PETVERSE — 4 TRUST PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Why Pet Parents Trust Us
          </span>
          <h2 className="font-display font-bold text-3xl text-charcoal-900">
            Care You Can Rely On Every Day
          </h2>
          <p className="text-sm text-charcoal-600">
            We hold shelters, caregivers, and medical records to the highest standard of animal welfare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: '100% Verified Caregivers',
              desc: 'Every boarding host, trainer, and walker undergoes identity and home background checks.'
            },
            {
              icon: Sparkles,
              title: 'AI Compatibility Match',
              desc: 'Transparent scoring algorithms that explain why a pet fits your daily routine before you commit.'
            },
            {
              icon: Clock,
              title: 'Health & Care Reminders',
              desc: 'Never miss a rabies vaccination, deworming pill, or vet appointment with automated schedules.'
            },
            {
              icon: MapPin,
              title: 'Lost & Found Geolocation',
              desc: 'Community-wide instant alert dispatching to reunite missing pets with their families quickly.'
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. LOST & FOUND COMMUNITY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-500 text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wider uppercase">
              Community Protection
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Lost a Pet or Found a Stray?
            </h3>
            <p className="text-amber-100 text-sm max-w-xl">
              Post photo reports with city coordinates. Our community network alerts nearby pet owners to help bring them home safely.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/lost-found">
              <Button size="md" variant="secondary" className="bg-white text-charcoal-900 hover:bg-cream-100">
                View Active Reports
              </Button>
            </Link>
            <Link to="/lost-found">
              <Button size="md" variant="primary" className="bg-charcoal-900 text-white hover:bg-charcoal-800">
                Report a Pet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION PREVIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="font-display font-bold text-3xl text-charcoal-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does adoption work on PetVerse?',
              a: 'Browse available pets from verified shelters, click "Apply to Adopt" to submit your housing details and lifestyle questionnaire. The shelter reviews your inquiry and coordinates meet-and-greets directly.'
            },
            {
              q: 'How does the AI Pet Match quiz compute compatibility?',
              a: 'Our algorithm weighs your daily away hours, activity levels, home type, child friendliness, and experience with individual pet energy requirements. It produces a clear percentage and specific reasons.'
            },
            {
              q: 'Are pet boarding caregivers verified?',
              a: 'Yes, all boarding hosts and caregivers submit identification verification, photos of their facility or home, and undergo safety vetting prior to accepting bookings.'
            },
            {
              q: 'Can I track health and vaccination reminders for my own pets?',
              a: 'Yes! Inside "My Pets" in your Adopter Dashboard, you can register adopted or existing pets and schedule automated reminders for rabies boosters, deworming, and medication.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-cream-300 shadow-xs space-y-2">
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

        <div className="text-center pt-2">
          <Link to="/faq">
            <Button variant="ghost" size="sm">
              Read All FAQs & Safety Guidelines →
            </Button>
          </Link>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-900 text-white p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Ready to meet your new best friend?
            </h2>
            <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
              Join thousands of pet parents who found their companion and simplify daily pet care through PetVerse.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/adopt" className="w-full sm:w-auto">
                <Button size="lg" variant="accent" icon={Heart} className="w-full sm:w-auto">
                  Browse Adoptable Pets
                </Button>
              </Link>
              <Link to="/ai-match" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" icon={Sparkles} className="w-full sm:w-auto">
                  Take AI Match Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
