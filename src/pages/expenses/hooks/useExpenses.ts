import { useQuery } from '@tanstack/react-query';
import { expensesService } from '@/services/expensesService';
import type { Expense, UseExpensesParams } from '@/interfaces';

export function useExpenses(params?: UseExpensesParams) {
  
  const query = useQuery<Expense[]>({
    queryKey: ['expenses', params],
    queryFn: () => expensesService.list(params),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    ...query,
    data: query.data ?? [],
  };
}