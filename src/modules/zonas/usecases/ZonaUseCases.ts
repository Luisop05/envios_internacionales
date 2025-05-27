import { ZonaRepository } from '../domain/repositories/ZonaRepository';
import { Zona, CreateZonaRequest, UpdateZonaRequest } from '../domain/entities/Zona';

export class ZonaUseCases {
  constructor(private zonaRepository: ZonaRepository) {}

  async getAllZonas(): Promise<Zona[]> {
    return await this.zonaRepository.findAll();
  }

  async getZonaById(id: number): Promise<Zona | null> {
    if (id <= 0) {
      throw new Error('El ID debe ser un número positivo');
    }
    return await this.zonaRepository.findById(id);
  }

  async getZonaByCode(codigo: string): Promise<Zona | null> {
    if (!codigo || codigo.trim().length === 0) {
      throw new Error('El código no puede estar vacío');
    }
    return await this.zonaRepository.findByCode(codigo.trim());
  }

  async createZona(zonaData: CreateZonaRequest): Promise<Zona> {
    // Validar que el código no exista
    const existingZona = await this.zonaRepository.findByCode(zonaData.codigo);
    if (existingZona) {
      throw new Error(`Ya existe una zona con el código: ${zonaData.codigo}`);
    }

    // Normalizar datos
    const normalizedData: CreateZonaRequest = {
      nombre: zonaData.nombre.trim(),
      codigo: zonaData.codigo.trim().toUpperCase(),
      descripcion: zonaData.descripcion?.trim() || undefined,
      activa: zonaData.activa !== undefined ? zonaData.activa : true,
    };

    return await this.zonaRepository.create(normalizedData);
  }

  async updateZona(id: number, zonaData: UpdateZonaRequest): Promise<Zona | null> {
    if (id <= 0) {
      throw new Error('El ID debe ser un número positivo');
    }

    // Verificar que la zona existe
    const existingZona = await this.zonaRepository.findById(id);
    if (!existingZona) {
      throw new Error(`No se encontró la zona con ID: ${id}`);
    }

    // Si se está actualizando el código, verificar que no exista en otra zona
    if (zonaData.codigo) {
      const zonaWithCode = await this.zonaRepository.findByCode(zonaData.codigo);
      if (zonaWithCode && zonaWithCode.id !== id) {
        throw new Error(`Ya existe otra zona con el código: ${zonaData.codigo}`);
      }
    }

    // Normalizar datos
    const normalizedData: UpdateZonaRequest = {};
    
    if (zonaData.nombre !== undefined) {
      normalizedData.nombre = zonaData.nombre.trim();
    }
    
    if (zonaData.codigo !== undefined) {
      normalizedData.codigo = zonaData.codigo.trim().toUpperCase();
    }
    
    if (zonaData.descripcion !== undefined) {
      normalizedData.descripcion = zonaData.descripcion.trim() || undefined;
    }
    
    if (zonaData.activa !== undefined) {
      normalizedData.activa = zonaData.activa;
    }

    return await this.zonaRepository.update(id, normalizedData);
  }

  async deleteZona(id: number): Promise<boolean> {
    if (id <= 0) {
      throw new Error('El ID debe ser un número positivo');
    }

    // Verificar que la zona existe
    const existingZona = await this.zonaRepository.findById(id);
    if (!existingZona) {
      throw new Error(`No se encontró la zona con ID: ${id}`);
    }

    return await this.zonaRepository.delete(id);
  }

  async getActiveZonas(): Promise<Zona[]> {
    const allZonas = await this.zonaRepository.findAll();
    return allZonas.filter(zona => zona.activa);
  }
} 