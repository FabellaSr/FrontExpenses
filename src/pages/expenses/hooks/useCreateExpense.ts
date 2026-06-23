import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesService } from '@/services/expensesService';
import type { Expense } from '@/interfaces';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expensesService.create,

    onSuccess: (expense: Expense) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      // Invalida la lista de gastos
      queryClient.invalidateQueries({ queryKey: ['expenses'] });

      // FIX: también invalida el reporte del dashboard para que se
      // actualice inmediatamente sin esperar el staleTime de 5 min.
      queryClient.invalidateQueries({ queryKey: ['reports', year, month] });

      queryClient.setQueryData(['expense', { id: expense.id }], expense);
    },
  });
}
