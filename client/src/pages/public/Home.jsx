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
  Check,
  Plus,
  BookOpen,
  AlertTriangle,
  XCircle,
  X,
  FileText,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/common/Button';
import PetCard from '../../components/pet/PetCard';
import { getPets } from '../../services/petService';
import { useMode } from '../../context/ModeContext';
import { useAuth } from '../../context/AuthContext';
import ReminderFormModal from '../../components/care/ReminderFormModal';
import FacilityRegisterModal from '../../components/services/FacilityRegisterModal';

// Veterinary-reviewed educational articles
const PET_CARE_ARTICLES = [
  {
    id: 'vaccinations-guide',
    category: 'Preventative Health',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    title: 'The Golden Schedule: Essential Vaccinations & Deworming for Indian Pets',
    readTime: '4 min read',
    author: 'Reviewed by Dr. Ananya Sharma, BVSc & AH',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600',
    summary: 'Vaccination is your pet\'s primary defense against fatal viral illnesses like Parvovirus, Canine Distemper, and Rabies.',
    takeaways: [
      'Rabies booster is legally mandated & required annually for all dogs and cats.',
      'Core DHPP (Dogs) and Tricat/FVRCP (Cats) initial shots start at 6-8 weeks with annual boosters.',
      'Quarterly deworming protects both companion pets and human family members.'
    ],
    fullContent: [
      {
        heading: '1. Why Preventative Immunization Matters',
        text: 'In tropical and subtropical regions like India, communicable pathogens such as Parvovirus, Canine Distemper, Leptospirosis, and Feline Panleukopenia survive in the ambient environment for extended periods. Early puppy/kitten vaccination followed by rigorous adult booster maintenance prevents devastating, expensive, and often fatal health crises.'
      },
      {
        heading: '2. The Core Vaccination Timeline',
        text: 'Puppies should receive their first 6-in-1 / 7-in-1 DHPP vaccine at 6–8 weeks of age, followed by booster shots every 3–4 weeks until 16 weeks of age. Rabies vaccination is administered at 12–16 weeks. For adult dogs, an annual single-shot booster provides continuous protective immunity.'
      },
      {
        heading: '3. Deworming Protocols for Warm Climates',
        text: 'Intestinal parasites (roundworms, tapeworms, and hookworms) leech vital nutrients and cause severe chronic anemia. Puppies and kittens need deworming every 2 weeks until 3 months of age, monthly until 6 months, and every 3 months for lifelong maintenance.'
      },
      {
        heading: '4. Tick & Flea Prevention in Monsoon & Summer',
        text: 'Tick fever (Ehrlichiosis & Babesiosis) is among the most widespread conditions diagnosed in Indian veterinary hospitals. Use regular oral chews, spot-on topical solutions, or anti-tick collars approved by your veterinarian, especially preceding the humid monsoon months.'
      }
    ]
  },
  {
    id: 'adoption-333-rule',
    category: 'Adoption & Transition',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    title: 'The 3-3-3 Rule: Navigating Your Rescue Pet’s First 3 Months',
    readTime: '5 min read',
    author: 'PetVerse Shelter Behavioral Team',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600',
    summary: 'Rescue dogs and cats go through distinct decompression phases. Understanding the 3 days, 3 weeks, and 3 months milestones helps you build enduring trust.',
    takeaways: [
      'First 3 Days: Expect decompression, shyness, appetite dips, and testing boundaries.',
      'First 3 Weeks: Your pet settles into the household rhythm and begins to feel safe.',
      'First 3 Months: True personality shines through, confidence settles, and deep loyalty develops.'
    ],
    fullContent: [
      {
        heading: '1. The First 3 Days (Decompression & Overwhelm)',
        text: 'Transitioning from a noisy shelter kennel or foster home into a new house is sensory overload. Your new pet may refuse food, sleep excessively, hide under furniture, or pace anxiously. Designate a quiet corner with comfortable bedding, clean water, and zero loud visitors during these critical initial 72 hours.'
      },
      {
        heading: '2. The First 3 Weeks (Routine & Confidence Building)',
        text: 'By week 3, pets begin to recognize your daily schedule—when meals arrive, when walk times occur, and when family rest periods happen. Predictability is the greatest antidote to rescue anxiety. Begin gentle, positive-reinforcement potty training and crate/mat conditioning.'
      },
      {
        heading: '3. The First 3 Months (Complete Trust & Belonging)',
        text: 'At around 90 days, your pet realizes they are permanently home and safe. Defensive behaviors soften, their true quirks emerge, and an unbreakable lifelong bond is formed. Patience during the early transition yields a devoted family member.'
      }
    ]
  },
  {
    id: 'nutrition-safety',
    category: 'Nutrition & Wellness',
    categoryColor: 'bg-teal-100 text-teal-800 border-teal-200',
    title: 'Canine & Feline Nutrition: Wholesome Feeding & Toxic Food Hazards',
    readTime: '4 min read',
    author: 'Reviewed by Certified Animal Nutritionists',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600',
    summary: 'A balanced diet fuels longevity. Learn which human foods nourish your pet and which everyday pantry ingredients are critically toxic.',
    takeaways: [
      'Never feed chocolate, onions, garlic, grapes, raisins, xylitol sweetener, or cooked bones.',
      'Safe wholesome additions: Plain boiled chicken, pumpkin puree, carrots, and boiled eggs.',
      'Clean, cool drinking water must be replenished twice daily in washed stainless steel bowls.'
    ],
    fullContent: [
      {
        heading: '1. Critical Kitchen Toxins Never to Feed',
        text: 'Common kitchen staples can be fatal to pets. Onions and garlic damage red blood cells causing hemolytic anemia. Grapes and raisins trigger acute kidney failure. Xylitol (found in sugar-free peanut butter and sweets) causes rapid hypoglycemia and liver collapse. Never feed cooked poultry bones as they splinter and puncture the gastrointestinal tract.'
      },
      {
        heading: '2. Species-Appropriate Protein & Hydration',
        text: 'Dogs are facultative carnivores while cats are obligate carnivores requiring high animal protein and essential taurine. Cats naturally have a low thirst drive, so adding wet food or bone broth helps prevent chronic renal diseases and urinary crystals.'
      },
      {
        heading: '3. Portion Control & Weight Management',
        text: 'Pet obesity shortens lifespan by up to 2.5 years and puts severe strain on joints (especially in Labradors, Golden Retrievers, and Beagles). Measure meals with a cup instead of free-feeding, and limit treats to under 10% of daily caloric intake.'
      }
    ]
  },
  {
    id: 'boarding-etiquette',
    category: 'Boarding & Homestays',
    categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
    title: 'The Cage-Free Homestay Checklist: Preparing for Stress-Free Boarding',
    readTime: '3 min read',
    author: 'PetVerse Host Verification Council',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600',
    summary: 'Cage-free boarding gives your pet a loving family environment while you travel. Here is how to prepare for an effortless, anxiety-free stay.',
    takeaways: [
      'Pack familiar comforts: Their unwashed blanket or t-shirt smelling of you eases separation anxiety.',
      'Provide pre-portioned meals and written medication instructions.',
      'Share emergency veterinary contacts and local guardian authorization.'
    ],
    fullContent: [
      {
        heading: '1. Up-to-Date Vaccination Records',
        text: 'Reputable cage-free hosts require proof of up-to-date Rabies, DHPP/Tricat, and Kennel Cough (Bordetella) immunizations to protect all guest animals.'
      },
      {
        heading: '2. Pre-Boarding Meet and Greet',
        text: 'A 20-minute introductory visit allows your pet to explore the host’s home, sniff the grounds, and meet resident pets on neutral territory before the actual stay.'
      },
      {
        heading: '3. Diet Continuity & Scent Comforts',
        text: 'Sudden dietary shifts cause gastrointestinal distress. Provide your pet’s exact regular food with pre-measured bags. Packing their favorite chew toy or an unwashed blanket carrying your scent acts as a natural calming agent.'
      }
    ]
  }
];

