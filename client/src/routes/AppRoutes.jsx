import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ShelterLayout from '../layouts/ShelterLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import BrowsePets from '../pages/public/BrowsePets';
import PetDetails from '../pages/public/PetDetails';
import AiPetMatch from '../pages/public/AiPetMatch';
import ServicesOverview from '../pages/public/ServicesOverview';
import PetBoarding from '../pages/public/PetBoarding';
import ServiceCategory from '../pages/public/ServiceCategory';
import ProviderProfile from '../pages/public/ProviderProfile';
import LostFound from '../pages/public/LostFound';
import NearbyServices from '../pages/public/NearbyServices';
import About from '../pages/public/About';
import FaqPage from '../pages/public/FaqPage';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Adopter Dashboard Pages
import DashboardOverview from '../pages/adopter/DashboardOverview';
import MyPets from '../pages/adopter/MyPets';
import CareReminders from '../pages/adopter/CareReminders';
import Applications from '../pages/adopter/Applications';
import Favorites from '../pages/adopter/Favorites';
import AssistantPage from '../pages/adopter/AssistantPage';

// Shelter Dashboard Pages
import ShelterDashboard from '../pages/shelter/ShelterDashboard';
import ShelterPets from '../pages/shelter/ShelterPets';
import AddEditPet from '../pages/shelter/AddEditPet';
import ShelterApplications from '../pages/shelter/ShelterApplications';
import ApplicationDetail from '../pages/shelter/ApplicationDetail';

// Admin Dashboard Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminShelters from '../pages/admin/AdminShelters';
import AdminPets from '../pages/admin/AdminPets';
import AdminReports from '../pages/admin/AdminReports';
import AdminStats from '../pages/admin/AdminStats';

// Role Protected Route Helpers
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 text-charcoal-600">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full mr-3" />
        <span>Authenticating...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<BrowsePets />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/ai-match" element={<AiPetMatch />} />
        <Route path="/services" element={<ServicesOverview />} />
        <Route path="/services/boarding" element={<PetBoarding />} />
        <Route path="/services/category/:category" element={<ServiceCategory />} />
        <Route path="/services/provider/:id" element={<ProviderProfile />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/nearby" element={<NearbyServices />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 2. Adopter Portal Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['adopter', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="my-pets" element={<MyPets />} />
        <Route path="care" element={<CareReminders />} />
        <Route path="applications" element={<Applications />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="assistant" element={<AssistantPage />} />
      </Route>

      {/* 3. Shelter Portal Routes */}
      <Route
        path="/shelter"
        element={
          <ProtectedRoute allowedRoles={['shelter', 'admin']}>
            <ShelterLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ShelterDashboard />} />
        <Route path="pets" element={<ShelterPets />} />
        <Route path="pets/add" element={<AddEditPet />} />
        <Route path="pets/:id/edit" element={<AddEditPet />} />
        <Route path="applications" element={<ShelterApplications />} />
        <Route path="applications/:id" element={<ApplicationDetail />} />
      </Route>

      {/* 4. Admin Portal Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="shelters" element={<AdminShelters />} />
        <Route path="pets" element={<AdminPets />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="statistics" element={<AdminStats />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
