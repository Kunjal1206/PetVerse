import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPetById, addFavorite, removeFavorite } from '../../services/petService';
import AdoptionFormModal from '../../components/adoption/AdoptionFormModal';
import CompatibilityBadge from '../../components/pet/CompatibilityBadge';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Building2, 
  Phone, 
  Mail, 
  Activity, 
  Calendar,
  Share2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const data = await getPetById(id);
        setPet(data);
        setSelectedImage(data.image_url);
      } catch (err) {
        console.error('Failed to load pet details:', err);
        setError('Pet not found or has already been adopted.');
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      alert('Please log in to save pets to your favorites.');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(pet.id);
        setIsFavorite(false);
      } else {
        await addFavorite(pet.id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Favorite error:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Adopt ${pet.name} on PetVerse`,
        text: `Meet ${pet.name}, a lovely ${pet.breed} looking for a forever home on PetVerse!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Pet profile link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-charcoal-500">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p>Loading pet profile...</p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-display font-bold text-charcoal-900">Pet Profile Unavailable</h2>
        <p className="text-sm text-charcoal-600">{error}</p>
        <Link to="/adopt">
          <Button variant="primary" size="md">
            Browse Other Adoptable Pets
          </Button>
        </Link>
      </div>
    );
  }

  const temperamentTags = pet.temperament ? pet.temperament.split(',').map(t => t.trim()) : [];
  
  // Sample extra gallery photos
  const galleryImages = [
    pet.image_url,
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=600'
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/adopt"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Pets</span>
        </Link>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-900 hover:bg-cream-200 transition-colors flex items-center gap-1.5 text-xs font-medium"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Profile</span>
        </button>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative h-96 sm:h-[460px] w-full rounded-3xl overflow-hidden bg-cream-200 shadow-premium border border-cream-300">
            <img
              src={selectedImage || pet.image_url}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            {pet.adoption_status === 'pending' && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white font-bold text-xs uppercase rounded-full shadow-sm">
                Application Pending
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImage === img
                    ? 'border-brand-500 ring-2 ring-brand-200 scale-105'
                    : 'border-cream-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Compatibility Highlight Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-50 via-teal-50/40 to-cream-100 border border-brand-200/80 shadow-premium space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">
                Compatibility Profile
              </span>
              <CompatibilityBadge score={92} showLabel />
            </div>
            <h4 className="font-display font-bold text-base text-charcoal-900">
              Why {pet.name} may be the right pet for you
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Temperament matches households with moderate to high activity.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Great companion personality; verified socialized with humans.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Up to date on vital core vaccinations.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Info & Actions Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Quick Tags */}
          <div className="space-y-2 pb-4 border-b border-cream-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                {pet.species} for Adoption
              </span>
              <div className="flex items-center gap-1 text-xs text-charcoal-500">
                <MapPin className="w-4 h-4 text-charcoal-400" />
                <span>{pet.shelter_city || 'Delhi, India'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal-900">
                {pet.name}
              </h1>
              <button
                onClick={handleFavoriteToggle}
                className="p-3 rounded-full border border-cream-300 bg-white hover:bg-cream-50 text-charcoal-700 hover:text-rose-500 shadow-sm transition-all"
                title={isFavorite ? 'Remove Favorite' : 'Save to Favorites'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <p className="text-sm font-semibold text-charcoal-600">
              {pet.breed}
            </p>
          </div>

          {/* Metric Badges (Age, Gender, Size, Status) */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-cream-100 rounded-2xl text-center space-y-0.5">
              <span className="text-[10px] text-charcoal-500 uppercase font-semibold">Age</span>
              <p className="font-display font-bold text-sm text-charcoal-900">{pet.age}</p>
            </div>
            <div className="p-3 bg-cream-100 rounded-2xl text-center space-y-0.5">
              <span className="text-[10px] text-charcoal-500 uppercase font-semibold">Gender</span>
              <p className="font-display font-bold text-sm text-charcoal-900">{pet.gender}</p>
            </div>
            <div className="p-3 bg-cream-100 rounded-2xl text-center space-y-0.5">
              <span className="text-[10px] text-charcoal-500 uppercase font-semibold">Size</span>
              <p className="font-display font-bold text-sm text-charcoal-900">{pet.size}</p>
            </div>
          </div>

          {/* Temperament Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
              Temperament & Personality
            </h4>
            <div className="flex flex-wrap gap-2">
              {temperamentTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-white border border-cream-300 text-brand-900 shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* About / Story */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
              About {pet.name}
            </h4>
            <p className="text-sm text-charcoal-700 leading-relaxed bg-white p-4 rounded-2xl border border-cream-300">
              {pet.about || 'A loving rescue pet waiting for a safe forever home.'}
            </p>
          </div>

          {/* Ideal Home & Care Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-cream-300 space-y-1">
              <h5 className="font-bold text-charcoal-900">🏡 Ideal Home</h5>
              <p className="text-charcoal-600 leading-relaxed">{pet.ideal_home || 'Suitable for loving homes.'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-cream-300 space-y-1">
              <h5 className="font-bold text-charcoal-900">🩺 Health & Vaccines</h5>
              <p className="text-charcoal-600 leading-relaxed">{pet.vaccination_status || 'Up to date on vaccinations.'}</p>
            </div>
          </div>

          {/* Shelter Card */}
          <div className="p-5 rounded-3xl bg-cream-100 border border-cream-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display font-bold text-sm text-charcoal-900 truncate">
                    {pet.shelter_name || 'Rescue Shelter'}
                  </h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Shelter" />
                </div>
                <p className="text-xs text-charcoal-500">{pet.shelter_city || 'Delhi, India'}</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              variant="primary"
              icon={Heart}
              className="flex-1"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                } else {
                  setIsAdoptModalOpen(true);
                }
              }}
            >
              Apply to Adopt {pet.name}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              icon={Heart}
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? 'Saved' : 'Save to Favorites'}
            </Button>
          </div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      {isAdoptModalOpen && (
        <AdoptionFormModal
          pet={pet}
          isOpen={isAdoptModalOpen}
          onClose={() => setIsAdoptModalOpen(false)}
          onSuccess={() => {
            setIsAdoptModalOpen(false);
            navigate('/dashboard/applications');
          }}
        />
      )}
    </div>
  );
};

export default PetDetails;
