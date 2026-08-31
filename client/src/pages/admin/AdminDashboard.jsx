import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../../services/adminService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  Users, 
  Building2, 
  PawPrint, 
  Calendar, 
  AlertTriangle, 
  CreditCard,
  ShieldCheck,
  BarChart3,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalShelters: 0,
    totalPets: 0,
    totalApplications: 0,
    totalReports: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Registered Users', value: stats.totalUsers, icon: Users, link: '/admin/users', color: 'text-brand-600 bg-brand-50' },
    { title: 'Shelter Partners', value: stats.totalShelters, icon: Building2, link: '/admin/shelters', color: 'text-teal-600 bg-teal-50' },
    { title: 'Total Pet Listings', value: stats.totalPets, icon: PawPrint, link: '/admin/pets', color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Adoption Applications', value: stats.totalApplications, icon: Calendar, link: '/shelter/applications', color: 'text-sky-600 bg-sky-50' },
    { title: 'Lost & Found Alerts', value: stats.totalReports, icon: AlertTriangle, link: '/admin/reports', color: 'text-amber-600 bg-amber-50' },
    { title: 'Service Bookings', value: stats.totalBookings, icon: CreditCard, link: '/admin/statistics', color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-charcoal-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              System Administration
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            PetVerse Platform Health & Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400">
            System metrics, user directory moderation, and shelter partner verification.
          </p>
        </div>

        <Link to="/admin/statistics">
          <Button variant="secondary" size="md" icon={BarChart3} className="bg-white/10 text-white hover:bg-white/20 border border-white/20">
            View Analytics
          </Button>
        </Link>
      </div>

      {/* 6 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link key={idx} to={stat.link}>
              <Card hover className="p-5 space-y-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-charcoal-500 uppercase">
                  {stat.title}
                </span>
                <p className="font-display font-extrabold text-3xl text-charcoal-900">
                  {stat.value}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Admin Quick Action Shortcuts */}
      <div className="p-6 bg-white rounded-3xl border border-cream-300 shadow-premium space-y-4">
        <h3 className="font-display font-bold text-lg text-charcoal-900">
          Management Portals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/users"
            className="p-4 rounded-2xl bg-cream-100/60 hover:bg-brand-50 border border-cream-300 hover:border-brand-200 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-bold text-charcoal-900 group-hover:text-brand-600">User Management</p>
              <p className="text-xs text-charcoal-500">View registered adopters & admins</p>
            </div>
            <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/shelters"
            className="p-4 rounded-2xl bg-cream-100/60 hover:bg-brand-50 border border-cream-300 hover:border-brand-200 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-bold text-charcoal-900 group-hover:text-brand-600">Shelter Verification</p>
              <p className="text-xs text-charcoal-500">Review and verify rescue shelters</p>
            </div>
            <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/reports"
            className="p-4 rounded-2xl bg-cream-100/60 hover:bg-brand-50 border border-cream-300 hover:border-brand-200 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-bold text-charcoal-900 group-hover:text-brand-600">Lost & Found Moderation</p>
              <p className="text-xs text-charcoal-500">Resolve and moderate community posts</p>
            </div>
            <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
