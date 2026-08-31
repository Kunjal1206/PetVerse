import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserPets, getReminders, updateReminder } from '../../services/careService';
import { getApplications } from '../../services/adoptionService';
import { getFavorites, getPets } from '../../services/petService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/adoption/StatusBadge';
import ReminderCard from '../../components/care/ReminderCard';
import PetCard from '../../components/pet/PetCard';
import { 
  PawPrint, 
  Heart, 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Sparkles, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recommendedPets, setRecommendedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [petsData, remindersData, appsData, favsData, allPets] = await Promise.all([
        getUserPets().catch(() => []),
        getReminders().catch(() => []),
        getApplications().catch(() => []),
        getFavorites().catch(() => []),
        getPets({ limit: 3 }).catch(() => [])
      ]);
      setPets(petsData);
      setReminders(remindersData);
      setApplications(appsData);
      setFavorites(favsData);
      setRecommendedPets(allPets.slice(0, 3));
    } catch (err) {
      console.error('Error fetching adopter dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleReminder = async (reminder) => {
    try {
      await updateReminder(reminder.id, { completed: !reminder.completed });
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to toggle reminder:', err);
    }
  };

  const upcomingReminders = reminders.filter(r => !r.completed).slice(0, 3);

  return (
    <div className="space-y-8">
      
      {/* Welcome Greeting Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-premium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-200">
            Adopter & Pet Parent Portal
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Welcome back, {user?.name?.split(' ')[0]}! 🐾
          </h1>
          <p className="text-xs sm:text-sm text-cream-200">
            Here's a live summary of your pets, upcoming medical reminders, and adoption requests.
          </p>
        </div>

        <Link to="/adopt">
          <Button size="sm" variant="secondary" className="bg-white text-brand-900 hover:bg-cream-100 shrink-0">
            Find New Companion
          </Button>
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link to="/dashboard/my-pets">
          <Card hover className="p-4 sm:p-5 space-y-1">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2">
              <PawPrint className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase">My Pets</span>
            <p className="font-display font-extrabold text-2xl text-charcoal-900">{pets.length}</p>
          </Card>
        </Link>

        <Link to="/dashboard/applications">
          <Card hover className="p-4 sm:p-5 space-y-1">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-accent flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase">Applications</span>
            <p className="font-display font-extrabold text-2xl text-charcoal-900">{applications.length}</p>
          </Card>
        </Link>

        <Link to="/dashboard/care">
          <Card hover className="p-4 sm:p-5 space-y-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase">Reminders</span>
            <p className="font-display font-extrabold text-2xl text-charcoal-900">{upcomingReminders.length}</p>
          </Card>
        </Link>

        <Link to="/dashboard/favorites">
          <Card hover className="p-4 sm:p-5 space-y-1">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-charcoal-500 uppercase">Saved Pets</span>
            <p className="font-display font-extrabold text-2xl text-charcoal-900">{favorites.length}</p>
          </Card>
        </Link>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-5 bg-white rounded-3xl border border-cream-300 shadow-premium space-y-3">
        <h3 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-2.5">
          <Link to="/adopt">
            <Button size="sm" variant="secondary" icon={Search}>
              Browse Pets
            </Button>
          </Link>
          <Link to="/ai-match">
            <Button size="sm" variant="secondary" icon={Sparkles}>
              AI Pet Match
            </Button>
          </Link>
          <Link to="/dashboard/my-pets">
            <Button size="sm" variant="secondary" icon={Plus}>
              Add Pet
            </Button>
          </Link>
          <Link to="/dashboard/care">
            <Button size="sm" variant="secondary" icon={Clock}>
              Set Reminder
            </Button>
          </Link>
          <Link to="/lost-found">
            <Button size="sm" variant="secondary" icon={AlertTriangle}>
              Lost & Found
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid: Upcoming Reminders & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upcoming Reminders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-charcoal-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Upcoming Care Tasks</span>
            </h3>
            <Link to="/dashboard/care" className="text-xs font-bold text-brand-600 hover:underline">
              View All ({reminders.length})
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingReminders.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-cream-300 text-xs text-charcoal-400">
                No pending care tasks. You're all caught up!
              </div>
            ) : (
              upcomingReminders.map((r) => (
                <ReminderCard
                  key={r.id}
                  reminder={r}
                  onToggleComplete={handleToggleReminder}
                />
              ))
            )}
          </div>
        </div>

        {/* Recent Adoption Applications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-charcoal-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-500" />
              <span>Recent Applications</span>
            </h3>
            <Link to="/dashboard/applications" className="text-xs font-bold text-brand-600 hover:underline">
              View All ({applications.length})
            </Link>
          </div>

          <div className="space-y-3">
            {applications.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-cream-300 text-xs text-charcoal-400">
                You haven't submitted any adoption applications yet.
              </div>
            ) : (
              applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-white border border-cream-300 shadow-premium flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-charcoal-900">
                      {app.pet_name || 'Adoptable Pet'}
                    </p>
                    <p className="text-xs text-charcoal-500">
                      Applied on {new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recommended Pets */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-charcoal-900">
              Recommended For Your Home
            </h3>
            <p className="text-xs text-charcoal-500">
              Pets matching active lifestyles in your region
            </p>
          </div>
          <Link to="/adopt" className="text-xs font-bold text-brand-600 flex items-center gap-1 hover:underline">
            Browse Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendedPets.map((p) => (
            <PetCard key={p.id} pet={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
