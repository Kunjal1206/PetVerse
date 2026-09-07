import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { PawPrint, Lock, Mail, Sparkles, ShieldCheck, Building2, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, quickLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fillCredentials = (role) => {
    if (role === 'adopter') {
      setEmail('rahul.adopter@petverse.com');
      setPassword('password123');
    } else if (role === 'shelter') {
      setEmail('delhi.shelter@petverse.com');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmail('admin@petverse.com');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login(email, password);
      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.user.role === 'shelter') {
        navigate('/shelter/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || err.message;
      if (!err.response) {
        setError('Cannot reach backend on port 5000. Try the 1-Click Fast Evaluation Logins below which work with offline support!');
      } else {
        setError(msg || 'Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role) => {
    setError(null);
    setLoading(true);
    try {
      const data = await quickLogin(role);
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.user.role === 'shelter') {
        navigate('/shelter/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Quick login error:', err);
      setError('Demo login failed. Please try filling credentials manually.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
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
            Welcome back to PetVerse
          </h2>
          <p className="text-xs text-charcoal-500">
            Sign in to manage adoptions, care reminders, and shelter operations.
          </p>
        </div>

        {/* 1-Click Fast Demo Login Buttons */}
        <div className="p-4 rounded-3xl bg-brand-50/80 border border-brand-200 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-brand-900">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
              <span>1-Click Instant Evaluation Login:</span>
            </div>
            <span className="text-[10px] font-semibold text-brand-700 bg-brand-100 px-2 py-0.5 rounded">
              No Password Needed
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('adopter')}
              className="px-2.5 py-2.5 rounded-xl bg-white border border-brand-200 hover:border-brand-500 text-xs font-bold text-charcoal-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:shadow-md transition-all group"
            >
              <User className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
              <span>Adopter</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('shelter')}
              className="px-2.5 py-2.5 rounded-xl bg-white border border-brand-200 hover:border-brand-500 text-xs font-bold text-charcoal-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:shadow-md transition-all group"
            >
              <Building2 className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
              <span>Shelter</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2.5 py-2.5 rounded-xl bg-white border border-brand-200 hover:border-brand-500 text-xs font-bold text-charcoal-800 flex flex-col items-center justify-center gap-1 shadow-xs hover:shadow-md transition-all group"
            >
              <ShieldCheck className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-8 shadow-premium space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium leading-relaxed">
              {error}
            </div>
          )}

          {/* Fill Shortcut Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
              Or auto-fill test credentials:
            </span>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => fillCredentials('adopter')}
                className="px-2.5 py-1 rounded-lg bg-cream-100 hover:bg-brand-50 text-charcoal-700 font-semibold border border-cream-300 transition-colors"
              >
                Rahul (Adopter)
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('shelter')}
                className="px-2.5 py-1 rounded-lg bg-cream-100 hover:bg-teal-50 text-charcoal-700 font-semibold border border-cream-300 transition-colors"
              >
                Delhi Paws (Shelter)
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('admin')}
                className="px-2.5 py-1 rounded-lg bg-cream-100 hover:bg-rose-50 text-charcoal-700 font-semibold border border-cream-300 transition-colors"
              >
                Administrator
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              icon={Mail}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              size="lg"
              variant="primary"
              loading={loading}
              className="w-full shadow-sm font-bold"
            >
              Sign In to PetVerse
            </Button>
          </form>

          <div className="pt-4 border-t border-cream-200 text-center text-xs text-charcoal-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-brand-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
