import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAuthenticated, isAdopter, isShelter, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Adopt', path: '/adopt', icon: Heart },
    { name: 'Pet Care', path: '/services', icon: Sparkles },
    { name: 'AI Pet Match', path: '/ai-match', icon: Compass, badge: 'AI' },
    { name: 'Lost & Found', path: '/lost-found', icon: Search },
    { name: 'Nearby Services', path: '/nearby', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-600 transition-colors">
              <PawPrint className="w-5 h-5 fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl tracking-tight text-brand-900 leading-none">
                Pet<span className="text-brand-accent">Verse</span>
              </span>
              <span className="text-[10px] font-medium text-charcoal-400 tracking-wider uppercase">
                Care & Adoption
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-charcoal-700 hover:text-brand-800 hover:bg-cream-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-brand-500" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-brand-accent text-white rounded-md">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Notification Dropdown */}
                <NotificationDropdown />

                {/* Role Specific Shortcuts */}
                {isAdopter && (
                  <Link
                    to="/dashboard/my-pets"
                    className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-brand-600 px-3 py-2 rounded-xl hover:bg-cream-100 transition-colors"
                  >
                    <PawPrint className="w-3.5 h-3.5" />
                    <span>My Pets</span>
                  </Link>
                )}

                {/* Dashboard Button */}
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
                            <span>Overview Dashboard</span>
                          </Link>

                          {isAdopter && (
                            <>
                              <Link
                                to="/dashboard/my-pets"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal-700 hover:bg-cream-100"
                              >
                                <PawPrint className="w-4 h-4 text-charcoal-400" />
                                <span>My Pets & Care</span>
                              </Link>
                              <Link
                                to="/dashboard/applications"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-charcoal-700 hover:bg-cream-100"
                              >
                                <Calendar className="w-4 h-4 text-charcoal-400" />
                                <span>Adoption Applications</span>
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
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-cream-300 bg-white px-4 pt-2 pb-6 space-y-3"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
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