// Essential Daily Standards: Do's & Don'ts Comparison Matrix
const PET_CARE_DOS_AND_DONTS = {
  dos: [
    {
      title: 'Maintain Strict Vaccination & Booster Timelines',
      desc: 'Annual rabies and core DHPP/FVRCP vaccinations protect against fatal viral infections prevalent in Indian communities.'
    },
    {
      title: 'Practice Compassionate Positive Reinforcement',
      desc: 'Reward desirable behaviors with healthy treats, verbal praise, and affection. Consistency and patience foster lasting trust.'
    },
    {
      title: 'Provide Constant Access to Fresh, Filtered Water',
      desc: 'Hydration is crucial for kidney function and body temperature regulation, especially during hot summer months.'
    },
    {
      title: 'Secure Collar ID Tags & Microchip Details',
      desc: 'Ensure your pet always wears a lightweight collar with an engraved tag containing your direct mobile phone number.'
    },
    {
      title: 'Schedule Daily Physical Exercise & Mental Enrichment',
      desc: 'Daily walks, sniffing sessions, and interactive puzzle toys burn pent-up energy and prevent separation anxiety.'
    }
  ],
  donts: [
    {
      title: 'Never Feed Toxic Kitchen Ingredients',
      desc: 'Never give chocolate, onions, garlic, grapes, raisins, caffeine, alcohol, or foods sweetened with artificial xylitol.'
    },
    {
      title: 'Never Leave Pets Unattended in Parked Vehicles',
      desc: 'Interior vehicle temperatures can exceed 48°C in under 10 minutes in Indian weather, leading to rapid, fatal heatstroke.'
    },
    {
      title: 'Never Skip Quarterly Deworming & Tick Prevention',
      desc: 'Neglecting parasite prevention leaves your pet susceptible to debilitating tick fever and internal intestinal infestations.'
    },
    {
      title: 'Never Use Physical Punishment or Intimidation',
      desc: 'Yelling or striking creates deep-seated fear, breaks emotional security, and often triggers defensive fear-aggression.'
    },
    {
      title: 'Never Feed Cooked Animal Bones',
      desc: 'Cooked bones become brittle and splinter easily, causing severe throat chokes, stomach tears, and internal bleeding.'
    }
  ]
};

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
  const { login, isAuthenticated, user } = useAuth();

  // Care Reminders Modal State
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderInitialData, setReminderInitialData] = useState(null);
  const [reminderSuccessToast, setReminderSuccessToast] = useState(null);

  // Facility Registration Modal State
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);

  // Pet Parenting Knowledge Hub States
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [knowledgeTab, setKnowledgeTab] = useState('all'); // 'all', 'articles', 'dos-donts'

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

  // Seamless 1-Click Action for Shelter Portal Tools
  const handleShelterAction = async (targetPath) => {
    if (!isAuthenticated || user?.role !== 'shelter') {
      try {
        await login({ email: 'delhi.shelter@petverse.com', password: 'password123' });
      } catch (err) {
        console.warn('Demo shelter login fallback:', err);
      }
    }
    navigate(targetPath);
  };

  // Seamless 1-Click Action for Pet Parent Health Manager
  const handleCareManagerAction = async (targetPath = '/dashboard/care') => {
    if (!isAuthenticated || user?.role !== 'adopter') {
      try {
        await login({ email: 'rahul.adopter@petverse.com', password: 'password123' });
      } catch (err) {
        console.warn('Demo adopter login fallback:', err);
      }
    }
    navigate(targetPath);
  };

  const handleOpenReminderModal = (initialData = null) => {
    setReminderInitialData(initialData);
    setIsReminderModalOpen(true);
  };

  const handleReminderSuccess = () => {
    setReminderSuccessToast('Reminder saved successfully to your preventative health calendar!');
    setTimeout(() => {
      setReminderSuccessToast(null);
    }, 4000);
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

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-medium max-w-2xl mx-auto">
              India's unified pet ecosystem connecting ethical rescue adoptions, certified cage-free homestay boarding, and preventative veterinary healthcare.
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
          {/* Pet Parent Care Hero with Matching Visual Splendor */}
          <section className="relative overflow-hidden pt-8 pb-16 bg-teal-50/50 border-b border-cream-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[480px]">
                {/* Left Content Area */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-900 text-xs font-bold shadow-xs">
                    <PawPrint className="w-3.5 h-3.5 text-teal-700" />
                    <span>Option 2: Pet Parent Care & Wellness Hub</span>
                  </div>

                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12]">
                    Complete Care &{' '}
                    <span className="text-teal-800 underline decoration-teal-400 decoration-wavy decoration-4">
                      Trusted Services
                    </span>{' '}
                    for Your Loved Companion.
                  </h1>

                  <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    Everything you need to keep your companion safe, healthy, and happy: verified cage-free homestay boarding, 24/7 emergency trauma clinics, preventative vaccination schedules, and trusted groomers & walkers.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                    <Link to="/services/boarding">
                      <Button size="lg" variant="primary" icon={HomeIcon} className="w-full sm:w-auto font-extrabold bg-teal-600 hover:bg-teal-700 text-white shadow-md">
                        Book Homestay Boarding
                      </Button>
                    </Link>
                    <Link to="/nearby">
                      <Button size="lg" variant="outline" icon={Stethoscope} className="w-full sm:w-auto font-bold border-teal-700 text-teal-900 hover:bg-teal-100/60">
                        Find 24/7 Emergency Vets
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-charcoal-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>100% Cage-Free Verified Hosts</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>4.9/5 Caregiver Satisfaction</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span>24/7 Emergency Clinic Map</span>
                    </span>
                  </div>
                </div>

                {/* Right Side: Organic Curved Shape & Happy Pampered Dog with Floating Badges */}
                <div className="lg:col-span-6 relative flex items-center justify-center py-6">
                  {/* Organic Curved Backdrop Shape (Teal/Emerald Gradient) */}
                  <div 
                    className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-500 shadow-2xl"
                    style={{ borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%' }}
                  />

                  {/* Central Companion Dog Image */}
                  <div className="relative z-10 w-[280px] h-[340px] sm:w-[360px] sm:h-[420px] flex items-end justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=650"
                      alt="Pampered healthy companion pet"
                      className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating Circular Badge 1 (Top Right - Cute cat spa avatar) */}
                  <div className="absolute top-4 right-4 sm:right-10 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-teal-400 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150"
                      alt="Groomed pet"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Floating Circular Badge 2 (Middle Right - 24/7 Vet Icon Badge) */}
                  <div className="absolute top-1/2 -right-2 sm:right-2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-rose-500 p-1 flex items-center justify-center text-white">
                    <div className="w-full h-full rounded-full bg-rose-600 flex flex-col items-center justify-center text-white">
                      <Stethoscope className="w-5 h-5" />
                      <span className="text-[8px] font-extrabold uppercase tracking-tighter mt-0.5">24/7 Vet</span>
                    </div>
                  </div>

                  {/* Floating Circular Badge 3 (Left Bottom - Verified Homestay Host Dog) */}
                  <div className="absolute bottom-6 left-0 sm:left-4 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-amber-500 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=150"
                      alt="Homestay boarding companion"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Floating Circular Badge 4 (Bottom Right - Vaccine & Wellness Badge) */}
                  <div className="absolute bottom-2 right-6 sm:right-16 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-teal-600 p-1 flex items-center justify-center text-white">
                    <div className="w-full h-full rounded-full bg-teal-700 flex flex-col items-center justify-center text-white">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-[8px] font-extrabold uppercase tracking-tighter mt-0.5">Vaccines</span>
                    </div>
                  </div>
                </div>

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
            {reminderSuccessToast && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{reminderSuccessToast}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCareManagerAction('/dashboard/care')}
                  className="underline hover:text-emerald-950 cursor-pointer"
                >
                  View in Manager →
                </button>
              </div>
            )}

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

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Plus}
                  onClick={() => handleOpenReminderModal()}
                  className="font-bold bg-white text-teal-900 border border-teal-300 hover:bg-teal-50 shadow-xs cursor-pointer"
                >
                  + Add Reminder
                </Button>

                <button
                  type="button"
                  onClick={() => handleCareManagerAction('/dashboard/care')}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-teal-600 hover:bg-teal-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Open Health Manager</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Annual Rabies & DHPP */}
              <div 
                onClick={() => handleOpenReminderModal({ title: 'Annual Rabies & DHPP Booster', type: 'vaccination', notes: 'Mandatory annual immunization booster.' })}
                className="p-6 rounded-3xl bg-white border-2 border-cream-300 hover:border-rose-400 shadow-premium hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-rose-700 transition-colors">
                    Annual Rabies & DHPP
                  </h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    Scheduled boosters to maintain essential immunity and municipal compliance in Indian cities.
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-[11px] font-bold">
                    Every 12 Months
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenReminderModal({ title: 'Annual Rabies & DHPP Booster', type: 'vaccination', notes: 'Mandatory annual immunization booster.' });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Set Reminder</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Quarterly Deworming */}
              <div 
                onClick={() => handleOpenReminderModal({ title: 'Quarterly Broad-Spectrum Deworming', type: 'deworming', notes: 'Broad spectrum tablet for parasite prevention.' })}
                className="p-6 rounded-3xl bg-white border-2 border-cream-300 hover:border-amber-400 shadow-premium hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-amber-700 transition-colors">
                    Quarterly Deworming
                  </h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    Timely reminders for broad-spectrum deworming tablets to prevent gastrointestinal parasites.
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-bold">
                    Every 3 Months
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenReminderModal({ title: 'Quarterly Broad-Spectrum Deworming', type: 'deworming', notes: 'Broad spectrum tablet for parasite prevention.' });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-charcoal-950 text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Set Reminder</span>
                  </button>
                </div>
              </div>

              {/* Card 3: My Pets Medical Log */}
              <div 
                onClick={() => handleCareManagerAction('/dashboard/my-pets')}
                className="p-6 rounded-3xl bg-white border-2 border-cream-300 hover:border-teal-400 shadow-premium hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <PawPrint className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-teal-700 transition-colors">
                    My Pets Medical Log
                  </h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                    Log your companion's weight progression, allergies, microchip ID, and diet notes in one place.
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                    Pet Health Diary
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCareManagerAction('/dashboard/my-pets');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1 transition-all"
                  >
                    <span>Manage Pets →</span>
                  </button>
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
          {/* Shelter & Provider Hero with Matching Visual Splendor */}
          <section className="relative overflow-hidden pt-8 pb-16 bg-purple-50/50 border-b border-cream-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[480px]">
                {/* Left Content Area */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                    <span>Option 3: Shelter, Rescuer & Service Provider Hub</span>
                  </div>

                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 tracking-tight leading-[1.12]">
                    Empowering Rescues,{' '}
                    <span className="text-purple-800 underline decoration-purple-400 decoration-wavy decoration-4">
                      Caregivers & Clinics
                    </span>{' '}
                    Across India.
                  </h1>

                  <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    List rescue pets for adoption, manage incoming applications with objective applicant scoring, and publish cage-free homestay boarding or veterinary healthcare on our verified network.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={handleFastShelterLogin}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-charcoal-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>1-Click Demo Shelter Login</span>
                    </button>

                    <Link to="/login" className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" icon={ArrowRight} className="w-full sm:w-auto font-bold border-purple-700 text-purple-900 hover:bg-purple-100/60">
                        Manual Provider Sign In
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-charcoal-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>100% Shelter-Verified Network</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>Zero Listing Fees for NGOs</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span>Automated Screening Engine</span>
                    </span>
                  </div>
                </div>

                {/* Right Side: Organic Curved Shape & Rescuer/Vet Image with Floating Badges */}
                <div className="lg:col-span-6 relative flex items-center justify-center py-6">
                  {/* Organic Curved Backdrop Shape (Purple/Indigo Gradient) */}
                  <div 
                    className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 shadow-2xl"
                    style={{ borderRadius: '52% 48% 60% 40% / 48% 52% 48% 52%' }}
                  />

                  {/* Central Companion Pet / Caregiver Image */}
                  <div className="relative z-10 w-[280px] h-[340px] sm:w-[360px] sm:h-[420px] flex items-end justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=650"
                      alt="Dedicated pet caregiver and rescue companion"
                      className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating Circular Badge 1 (Top Right - Rescued puppy avatar) */}
                  <div className="absolute top-4 right-4 sm:right-10 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-purple-400 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=150"
                      alt="Shelter rescue pup"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Floating Circular Badge 2 (Middle Right - Applications & Screening Badge) */}
                  <div className="absolute top-1/2 -right-2 sm:right-2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-500 p-1 flex items-center justify-center text-white">
                    <div className="w-full h-full rounded-full bg-blue-600 flex flex-col items-center justify-center text-white">
                      <ClipboardList className="w-5 h-5" />
                      <span className="text-[8px] font-extrabold uppercase tracking-tighter mt-0.5">Screening</span>
                    </div>
                  </div>

                  {/* Floating Circular Badge 3 (Left Bottom - Happy Indie Dog) */}
                  <div className="absolute bottom-6 left-0 sm:left-4 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-amber-500 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=150"
                      alt="Indie rescue companion"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Floating Circular Badge 4 (Bottom Right - Verified Shelter/NGO Badge) */}
                  <div className="absolute bottom-2 right-6 sm:right-16 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-emerald-600 p-1 flex items-center justify-center text-white">
                    <div className="w-full h-full rounded-full bg-emerald-700 flex flex-col items-center justify-center text-white">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-[8px] font-extrabold uppercase tracking-tighter mt-0.5">Verified NGO</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Operational Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: List A Rescue Pet */}
            <div 
              onClick={() => handleShelterAction('/shelter/pets/add')}
              className="p-6 rounded-3xl bg-white border-2 border-purple-200 hover:border-purple-500 shadow-premium hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-purple-700 transition-colors">
                  List A Rescue Pet
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Add medical histories, vaccination status, behavior tags, and photos to reach verified adopters across India.
                </p>
              </div>
              <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                  Rescue Outreach
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShelterAction('/shelter/pets/add');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>List Pet Now</span>
                </button>
              </div>
            </div>

            {/* Card 2: Adoption Applications */}
            <div 
              onClick={() => handleShelterAction('/shelter/applications')}
              className="p-6 rounded-3xl bg-white border-2 border-blue-200 hover:border-blue-500 shadow-premium hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-blue-700 transition-colors">
                  Adoption Applications
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Screen applicant questionnaires, verify living space and daily schedule, and schedule meet-and-greets.
                </p>
              </div>
              <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                  Review & Screen
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShelterAction('/shelter/applications');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <span>Review Submissions</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Host Homestay or Clinic */}
            <div 
              onClick={() => setIsFacilityModalOpen(true)}
              className="p-6 rounded-3xl bg-white border-2 border-teal-200 hover:border-teal-500 shadow-premium hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal-900 group-hover:text-teal-700 transition-colors">
                  Host Homestay or Clinic
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Register as a verified cage-free homestay host or list your veterinary hospital on the 24/7 interactive map.
                </p>
              </div>
              <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
                  Partner Network
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFacilityModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  <span>Register Facility</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          5. PET PARENTING KNOWLEDGE HUB & ESSENTIAL CARE STANDARDS
          - Replaces generic FAQ with rich, veterinary-reviewed educational guides
          - 4 Curated Pet Care Articles with Interactive Reading Modals
          - Comprehensive Do's & Don'ts Comparison Matrix
          - Actionable preventative health shortcuts
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-16 border-t border-cream-300/80">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Pet Parenting Knowledge Hub • Veterinary Care Guidelines</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-charcoal-900 tracking-tight">
            Essential Pet Care Guides & Healthy Living Standards
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-medium max-w-2xl mx-auto">
            Practical, scientifically-backed advice for every pet parent. Explore our core health guides, adoption transition milestones, and daily safety practices.
          </p>

          {/* Quick Filter Switcher */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'articles', label: 'Featured Guides & Articles' },
              { id: 'dos-donts', label: "Essential Do's & Don'ts" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setKnowledgeTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  knowledgeTab === tab.id
                    ? 'bg-charcoal-900 text-white shadow-xs'
                    : 'bg-white border border-cream-300 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================================
            PART A: 4 FEATURED PET CARE ARTICLES (GRID)
            ===================================================================== */}
        {(knowledgeTab === 'all' || knowledgeTab === 'articles') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-lg text-charcoal-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600" />
                  <span>Featured Veterinary & Adoption Guides</span>
                </h4>
                <p className="text-xs text-charcoal-500 font-medium">
                  Click any guide to read the full chapter, schedules, and clinical recommendations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PET_CARE_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="rounded-3xl bg-white border border-cream-300 shadow-premium hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    {/* Cover Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-cream-200">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-xs ${article.categoryColor}`}>
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-charcoal-950/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Article Body */}
                    <div className="p-4 space-y-2.5">
                      <p className="text-[11px] font-bold text-brand-700">
                        {article.author}
                      </p>
                      <h5 className="font-display font-bold text-sm sm:text-base text-charcoal-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h5>
                      <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed font-normal">
                        {article.summary}
                      </p>

                      {/* Key Takeaways Snippet */}
                      <div className="pt-2 border-t border-cream-200 space-y-1.5">
                        <span className="text-[10px] font-extrabold text-charcoal-400 uppercase tracking-wider">
                          Key Clinical Takeaways:
                        </span>
                        <ul className="space-y-1 text-[11px] text-charcoal-700">
                          {article.takeaways.slice(0, 2).map((pt, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-tight">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArticle(article);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-cream-100 hover:bg-cream-200 group-hover:bg-brand-500 group-hover:text-white text-charcoal-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Full Guide</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            PART B: ESSENTIAL DO'S & DON'TS MATRIX
            ===================================================================== */}
        {(knowledgeTab === 'all' || knowledgeTab === 'dos-donts') && (
          <div className="space-y-6 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h4 className="font-display font-extrabold text-xl sm:text-2xl text-charcoal-900">
                Crucial Daily Care Standards: Do's and Don'ts
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed font-medium">
                Simple habits that prevent emergencies, ensure longevity, and maintain happy canine and feline household members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* THE ESSENTIAL DO'S (EMERALD) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-emerald-300 shadow-premium space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-display font-extrabold text-lg text-emerald-950">
                      The Essential DO'S
                    </h5>
                    <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      Proven Best Practices for Health & Well-being
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {PET_CARE_DOS_AND_DONTS.dos.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="space-y-0.5">
                        <h6 className="font-display font-bold text-xs sm:text-sm text-charcoal-900">
                          {item.title}
                        </h6>
                        <p className="text-xs text-charcoal-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* THE CRITICAL DON'TS (ROSE / RED) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-rose-300 shadow-premium space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-display font-extrabold text-lg text-rose-950">
                      The Critical DON'TS
                    </h5>
                    <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                      Dangerous Hazards & Harmful Household Mistakes
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {PET_CARE_DOS_AND_DONTS.donts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                      <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="space-y-0.5">
                        <h6 className="font-display font-bold text-xs sm:text-sm text-charcoal-900">
                          {item.title}
                        </h6>
                        <p className="text-xs text-charcoal-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Quick Action Bar / Footer of Knowledge Hub */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-cream-100 to-amber-50 border border-cream-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h5 className="font-display font-bold text-sm sm:text-base text-charcoal-900 flex items-center gap-2 justify-center sm:justify-start">
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>Stay Ahead of Your Pet's Vaccinations & Health Cycles</span>
            </h5>
            <p className="text-xs text-charcoal-600">
              Set automated notifications for Rabies boosters, tick prevention, and annual checkups in your personal calendar.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenReminderModal({ title: 'Annual Booster Checkup', type: 'vaccination' })}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Set Care Reminder</span>
            </button>
            <Link
              to="/faq"
              className="px-4 py-2 rounded-xl bg-white border border-cream-300 hover:bg-cream-100 text-charcoal-800 font-bold text-xs shadow-xs transition-all"
            >
              <span>Platform FAQs →</span>
            </Link>
          </div>
        </div>

      </section>

      {/* Interactive Pet Care Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-300 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header Banner */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-charcoal-900 shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-transparent" />
              
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal-900/80 hover:bg-charcoal-950 text-white flex items-center justify-center cursor-pointer shadow-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 space-y-1.5 text-white">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${selectedArticle.categoryColor}`}>
                    {selectedArticle.category}
                  </span>
                  <span className="text-white/80 text-[11px] flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>{selectedArticle.readTime}</span>
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-tight">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Author / Credential Badge */}
              <div className="p-3 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-between text-xs">
                <span className="font-bold text-charcoal-700">
                  {selectedArticle.author}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Clinical Standard</span>
                </span>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider">
                  Summary & Key Takeaways:
                </span>
                <ul className="space-y-1.5 text-xs text-charcoal-700 font-medium">
                  {selectedArticle.takeaways.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Structured Sections */}
              <div className="space-y-4 text-charcoal-700 text-xs sm:text-sm leading-relaxed">
                {selectedArticle.fullContent.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h4 className="font-display font-bold text-charcoal-900 text-sm sm:text-base">
                      {sec.heading}
                    </h4>
                    <p className="text-charcoal-600 leading-relaxed font-normal">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-cream-200 bg-cream-50 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => {
                  const articleTitle = selectedArticle.title;
                  setSelectedArticle(null);
                  handleOpenReminderModal({ title: articleTitle, type: 'health_check' });
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Reminder for This</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-xl bg-charcoal-200 hover:bg-charcoal-300 text-charcoal-900 text-xs font-bold transition-all cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Reminder Modal */}
      {isReminderModalOpen && (
        <ReminderFormModal
          isOpen={isReminderModalOpen}
          onClose={() => {
            setIsReminderModalOpen(false);
            setReminderInitialData(null);
          }}
          onSuccess={handleReminderSuccess}
          initialData={reminderInitialData}
        />
      )}

      {/* Facility Registration Modal */}
      {isFacilityModalOpen && (
        <FacilityRegisterModal
          isOpen={isFacilityModalOpen}
          onClose={() => setIsFacilityModalOpen(false)}
        />
      )}

      {/* Floating Success Toast */}
      {reminderSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-emerald-700 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-emerald-200 shrink-0" />
          <p className="text-sm font-semibold">{reminderSuccessToast}</p>
        </div>
      )}

    </div>
  );
};

export default Home;
