'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'seller' | 'admin';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login'
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect based on user role
        switch (user.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'seller':
            router.push('/seller');
            break;
          default:
            router.push('/');
        }
        return;
      }
    }
  }, [user, loading, requiredRole, router, redirectTo]);

  if (loading) {
    return <Loader fullScreen text="Checking authentication..." />;
  }

  if (!user) {
    return <Loader fullScreen text="Redirecting to login..." />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Loader fullScreen text="Redirecting..." />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;