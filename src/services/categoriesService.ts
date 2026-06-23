import { api } from './api';
import type { Category } from '@/interfaces';

export const categoriesService = {
  list: () => api.get<Category[]>('/categories').then((r) => r.data),
  create: (body: Omit<Category, 'id'>) =>
    api.post<Category>('/categories', body).then((r) => r.data),
  update: (id: string, body: Partial<Category>) =>
    api.patch<Category>(`/categories/${id}`, body).then((r) => r.data),
  remove: (id: string) => api.delete(`/categories/${id}`).then((r) => r.data),
};
