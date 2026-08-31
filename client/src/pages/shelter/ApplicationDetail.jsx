import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getApplicationById, updateApplicationStatus } from '../../services/adoptionService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/adoption/StatusBadge';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Home, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Clock,
  Heart
} from 'lucide-react';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchApp = async () => {
    try {
      setLoading(true);
      const data = await getApplicationById(id);
      setApp(data);
    } catch (err) {
      console.error('Failed to load application details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApp();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      await updateApplicationStatus(id, newStatus);
      fetchApp();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-charcoal-400">Loading application...</div>;
  }

  if (!app) {
    return (
      <div className="py-20 text-center space-y-4">
        <h3 className="text-xl font-bold text-charcoal-900">Application Not Found</h3>
        <Link to="/shelter/applications">
          <Button variant="primary" size="md">Back to Applications</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Back link */}
      <Link
        to="/shelter/applications"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Applications</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-300">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
              Adoption Review: {app.pet_name}
            </h1>
            <StatusBadge status={app.status} />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
            Submitted on {new Date(app.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Action status buttons */}
        <div className="flex flex-wrap gap-2">
          {app.status === 'pending' && (
            <Button
              variant="secondary"
              size="sm"
              loading={updating}
              onClick={() => handleStatusChange('under_review')}
            >
              Mark Under Review
            </Button>
          )}
          {app.status !== 'approved' && app.status !== 'completed' && (
            <Button
              variant="primary"
              size="sm"
              loading={updating}
              icon={CheckCircle2}
              onClick={() => handleStatusChange('approved')}
            >
              Approve Application
            </Button>
          )}
          {app.status === 'approved' && (
            <Button
              variant="primary"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700"
              loading={updating}
              onClick={() => handleStatusChange('completed')}
            >
              Mark Adoption Finalized
            </Button>
          )}
          {app.status !== 'rejected' && (
            <Button
              variant="danger"
              size="sm"
              loading={updating}
              onClick={() => handleStatusChange('rejected')}
            >
              Reject
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Questionnaire Responses */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-charcoal-900 border-b border-cream-200 pb-2">
              Adoption Questionnaire Answers
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="font-bold text-charcoal-500 uppercase text-[11px]">
                  Reason for Adoption
                </span>
                <p className="text-charcoal-800 bg-cream-50 p-3.5 rounded-xl border border-cream-200 leading-relaxed">
                  {app.answers?.reason || 'No statement provided.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <span className="font-bold text-charcoal-500 uppercase text-[11px]">
                    Residence Type
                  </span>
                  <p className="font-semibold text-charcoal-900">{app.answers?.home_type || 'Apartment'}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-charcoal-500 uppercase text-[11px]">
                    Fenced Yard / Mesh Safety
                  </span>
                  <p className="font-semibold text-charcoal-900">{app.answers?.has_yard || 'Yes'}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-charcoal-500 uppercase text-[11px]">
                    Hours Alone Daily
                  </span>
                  <p className="font-semibold text-charcoal-900">{app.answers?.hours_away || '2-4 hours'}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-charcoal-500 uppercase text-[11px]">
                    Past Pet Experience
                  </span>
                  <p className="font-semibold text-charcoal-900">{app.answers?.past_experience || 'None noted'}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Applicant Info & Pet Card */}
        <div className="space-y-6">
          {/* Applicant Info */}
          <Card className="p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-charcoal-900 border-b border-cream-200 pb-2">
              Applicant Profile
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-charcoal-800">
                <User className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-bold">{app.applicant_name}</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-800">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{app.applicant_email}</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-800">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{app.applicant_phone || app.answers?.emergency_contact || 'N/A'}</span>
              </div>
            </div>
          </Card>

          {/* Pet Summary */}
          <Card className="p-6 space-y-3">
            <h3 className="font-display font-bold text-base text-charcoal-900 border-b border-cream-200 pb-2">
              Pet Inquired
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={app.pet_image_url}
                alt={app.pet_name}
                className="w-14 h-14 rounded-2xl object-cover border border-cream-300"
              />
              <div>
                <p className="font-bold text-charcoal-900">{app.pet_name}</p>
                <p className="text-xs text-charcoal-500">Species: {app.pet_species || 'dog'}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
