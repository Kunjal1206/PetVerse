import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMode } from '../../context/ModeContext';
import NotificationDropdown from './NotificationDropdown';
import Button from '../common/Button';
import { 
  Heart, 
  Sparkles, 
  Compass, 
  Search, 
  MapPin, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ShieldCheck, 
  Home as HomeIcon,
  PawPrint,
  Calendar,
  LayoutDashboard,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAuthenticated, isAdopter, isShelter, isAdmin, logout } = useAuth();
  const { 
    mode, 
    setMode,
    resetMode, 
    switchToAdopt, 
    switchToHavePet, 
    switchToShelter, 
    isAdopt, 
    isHavePet, 
    isShelter: isShelterMode, 
    isUnselected 
  } = useMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleModeChange = (targetMode) => {
    if (targetMode === 'adopt') {
      switchToAdopt();
    } else if (targetMode === 'have_pet') {
      switchToHavePet();
    } else if (targetMode === 'shelter') {
      switchToShelter();
    }
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetToGateway = () => {
    resetMode();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Curated, uncluttered links based on current user persona
  const adoptLinks = [
    { name: 'Browse Pets', path: '/adopt', icon: Heart },
    { name: 'AI Pet Match', path: '/ai-match', icon: Compass, badge: 'AI' },
    { name: 'Lost & Found', path: '/lost-found', icon: Search },
    { name: 'How It Works', path: '/faq', icon: ShieldCheck },
  ];

  const havePetLinks = [
    { name: 'Pet Boarding', path: '/services/boarding', icon: HomeIcon },
    { name: 'Care Services', path: '/services', icon: Sparkles },
    { name: 'Nearby Vets & Parks', path: '/nearby', icon: MapPin },
    { name: 'Health Reminders', path: isAuthenticated ? '/dashboard/care' : '/login', icon: Clock },
    { name: 'Lost & Found', path: '/lost-found', icon: Search },
  ];

  const shelterLinks = [
    { name: 'Shelter Hub', path: isAuthenticated ? '/dashboard/shelter' : '/login', icon: LayoutDashboard },
    { name: 'Applications', path: isAuthenticated ? '/dashboard/shelter' : '/login', icon: Heart },
    { name: 'Care Services', path: '/services', icon: Sparkles },
    { name: 'Lost & Found', path: '/lost-found', icon: Search },
  ];

  const activeLinks = isAdopt ? adoptLinks : isHavePet ? havePetLinks : isShelterMode ? shelterLinks : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. Logo */}
          <Link to="/" onClick={handleResetToGateway} className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-600 transition-colors">
              <PawPrint className="w-5 h-5 fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl tracking-tight text-brand-900 leading-none">
                Pet<span className="text-brand-accent">Verse</span>
              </span>
              <span className="text-[10px] font-semibold text-charcoal-400 tracking-wider uppercase">
                {isAdopt ? 'Adoption Portal' : isHavePet ? 'Pet Care Portal' : isShelterMode ? 'Shelter & Care Hub' : 'Select Option'}
              </span>
            </div>
          </Link>

          {/* 2. Prominent Mode Switcher Pill (Evaluator & User toggle between options) */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className="flex items-center p-1 rounded-2xl bg-cream-200 border border-cream-300 shadow-inner">
              <button
                type="button"
                onClick={() => handleModeChange('adopt')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isAdopt
                    ? 'bg-amber-400 text-charcoal-900 shadow-sm'
                    : 'text-charcoal-600 hover:text-brand-900 hover:bg-cream-100'
                }`}
                title="Option 1: I Want to Adopt"
              >
                <Heart className={`w-3.5 h-3.5 ${isAdopt ? 'text-charcoal-900 fill-charcoal-900/20' : 'text-rose-500'}`} />
                <span>Want to Adopt</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('have_pet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isHavePet
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-brand-900 hover:bg-cream-100'
                }`}
                title="Option 2: I Already Have a Pet"
              >
                <PawPrint className={`w-3.5 h-3.5 ${isHavePet ? 'text-white' : 'text-teal-600'}`} />
                <span>Have a Pet</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('shelter')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isShelterMode
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-brand-900 hover:bg-cream-100'
                }`}
                title="Option 3: Shelter / Provider"
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isShelterMode ? 'text-white' : 'text-purple-600'}`} />
                <span>Shelter/Provider</span>
              </button>
            </div>

            {mode && (
              <button
                type="button"
                onClick={handleResetToGateway}
                className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-charcoal-600 hover:text-brand-900 bg-white border border-cream-300 hover:bg-cream-100 transition-all shadow-xs flex items-center gap-1"
                title="Go back to the opening options screen"
              >
                <span>Switch Option ⮌</span>
              </button>
            )}
          </div>

          {/* 3. Contextual Nav Links (De-cluttered) */}
          <nav className="hidden lg:flex items-center gap-1">
            {activeLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? isAdopt
                          ? 'bg-brand-50 text-brand-700'
                          : 'bg-teal-50 text-teal-800'
                        : 'text-charcoal-700 hover:text-brand-800 hover:bg-cream-100'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[8px] font-extrabold uppercase tracking-wider bg-brand-accent text-white rounded-md">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* 4. Right Actions / User Menu */}
          <div className="hidden md:flex items-center gap-2.5">
            {isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <NotificationDropdown />

                {isAdopter && (
                  <Link
                    to="/dashboard/my-pets"
                    className="flex items-center gap-1.5 text-xs font-bold text-charcoal-700 hover:text-brand-600 px-3 py-2 rounded-xl hover:bg-cream-100 transition-colors"
                  >
                    <PawPrint className="w-3.5 h-3.5 text-brand-500" />
                    <span>My Pets</span>
                  </Link>
                )}

                <Link
                  to={
                    isAdmin
                      ? '/admin/dashboard'
                      : isShelter
                      ? '/shelter/dashboard'
                      : '/dashboard'
                  }
                >
                  <Button size="sm" variant="secondary" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-cream-200 transition-colors border border-cream-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center uppercase">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-cream-300 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-cream-200">
                          <p className="text-sm font-semibold text-charcoal-900 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-charcoal-500 truncate">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-cream-200 text-charcoal-700">
                            {user?.role}
                          </span>
                        </div>

                        <div className="py-1">
                          <Link
                            to={
                              isAdmin
                                ? '/admin/dashboard'
                                : isShelter
                                ? '/shelter/dashboard'
                                : '/dashboard'
                            }
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal-700 hover:bg-cream-100"
                          >
                            <LayoutDashboard className="w-4 h-4 text-charcoal-400" />
                            <span>Dashboard</span>
                          </Link>

                          {isAdopter && (
                            <>
                              <Link
                                to="/dashboard/my-pets"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal-700 hover:bg-cream-100"
                              >
                                <PawPrint className="w-4 h-4 text-charcoal-400" />
                                <span>My Pets & Records</span>
                              </Link>
                              <Link
                                to="/dashboard/care"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal-700 hover:bg-cream-100"
                              >
                                <Clock className="w-4 h-4 text-charcoal-400" />
                                <span>Care Reminders</span>
                              </Link>
                              <Link
                                to="/dashboard/applications"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal-700 hover:bg-cream-100"
                              >
                                <Calendar className="w-4 h-4 text-charcoal-400" />
                                <span>Applications</span>
                              </Link>
                            </>
                          )}
                        </div>

                        <div className="border-t border-cream-200 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Join PetVerse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAuthenticated && <NotificationDropdown />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-cream-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-cream-300 bg-white px-4 pt-3 pb-6 space-y-4"
          >
            {/* Mobile Mode Switcher */}
            <div className="p-1 rounded-2xl bg-cream-200 grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => {
                  handleModeChange('adopt');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  isAdopt ? 'bg-amber-400 text-charcoal-900 shadow-xs' : 'text-charcoal-700'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Want Adopt</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModeChange('have_pet');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  isHavePet ? 'bg-teal-600 text-white shadow-xs' : 'text-charcoal-700'
                }`}
              >
                <PawPrint className="w-3.5 h-3.5" />
                <span>Have Pet</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModeChange('shelter');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  isShelterMode ? 'bg-purple-600 text-white shadow-xs' : 'text-charcoal-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Shelter/Host</span>
              </button>
            </div>

            {mode && (
              <button
                type="button"
                onClick={() => {
                  handleResetToGateway();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-1.5 text-xs font-bold text-center text-charcoal-600 bg-cream-100 hover:bg-cream-200 rounded-xl border border-cream-300"
              >
                ⮌ Switch Option / Back to Opening Screen
              </button>
            )}

            <div className="space-y-1">
              {activeLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-semibold'
                          : 'text-charcoal-700 hover:bg-cream-100'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-brand-500" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-brand-accent text-white rounded-md">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            <div className="pt-3 border-t border-cream-200 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to={
                      isAdmin
                        ? '/admin/dashboard'
                        : isShelter
                        ? '/shelter/dashboard'
                        : '/dashboard'
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="primary" size="md" className="w-full">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full text-rose-600 border-rose-200 hover:bg-rose-50"
                    onClick={handleLogout}
                  >
                    Sign Out ({user?.name})
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="md" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
