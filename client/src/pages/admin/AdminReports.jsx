import React, { useState, useEffect } from 'react';
import { getReports } from '../../services/lostFoundService';
import { deleteAdminReport } from '../../services/adminService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { AlertTriangle, Trash2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error('Failed to load admin reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lost/found report as admin?')) return;
    try {
      await deleteAdminReport(id);
      fetchReports();
    } catch (err) {
      console.error('Failed to delete report:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-cream-300">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
          Lost & Found Community Reports Moderation
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
          Moderate missing pet alerts, verify contact legitimacy, and purge duplicate entries.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading reports...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reports.map((r) => (
            <Card key={r.id} className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.image_url}
                      alt={r.pet_name || 'Pet'}
                      className="w-14 h-14 rounded-2xl object-cover border border-cream-300 shrink-0"
                    />
                    <div>
                      <h3 className="font-display font-bold text-base text-charcoal-900">
                        {r.pet_name || `Found ${r.species}`}
                      </h3>
                      <p className="text-xs text-charcoal-500">{r.species} • {r.breed} • {r.color}</p>
                    </div>
                  </div>

                  <Badge variant={r.type === 'lost' ? 'danger' : 'brand'} size="sm">
                    {r.type.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-charcoal-600">
                  <p className="flex items-center gap-1.5 font-semibold text-charcoal-800">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> {r.location}
                  </p>
                  <p className="text-charcoal-500">
                    Contact: <strong>{r.contact_info}</strong> • Date: {r.date}
                  </p>
                </div>

                <p className="text-xs text-charcoal-700 bg-cream-50 p-3 rounded-xl border border-cream-200 line-clamp-3">
                  {r.description}
                </p>
              </div>

              <div className="pt-2 border-t border-cream-200 flex justify-end">
                <button
                  onClick={() => handleDelete(r.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Report</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReports;
