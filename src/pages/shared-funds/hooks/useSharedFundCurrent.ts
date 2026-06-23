import { sharedFundsService } from '@/services/sharedFundsService.ts';
import { useQuery } from '@tanstack/react-query';
 

export function useSharedFundCurrent(
  year: number,
  month: number,
) {
  return useQuery({
    queryKey: [
      'shared-fund-current',
      year,
      month,
    ],

    queryFn: () => sharedFundsService.current(
        year,
        month,
      ),
  });
}