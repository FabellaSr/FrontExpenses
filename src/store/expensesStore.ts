import { create } from 'zustand';
import type { Expense } from '@/interfaces';

interface ExpensesState {
  items: Expense[];
  setItems: (items: Expense[]) => void;
  add: (e: Expense) => void;
  remove: (id: string) => void;
}

export const useExpensesStore = create<ExpensesState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  add: (e) => set((s) => ({ items: [e, ...s.items] })),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
}));
