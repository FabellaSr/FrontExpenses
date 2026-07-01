import { organizationsService } from '@/services/organizationService';
import { useQuery } from '@tanstack/react-query';


export function useOrganizations() {
  const query = useQuery({
    queryKey: ['organizations'],
    queryFn: organizationsService.list,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    ...query,
    data: query.data ?? [],
  };
}