import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPetById, createPet, updatePet } from '../../services/petService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import { ArrowLeft, PawPrint, Sparkles, CheckCircle2 } from 'lucide-react';

const AddEditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [petForm, setPetForm] = useState({
    name: '',
    species: 'dog',
    breed: '',
    age: '1 year',
    gender: 'Male',
    size: 'Medium',
    temperament: 'Friendly, Active, Social',
    health_status: 'Healthy and dewormed',
    vaccination_status: 'Fully Vaccinated',
    about: '',
    personality: '',
    ideal_home: '',
    care_requirements: '',
    adoption_status: 'available',
    image_url: ''
  });

  useEffect(() => {
    if (isEditing) {
      const fetchPet = async () => {
        try {
          setLoading(true);
          const data = await getPetById(id);
          setPetForm({
            name: data.name || '',
            species: data.species || 'dog',
            breed: data.breed || '',
            age: data.age || '1 year',
            gender: data.gender || 'Male',
            size: data.size || 'Medium',
            temperament: data.temperament || '',
            health_status: data.health_status || '',
            vaccination_status: data.vaccination_status || 'Fully Vaccinated',
            about: data.about || '',
            personality: data.personality || '',
            ideal_home: data.ideal_home || '',
            care_requirements: data.care_requirements || '',
            adoption_status: data.adoption_status || 'available',
            image_url: data.image_url || ''
          });
        } catch (err) {
          console.error('Failed to load pet for edit:', err);
          setError('Failed to load pet details.');
        } finally {
          setLoading(false);
        }
      };
      fetchPet();
    }
  }, [id, isEditing]);

  const handleChange = (field, value) => {
    setPetForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petForm.name.trim() || !petForm.breed.trim()) {
      setError('Name and Breed are required.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        ...petForm,
        image_url: petForm.image_url || (petForm.species === 'cat'
          ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600'
          : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600')
      };

      if (isEditing) {
        await updatePet(id, payload);
      } else {
        await createPet(payload);
      }

      navigate('/shelter/pets');
    } catch (err) {
      console.error('Failed to save pet:', err);
      setError(err.response?.data?.message || 'Failed to save pet listing.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-charcoal-400">Loading pet details...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Back link */}
      <Link
        to="/shelter/pets"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shelter Pets</span>
      </Link>

      <div className="pb-4 border-b border-cream-300">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          {isEditing ? `Edit ${petForm.name}` : 'Add New Pet for Adoption'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Provide accurate health and behavioral info to help our AI match compatible families.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-premium space-y-6">
        {error && (
          <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Pet Name"
              required
              placeholder="e.g. Rocky"
              value={petForm.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />

            <Select
              label="Species"
              value={petForm.species}
              onChange={(e) => handleChange('species', e.target.value)}
              options={[
                { value: 'dog', label: 'Dog' },
                { value: 'cat', label: 'Cat' }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Breed"
              required
              placeholder="e.g. Indie, Labrador Mix, Persian"
              value={petForm.breed}
              onChange={(e) => handleChange('breed', e.target.value)}
            />

            <Input
              label="Age"
              required
              placeholder="e.g. 2 years, 6 months"
              value={petForm.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Gender"
              value={petForm.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]}
            />

            <Select
              label="Size"
              value={petForm.size}
              onChange={(e) => handleChange('size', e.target.value)}
              options={[
                { value: 'Small', label: 'Small (< 10kg)' },
                { value: 'Medium', label: 'Medium (10 - 25kg)' },
                { value: 'Large', label: 'Large (> 25kg)' }
              ]}
            />

            <Select
              label="Adoption Status"
              value={petForm.adoption_status}
              onChange={(e) => handleChange('adoption_status', e.target.value)}
              options={[
                { value: 'available', label: 'Available' },
                { value: 'pending', label: 'Pending' },
                { value: 'adopted', label: 'Adopted' }
              ]}
            />
          </div>

          <Input
            label="Temperament Tags (comma separated)"
            placeholder="e.g. Friendly, Active, Good with Kids, Calm"
            value={petForm.temperament}
            onChange={(e) => handleChange('temperament', e.target.value)}
          />

          <Input
            label="Photo Image URL"
            placeholder="https://images.unsplash.com/..."
            value={petForm.image_url}
            onChange={(e) => handleChange('image_url', e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Health Status"
              placeholder="e.g. Healthy, recovered from minor leg fracture"
              value={petForm.health_status}
              onChange={(e) => handleChange('health_status', e.target.value)}
            />

            <Input
              label="Vaccination & Sterilization Status"
              placeholder="e.g. Fully Vaccinated, Neutered"
              value={petForm.vaccination_status}
              onChange={(e) => handleChange('vaccination_status', e.target.value)}
            />
          </div>

          <Textarea
            label="About the Pet"
            rows={3}
            placeholder="Describe their rescue background, personality quirks, and general behavior..."
            value={petForm.about}
            onChange={(e) => handleChange('about', e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Textarea
              label="Ideal Home Requirements"
              rows={2}
              placeholder="e.g. Apartment with mesh windows, family with active yard"
              value={petForm.ideal_home}
              onChange={(e) => handleChange('ideal_home', e.target.value)}
            />

            <Textarea
              label="Daily Care Requirements"
              rows={2}
              placeholder="e.g. Needs 2 long walks daily, hypoallergenic diet"
              value={petForm.care_requirements}
              onChange={(e) => handleChange('care_requirements', e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-cream-200 flex justify-end gap-3">
            <Button variant="ghost" size="md" onClick={() => navigate('/shelter/pets')}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={submitting}
              icon={PawPrint}
            >
              {isEditing ? 'Save Pet Changes' : 'Publish Pet Listing'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditPet;
