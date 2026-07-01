// ─── Entidades ────────────────────────────────────────────────────────────────

export interface Instalacion {
  type: string;
  number: string;
  sequence: string;
  description: string;
  user: string;
  status: string;
  date: string;
}

export interface DetalleInstalacion {
  objeto: string;
  libAuxiliar: string;
  qsrcpf: string;
  tipo: string;
  destinoObjeto: string;
  atributo: string;
  libFuente: string;
  srcFuenteo: string;
  estadoFuente: string;
  estadoObjeto: string;
  // Solo presentes cuando estadoFuente === '1'
  fecInstFuente?: string;
  usuarioQueInstaloFuente?: string;
  // Solo presentes cuando estadoObjeto === '1'
  fecInstObjeto?: string;
  usuarioQueInstaloObjeto?: string;
}

// ─── DTOs (request bodies) ────────────────────────────────────────────────────

export interface IniciarInstalacionDto {
  tipo: string;
  numero: string;
  detalle: string;
  usuario: string;
}

export interface ModificarInstalacionDto {
  tipo: string;
  numero: string;
  secuencia: string;
  fuenteObjeto: string;
  libObjeto: string;
  libFuente: string;
  srcFuente: string;
  usuario: string;
}

export interface InstalarObjetosDto {
  tipo: string;
  numero: string;
  secuencia: string;
  usuario: string;
}

export interface InstalarFuentesDto extends InstalarObjetosDto {}
export interface BackupInstalacionDto extends InstalarObjetosDto {}

// ─── Form values ──────────────────────────────────────────────────────────────

export interface IniciarInstalacionFormValues {
  tipo: string;
  numero: string;
  detalle: string;
  usuario: string;
}

export interface AccionInstalacionFormValues {
  tipo: string;
  numero: string;
  secuencia: string;
  usuario: string;
}
