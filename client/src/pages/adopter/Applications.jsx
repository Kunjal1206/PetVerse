import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApplications } from '../../services/adoptionService';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/adoption/StatusBadge';
import ApplicationTimeline from '../../components/adoption/ApplicationTimeline';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { Calendar, Heart, ArrowRight, Building2, MapPin } from 'lucide-react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        console.error('Failed to load applications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-cream-300">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          My Adoption Applications
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Track real-time shelter reviews, meet-and-greet schedules, and final adoption status.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading applications...</div>
      ) : applications.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No applications submitted yet"
          description="Ready to welcome a companion? Browse adoptable pets and apply online."
          actionLabel="Browse Available Pets"
          onAction={() => window.location.href = '/adopt'}
        />
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <Card key={app.id} className="p-6 sm:p-8 space-y-6 overflow-hidden">
              
              {/* Top Row: Pet & Shelter Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-200">
                <div className="flex items-center gap-4">
                  <img
                    src={app.pet_image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200'}
                    alt={app.pet_name || 'Pet'}
                    className="w-16 h-16 rounded-2xl object-cover border border-cream-300 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-xl text-charcoal-900">
                        {app.pet_name || 'Adoptable Pet'}
                      </h3>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-charcoal-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-brand-500" />
                      <span>{app.shelter_name || 'Rescue Shelter'}</span>
                      <span>•</span>
                      <span>Applied on {new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </p>
                  </div>
                </div>

                <Link to={`/pet/${app.pet_id}`}>
                  <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                    View Pet Profile
                  </Button>
                </Link>
              </div>

              {/* Status Timeline */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                  Review Progression
                </h4>
                <ApplicationTimeline currentStatus={app.status} />
              </div>

              {/* Answers Snippet */}
              {app.answers && (
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2 text-xs">
                  <span className="font-bold text-charcoal-800 uppercase tracking-wider text-[10px]">
                    Your Submitted Reason:
                  </span>
                  <p className="text-charcoal-700 italic">
                    "{app.answers.reason || 'Committed to providing a loving home.'}"
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
