import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import { Home, Stethoscope, Building2, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

const FacilityRegisterModal = ({ isOpen, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'boarding',
    city: 'Delhi',
    rate: '700',
    phone: '',
    address: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess(form);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      name: '',
      category: 'boarding',
      city: 'Delhi',
      rate: '700',
      phone: '',
      address: '',
      description: ''
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={submitted ? "Registration Confirmed" : "Host Homestay or Register Clinic"}
      subtitle={submitted ? "Welcome to PetVerse Care Network" : "List your facility on our verified national caregiver database"}
      maxWidth="max-w-lg"
    >
      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-xl text-charcoal-900">
              Facility Registered Successfully!
            </h3>
            <p className="text-xs text-charcoal-600 max-w-sm mx-auto leading-relaxed">
              <strong>{form.name}</strong> is now registered under <strong>{form.category === 'boarding' ? 'Cage-Free Homestay' : 'Veterinary & Care'}</strong> in {form.city}. Pet parents in your area will now be able to view and book your service.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream-100 border border-cream-300 text-xs text-charcoal-700 font-medium flex items-center gap-2 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>PetVerse Verified Partner status active. Support team will connect at {form.phone} for introductory onboarding.</span>
          </div>

          <div className="pt-3">
            <Button variant="primary" size="md" onClick={handleReset} className="w-full font-bold">
              Done & Explore Platform
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Offer cage-free boarding, veterinary consultations, or professional grooming with 0% platform commission.</span>
          </div>

          <Input
            label="Facility / Host Name"
            required
            placeholder="e.g., Happy Tails Cage-Free Homestay, City Vet Clinic"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Service Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              options={[
                { value: 'boarding', label: 'Cage-Free Homestay Boarding' },
                { value: 'veterinary', label: '24/7 Veterinary Hospital / Clinic' },
                { value: 'grooming', label: 'Pet Spa & Grooming Salon' },
                { value: 'walking', label: 'GPS Dog Walking Service' }
              ]}
            />

            <Select
              label="City Location"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              options={[
                { value: 'Delhi', label: 'Delhi NCR' },
                { value: 'Bangalore', label: 'Bangalore' },
                { value: 'Mumbai', label: 'Mumbai' },
                { value: 'Pune', label: 'Pune' },
                { value: 'Hyderabad', label: 'Hyderabad' },
                { value: 'Chandigarh', label: 'Chandigarh' },
                { value: 'Jaipur', label: 'Jaipur' }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Daily Rate / Consultation Fee (₹)"
              type="number"
              required
              placeholder="e.g. 700"
              value={form.rate}
              onChange={(e) => setForm({ ...form, rate: e.target.value })}
            />

            <Input
              label="Contact Phone / WhatsApp"
              required
              placeholder="e.g. +91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <Input
            label="Address / Landmark"
            placeholder="e.g. Sector 14 Dwarka, Near Metro Station"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <Textarea
            label="Facility Description & Pet Safety Features"
            rows={2}
            placeholder="e.g., Fenced garden, AC indoor rooms, 24/7 supervisor on site, home-cooked pet meals provided."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="pt-3 border-t border-cream-200 flex justify-end gap-2">
            <Button variant="ghost" size="md" onClick={handleReset}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={submitting}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              Submit Facility Listing
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default FacilityRegisterModal;
