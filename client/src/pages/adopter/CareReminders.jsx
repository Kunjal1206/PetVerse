import React, { useState, useEffect } from 'react';
import { getReminders, updateReminder, deleteReminder, getUserPets } from '../../services/careService';
import ReminderCard from '../../components/care/ReminderCard';
import ReminderFormModal from '../../components/care/ReminderFormModal';
import Tabs from '../../components/common/Tabs';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { Clock, Plus, Calendar, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

const CareReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchRemindersData = async () => {
    try {
      setLoading(true);
      const [remData, petsData] = await Promise.all([
        getReminders(),
        getUserPets().catch(() => [])
      ]);
      setReminders(remData);
      setPets(petsData);
    } catch (err) {
      console.error('Failed to load reminders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRemindersData();
  }, []);

  const handleToggleComplete = async (reminder) => {
    try {
      await updateReminder(reminder.id, { completed: !reminder.completed });
      fetchRemindersData();
    } catch (err) {
      console.error('Failed to toggle reminder:', err);
    }
  };

  const handleDeleteReminder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) return;
    try {
      await deleteReminder(id);
      fetchRemindersData();
    } catch (err) {
      console.error('Failed to delete reminder:', err);
    }
  };

  // Filter reminders by tab
  const todayDateStr = new Date().toISOString().split('T')[0];

  const filteredReminders = reminders.filter((r) => {
    if (activeTab === 'completed') return r.completed;
    if (activeTab === 'today') {
      return !r.completed && r.due_date.startsWith(todayDateStr);
    }
    if (activeTab === 'upcoming') {
      return !r.completed;
    }
    return true; // 'all'
  });

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: Clock, count: reminders.filter(r => !r.completed).length },
    { id: 'today', label: 'Today', icon: Calendar, count: reminders.filter(r => !r.completed && r.due_date.startsWith(todayDateStr)).length },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: reminders.filter(r => r.completed).length },
    { id: 'all', label: 'All Tasks', icon: Sparkles, count: reminders.length },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-300">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Health & Care Reminders
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
            Automated schedules for vaccinations, deworming, medications, and grooming appointments.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
          className="shrink-0"
        >
          Add Reminder
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Reminders List */}
      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading reminders...</div>
      ) : filteredReminders.length === 0 ? (
        <EmptyState
          icon={Clock}
          title={activeTab === 'completed' ? 'No completed tasks yet' : 'No reminders in this view'}
          description="Create a new reminder to stay organized with your pet's preventative health."
          actionLabel="Create Care Reminder"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="space-y-3">
          {filteredReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteReminder}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <ReminderFormModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          pets={pets}
          onSuccess={fetchRemindersData}
        />
      )}
    </div>
  );
};

export default CareReminders;
