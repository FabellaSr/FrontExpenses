import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesService } from '@/services/expensesService';
import type { Expense } from '@/interfaces';

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Expense> }) =>
      expensesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
}