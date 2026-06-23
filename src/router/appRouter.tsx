import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/pages/layouts/MainLayout';
import AuthLayout from '@/pages/layouts/AuthLayout';
import AdminLayout from '@/pages/layouts/AdminLayout';
import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
// FIX: lazy loading — cada página se carga solo cuando el usuario la visita,
// reduciendo el bundle inicial.
const DashboardPage      = lazy(() => import('@/pages/dashboard/page/DashboardPage'));
const ExpensesPage       = lazy(() => import('@/pages/expenses/page/ExpensesPage').then(m => ({ default: m.ExpensesPage })));
const ReportsPage        = lazy(() => import('@/pages/reports/page/ReportsPage'));
const LoginPage          = lazy(() => import('@/pages/auth/page/LoginPage'));
const RegisterPage       = lazy(() => import('@/pages/auth/page/RegisterPage'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/page/AdminDashboardPage'));
const MembersPage        = lazy(() => import('@/pages/members/page/MembersPage'));
const MonthlyClosePage   = lazy(() => import('@/pages/monthlyClose/page/MonthlyClosePage'));

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<CustomFullScreenLoading />}>
    {element}
  </Suspense>
);

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,       element: withSuspense(<DashboardPage />) },
      { path: 'expenses',  element: withSuspense(<ExpensesPage />) },
      { path: 'reports',   element: withSuspense(<ReportsPage />) },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true,         element: <Navigate to="/auth/login" /> },
      { path: 'login',       element: withSuspense(<LoginPage />) },
      { path: 'register',    element: withSuspense(<RegisterPage />) },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute roles={['ADMIN']} />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { index: true,           element: withSuspense(<AdminDashboardPage />) },
          { path: 'members',       element: withSuspense(<MembersPage />) },
          { path: 'monthly-close', element: withSuspense(<MonthlyClosePage />) },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
]);
