import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: (typeof localStorage !== 'undefined' && (localStorage.getItem('theme') as Theme)) || 'light',
  toggle: () => {
    const next = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    set({ theme: next });
  },
  set: (t) => {
    localStorage.setItem('theme', t);
    set({ theme: t });
  },
}));
