import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, token, setAuth, clear } = useAuthStore();
  return { user, token, isAuthenticated: !!token, setAuth, logout: clear };
};
