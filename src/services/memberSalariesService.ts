// src/services/memberSalariesService.ts

import { api } from './api';
import type { MemberSalary } from '@/interfaces';

export const memberSalariesService = {
  getByMonth: (year: number, month: number) =>
    api
      .get<MemberSalary[]>('/member-salaries', { params: { year, month } })
      .then((r) => r.data),

  create: (body: { userId: string; year: number; month: number; salary: number }) =>
    api.post<MemberSalary>('/member-salaries', body).then((r) => r.data),

  update: (id: string, body: Partial<{ salary: number }>) =>
    api.patch<MemberSalary>(`/member-salaries/${id}`, body).then((r) => r.data),

  remove: (id: number) =>
    api.delete(`/member-salaries/${id}`).then((r) => r.data),
};
