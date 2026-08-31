import React, { useState, useEffect } from 'react';
import { getAdminShelters } from '../../services/adminService';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Building2, ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';

const AdminShelters = () => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShelters = async () => {
    try {
      setLoading(true);
      const data = await getAdminShelters();
      setShelters(data);
    } catch (err) {
      console.error('Failed to load admin shelters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const toggleVerification = (shelterId) => {
    setShelters(prev =>
      prev.map(s => (s.id === shelterId ? { ...s, verified: !s.verified } : s))
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-cream-300">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Partner Shelters & Rescue Organizations
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Verify rescue organizations, view facility locations, and moderate shelter privileges.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading shelters...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {shelters.map((s) => (
            <Card key={s.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-brand-accent flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-charcoal-900">
                      {s.name}
                    </h3>
                    <p className="text-xs text-charcoal-500">{s.city}, India</p>
                  </div>
                </div>

                <Badge variant={s.verified ? 'success' : 'warning'} size="sm" dot>
                  {s.verified ? 'Verified' : 'Pending Check'}
                </Badge>
              </div>

              <p className="text-xs text-charcoal-600 leading-relaxed bg-cream-50 p-3 rounded-xl border border-cream-200">
                {s.description || 'Dedicated animal welfare rescue organization.'}
              </p>

              <div className="pt-2 border-t border-cream-200 space-y-1.5 text-xs text-charcoal-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                  <span>{s.address || s.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                  <span>{s.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                  <span>{s.phone}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  variant={s.verified ? 'outline' : 'primary'}
                  size="sm"
                  icon={ShieldCheck}
                  onClick={() => toggleVerification(s.id)}
                >
                  {s.verified ? 'Revoke Verification' : 'Verify Shelter'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminShelters;
