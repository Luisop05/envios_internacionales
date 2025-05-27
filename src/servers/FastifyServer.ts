import Fastify, { FastifyInstance } from 'fastify';
import { zonaRoutes } from '../modules/zonas/routes/zonaRoutes';
import { DatabaseConnection } from '../infrastructure/database/DatabaseConnection';
import * as fs from 'fs';
import * as path from 'path';

export class FastifyServer {
  private fastify: FastifyInstance;
  private port: number;
  private host: string;

  constructor() {
    this.port = parseInt(process.env.PORT || '3000');
    this.host = process.env.HOST || '0.0.0.0';
    
    this.fastify = Fastify({
      logger: {
        level: process.env.LOG_LEVEL || 'info',
      },
    });

    this.setupRoutes();
    this.setupDocumentation();
  }

  private setupRoutes(): void {
    // Health check endpoint
    this.fastify.get('/health', async (request, reply) => {
      const dbConnection = DatabaseConnection.getInstance();
      const isDbConnected = await dbConnection.testConnection();
      
      reply.code(200).send({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: isDbConnected ? 'connected' : 'disconnected',
        version: '1.0.0',
      });
    });

    // API routes
    this.fastify.register(async (fastify) => {
      await fastify.register(zonaRoutes);
    }, { prefix: '/api/v1' });
  }

  private setupDocumentation(): void {
    // Endpoint para servir el archivo OpenAPI JSON
    this.fastify.get('/openapi.json', async (request, reply) => {
      try {
        const openApiPath = path.join(process.cwd(), 'docs', 'openapi.json');
        const openApiContent = fs.readFileSync(openApiPath, 'utf8');
        
        reply
          .type('application/json')
          .send(openApiContent);
      } catch (error) {
        reply.code(500).send({
          error: 'No se pudo cargar la documentación OpenAPI',
          message: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    });

    // Endpoint para servir la documentación Swagger UI
    this.fastify.get('/docs', async (request, reply) => {
      try {
        const swaggerPath = path.join(process.cwd(), 'docs', 'swagger-ui.html');
        const swaggerContent = fs.readFileSync(swaggerPath, 'utf8');
        
        reply
          .type('text/html')
          .send(swaggerContent);
      } catch (error) {
        reply.code(500).send({
          error: 'No se pudo cargar la documentación Swagger',
          message: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    });
  }

  public async start(): Promise<void> {
    try {
      // Verificar conexión a la base de datos
      const dbConnection = DatabaseConnection.getInstance();
      const isConnected = await dbConnection.testConnection();
      
      if (!isConnected) {
        console.warn('Advertencia: No se pudo conectar a la base de datos');
      }

      await this.fastify.listen({ port: this.port, host: this.host });
      console.log(`Servidor iniciado en http://${this.host}:${this.port}`);
      console.log(`Documentación disponible en http://${this.host}:${this.port}/docs`);
      console.log(`OpenAPI JSON disponible en http://${this.host}:${this.port}/openapi.json`);
    } catch (error) {
      console.error('Error al iniciar el servidor:', error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.fastify.close();
      await DatabaseConnection.getInstance().close();
      console.log('Servidor detenido correctamente');
    } catch (error) {
      console.error('Error al detener el servidor:', error);
    }
  }

  public getFastifyInstance(): FastifyInstance {
    return this.fastify;
  }
} 