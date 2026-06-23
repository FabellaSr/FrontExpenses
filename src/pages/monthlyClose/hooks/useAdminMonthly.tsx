import { useMutation, useQueryClient } from '@tanstack/react-query';
import { monthlyCloseOpenService } from '@/services/monthlyCloseOpenService';

export function useMonthlyCloseActions() {
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({
      queryKey: ['monthly-close'],
    });

  const close = useMutation({
    mutationFn: ({
      month,
      year,
    }: {
      month: number;
      year: number;
    }) => monthlyCloseOpenService.close(month, year),
    onSuccess: invalidate,
  });

  const open = useMutation({
    mutationFn: ({
      month,
      year,
    }: {
      month: number;
      year: number;
    }) => monthlyCloseOpenService.open(month, year),
    onSuccess: invalidate,
  });

  return {
    close,
    open,
  };
}