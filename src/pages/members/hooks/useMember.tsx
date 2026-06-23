import { useQuery } from '@tanstack/react-query';
 
import { Member } from '@/interfaces';
import { getMemberById } from '../actions/get-member-by-id';
 
export function useMember(id: string) {
  const query = useQuery<Member>({
    queryKey: ["member", id],
    queryFn: () => getMemberById(id),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

    return {
        ...query,
        data: query.data ?? [],
    }
}