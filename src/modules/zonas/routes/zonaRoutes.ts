import { FastifyInstance } from 'fastify';
import { ZonaController } from '../controllers/ZonaController';
import { ZonaUseCases } from '../usecases/ZonaUseCases';
import { PostgresZonaRepository } from '../repositories/PostgresZonaRepository';

export async function zonaRoutes(fastify: FastifyInstance): Promise<void> {
  // Inyección de dependencias siguiendo Clean Architecture
  const zonaRepository = new PostgresZonaRepository();
  const zonaUseCases = new ZonaUseCases(zonaRepository);
  const zonaController = new ZonaController(zonaUseCases);

  // Rutas del módulo zonas
  fastify.get('/zonas', async (request, reply) => {
    await zonaController.getAllZonas(request, reply);
  });

  fastify.get('/zonas/active', async (request, reply) => {
    await zonaController.getActiveZonas(request, reply);
  });

  fastify.get('/zonas/:id', async (request, reply) => {
    await zonaController.getZonaById(request as any, reply);
  });

  fastify.post('/zonas', async (request, reply) => {
    await zonaController.createZona(request as any, reply);
  });

  fastify.put('/zonas/:id', async (request, reply) => {
    await zonaController.updateZona(request as any, reply);
  });

  fastify.delete('/zonas/:id', async (request, reply) => {
    await zonaController.deleteZona(request as any, reply);
  });
} 