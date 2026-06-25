import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { monthlyCloseOpenService } from '@/services/monthlyCloseOpenService';

export function useMonthlyCloseActions() {
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ['monthly-close'] });

  // Query: trae todos los registros del back
  const { data: closes = [], isLoading } = useQuery({
    queryKey: ['monthly-close'],
    queryFn: () => monthlyCloseOpenService.list(),
  });

  // Mes activo = mes actual del calendario
  const now = new Date();
  const activeMonth = now.getMonth() + 1; // getMonth() es 0-indexed
  const activeYear = now.getFullYear();

  // Busca si el back ya tiene registro para este mes
  const activeClose = closes.find(
    (c: { month: number; year: number; closed: boolean }) =>
      c.month === activeMonth && c.year === activeYear
  );

  const isClosed = activeClose?.closed ?? false;

  const close = useMutation({
    mutationFn: ({ month, year }: { month: number; year: number }) =>
      monthlyCloseOpenService.close(month, year),
    onSuccess: invalidate,
  });

  const open = useMutation({
    mutationFn: ({ month, year }: { month: number; year: number }) =>
      monthlyCloseOpenService.open(month, year),
    onSuccess: invalidate,
  });

  return {
    close,
    open,
    activeMonth,
    activeYear,
    isClosed,
    isLoading,
  };
}