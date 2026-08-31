import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitAiMatch } from '../../services/aiService';
import QuizStepIndicator from '../../components/ai/QuizStepIndicator';
import Button from '../../components/common/Button';
import PetCard from '../../components/pet/PetCard';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Home, 
  Activity, 
  Clock, 
  HeartHandshake, 
  PawPrint, 
  Users, 
  Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AiPetMatch = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState(null);

  // Form State
  const [quizData, setQuizData] = useState({
    homeType: 'apartment',
    activityLevel: 'moderate',
    awayHours: '2-6',
    petExperience: 'experienced',
    petType: 'either',
    hasChildren: false,
    hasOtherPets: false,
    preferredSize: 'any',
    preferredTemperament: ['Friendly', 'Calm']
  });

  const handleSelect = (field, value) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateResults = async () => {
    setCalculating(true);
    try {
      // Small intentional delay for pleasant UX feel
      const [data] = await Promise.all([
        submitAiMatch(quizData),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);
      setResults(data);
    } catch (err) {
      console.error('AI match computation error:', err);
    } finally {
      setCalculating(false);
    }
  };

  const handleRetake = () => {
    setResults(null);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Calculating Animation State */}
      {calculating ? (
        <div className="py-20 text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-brand-accent animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl text-charcoal-900">
              Finding Your Best Pet Matches...
            </h3>
            <p className="text-sm text-charcoal-500 max-w-sm mx-auto">
              Our AI is weighing your lifestyle parameters against available shelter companions.
            </p>
          </div>
        </div>
      ) : results ? (
        /* Results View */
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-bold border border-teal-200">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span>AI Compatibility Matches Ready</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal-900">
              Your Top Recommended Companions
            </h1>
            <p className="text-sm text-charcoal-600 max-w-lg mx-auto">
              Based on your answers, here are the pets best suited to thrive with your living space, schedule, and activity habits.
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" icon={RotateCcw} onClick={handleRetake}>
                Retake Questionnaire
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.slice(0, 6).map((pet) => (
              <PetCard key={pet.id} pet={pet} showMatchScore />
            ))}
          </div>

          {/* Adoption Next Steps Advice */}
          <div className="p-8 rounded-3xl bg-cream-200/70 border border-cream-300 space-y-4">
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              What happens after you apply?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl space-y-1 shadow-xs">
                <span className="font-bold text-brand-700">1. Application Review</span>
                <p className="text-charcoal-600">The rescue shelter reviews your profile within 24-48 hours.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl space-y-1 shadow-xs">
                <span className="font-bold text-brand-700">2. Meet & Greet</span>
                <p className="text-charcoal-600">Schedule a visit at the shelter to interact and bond with the pet.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl space-y-1 shadow-xs">
                <span className="font-bold text-brand-700">3. Welcome Home</span>
                <p className="text-charcoal-600">Complete adoption paperwork and add your pet to PetVerse My Pets!</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Multi-Step Quiz Card */
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-10 shadow-premium">
          
          <QuizStepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitle={
              currentStep === 1 ? 'Where do you live?' :
              currentStep === 2 ? 'How active is your daily routine?' :
              currentStep === 3 ? 'How many hours will the pet spend alone?' :
              currentStep === 4 ? 'What is your previous pet experience?' :
              currentStep === 5 ? 'Which type of pet are you looking for?' :
              currentStep === 6 ? 'Who else lives in your home?' :
              'Preferred pet size & temperament?'
            }
          />

          {/* Step 1: Living Space */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {[
                { id: 'apartment', title: 'Apartment / Flat', desc: 'Indoor living space with balcony / elevator' },
                { id: 'house', title: 'Independent House', desc: 'Private home with yard or compound' },
                { id: 'farmhouse', title: 'Open Farm / Villa', desc: 'Large open land / expansive yard' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('homeType', opt.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all ${
                    quizData.homeType === opt.id
                      ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                      : 'border-cream-300 hover:border-cream-400 bg-cream-50/40'
                  }`}
                >
                  <h4 className="font-display font-bold text-base text-charcoal-900">{opt.title}</h4>
                  <p className="text-xs text-charcoal-600 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Activity Level */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {[
                { id: 'high', title: 'High Energy', desc: 'Running, outdoor trekking, multiple daily walks' },
                { id: 'moderate', title: 'Moderate', desc: 'Daily 30-45 min strolls, regular backyard play' },
                { id: 'low', title: 'Calm & Relaxed', desc: 'Quiet indoor companion, minimal exercise needs' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('activityLevel', opt.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all ${
                    quizData.activityLevel === opt.id
                      ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                      : 'border-cream-300 hover:border-cream-400 bg-cream-50/40'
                  }`}
                >
                  <h4 className="font-display font-bold text-base text-charcoal-900">{opt.title}</h4>
                  <p className="text-xs text-charcoal-600 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Away Hours */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {[
                { id: '0-2', title: '0 - 2 Hours', desc: 'Someone is almost always home or working remotely' },
                { id: '2-6', title: '2 - 6 Hours', desc: 'Standard hybrid work schedule / afternoon presence' },
                { id: '6+', title: '6+ Hours', desc: 'Full office hours (requires independent companion)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('awayHours', opt.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all ${
                    quizData.awayHours === opt.id
                      ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                      : 'border-cream-300 hover:border-cream-400 bg-cream-50/40'
                  }`}
                >
                  <h4 className="font-display font-bold text-base text-charcoal-900">{opt.title}</h4>
                  <p className="text-xs text-charcoal-600 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Experience */}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {[
                { id: 'first_time', title: 'First-time Pet Parent', desc: 'Looking for a gentle, forgiving starter companion' },
                { id: 'experienced', title: 'Experienced Parent', desc: 'Comfortable with basic training & routine care' },
                { id: 'expert', title: 'Seasoned Adopter', desc: 'Comfortable with medical needs or training rehabilitation' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('petExperience', opt.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all ${
                    quizData.petExperience === opt.id
                      ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                      : 'border-cream-300 hover:border-cream-400 bg-cream-50/40'
                  }`}
                >
                  <h4 className="font-display font-bold text-base text-charcoal-900">{opt.title}</h4>
                  <p className="text-xs text-charcoal-600 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 5: Preferred Species */}
          {currentStep === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {[
                { id: 'dog', title: 'Dogs Only', desc: 'Loyal, affectionate, and active canines' },
                { id: 'cat', title: 'Cats Only', desc: 'Independent, clean, and affectionate felines' },
                { id: 'either', title: 'Either / Open to Both', desc: 'Show me the best match regardless of species' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('petType', opt.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all ${
                    quizData.petType === opt.id
                      ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                      : 'border-cream-300 hover:border-cream-400 bg-cream-50/40'
                  }`}
                >
                  <h4 className="font-display font-bold text-base text-charcoal-900">{opt.title}</h4>
                  <p className="text-xs text-charcoal-600 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 6: Children & Other Pets */}
          {currentStep === 6 && (
            <div className="space-y-4 my-8 max-w-lg mx-auto">
              <label className="flex items-center justify-between p-4 rounded-2xl border border-cream-300 bg-cream-50 cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-charcoal-900">Are there young children in the household?</p>
                  <p className="text-xs text-charcoal-500">We will prioritize pets certified gentle with kids.</p>
                </div>
                <input
                  type="checkbox"
                  checked={quizData.hasChildren}
                  onChange={(e) => handleSelect('hasChildren', e.target.checked)}
                  className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl border border-cream-300 bg-cream-50 cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-charcoal-900">Do you currently have other dogs or cats?</p>
                  <p className="text-xs text-charcoal-500">We will prioritize pets that socialize well with other animals.</p>
                </div>
                <input
                  type="checkbox"
                  checked={quizData.hasOtherPets}
                  onChange={(e) => handleSelect('hasOtherPets', e.target.checked)}
                  className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                />
              </label>
            </div>
          )}

          {/* Step 7: Size & Temperament */}
          {currentStep === 7 && (
            <div className="space-y-6 my-8">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                  Preferred Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['any', 'small', 'medium', 'large'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSelect('preferredSize', s)}
                      className={`p-3 rounded-xl text-xs font-bold uppercase tracking-wider border text-center transition-all ${
                        quizData.preferredSize === s
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-cream-50 border-cream-300 text-charcoal-700 hover:bg-cream-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step Footer Navigation */}
          <div className="pt-6 border-t border-cream-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button variant="ghost" size="md" icon={ArrowLeft} onClick={handleBack}>
                Previous Step
              </Button>
            ) : <div />}

            <Button
              variant="primary"
              size="md"
              icon={currentStep === totalSteps ? Sparkles : ArrowRight}
              iconPosition="right"
              onClick={handleNext}
            >
              {currentStep === totalSteps ? 'Find Compatible Pets' : 'Next Step'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiPetMatch;
