import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sharedFundsService } from '@/services/sharedFundsService.ts';

export function useUpdateSharedFund(year: number, month: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, targetAmount }: { id: number; targetAmount: number }) =>
      sharedFundsService.update(id, { targetAmount }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shared-fund-current', year, month] });
      qc.invalidateQueries({ queryKey: ['shared-fund-breakdown', year, month] });
    },
  });
}