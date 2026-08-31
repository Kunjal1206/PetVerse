import React, { useState, useEffect } from 'react';
import { getReports, createReport } from '../../services/lostFoundService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import EmptyState from '../../components/common/EmptyState';
import { 
  AlertTriangle, 
  Search, 
  MapPin, 
  Calendar, 
  Phone, 
  PlusCircle, 
  CheckCircle2, 
  Eye, 
  Filter,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LostFound = () => {
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [typeFilter, setTypeFilter] = useState(''); // '' | 'lost' | 'found'
  const [cityFilter, setCityFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Report Modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('lost'); // 'lost' | 'found'
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const [formData, setFormData] = useState({
    species: 'dog',
    pet_name: '',
    breed: '',
    color: '',
    location: 'Delhi',
    date: new Date().toISOString().split('T')[0],
    description: '',
    contact_info: '',
    image_url: ''
  });

  const [contactModalReport, setContactModalReport] = useState(null);

  const fetchLostFoundReports = async () => {
    try {
      setLoading(true);
      const data = await getReports({
        type: typeFilter,
        city: cityFilter,
        species: speciesFilter,
        search: searchQuery
      });
      setReports(data);
    } catch (err) {
      console.error('Failed to load lost/found reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostFoundReports();
  }, [typeFilter, cityFilter, speciesFilter]);

  const handleOpenReportModal = (type) => {
    setReportType(type);
    setFormData({
      species: 'dog',
      pet_name: type === 'found' ? 'Unknown Pet' : '',
      breed: '',
      color: '',
      location: 'Delhi',
      date: new Date().toISOString().split('T')[0],
      description: '',
      contact_info: '',
      image_url: ''
    });
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.contact_info.trim()) {
      setFormError('Description and contact details are required.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);
      await createReport({
        ...formData,
        type: reportType,
        image_url: formData.image_url || (formData.species === 'cat'
          ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400'
          : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400')
      });
      setIsReportModalOpen(false);
      fetchLostFoundReports();
    } catch (err) {
      console.error('Failed to create report:', err);
      setFormError('Failed to publish report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header & Quick Action CTAs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-cream-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Community Animal Safety Net</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal-900">
            Lost & Found Pets Hub
          </h1>
          <p className="text-sm text-charcoal-600 max-w-xl">
            Reuniting lost furry family members. Post a missing alert or report a stray you found with photos and location details.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button
            variant="danger"
            size="md"
            icon={AlertTriangle}
            onClick={() => handleOpenReportModal('lost')}
            className="flex-1 md:flex-initial"
          >
            Report Lost Pet
          </Button>
          <Button
            variant="accent"
            size="md"
            icon={PlusCircle}
            onClick={() => handleOpenReportModal('found')}
            className="flex-1 md:flex-initial"
          >
            Report Found Pet
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-5 bg-white rounded-3xl border border-cream-300 shadow-premium flex flex-wrap items-center justify-between gap-4">
        
        {/* Type pills */}
        <div className="flex items-center gap-2">
          {[
            { id: '', label: 'All Reports' },
            { id: 'lost', label: '🚨 Lost Pets' },
            { id: 'found', label: '🐾 Found Pets' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                typeFilter === t.id
                  ? 'bg-brand-500 text-white shadow-xs'
                  : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            className="bg-cream-50 border border-cream-300 rounded-xl px-3 py-1.5 text-xs font-medium text-charcoal-800 focus:outline-none cursor-pointer"
          >
            <option value="">All Species</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-cream-50 border border-cream-300 rounded-xl px-3 py-1.5 text-xs font-medium text-charcoal-800 focus:outline-none cursor-pointer"
          >
            <option value="">All Cities</option>
            <option value="Delhi">Delhi NCR</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Jaipur">Jaipur</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading reports...</div>
      ) : reports.length === 0 ? (
        <EmptyState
          title="No active lost & found reports"
          description="There are currently no missing or found pet reports matching this criteria in the selected area."
          actionLabel="View All Reports"
          onAction={() => {
            setTypeFilter('');
            setCityFilter('');
            setSpeciesFilter('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-3xl bg-white border border-cream-300 overflow-hidden shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative h-56 w-full overflow-hidden bg-cream-200">
                  <img
                    src={report.image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'}
                    alt={report.pet_name || 'Pet'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                        report.type === 'lost'
                          ? 'bg-rose-600 text-white'
                          : 'bg-teal-700 text-white'
                      }`}
                    >
                      {report.type === 'lost' ? 'Lost Pet' : 'Found Pet'}
                    </span>
                  </div>

                  {report.status === 'resolved' && (
                    <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-xs flex items-center justify-center">
                      <span className="px-4 py-1.5 bg-emerald-500 text-white font-bold text-xs uppercase rounded-full shadow-md">
                        Reunited / Resolved
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-charcoal-900">
                      {report.pet_name || `Found ${report.species}`}
                    </h3>
                    <span className="text-xs font-medium text-charcoal-500 capitalize">
                      {report.species}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-charcoal-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="font-semibold text-charcoal-800">{report.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                      <span>Reported Date: {report.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-charcoal-700 leading-relaxed line-clamp-3 bg-cream-50 p-3 rounded-xl border border-cream-200">
                    {report.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Phone}
                  className="w-full"
                  onClick={() => setContactModalReport(report)}
                >
                  Contact Finder / Owner
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Creation Modal */}
      {isReportModalOpen && (
        <Modal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          title={reportType === 'lost' ? 'Report a Missing Pet' : 'Report a Found Pet'}
          subtitle="Publish details to help alert local shelters and nearby community members"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleReportSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Species"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                options={[
                  { value: 'dog', label: 'Dog' },
                  { value: 'cat', label: 'Cat' }
                ]}
              />

              <Input
                label="Pet Name (if known)"
                placeholder="e.g. Simba"
                value={formData.pet_name}
                onChange={(e) => setFormData({ ...formData, pet_name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Breed / Mix"
                placeholder="e.g. Beagle, Indie"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              />

              <Input
                label="Color & Markings"
                placeholder="e.g. Tri-color with white paws"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Location / Area"
                required
                placeholder="e.g. Sector 17, Chandigarh"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />

              <Input
                label="Date Lost / Found"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <Input
              label="Contact Phone / Email"
              required
              placeholder="e.g. Rahul Sharma: +91 98765 43210"
              value={formData.contact_info}
              onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
            />

            <Input
              label="Photo URL (Optional)"
              placeholder="https://..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />

            <Textarea
              label="Description / Collar / Behavior"
              required
              rows={3}
              placeholder="Describe where they were last seen, collar color, friendly or scared demeanor..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="pt-3 border-t border-cream-200 flex justify-end gap-2">
              <Button variant="ghost" size="md" onClick={() => setIsReportModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant={reportType === 'lost' ? 'danger' : 'primary'}
                size="md"
                loading={submitting}
              >
                Publish Report
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Contact Modal */}
      {contactModalReport && (
        <Modal
          isOpen={!!contactModalReport}
          onClose={() => setContactModalReport(null)}
          title="Report Contact Information"
          subtitle={contactModalReport.pet_name || 'Pet Report'}
          maxWidth="max-w-md"
        >
          <div className="space-y-4 py-2">
            <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 space-y-2">
              <p className="text-xs font-bold text-charcoal-700 uppercase">Contact details:</p>
              <p className="text-sm font-bold text-charcoal-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-accent" />
                <span>{contactModalReport.contact_info}</span>
              </p>
              <p className="text-xs text-charcoal-600">Location: {contactModalReport.location}</p>
            </div>

            <p className="text-xs text-charcoal-500 leading-relaxed">
              When contacting, please verify matching identifying traits (collar, medical chips, distinctive coat markings) to ensure the safety of the pet.
            </p>

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="md" onClick={() => setContactModalReport(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LostFound;
