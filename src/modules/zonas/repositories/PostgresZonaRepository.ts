import { Pool } from 'pg';
import { ZonaRepository } from '../domain/repositories/ZonaRepository';
import { Zona, CreateZonaRequest, UpdateZonaRequest } from '../domain/entities/Zona';
import { DatabaseConnection } from '../../../infrastructure/database/DatabaseConnection';

export class PostgresZonaRepository implements ZonaRepository {
  private pool: Pool;

  constructor() {
    this.pool = DatabaseConnection.getInstance().getPool();
  }

  async findAll(): Promise<Zona[]> {
    const query = `
      SELECT id, nombre, codigo, descripcion, activa, fecha_creacion, fecha_actualizacion
      FROM zonas
      ORDER BY id ASC
    `;
    
    const result = await this.pool.query(query);
    return result.rows.map(this.mapRowToZona);
  }

  async findById(id: number): Promise<Zona | null> {
    const query = `
      SELECT id, nombre, codigo, descripcion, activa, fecha_creacion, fecha_actualizacion
      FROM zonas
      WHERE id = $1
    `;
    
    const result = await this.pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToZona(result.rows[0]);
  }

  async findByCode(codigo: string): Promise<Zona | null> {
    const query = `
      SELECT id, nombre, codigo, descripcion, activa, fecha_creacion, fecha_actualizacion
      FROM zonas
      WHERE codigo = $1
    `;
    
    const result = await this.pool.query(query, [codigo]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToZona(result.rows[0]);
  }

  async create(zona: CreateZonaRequest): Promise<Zona> {
    const query = `
      INSERT INTO zonas (nombre, codigo, descripcion, activa, fecha_creacion, fecha_actualizacion)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, nombre, codigo, descripcion, activa, fecha_creacion, fecha_actualizacion
    `;
    
    const values = [
      zona.nombre,
      zona.codigo,
      zona.descripcion || null,
      zona.activa !== undefined ? zona.activa : true,
    ];
    
    const result = await this.pool.query(query, values);
    return this.mapRowToZona(result.rows[0]);
  }

  async update(id: number, zona: UpdateZonaRequest): Promise<Zona | null> {
    // Construir query dinámicamente basado en los campos proporcionados
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (zona.nombre !== undefined) {
      fields.push(`nombre = $${paramIndex++}`);
      values.push(zona.nombre);
    }

    if (zona.codigo !== undefined) {
      fields.push(`codigo = $${paramIndex++}`);
      values.push(zona.codigo);
    }

    if (zona.descripcion !== undefined) {
      fields.push(`descripcion = $${paramIndex++}`);
      values.push(zona.descripcion);
    }

    if (zona.activa !== undefined) {
      fields.push(`activa = $${paramIndex++}`);
      values.push(zona.activa);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`fecha_actualizacion = NOW()`);
    values.push(id);

    const query = `
      UPDATE zonas
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, nombre, codigo, descripcion, activa, fecha_creacion, fecha_actualizacion
    `;

    const result = await this.pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToZona(result.rows[0]);
  }

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM zonas WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  private mapRowToZona(row: any): Zona {
    return {
      id: row.id,
      nombre: row.nombre,
      codigo: row.codigo,
      descripcion: row.descripcion,
      activa: row.activa,
      fechaCreacion: row.fecha_creacion,
      fechaActualizacion: row.fecha_actualizacion,
    };
  }
} 