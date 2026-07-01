import { api } from './api';
import type { Organization } from '@/interfaces';

export const organizationsService = {
  list: () =>
    api.get<Organization[]>('/organizations').then((r) => r.data),

  create: (organization: string) =>
    api.post<Organization>('/organizations', { organization }).then((r) => r.data),

  update: (id: number, body: Partial<Pick<Organization, 'organization' | 'status'>>) =>
    api.patch<Organization>(`/organizations/${id}`, body).then((r) => r.data),

  remove: (id: number) =>
    api.delete(`/organizations/${id}`).then((r) => r.data),
};