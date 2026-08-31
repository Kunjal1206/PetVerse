import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import CompatibilityBadge from './CompatibilityBadge';
import { addFavorite, removeFavorite } from '../../services/petService';
import { useAuth } from '../../context/AuthContext';

const PetCard = ({
  pet,
  isFavoriteInitial = false,
  onFavoriteToggle,
  showMatchScore = false
}) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [loadingFav, setLoadingFav] = useState(false);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please log in to save pets to your favorites.');
      return;
    }

    try {
      setLoadingFav(true);
      if (isFavorite) {
        await removeFavorite(pet.id);
        setIsFavorite(false);
        if (onFavoriteToggle) onFavoriteToggle(pet.id, false);
      } else {
        await addFavorite(pet.id);
        setIsFavorite(true);
        if (onFavoriteToggle) onFavoriteToggle(pet.id, true);
      }
    } catch (err) {
      console.error('Failed to update favorite:', err);
    } finally {
      setLoadingFav(false);
    }
  };

  const temperamentTags = pet.temperament
    ? pet.temperament.split(',').map((t) => t.trim()).slice(0, 3)
    : [];

  return (
    <div className="group rounded-3xl border border-cream-300 bg-white overflow-hidden shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div className="relative h-60 w-full overflow-hidden bg-cream-200">
          <img
            src={pet.image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600'}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            disabled={loadingFav}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal-700 hover:text-rose-500 hover:bg-white shadow-sm transition-all active:scale-90"
          >
            <Heart
              className={`w-4.5 h-4.5 transition-colors ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-charcoal-700'
              }`}
            />
          </button>

          {/* Species / Status Tag */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-brand-800 shadow-xs">
              {pet.species}
            </span>
            {pet.adoption_status === 'pending' && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500 text-white shadow-xs">
                Pending
              </span>
            )}
          </div>

          {/* Match Score Badge (if AI match results) */}
          {showMatchScore && pet.compatibilityScore && (
            <div className="absolute bottom-3 left-3">
              <CompatibilityBadge score={pet.compatibilityScore} />
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display font-bold text-xl text-charcoal-900 group-hover:text-brand-600 transition-colors">
              {pet.name}
            </h3>
            <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
              {pet.age}
            </span>
          </div>

          <p className="text-xs text-charcoal-600 font-medium mb-3 flex items-center gap-1.5">
            <span>{pet.breed}</span>
            <span>•</span>
            <span>{pet.gender}</span>
            <span>•</span>
            <span>{pet.size}</span>
          </p>

          {/* Temperament Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {temperamentTags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-cream-100 text-charcoal-700 border border-cream-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Match Reasons (if AI match) */}
          {showMatchScore && pet.matchReasons && pet.matchReasons.length > 0 && (
            <div className="mb-4 p-2.5 rounded-xl bg-brand-50/60 border border-brand-100 text-xs space-y-1">
              {pet.matchReasons.slice(0, 2).map((reason, rIdx) => (
                <p key={rIdx} className="text-brand-800 font-medium leading-tight">
                  {reason}
                </p>
              ))}
            </div>
          )}

          {/* Shelter & Location */}
          <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs text-charcoal-500">
            <div className="flex items-center gap-1 truncate max-w-[170px]">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
              <span className="truncate">{pet.shelter_name || 'Verified Shelter'}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
              <span>{pet.shelter_city || 'Delhi'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-0">
        <Link
          to={`/pet/${pet.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cream-200 hover:bg-brand-500 hover:text-white text-charcoal-800 font-semibold text-xs transition-all duration-200 shadow-xs"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
