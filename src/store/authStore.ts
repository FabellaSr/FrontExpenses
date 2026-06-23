import { create } from 'zustand';
import type { User } from '@/interfaces';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null,
  setAuth: (user, token) => {
    localStorage.setItem('access_token', token);
    set({ user, token });
  },
  clear: () => {
    localStorage.removeItem('access_token');
    set({ user: null, token: null });
  },
}));
