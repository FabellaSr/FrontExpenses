import { api } from './api';
import type { ReportSummary, Expense } from '@/interfaces';

export const reportsService = {
  monthly: (year: number, month: number) =>
    api.get<ReportSummary>('/reports/monthly', { params: { year, month } }).then((r) => r.data),
  member: (userId: string, year: number, month: number) =>
    api.get<{ total: number; expenses: Expense[] }>('/reports/member', {
      params: { userId, year, month },
    }).then((r) => r.data),
  exportPdf: (year: number, month: number) =>
    api.get(`/reports/export/pdf`, { params: { year, month }, responseType: 'blob' }),
  exportExcel: (year: number, month: number) =>
    api.get(`/reports/export/excel`, { params: { year, month }, responseType: 'blob' }),
};
