import { ZonaRepository } from '../domain/repositories/ZonaRepository';
import { Zona, CreateZonaRequest, UpdateZonaRequest } from '../domain/entities/Zona';

export class InMemoryZonaRepository implements ZonaRepository {
  private zonas: Zona[] = [];
  private nextId = 1;

  constructor() {
    // Datos de ejemplo para testing
    this.zonas = [
      {
        id: 1,
        nombre: 'América del Norte',
        codigo: 'NA',
        descripcion: 'Zona que incluye Estados Unidos, Canadá y México',
        activa: true,
        fechaCreacion: new Date('2024-01-01T00:00:00Z'),
        fechaActualizacion: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: 2,
        nombre: 'Europa',
        codigo: 'EU',
        descripcion: 'Zona europea',
        activa: true,
        fechaCreacion: new Date('2024-01-01T00:00:00Z'),
        fechaActualizacion: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: 3,
        nombre: 'Asia',
        codigo: 'AS',
        descripcion: 'Zona asiática',
        activa: false,
        fechaCreacion: new Date('2024-01-01T00:00:00Z'),
        fechaActualizacion: new Date('2024-01-01T00:00:00Z'),
      },
    ];
    this.nextId = 4;
  }

  async findAll(): Promise<Zona[]> {
    return [...this.zonas];
  }

  async findById(id: number): Promise<Zona | null> {
    const zona = this.zonas.find(z => z.id === id);
    return zona ? { ...zona } : null;
  }

  async findByCode(codigo: string): Promise<Zona | null> {
    const zona = this.zonas.find(z => z.codigo === codigo);
    return zona ? { ...zona } : null;
  }

  async create(zona: CreateZonaRequest): Promise<Zona> {
    const newZona: Zona = {
      id: this.nextId++,
      nombre: zona.nombre,
      codigo: zona.codigo,
      descripcion: zona.descripcion,
      activa: zona.activa !== undefined ? zona.activa : true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.zonas.push(newZona);
    return { ...newZona };
  }

  async update(id: number, zona: UpdateZonaRequest): Promise<Zona | null> {
    const index = this.zonas.findIndex(z => z.id === id);
    if (index === -1) {
      return null;
    }

    const existingZona = this.zonas[index];
    const updatedZona: Zona = {
      ...existingZona,
      nombre: zona.nombre !== undefined ? zona.nombre : existingZona.nombre,
      codigo: zona.codigo !== undefined ? zona.codigo : existingZona.codigo,
      descripcion: zona.descripcion !== undefined ? zona.descripcion : existingZona.descripcion,
      activa: zona.activa !== undefined ? zona.activa : existingZona.activa,
      fechaActualizacion: new Date(),
    };

    this.zonas[index] = updatedZona;
    return { ...updatedZona };
  }

  async delete(id: number): Promise<boolean> {
    const index = this.zonas.findIndex(z => z.id === id);
    if (index === -1) {
      return false;
    }

    this.zonas.splice(index, 1);
    return true;
  }

  // Métodos adicionales para testing
  clear(): void {
    this.zonas = [];
    this.nextId = 1;
  }

  getCount(): number {
    return this.zonas.length;
  }
} 