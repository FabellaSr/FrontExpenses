import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '@/services/categoriesService';
import type { Category } from '@/interfaces';

export function useCategories() {
  const query = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => categoriesService.list(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    ...query,
    data: query.data ?? [],
  };
}
