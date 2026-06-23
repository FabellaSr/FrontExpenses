import { api } from './api';
import type { Expense } from '@/interfaces';

export const expensesService = {
  list: (params?: { month?: number; year?: number; userId?: string }) =>
    api.get<Expense[]>('/expenses', { params }).then((r) => r.data),

  create: (form: FormData) =>
    api.post<Expense>('/expenses', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),

  update: (id: string, body: Partial<Expense>) =>
    api.patch<Expense>(`/expenses/${id}`, body).then((r) => r.data),

  remove: (id: string) => api.delete(`/expenses/${id}`).then((r) => r.data),
};

