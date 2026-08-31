import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import AiAssistantWidget from '../components/ai/AiAssistantWidget';
import { 
  LayoutDashboard, 
  PawPrint, 
  Heart, 
  Calendar, 
  Clock, 
  Sparkles, 
  LogOut,
  User
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, end: true },
    { name: 'My Pets', path: '/dashboard/my-pets', icon: PawPrint },
    { name: 'Care & Reminders', path: '/dashboard/care', icon: Clock },
    { name: 'Adoption Applications', path: '/dashboard/applications', icon: Calendar },
    { name: 'Saved Pets', path: '/dashboard/favorites', icon: Heart },
    { name: 'AI Pet Assistant', path: '/dashboard/assistant', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 font-sans text-charcoal-900">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-cream-300 p-5 shadow-premium sticky top-28 space-y-6">
              
              {/* User Profile Summary */}
              <div className="flex items-center gap-3 pb-5 border-b border-cream-200">
                <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white font-display font-bold text-lg flex items-center justify-center shadow-xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-base text-charcoal-900 truncate">
                    {user?.name || 'Pet Parent'}
                  </h3>
                  <p className="text-xs text-charcoal-500 truncate">{user?.email}</p>
                  <span className="inline-block mt-0.5 px-2 py-0.2 text-[10px] font-bold uppercase rounded bg-cream-200 text-charcoal-700">
                    Adopter & Pet Parent
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-brand-500 text-white shadow-sm'
                            : 'text-charcoal-700 hover:bg-cream-100 hover:text-brand-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Log Out */}
              <div className="pt-4 border-t border-cream-200">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
      <AiAssistantWidget />
    </div>
  );
};

export default DashboardLayout;
