/// <reference types="vite/client" />
import axios from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ?? error?.message ?? 'Error inesperado';

    if (status === 401) {
      localStorage.removeItem('access_token');
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth/login';
      }
    } else if (status >= 500) {
      toast.error('Error del servidor');
    } else if (status >= 400) {
      toast.error(Array.isArray(message) ? message.join(', ') : String(message));
    }
    return Promise.reject(error);
  },
);
