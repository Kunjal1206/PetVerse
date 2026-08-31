import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { createBooking } from '../../services/providerService';
import { Calendar, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BookingModal = ({
  provider,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { isAuthenticated, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    pet_type: 'dog',
    service_type: provider?.type || 'boarding',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    pet_name: '',
    special_instructions: ''
  });

  const calculateDays = () => {
    const start = new Date(bookingForm.start_date);
    const end = new Date(bookingForm.end_date);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, isNaN(diff) ? 1 : diff);
  };

  const days = calculateDays();
  const totalPrice = days * (Number(provider?.price) || 500);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please log in to request a service booking.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await createBooking({
        provider_id: provider.id,
        pet_type: bookingForm.pet_type,
        service_type: provider.type || 'boarding',
        start_date: bookingForm.start_date,
        end_date: bookingForm.end_date,
        total_price: totalPrice
      });
      setConfirmed(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Failed to submit booking request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={confirmed ? 'Booking Confirmed!' : `Book with ${provider?.name}`}
      subtitle={confirmed ? 'Your reservation has been scheduled.' : `${provider?.type?.toUpperCase()} Care • ₹${provider?.price}/day`}
      maxWidth="max-w-lg"
    >
      {confirmed ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-lg text-charcoal-900">
              Booking Request Received!
            </h4>
            <p className="text-sm text-charcoal-600 max-w-sm mx-auto leading-relaxed">
              <strong>{provider?.name}</strong> has received your reservation request for <strong>{days} {days === 1 ? 'day' : 'days'}</strong> (Total: ₹{totalPrice}). You can view the confirmation inside your dashboard.
            </p>
          </div>
          <div className="pt-4 flex justify-center">
            <Button variant="primary" size="md" onClick={handleClose}>
              Done
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

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Pet Species"
              value={bookingForm.pet_type}
              onChange={(e) => setBookingForm({ ...bookingForm, pet_type: e.target.value })}
              options={[
                { value: 'dog', label: 'Dog' },
                { value: 'cat', label: 'Cat' },
                { value: 'other', label: 'Other Pet' }
              ]}
            />

            <Input
              label="Pet Name"
              placeholder="e.g. Bruno"
              value={bookingForm.pet_name}
              onChange={(e) => setBookingForm({ ...bookingForm, pet_name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Check-in Date"
              type="date"
              required
              value={bookingForm.start_date}
              onChange={(e) => setBookingForm({ ...bookingForm, start_date: e.target.value })}
            />
            <Input
              label="Check-out Date"
              type="date"
              required
              value={bookingForm.end_date}
              onChange={(e) => setBookingForm({ ...bookingForm, end_date: e.target.value })}
            />
          </div>

          <Input
            label="Special Instructions / Diet Notes"
            placeholder="e.g. Fed twice a day, friendly with other dogs, medication required"
            value={bookingForm.special_instructions}
            onChange={(e) => setBookingForm({ ...bookingForm, special_instructions: e.target.value })}
          />

          {/* Pricing Calculation Summary */}
          <div className="p-4 bg-cream-100 rounded-2xl border border-cream-200 space-y-2 text-xs">
            <div className="flex justify-between text-charcoal-600">
              <span>Rate (₹{provider?.price} × {days} {days === 1 ? 'day' : 'days'})</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-charcoal-600">
              <span>Safety & Pet Protection Insurance</span>
              <span className="text-emerald-700 font-semibold">Included FREE</span>
            </div>
            <div className="pt-2 border-t border-cream-300 flex justify-between text-sm font-bold text-charcoal-900">
              <span>Estimated Total</span>
              <span className="text-brand-900">₹{totalPrice}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-charcoal-500">
            <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
            <span>No upfront charges. Payment is processed directly at check-in.</span>
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
              icon={Calendar}
            >
              Confirm Booking Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default BookingModal;
