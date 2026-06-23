import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token, setAuth, clear } = useAuthStore();
  useEffect(() => {
    if (!token) return;
    authService
      .me()
      .then((u) => setAuth(u, token))
      .catch(() => clear());
  }, []);
  return <>{children}</>;
}
