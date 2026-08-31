import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import { addReminder } from '../../services/careService';
import { Calendar, Plus } from 'lucide-react';

const ReminderFormModal = ({
  isOpen,
  onClose,
  pets = [],
  onSuccess
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: '',
    type: 'vaccination',
    due_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    user_pet_id: pets.length > 0 ? pets[0].id : '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Reminder title is required.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await addReminder(form);
      setForm({
        title: '',
        type: 'vaccination',
        due_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        user_pet_id: pets.length > 0 ? pets[0].id : '',
        notes: ''
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to add reminder:', err);
      setError(err.response?.data?.message || 'Failed to add reminder.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Care Reminder"
      subtitle="Keep track of vaccinations, medications, and vet visits"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        <Input
          label="Reminder Title"
          required
          placeholder="e.g., Rabies Booster, Heartworm pill, Bath session"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Reminder Category"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            options={[
              { value: 'vaccination', label: 'Vaccination' },
              { value: 'medication', label: 'Medication' },
              { value: 'vet_appointment', label: 'Vet Visit' },
              { value: 'grooming', label: 'Grooming & Bath' },
              { value: 'deworming', label: 'Deworming' },
              { value: 'general', label: 'General Care' }
            ]}
          />

          <Input
            label="Due Date"
            type="date"
            required
            value={form.due_date}
            onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          />
        </div>

        {pets.length > 0 && (
          <Select
            label="Assign to Pet"
            value={form.user_pet_id}
            onChange={(e) => setForm({ ...form, user_pet_id: e.target.value })}
            options={[
              { value: '', label: 'General Household' },
              ...pets.map(p => ({ value: p.id, label: `${p.name} (${p.species})` }))
            ]}
          />
        )}

        <Textarea
          label="Notes / Dosage / Instructions"
          rows={2}
          placeholder="e.g. Give 1 tablet with dinner. Clinic address: Sector 10 Dwarka"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
            Add Reminder
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReminderFormModal;
