import { api } from './api';
import type {
  Instalacion,
  DetalleInstalacion,
  IniciarInstalacionDto,
  ModificarInstalacionDto,
  InstalarObjetosDto,
  InstalarFuentesDto,
  BackupInstalacionDto,
} from '@/interfaces';

export const instalacionesService = {
  list: () =>
    api.get<Instalacion[]>('/instalaciones').then((r) => r.data),

  detail: (tipo: string, numero: string, secuencia: string) =>
    api
      .get<DetalleInstalacion[]>(`/instalaciones/${tipo}/${numero}/${secuencia}`)
      .then((r) => r.data),

  iniciar: (body: IniciarInstalacionDto) =>
    api.post('/instalaciones/iniciar', body).then((r) => r.data),

  modificar: (body: ModificarInstalacionDto) =>
    api.post('/instalaciones/modificar', body).then((r) => r.data),

  instalarObjetos: (body: InstalarObjetosDto) =>
    api.post('/instalaciones/objetos', body).then((r) => r.data),

  instalarFuentes: (body: InstalarFuentesDto) =>
    api.post('/instalaciones/fuentes', body).then((r) => r.data),

  backup: (body: BackupInstalacionDto) =>
    api.post('/instalaciones/backup', body).then((r) => r.data),
};
