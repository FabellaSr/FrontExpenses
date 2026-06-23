import { api } from './api';

export const monthlyCloseOpenService = {
  close: (month: number, year: number) =>
    api.post('/monthly-close/close', { month, year }).then((r) => r.data),
  open: (month: number, year: number) =>
    api.post('/monthly-close/open', { month, year }).then((r) => r.data),
  list: () => api.get('/monthly-close').then((r) => r.data),
};