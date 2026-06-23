import { sharedFundsService } from '@/services/sharedFundsService.ts';
import { useQuery } from '@tanstack/react-query';
 
export function useSharedFundBreakdown(  year: number, month: number,) {
  return useQuery({
    queryKey: ['shared-fund-breakdown',year,month],
    queryFn: () => sharedFundsService.breakdown(year,month),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}