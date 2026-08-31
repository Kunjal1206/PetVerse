import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../../services/petService';
import PetCard from '../../components/pet/PetCard';
import EmptyState from '../../components/common/EmptyState';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteToggle = async (petId, isFav) => {
    if (!isFav) {
      setFavorites(prev => prev.filter(p => p.id !== petId));
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-cream-300">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Saved Favorite Pets
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Pets you've bookmarked for adoption comparison and future inquiries.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading favorites...</div>
      ) : favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorite pets saved yet"
          description="Browse adoptable pets and tap the heart icon on any profile to bookmark them here."
          actionLabel="Browse Available Pets"
          onAction={() => window.location.href = '/adopt'}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              isFavoriteInitial={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
