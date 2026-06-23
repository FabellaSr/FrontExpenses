import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../actions/get-members';
import { Member } from '@/interfaces';
 
export function useMembers() {
  const query = useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: getMembers,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

    return {
        ...query,
        data: query.data ?? [],
    }
}