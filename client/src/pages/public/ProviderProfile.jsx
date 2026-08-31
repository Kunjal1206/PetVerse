import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProviderById } from '../../services/providerService';
import BookingModal from '../../components/services/BookingModal';
import ReviewCard from '../../components/services/ReviewCard';
import ReviewFormModal from '../../components/services/ReviewFormModal';
import Button from '../../components/common/Button';
import Rating from '../../components/common/Rating';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Star, 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Heart, 
  Phone,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProviderProfile = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProviderById(id);
      setProvider(data);
    } catch (err) {
      console.error('Failed to load provider profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-charcoal-500">
        Loading caregiver profile...
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h3 className="text-xl font-bold text-charcoal-900">Provider Not Found</h3>
        <Link to="/services">
          <Button variant="primary" size="md">
            Explore All Services
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back link */}
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Care Services</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Details & Reviews */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-premium flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <img
                src={provider.image_url || 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=300'}
                alt={provider.name}
                className="w-28 h-28 rounded-3xl object-cover border-2 border-cream-300 shadow-sm"
              />
              {provider.verified && (
                <span className="absolute -bottom-2 -right-2 bg-brand-accent text-white p-1.5 rounded-full shadow-sm" title="Verified Host">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}
            </div>

            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
                  {provider.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-brand-50 text-brand-800 border border-brand-200">
                  {provider.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-charcoal-400" />
                  <span>{provider.location}, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brand-500" />
                  <span>{provider.experience} Years Experience</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Rating value={Number(provider.rating)} size="md" showCount count={provider.reviews?.length || 0} />
              </div>
            </div>
          </div>

          {/* About & Bio */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-4">
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              About {provider.name}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {provider.about}
            </p>
          </div>

          {/* Safety & Care Standards */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-4">
            <div className="flex items-center gap-2 text-brand-800">
              <ShieldCheck className="w-5 h-5 text-brand-accent" />
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Pet Safety & Cleanliness Standards
              </h3>
            </div>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              {provider.safety_info || 'Sterilized equipment, double-leash safety protocol, and on-call emergency vet coverage.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-charcoal-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ID & Residence Proof Verified</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complementary Emergency Vet Coverage</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Daily Video & Photo Updates</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cage-Free Loving Environment</span>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-premium space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-charcoal-900">
                  Pet Parent Reviews ({provider.reviews?.length || 0})
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Rating value={Number(provider.rating)} size="sm" />
                  <span className="text-xs font-bold text-charcoal-800">{Number(provider.rating).toFixed(1)} out of 5</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={MessageSquare}
                onClick={() => setIsReviewOpen(true)}
              >
                Write a Review
              </Button>
            </div>

            <div className="space-y-3">
              {provider.reviews && provider.reviews.length > 0 ? (
                provider.reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))
              ) : (
                <p className="text-xs text-charcoal-400 py-4 text-center">
                  No reviews submitted yet. Be the first to leave feedback!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-xl sticky top-28 space-y-6">
            <div className="pb-4 border-b border-cream-200">
              <span className="text-[10px] text-charcoal-500 uppercase font-bold tracking-wider">Service Fee</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display font-extrabold text-3xl text-brand-900">
                  ₹{Number(provider.price).toFixed(0)}
                </span>
                <span className="text-xs text-charcoal-500">/ day or session</span>
              </div>
            </div>

            {/* Next Available Dates */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                Upcoming Open Slots
              </label>
              <div className="flex flex-wrap gap-1.5">
                {provider.available_dates && provider.available_dates.slice(0, 4).map((d, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-cream-100 text-charcoal-800 text-xs font-semibold rounded-lg border border-cream-300"
                  >
                    {new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              icon={Calendar}
              className="w-full shadow-md"
              onClick={() => setIsBookingOpen(true)}
            >
              Request Booking
            </Button>

            <p className="text-[11px] text-center text-charcoal-400">
              You won't be charged yet. Host will review your request before confirmation.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          provider={provider}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={() => setIsBookingOpen(false)}
        />
      )}

      {/* Review Modal */}
      {isReviewOpen && (
        <ReviewFormModal
          providerId={provider.id}
          providerName={provider.name}
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          onSuccess={fetchProfile}
        />
      )}
    </div>
  );
};

export default ProviderProfile;
