import type { Category, Expense, User, ReportSummary } from '@/interfaces';

export const mockUsers: User[] = [
  { id: 'u1', email: 'admin@demo.com', name: 'Admin Demo', role: 'ADMIN' },
  { id: 'u2', email: 'ana@demo.com', name: 'Ana', role: 'MEMBER' },
  { id: 'u3', email: 'luis@demo.com', name: 'Luis', role: 'MEMBER' },
];

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Comida', color: '#ef4444' },
  { id: 'c2', name: 'Transporte', color: '#3b82f6' },
  { id: 'c3', name: 'Servicios', color: '#10b981' },
  { id: 'c4', name: 'Salud', color: '#f59e0b' },
  { id: 'c5', name: 'Entretenimiento', color: '#a855f7' },
];

export const mockExpenses: Expense[] = [
  { id: 'e1', date: '2025-05-02', categoryId: 'c1', concept: 'Supermercado', amount: 12500, userId: 'u2' },
  { id: 'e2', date: '2025-05-04', categoryId: 'c2', concept: 'Nafta', amount: 8000, userId: 'u3' },
  { id: 'e3', date: '2025-05-06', categoryId: 'c3', concept: 'Internet', amount: 9500, userId: 'u1' },
  { id: 'e4', date: '2025-05-08', categoryId: 'c5', concept: 'Cine', amount: 4200, userId: 'u2' },
  { id: 'e5', date: '2025-05-10', categoryId: 'c4', concept: 'Farmacia', amount: 3300, userId: 'u3' },
];

export const mockReport: ReportSummary = {
  totalAmount: 37500,
  byCategory: mockCategories.map((c, i) => ({
    categoryId: c.id,
    categoryName: c.name,
    total: [12500, 8000, 9500, 3300, 4200][i] ?? 0,
    pct: [33, 21, 25, 9, 11][i] ?? 0,
  })),
  byMember: [
    { userId: 'u2', userName: 'Ana', total: 16700 },
    { userId: 'u3', userName: 'Luis', total: 11300 },
    { userId: 'u1', userName: 'Admin Demo', total: 9500 },
  ],
  recent: mockExpenses,
};
