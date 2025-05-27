export interface ZonaResponseDto {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  activa: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CreateZonaDto {
  nombre: string;
  codigo: string;
  descripcion?: string;
  activa?: boolean;
}

export interface UpdateZonaDto {
  nombre?: string;
  codigo?: string;
  descripcion?: string;
  activa?: boolean;
}

export class ZonaDtoValidator {
  static validateCreate(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.nombre || typeof data.nombre !== 'string' || data.nombre.trim().length === 0) {
      errors.push('El nombre es requerido y debe ser una cadena no vacía');
    }

    if (!data.codigo || typeof data.codigo !== 'string' || data.codigo.trim().length === 0) {
      errors.push('El código es requerido y debe ser una cadena no vacía');
    }

    if (data.descripcion !== undefined && typeof data.descripcion !== 'string') {
      errors.push('La descripción debe ser una cadena');
    }

    if (data.activa !== undefined && typeof data.activa !== 'boolean') {
      errors.push('El campo activa debe ser un booleano');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateUpdate(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.nombre !== undefined && (typeof data.nombre !== 'string' || data.nombre.trim().length === 0)) {
      errors.push('El nombre debe ser una cadena no vacía');
    }

    if (data.codigo !== undefined && (typeof data.codigo !== 'string' || data.codigo.trim().length === 0)) {
      errors.push('El código debe ser una cadena no vacía');
    }

    if (data.descripcion !== undefined && typeof data.descripcion !== 'string') {
      errors.push('La descripción debe ser una cadena');
    }

    if (data.activa !== undefined && typeof data.activa !== 'boolean') {
      errors.push('El campo activa debe ser un booleano');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
} 