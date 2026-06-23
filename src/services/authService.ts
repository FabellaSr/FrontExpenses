import { api } from './api';
import type { User } from '@/interfaces';

export interface LoginPayload { email: string; password: string; }
export interface AuthResponse { accessToken: string; user: User; }

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>('/auth/login', payload).then((r) => r.data),
  register: (payload: LoginPayload & { name: string }) =>
    api.post<AuthResponse>('/auth/register', payload).then((r) => r.data),
  me: () => api.get<User>('/auth/me').then((r) => r.data),
};
