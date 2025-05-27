import { Zona, CreateZonaRequest, UpdateZonaRequest } from '../entities/Zona';

export interface ZonaRepository {
  findAll(): Promise<Zona[]>;
  findById(id: number): Promise<Zona | null>;
  findByCode(codigo: string): Promise<Zona | null>;
  create(zona: CreateZonaRequest): Promise<Zona>;
  update(id: number, zona: UpdateZonaRequest): Promise<Zona | null>;
  delete(id: number): Promise<boolean>;
} 