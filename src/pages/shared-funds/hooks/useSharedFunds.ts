import { sharedFundsService } from '@/services/sharedFundsService.ts';
import { useQuery } from '@tanstack/react-query';
 

export function useSharedFunds() {
  return useQuery({
    queryKey: ['shared-funds'],
    queryFn: () =>
      sharedFundsService.list(),
  });
}