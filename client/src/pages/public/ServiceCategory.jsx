import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProviders } from '../../services/providerService';
import ProviderCard from '../../components/services/ProviderCard';
import BookingModal from '../../components/services/BookingModal';
import EmptyState from '../../components/common/EmptyState';
import { ArrowLeft, Sparkles, MapPin, Filter } from 'lucide-react';
import Button from '../../components/common/Button';

const ServiceCategory = () => {
  const { category = 'grooming' } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [bookingProvider, setBookingProvider] = useState(null);

  const categoryTitles = {
    grooming: { title: 'Pet Spa & Grooming', subtitle: 'Baths, styling, tick treatments, and nail clipping' },
    walking: { title: 'Dog Walking Services', subtitle: 'Energetic, GPS-tracked daily walks with certified walkers' },
    training: { title: 'Pet Behavior & Training', subtitle: 'Positive reinforcement obedience and behavioral coaching' },
    sitting: { title: 'In-House Pet Sitting', subtitle: 'Reliable in-home drop-in feeding and companionship' },
    vet: { title: 'Veterinary Clinics & Surgery', subtitle: 'Licensed senior veterinarians and diagnostic care' }
  };

  const currentCategory = categoryTitles[category] || {
    title: `${category.toUpperCase()} Services`,
    subtitle: 'Professional verified caregivers on PetVerse'
  };

  useEffect(() => {
    const fetchCategoryProviders = async () => {
      try {
        setLoading(true);
        const data = await getProviders({ type: category, city: selectedCity });
        setProviders(data);
      } catch (err) {
        console.error('Failed to load category providers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProviders();
  }, [category, selectedCity]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back link */}
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>All Pet Care Services</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Service Specialists</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal-900">
            {currentCategory.title}
          </h1>
          <p className="text-sm text-charcoal-600 mt-1">
            {currentCategory.subtitle}
          </p>
        </div>

        {/* City Filter */}
        <div className="w-full sm:w-64">
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Filter by City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-white border border-cream-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-charcoal-900 focus:outline-none focus:border-brand-500 cursor-pointer shadow-xs"
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
        </div>
      </div>

      {/* Provider List */}
      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading service providers...</div>
      ) : providers.length === 0 ? (
        <EmptyState
          title="No service providers found in this city"
          description="Try selecting 'All Indian Cities' or explore another category."
          actionLabel="View All Cities"
          onAction={() => setSelectedCity('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p) => (
            <ProviderCard
              key={p.id}
              provider={p}
              onBookNow={(selected) => setBookingProvider(selected)}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {bookingProvider && (
        <BookingModal
          provider={bookingProvider}
          isOpen={!!bookingProvider}
          onClose={() => setBookingProvider(null)}
          onSuccess={() => setBookingProvider(null)}
        />
      )}
    </div>
  );
};

export default ServiceCategory;
