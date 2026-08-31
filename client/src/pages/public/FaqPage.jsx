import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Heart, ShieldCheck, Search } from 'lucide-react';
import Tabs from '../../components/common/Tabs';

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState('adoption');
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = {
    adoption: [
      {
        q: 'How does the PetVerse adoption process work?',
        a: 'When you browse adoptable pets, you can read their health and temperament profiles. Clicking "Apply to Adopt" opens a lifestyle questionnaire. The rescue shelter reviews your submission, coordinates a meet-and-greet, and manages adoption paperwork.'
      },
      {
        q: 'Is there an adoption fee?',
        a: 'PetVerse does not charge any adoption brokerage fees. Verified partner shelters may request a nominal contribution to cover vaccinations, microchipping, and sterilization costs.'
      },
      {
        q: 'Can I adopt if I live in an apartment?',
        a: 'Absolutely! Many cats and small to medium dogs thrive in apartments. Use our AI Pet Match quiz or filter specifically for apartment-friendly companions.'
      }
    ],
    ai: [
      {
        q: 'How does the AI Pet Match algorithm calculate compatibility?',
        a: 'We evaluate your daily away hours, household size, active outdoor habits, home type, and presence of children against individual pet energy levels and social traits to provide a transparent percentage match with concrete reasons.'
      },
      {
        q: 'Does the AI make final adoption decisions?',
        a: 'No. The AI provides advisory guidance and suggestions. Final adoption approval is always reviewed and decided by the human shelter caretakers.'
      }
    ],
    care: [
      {
        q: 'How are boarding caregivers vetted?',
        a: 'All caregivers submit government ID verification, home safety photos, experience certifications, and complete reference background checks.'
      },
      {
        q: 'What is included with Pet Boarding bookings?',
        a: 'Standard homestays include feeding per schedule, daily outdoor walks, continuous indoor human companionship, photo/video check-ins, and complementary emergency vet coverage.'
      },
      {
        q: 'What if I need to cancel a booking?',
        a: 'You can cancel or reschedule bookings directly inside your Adopter Dashboard prior to the check-in date.'
      }
    ],
    safety: [
      {
        q: 'How does the Lost & Found alert system work?',
        a: 'When a lost or found report is submitted, nearby community members and local shelters receive geolocation alerts so sightings can be coordinated in real time.'
      },
      {
        q: 'How do shelters join PetVerse?',
        a: 'Shelters can register via the "Register Shelter" option. Once basic registration is approved by our admin team, shelters can publish listings and review applications.'
      }
    ]
  };

  const tabs = [
    { id: 'adoption', label: 'Adoption Process', icon: Heart },
    { id: 'ai', label: 'AI Pet Match', icon: Sparkles },
    { id: 'care', label: 'Boarding & Care', icon: ShieldCheck },
    { id: 'safety', label: 'Safety & Shelters', icon: Search },
  ];

  const currentFaqs = faqData[activeCategory] || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold border border-brand-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base & Support</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-charcoal-900">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-charcoal-600 max-w-lg mx-auto">
          Everything you need to know about adoption, AI matching, verified boarding, and pet care.
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeCategory}
        onChange={(tabId) => {
          setActiveCategory(tabId);
          setOpenIndex(null);
        }}
      />

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {currentFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-cream-300 overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-charcoal-900 hover:text-brand-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-charcoal-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-cream-200 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqPage;
