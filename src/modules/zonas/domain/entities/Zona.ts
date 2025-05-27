export interface Zona {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  activa: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface CreateZonaRequest {
  nombre: string;
  codigo: string;
  descripcion?: string;
  activa?: boolean;
}

export interface UpdateZonaRequest {
  nombre?: string;
  codigo?: string;
  descripcion?: string;
  activa?: boolean;
} 