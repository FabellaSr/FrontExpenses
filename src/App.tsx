import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { appRouter } from './router/appRouter';
import { AuthProvider } from './auth/AuthProvider';
import { ThemeProvider } from './hooks/useTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
export const ExpensesApp = () => {
  return (
    <QueryClientProvider client={queryClient}> 
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={appRouter} />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </ThemeProvider>
    </QueryClientProvider>

  );
};
