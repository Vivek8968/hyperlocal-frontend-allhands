'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/api';
import { authAPI, userAPI } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (token) {
          const response = await userAPI.getCurrentUser();
          if (response.status) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [mounted]);

  const login = async (phone: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login(phone);
      if (response.status) {
        const { token, user: userData } = response.data;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
        }
        setUser(userData);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await userAPI.updateProfile(userData);
      if (response.status) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};