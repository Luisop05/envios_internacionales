import { FastifyInstance } from 'fastify';
import { ZonaController } from '../controllers/ZonaController';
import { ZonaUseCases } from '../usecases/ZonaUseCases';
import { PostgresZonaRepository } from '../repositories/PostgresZonaRepository';
import { InMemoryZonaRepository } from '../repositories/InMemoryZonaRepository';
import { DatabaseConnection } from '../../../infrastructure/database/DatabaseConnection';

export async function zonaRoutes(fastify: FastifyInstance): Promise<void> {
  // Inyección de dependencias siguiendo Clean Architecture
  // Usar repositorio en memoria si no hay conexión a la base de datos
  let zonaRepository;
  
  try {
    const dbConnection = DatabaseConnection.getInstance();
    const isConnected = await dbConnection.testConnection();
    
    if (isConnected) {
      zonaRepository = new PostgresZonaRepository();
      console.log('✅ Usando PostgreSQL para el módulo zonas');
    } else {
      zonaRepository = new InMemoryZonaRepository();
      console.log('⚠️ Usando repositorio en memoria para el módulo zonas (PostgreSQL no disponible)');
    }
  } catch (error) {
    zonaRepository = new InMemoryZonaRepository();
    console.log('⚠️ Usando repositorio en memoria para el módulo zonas (error de conexión)');
  }

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