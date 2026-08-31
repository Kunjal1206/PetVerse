import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Textarea from '../common/Textarea';
import Rating from '../common/Rating';
import { submitReview } from '../../services/providerService';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ReviewFormModal = ({
  providerId,
  providerName,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please log in to submit a review.');
      return;
    }
    if (!comment.trim()) {
      setError('Please provide feedback in your review.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await submitReview(providerId, rating, comment);
      setComment('');
      setRating(5);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Review submit error:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Review ${providerName}`}
      subtitle="Share your pet's experience with this caregiver"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        <div className="text-center py-2 space-y-2">
          <label className="block text-xs font-semibold text-charcoal-700 uppercase">
            Your Rating
          </label>
          <Rating value={rating} onChange={setRating} size="lg" className="justify-center" />
        </div>

        <Textarea
          label="Your Feedback & Experience"
          required
          rows={4}
          placeholder="How did they care for your pet? Was communication prompt? Would you recommend them?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
            icon={Star}
          >
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewFormModal;
