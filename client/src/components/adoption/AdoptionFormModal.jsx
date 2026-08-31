import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import { applyForAdoption } from '../../services/adoptionService';
import { Heart, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdoptionFormModal = ({
  pet,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    reason: '',
    home_type: 'house',
    has_yard: 'yes',
    hours_away: '2-4 hours',
    past_experience: '',
    other_pets_details: 'None',
    emergency_contact: user?.phone || '',
    agree_to_terms: true
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reason.trim()) {
      setError('Please share why you would like to adopt this pet.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await applyForAdoption(pet.id, formData);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Adoption application error:', err);
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={submitted ? 'Application Submitted!' : `Adopt ${pet?.name}`}
      subtitle={submitted ? 'The shelter will review your profile shortly.' : `Submit your questionnaire to ${pet?.shelter_name || 'the shelter'}`}
      maxWidth="max-w-xl"
    >
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-lg text-charcoal-900">
              Thank you, {user?.name}!
            </h4>
            <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Your adoption application for <strong>{pet?.name}</strong> has been received by <strong>{pet?.shelter_name || 'the shelter'}</strong>.
              You can track real-time status updates directly inside your Adopter Dashboard.
            </p>
          </div>
          <div className="pt-4 flex justify-center gap-3">
            <Button variant="primary" size="md" onClick={handleClose}>
              Done & View Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
              {error}
            </div>
          )}

          {/* Quick Pet Preview in Form */}
          <div className="flex items-center gap-3 p-3 bg-cream-100 rounded-2xl border border-cream-200">
            <img
              src={pet?.image_url}
              alt={pet?.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="text-xs">
              <p className="font-bold text-charcoal-900">{pet?.name} ({pet?.breed})</p>
              <p className="text-charcoal-600">{pet?.age} • {pet?.gender} • {pet?.shelter_city}</p>
            </div>
          </div>

          <Textarea
            label="Why are you looking to adopt this pet?"
            required
            rows={3}
            placeholder="Tell us about your daily lifestyle, household members, and what attracted you to this pet..."
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Type of Residence"
              value={formData.home_type}
              onChange={(e) => handleChange('home_type', e.target.value)}
              options={[
                { value: 'house', label: 'Independent House / Villa' },
                { value: 'apartment', label: 'Apartment / Flat' },
                { value: 'farmhouse', label: 'Farmhouse / Open Property' }
              ]}
            />

            <Select
              label="Do you have a fenced yard / balcony safety?"
              value={formData.has_yard}
              onChange={(e) => handleChange('has_yard', e.target.value)}
              options={[
                { value: 'yes', label: 'Yes, secure yard / balcony netting' },
                { value: 'no', label: 'No outdoor yard' },
                { value: 'shared', label: 'Shared community park nearby' }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Hours pet will spend alone daily"
              value={formData.hours_away}
              onChange={(e) => handleChange('hours_away', e.target.value)}
              options={[
                { value: '0-2 hours', label: '0 - 2 hours (someone always home)' },
                { value: '2-4 hours', label: '2 - 4 hours' },
                { value: '4-6 hours', label: '4 - 6 hours' },
                { value: '6+ hours', label: '6+ hours' }
              ]}
            />

            <Input
              label="Contact Phone Number"
              required
              value={formData.emergency_contact}
              onChange={(e) => handleChange('emergency_contact', e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          <Input
            label="Past Experience with Pets"
            placeholder="e.g., Grew up with Indie dogs, had a family cat for 5 years"
            value={formData.past_experience}
            onChange={(e) => handleChange('past_experience', e.target.value)}
          />

          <div className="pt-2 flex items-start gap-2 text-xs text-charcoal-600">
            <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <p>
              By submitting, you agree that PetVerse adoption inquiries are committed to lifetime animal welfare and anti-abandonment guidelines.
            </p>
          </div>

          <div className="pt-4 border-t border-cream-200 flex justify-end gap-3">
            <Button variant="ghost" size="md" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={submitting}
              icon={Heart}
            >
              Submit Adoption Application
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AdoptionFormModal;
