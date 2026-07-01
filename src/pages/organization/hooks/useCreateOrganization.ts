import { organizationsService } from '@/services/organizationService';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => organizationsService.create(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}