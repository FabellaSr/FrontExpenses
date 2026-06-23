import { membersService } from '@/services/membersService';
import type { Member } from '@/interfaces';

export async function getMembers
(): Promise<Member[]> {
  try {
    const members = await membersService.list();
    return members;
  } catch (e) {
    console.error(e);
    throw e;
  }
}