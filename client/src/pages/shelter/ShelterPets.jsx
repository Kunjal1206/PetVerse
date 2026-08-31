import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShelterPets } from '../../services/shelterService';
import { updatePet, deletePet } from '../../services/petService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { PawPrint, PlusCircle, Edit3, Trash2, CheckCircle2, Clock } from 'lucide-react';

const ShelterPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getShelterPets();
      setPets(data);
    } catch (err) {
      console.error('Failed to load shelter pets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleStatusToggle = async (petId, newStatus) => {
    try {
      await updatePet(petId, { adoption_status: newStatus });
      fetchPets();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (petId) => {
    if (!window.confirm('Are you sure you want to remove this pet listing?')) return;
    try {
      await deletePet(petId);
      fetchPets();
    } catch (err) {
      console.error('Failed to delete pet:', err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-300">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Shelter Pet Listings
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
            Manage your adoptable pets, update health tags, and modify adoption availability.
          </p>
        </div>

        <Link to="/shelter/pets/add">
          <Button variant="primary" size="md" icon={PlusCircle}>
            Add New Pet
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading shelter pets...</div>
      ) : pets.length === 0 ? (
        <EmptyState
          icon={PawPrint}
          title="No pet listings yet"
          description="Create your first adoptable pet listing to begin accepting inquiries."
          actionLabel="Add Pet Listing"
          onAction={() => window.location.href = '/shelter/pets/add'}
        />
      ) : (
        <div className="space-y-4">
          {pets.map((pet) => (
            <Card key={pet.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={pet.image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200'}
                  alt={pet.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-cream-300 shadow-xs shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-lg text-charcoal-900">
                      {pet.name}
                    </h3>
                    <Badge
                      variant={
                        pet.adoption_status === 'available' ? 'success' :
                        pet.adoption_status === 'pending' ? 'warning' : 'neutral'
                      }
                      size="sm"
                      dot
                    >
                      {pet.adoption_status}
                    </Badge>
                  </div>
                  <p className="text-xs text-charcoal-500">
                    {pet.species} • {pet.breed} • {pet.age} • {pet.gender} • {pet.size}
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                {/* Status Switcher Dropdown */}
                <select
                  value={pet.adoption_status}
                  onChange={(e) => handleStatusToggle(pet.id, e.target.value)}
                  className="bg-cream-100 border border-cream-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-charcoal-800 cursor-pointer focus:outline-none"
                >
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="adopted">Adopted</option>
                </select>

                <Link to={`/shelter/pets/${pet.id}/edit`}>
                  <Button variant="outline" size="sm" icon={Edit3}>
                    Edit
                  </Button>
                </Link>

                <button
                  onClick={() => handleDelete(pet.id)}
                  className="p-2 text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Delete pet listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShelterPets;
