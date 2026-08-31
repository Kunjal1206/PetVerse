import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import { addUserPet } from '../../services/careService';
import { PawPrint, Plus } from 'lucide-react';

const AddPetModal = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [petForm, setPetForm] = useState({
    name: '',
    species: 'dog',
    breed: '',
    dob: '2023-01-01',
    gender: 'Male',
    weight: '12',
    photo_url: '',
    medical_notes: '',
    vaccination_status: 'Fully Vaccinated'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petForm.name.trim()) {
      setError('Pet name is required.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await addUserPet({
        ...petForm,
        weight: parseFloat(petForm.weight) || 0,
        photo_url: petForm.photo_url || (petForm.species === 'cat' 
          ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300'
          : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300')
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to add pet:', err);
      setError(err.response?.data?.message || 'Failed to add pet.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Pet to My Pets"
      subtitle="Track vaccinations, medications, weight, and care schedules"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Pet Name"
            required
            placeholder="e.g. Sherlock"
            value={petForm.name}
            onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
          />

          <Select
            label="Species"
            value={petForm.species}
            onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
            options={[
              { value: 'dog', label: 'Dog' },
              { value: 'cat', label: 'Cat' },
              { value: 'rabbit', label: 'Rabbit' },
              { value: 'bird', label: 'Bird' }
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Breed"
            placeholder="e.g. Golden Retriever, Indie"
            value={petForm.breed}
            onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
          />

          <Input
            label="Date of Birth / Adoption"
            type="date"
            value={petForm.dob}
            onChange={(e) => setPetForm({ ...petForm, dob: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Select
            label="Gender"
            value={petForm.gender}
            onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' }
            ]}
          />

          <Input
            label="Weight (kg)"
            type="number"
            step="0.1"
            value={petForm.weight}
            onChange={(e) => setPetForm({ ...petForm, weight: e.target.value })}
          />

          <Select
            label="Vaccines"
            value={petForm.vaccination_status}
            onChange={(e) => setPetForm({ ...petForm, vaccination_status: e.target.value })}
            options={[
              { value: 'Fully Vaccinated', label: 'Up to Date' },
              { value: 'Partially Vaccinated', label: 'In Progress' },
              { value: 'Due Soon', label: 'Due Soon' }
            ]}
          />
        </div>

        <Input
          label="Photo URL (Optional)"
          placeholder="https://..."
          value={petForm.photo_url}
          onChange={(e) => setPetForm({ ...petForm, photo_url: e.target.value })}
        />

        <Textarea
          label="Medical Notes & Allergies"
          rows={2}
          placeholder="e.g., Sensitive stomach, allergic to chicken kibble, spayed in 2024"
          value={petForm.medical_notes}
          onChange={(e) => setPetForm({ ...petForm, medical_notes: e.target.value })}
        />

        <div className="pt-3 border-t border-cream-200 flex justify-end gap-2">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={submitting}
            icon={Plus}
          >
            Save Pet Profile
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPetModal;
