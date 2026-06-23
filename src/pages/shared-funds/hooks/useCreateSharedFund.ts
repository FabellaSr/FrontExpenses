import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sharedFundsService } from '@/services/sharedFundsService.ts';

export function useCreateSharedFund(year: number, month: number) {
  const qc = useQueryClient(); 
  return useMutation({
    mutationFn: (targetAmount: number) =>
      sharedFundsService.create({ year, month, targetAmount }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shared-fund-breakdown', year, month] });
    },
  });
}
