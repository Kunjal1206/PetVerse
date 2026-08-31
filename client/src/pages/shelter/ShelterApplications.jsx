import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShelterApplications, updateApplicationStatus } from '../../services/shelterService';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/adoption/StatusBadge';
import Button from '../../components/common/Button';
import Tabs from '../../components/common/Tabs';
import EmptyState from '../../components/common/EmptyState';
import { Calendar, Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';

const ShelterApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const fetchApps = async () => {
    try {
      setLoading(true);
      const data = await getShelterApplications();
      setApplications(data);
    } catch (err) {
      console.error('Failed to load shelter applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      fetchApps();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredApps = applications.filter(app => {
    if (activeTab === 'all') return true;
    return app.status === activeTab;
  });

  const tabs = [
    { id: 'all', label: 'All Inquiries', count: applications.length },
    { id: 'pending', label: 'Pending', count: applications.filter(a => a.status === 'pending').length },
    { id: 'under_review', label: 'Under Review', count: applications.filter(a => a.status === 'under_review').length },
    { id: 'approved', label: 'Approved', count: applications.filter(a => a.status === 'approved').length },
    { id: 'completed', label: 'Adopted', count: applications.filter(a => a.status === 'completed').length },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-cream-300">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Adoption Applications
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Review questionnaires from prospective adopters, inspect lifestyle fit, and approve placements.
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading applications...</div>
      ) : filteredApps.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No applications in this view"
          description="There are currently no adoption inquiries matching this status filter."
        />
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <Card key={app.id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={app.pet_image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200'}
                    alt={app.pet_name || 'Pet'}
                    className="w-16 h-16 rounded-2xl object-cover border border-cream-300"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-lg text-charcoal-900">
                        Inquiry for {app.pet_name}
                      </h3>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-charcoal-500">
                      Applicant: <strong>{app.applicant_name}</strong> • Phone: {app.applicant_phone || 'Provided in form'}
                    </p>
                    <p className="text-[11px] text-charcoal-400">
                      Submitted: {new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  <Link to={`/shelter/applications/${app.id}`}>
                    <Button variant="outline" size="sm" icon={Eye}>
                      Full Questionnaire
                    </Button>
                  </Link>

                  {app.status === 'pending' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusChange(app.id, 'under_review')}
                    >
                      Start Review
                    </Button>
                  )}

                  {(app.status === 'pending' || app.status === 'under_review') && (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={CheckCircle2}
                        onClick={() => handleStatusChange(app.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusChange(app.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {app.status === 'approved' && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleStatusChange(app.id, 'completed')}
                    >
                      Mark Adopted
                    </Button>
                  )}
                </div>
              </div>

              {/* Answers preview */}
              {app.answers && (
                <div className="p-3.5 bg-cream-50 rounded-xl border border-cream-200 text-xs space-y-1">
                  <p className="text-charcoal-800 font-semibold">
                    Reason: <span className="font-normal text-charcoal-600 italic">"{app.answers.reason}"</span>
                  </p>
                  <p className="text-charcoal-500 text-[11px]">
                    Home: {app.answers.home_type} • Yard: {app.answers.has_yard} • Hours Away: {app.answers.hours_away}
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

export default ShelterApplications;
