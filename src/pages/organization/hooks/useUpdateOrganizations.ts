import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Organization } from '@/interfaces';
import { organizationsService } from '@/services/organizationService';
 
export function useUpdateOrganization() {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Pick<Organization, 'organization' | 'status'>> }) =>
      organizationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}