import React, { useState, useEffect } from 'react';
import { getUserPets, deleteUserPet } from '../../services/careService';
import PetProfileCard from '../../components/care/PetProfileCard';
import AddPetModal from '../../components/care/AddPetModal';
import ReminderFormModal from '../../components/care/ReminderFormModal';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { PawPrint, Plus, Sparkles, ShieldCheck } from 'lucide-react';

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [selectedPetForReminder, setSelectedPetForReminder] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getUserPets();
      setPets(data);
    } catch (err) {
      console.error('Failed to load user pets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDeletePet = async (id) => {
    if (!window.confirm('Are you sure you want to remove this pet profile?')) return;
    try {
      await deleteUserPet(id);
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
            My Pets & Health Profiles
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
            Manage your adopted and family pets, track weights, allergies, and vaccination schedules.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsAddPetModalOpen(true)}
          className="shrink-0"
        >
          Add New Pet
        </Button>
      </div>

      {/* Pet Profiles List */}
      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading your pets...</div>
      ) : pets.length === 0 ? (
        <EmptyState
          icon={PawPrint}
          title="No pets added yet"
          description="Add your adopted companion or existing family pet to track medical checkups, weight logs, and daily care routines."
          actionLabel="Add Your First Pet"
          onAction={() => setIsAddPetModalOpen(true)}
        />
      ) : (
        <div className="space-y-6">
          {pets.map((pet) => (
            <PetProfileCard
              key={pet.id}
              pet={pet}
              onDelete={handleDeletePet}
              onAddReminder={(p) => setSelectedPetForReminder(p)}
            />
          ))}
        </div>
      )}

      {/* Add Pet Modal */}
      {isAddPetModalOpen && (
        <AddPetModal
          isOpen={isAddPetModalOpen}
          onClose={() => setIsAddPetModalOpen(false)}
          onSuccess={fetchPets}
        />
      )}

      {/* Reminder Modal */}
      {selectedPetForReminder && (
        <ReminderFormModal
          isOpen={!!selectedPetForReminder}
          onClose={() => setSelectedPetForReminder(null)}
          pets={pets}
          onSuccess={() => setSelectedPetForReminder(null)}
        />
      )}
    </div>
  );
};

export default MyPets;
