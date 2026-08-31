import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPets } from '../../services/petService';
import PetCard from '../../components/pet/PetCard';
import PetFilter from '../../components/pet/PetFilter';
import { PetCardSkeleton } from '../../components/common/Skeleton';
import EmptyState from '../../components/common/EmptyState';
import { Sparkles, Heart, Filter } from 'lucide-react';
import Button from '../../components/common/Button';

const BrowsePets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from query params
  const [filters, setFilters] = useState({
    species: searchParams.get('species') || '',
    city: searchParams.get('city') || '',
    gender: searchParams.get('gender') || '',
    size: searchParams.get('size') || '',
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
  });

  const fetchFilteredPets = async () => {
    try {
      setLoading(true);
      const data = await getPets(filters);
      setPets(data);
    } catch (err) {
      console.error('Failed to load pets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredPets();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Sync with URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const handleReset = () => {
    const defaultFilters = {
      species: '',
      city: '',
      gender: '',
      size: '',
      search: '',
      sortBy: 'newest'
    };
    setFilters(defaultFilters);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Shelter Rescue Network</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal-900">
          Find Your New Best Friend
        </h1>
        <p className="text-sm text-charcoal-600 max-w-2xl">
          Browse verified rescue pets waiting for a loving home across India. Filter by species, city, size, and temperament.
        </p>
      </div>

      {/* AI Pet Match Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white">
              Not sure which pet fits your home?
            </h3>
            <p className="text-xs text-cream-200 mt-0.5">
              Take the 2-minute AI Pet Match quiz for personalized compatibility scoring.
            </p>
          </div>
        </div>
        <Link to="/ai-match" className="shrink-0 w-full sm:w-auto">
          <Button size="sm" variant="secondary" className="bg-white text-brand-900 hover:bg-cream-100 w-full sm:w-auto">
            Take AI Match Quiz
          </Button>
        </Link>
      </div>

      {/* Filter Component */}
      <PetFilter
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        totalCount={pets.length}
      />

      {/* Pet Card Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <PetCardSkeleton key={idx} />
          ))}
        </div>
      ) : pets.length === 0 ? (
        <EmptyState
          title="No pets match your current criteria"
          description="Try broadening your city or species filter to see more furry companions waiting for adoption."
          actionLabel="Reset All Filters"
          onAction={handleReset}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePets;
