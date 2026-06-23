import { api } from './api';
import type { Member } from '@/interfaces';

export const membersService = {
  list: () => api.get<Member[]>('/members').then((r) => r.data),
  getById: (id: string) =>
    api.get<Member>(`/members/${id}`).then((r) => r.data),

  add: (form: FormData)=>
    api.post<Member>('/members', form,{
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data),

  remove: (id: string) => api.delete(`/members/${id}`).then((r) => r.data),
  update: (
    id: string,
    body: Partial<Member> & {
      email: string;
      name: string;
      role: 'ADMIN' | 'MEMBER';
    }
  ) =>
    api.put<Member>(`/members/${id}`, body).then((r) => r.data),
};
