import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { Role } from '@/interfaces';

interface Props { roles?: Role[]; }

export function ProtectedRoute({ roles }: Props) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) { 
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }
  if (roles && user && !roles.includes(user.role)) {
    console.log(user?.role)
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
