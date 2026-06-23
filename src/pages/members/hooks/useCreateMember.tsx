import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Member } from '@/interfaces';
import { membersService } from '@/services/membersService';

export function useCreateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: membersService.add,
    onSuccess: (member: Member) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({
        queryKey: ["members", { id: member.id }],
      });
      queryClient.setQueryData(["members", { id: member.id }], member);
    },
  });
}