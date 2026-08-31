import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import { PawPrint, Lock, Mail, User, Building2, MapPin, Phone, ShieldCheck } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState('adopter'); // 'adopter' | 'shelter'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: 'Delhi',
    shelterName: '',
    shelterCity: 'Delhi',
    shelterAddress: '',
    shelterDescription: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await register({
        ...formData,
        role
      });
      if (data.user.role === 'shelter') {
        navigate('/shelter/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to create account. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-sm">
              <PawPrint className="w-5 h-5 fill-white/20" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-brand-900">
              Pet<span className="text-brand-accent">Verse</span>
            </span>
          </Link>
          <h2 className="font-display font-extrabold text-2xl text-charcoal-900">
            Create Your PetVerse Account
          </h2>
          <p className="text-xs text-charcoal-500">
            Join India's compassionate pet adoption and health management ecosystem.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="p-1.5 bg-cream-200 rounded-2xl grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setRole('adopter')}
            className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              role === 'adopter'
                ? 'bg-white text-brand-900 shadow-sm'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Adopter / Pet Parent</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('shelter')}
            className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              role === 'shelter'
                ? 'bg-white text-brand-900 shadow-sm'
                : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Rescue Shelter / NGO</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-premium space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={role === 'shelter' ? 'Contact Representative Name' : 'Full Name'}
              required
              icon={User}
              placeholder={role === 'shelter' ? 'e.g. Dr. Ananya Sen' : 'e.g. Rahul Sharma'}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Email Address"
                type="email"
                required
                icon={Mail}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />

              <Input
                label="Phone Number"
                type="tel"
                icon={Phone}
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                required
                icon={Lock}
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />

              <Select
                label="City / Location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                options={[
                  { value: 'Delhi', label: 'Delhi NCR' },
                  { value: 'Bangalore', label: 'Bangalore' },
                  { value: 'Mumbai', label: 'Mumbai' },
                  { value: 'Pune', label: 'Pune' },
                  { value: 'Chandigarh', label: 'Chandigarh' },
                  { value: 'Hyderabad', label: 'Hyderabad' },
                  { value: 'Jaipur', label: 'Jaipur' }
                ]}
              />
            </div>

            {/* Shelter Specific Fields */}
            {role === 'shelter' && (
              <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 space-y-3 pt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Shelter Organization Details</span>
                </div>

                <Input
                  label="Shelter / NGO Name"
                  required
                  placeholder="e.g. Delhi Paws Sanctuary"
                  value={formData.shelterName}
                  onChange={(e) => handleChange('shelterName', e.target.value)}
                />

                <Input
                  label="Street Address"
                  placeholder="e.g. Sector 10, Dwarka"
                  value={formData.shelterAddress}
                  onChange={(e) => handleChange('shelterAddress', e.target.value)}
                />

                <Textarea
                  label="About the Shelter"
                  rows={2}
                  placeholder="Tell us about the animals you care for, rescue operations, and facility details..."
                  value={formData.shelterDescription}
                  onChange={(e) => handleChange('shelterDescription', e.target.value)}
                />
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              variant="primary"
              loading={loading}
              className="w-full shadow-sm mt-2"
            >
              {role === 'shelter' ? 'Register Rescue Shelter' : 'Create Adopter Account'}
            </Button>
          </form>

          <div className="pt-4 border-t border-cream-200 text-center text-xs text-charcoal-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
