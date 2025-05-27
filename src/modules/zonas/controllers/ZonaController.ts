import { FastifyRequest, FastifyReply } from 'fastify';
import { ZonaUseCases } from '../usecases/ZonaUseCases';
import { ZonaResponseDto, CreateZonaDto, UpdateZonaDto, ZonaDtoValidator } from '../dto/ZonaDto';
import { Zona } from '../domain/entities/Zona';

export class ZonaController {
  constructor(private zonaUseCases: ZonaUseCases) {}

  async getAllZonas(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const zonas = await this.zonaUseCases.getAllZonas();
      const zonasDto = zonas.map(this.mapZonaToDto);
      
      reply.code(200).send({
        success: true,
        data: zonasDto,
        message: 'Zonas obtenidas exitosamente',
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getZonaById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const id = parseInt(request.params.id);
      
      if (isNaN(id)) {
        reply.code(400).send({
          success: false,
          error: 'ID inválido',
          message: 'El ID debe ser un número válido',
        });
        return;
      }

      const zona = await this.zonaUseCases.getZonaById(id);
      
      if (!zona) {
        reply.code(404).send({
          success: false,
          error: 'Zona no encontrada',
          message: `No se encontró la zona con ID: ${id}`,
        });
        return;
      }

      reply.code(200).send({
        success: true,
        data: this.mapZonaToDto(zona),
        message: 'Zona obtenida exitosamente',
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async createZona(request: FastifyRequest<{ Body: CreateZonaDto }>, reply: FastifyReply): Promise<void> {
    try {
      const validation = ZonaDtoValidator.validateCreate(request.body);
      
      if (!validation.isValid) {
        reply.code(400).send({
          success: false,
          error: 'Datos de entrada inválidos',
          message: 'Los datos proporcionados no son válidos',
          details: validation.errors,
        });
        return;
      }

      const zona = await this.zonaUseCases.createZona(request.body);
      
      reply.code(201).send({
        success: true,
        data: this.mapZonaToDto(zona),
        message: 'Zona creada exitosamente',
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Ya existe una zona')) {
        reply.code(409).send({
          success: false,
          error: 'Conflicto',
          message: error.message,
        });
        return;
      }

      reply.code(500).send({
        success: false,
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async updateZona(request: FastifyRequest<{ Params: { id: string }; Body: UpdateZonaDto }>, reply: FastifyReply): Promise<void> {
    try {
      const id = parseInt(request.params.id);
      
      if (isNaN(id)) {
        reply.code(400).send({
          success: false,
          error: 'ID inválido',
          message: 'El ID debe ser un número válido',
        });
        return;
      }

      const validation = ZonaDtoValidator.validateUpdate(request.body);
      
      if (!validation.isValid) {
        reply.code(400).send({
          success: false,
          error: 'Datos de entrada inválidos',
          message: 'Los datos proporcionados no son válidos',
          details: validation.errors,
        });
        return;
      }

      const zona = await this.zonaUseCases.updateZona(id, request.body);
      
      if (!zona) {
        reply.code(404).send({
          success: false,
          error: 'Zona no encontrada',
          message: `No se encontró la zona con ID: ${id}`,
        });
        return;
      }

      reply.code(200).send({
        success: true,
        data: this.mapZonaToDto(zona),
        message: 'Zona actualizada exitosamente',
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Ya existe')) {
        reply.code(409).send({
          success: false,
          error: 'Conflicto',
          message: error.message,
        });
        return;
      }

      reply.code(500).send({
        success: false,
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async deleteZona(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    try {
      const id = parseInt(request.params.id);
      
      if (isNaN(id)) {
        reply.code(400).send({
          success: false,
          error: 'ID inválido',
          message: 'El ID debe ser un número válido',
        });
        return;
      }

      const deleted = await this.zonaUseCases.deleteZona(id);
      
      if (!deleted) {
        reply.code(404).send({
          success: false,
          error: 'Zona no encontrada',
          message: `No se encontró la zona con ID: ${id}`,
        });
        return;
      }

      reply.code(200).send({
        success: true,
        message: 'Zona eliminada exitosamente',
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getActiveZonas(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const zonas = await this.zonaUseCases.getActiveZonas();
      const zonasDto = zonas.map(this.mapZonaToDto);
      
      reply.code(200).send({
        success: true,
        data: zonasDto,
        message: 'Zonas activas obtenidas exitosamente',
      });
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  private mapZonaToDto(zona: Zona): ZonaResponseDto {
    return {
      id: zona.id,
      nombre: zona.nombre,
      codigo: zona.codigo,
      descripcion: zona.descripcion,
      activa: zona.activa,
      fechaCreacion: zona.fechaCreacion.toISOString(),
      fechaActualizacion: zona.fechaActualizacion.toISOString(),
    };
  }
} 