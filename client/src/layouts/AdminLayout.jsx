import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  PawPrint, 
  AlertTriangle, 
  BarChart3, 
  ShieldAlert,
  LogOut 
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Admin Overview', path: '/admin/dashboard', icon: LayoutDashboard, end: true },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Shelter Partners', path: '/admin/shelters', icon: Building2 },
    { name: 'Pet Listings', path: '/admin/pets', icon: PawPrint },
    { name: 'Lost & Found Reports', path: '/admin/reports', icon: AlertTriangle },
    { name: 'Platform Statistics', path: '/admin/statistics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 font-sans text-charcoal-900">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-cream-300 p-5 shadow-premium sticky top-28 space-y-6">
              
              {/* Admin Profile Summary */}
              <div className="flex items-center gap-3 pb-5 border-b border-cream-200">
                <div className="w-12 h-12 rounded-2xl bg-charcoal-900 text-white font-display font-bold text-lg flex items-center justify-center shadow-xs">
                  <ShieldAlert className="w-6 h-6 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-base text-charcoal-900 truncate">
                    {user?.name || 'Administrator'}
                  </h3>
                  <p className="text-xs text-charcoal-500 truncate">{user?.email}</p>
                  <span className="inline-block mt-0.5 px-2 py-0.2 text-[10px] font-bold uppercase rounded bg-rose-50 text-rose-800 border border-rose-200">
                    System Admin
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
                            ? 'bg-charcoal-900 text-white shadow-sm'
                            : 'text-charcoal-700 hover:bg-cream-100 hover:text-charcoal-900'
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
    </div>
  );
};

export default AdminLayout;
