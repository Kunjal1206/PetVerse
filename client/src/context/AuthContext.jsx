import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const data = await authService.getMe();
          setUser(data.user);
          setShelter(data.shelter || null);
        } catch (err) {
          console.error('Session validation error:', err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setShelter(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    setUser(data.user);
    setShelter(data.shelter || null);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setToken(data.token);
    setUser(data.user);
    setShelter(data.shelter || null);
    return data;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setShelter(null);
  };

  // Quick Demo Login Helper for 1-click evaluation
  const quickLogin = async (role) => {
    let email = 'rahul.adopter@petverse.com';
    let password = 'password123';
    
    if (role === 'shelter') {
      email = 'delhi.shelter@petverse.com';
    } else if (role === 'admin') {
      email = 'admin@petverse.com';
    } else if (role === 'adopter-pune') {
      email = 'amit.adopter@petverse.com';
    }

    return await login(email, password);
  };

  const value = {
    user,
    shelter,
    token,
    loading,
    isAuthenticated: !!user,
    isAdopter: user?.role === 'adopter',
    isShelter: user?.role === 'shelter',
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    quickLogin,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
