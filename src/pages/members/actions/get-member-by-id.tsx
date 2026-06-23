import { membersService } from '@/services/membersService';
import type { Member } from '@/interfaces';

export async function getMemberById(id: string): Promise<Member> {
  if (!id) throw new Error('Id is required');
  
  try {
    const member = await membersService.getById(id);
    return member;
  } catch (e) {
    console.error(e);
    throw e;
  }
}