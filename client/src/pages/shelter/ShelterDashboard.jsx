import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getShelterDashboard, updateApplicationStatus } from '../../services/shelterService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/adoption/StatusBadge';
import { 
  PawPrint, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  ShieldCheck, 
  Building2,
  ArrowRight,
  Eye
} from 'lucide-react';

const ShelterDashboard = () => {
  const { user, shelter } = useAuth();
  const [stats, setStats] = useState({
    totalPets: 0,
    availablePets: 0,
    totalApplications: 0,
    pendingReviews: 0,
    completedAdoptions: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await getShelterDashboard();
      if (data.stats) setStats(data.stats);
      if (data.recentApplications) setRecentApplications(data.recentApplications);
    } catch (err) {
      console.error('Failed to load shelter dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      fetchDashboard();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-premium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-200">
              Shelter Partner Dashboard
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {shelter?.name || user?.name || 'Rescue Shelter'}
          </h1>
          <p className="text-xs sm:text-sm text-cream-200">
            Manage your shelter listings, review adoption questionnaires, and finalize forever home placements.
          </p>
        </div>

        <Link to="/shelter/pets/add">
          <Button size="md" variant="secondary" icon={PlusCircle} className="bg-white text-brand-900 hover:bg-cream-100 shrink-0">
            Add New Pet Listing
          </Button>
        </Link>
      </div>

      {/* 5 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-charcoal-400 uppercase">Total Pets</span>
          <p className="font-display font-extrabold text-2xl text-charcoal-900">{stats.totalPets}</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Available</span>
          <p className="font-display font-extrabold text-2xl text-emerald-800">{stats.availablePets}</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-charcoal-400 uppercase">Applications</span>
          <p className="font-display font-extrabold text-2xl text-charcoal-900">{stats.totalApplications}</p>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[10px] font-bold text-amber-700 uppercase">Pending Review</span>
          <p className="font-display font-extrabold text-2xl text-amber-800">{stats.pendingReviews}</p>
        </Card>

        <Card className="p-4 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold text-teal-700 uppercase">Adopted</span>
          <p className="font-display font-extrabold text-2xl text-teal-800">{stats.completedAdoptions}</p>
        </Card>
      </div>

      {/* Recent Applications Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-charcoal-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-500" />
            <span>Recent Adoption Applications</span>
          </h3>
          <Link to="/shelter/applications" className="text-xs font-bold text-brand-600 hover:underline">
            View All ({stats.totalApplications})
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-cream-300 text-xs text-charcoal-400">
            No adoption applications received yet.
          </div>
        ) : (
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <Card key={app.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={app.pet_image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200'}
                    alt={app.pet_name || 'Pet'}
                    className="w-14 h-14 rounded-2xl object-cover border border-cream-300"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-base text-charcoal-900">
                        Application for {app.pet_name}
                      </h4>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-charcoal-500">
                      Applicant: <strong>{app.applicant_name || 'Pet Parent'}</strong> • {app.applicant_location || 'Delhi'}
                    </p>
                  </div>
                </div>

                {/* Status Quick Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link to={`/shelter/applications/${app.id}`}>
                    <Button variant="outline" size="sm" icon={Eye}>
                      Review
                    </Button>
                  </Link>

                  {app.status === 'pending' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusChange(app.id, 'under_review')}
                    >
                      Mark Under Review
                    </Button>
                  )}

                  {app.status === 'under_review' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStatusChange(app.id, 'approved')}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelterDashboard;
