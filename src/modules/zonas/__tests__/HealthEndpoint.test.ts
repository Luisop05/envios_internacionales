import { FastifyServer } from '../../../servers/FastifyServer';
import { FastifyInstance } from 'fastify';

describe('Health Endpoint', () => {
  let server: FastifyServer;
  let app: FastifyInstance;

  beforeAll(async () => {
    server = new FastifyServer();
    app = server.getFastifyInstance();
    await app.ready();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('GET /health', () => {
    it('should return health status with status 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.status).toBe('ok');
      expect(body.version).toBe('1.0.0');
      expect(body.timestamp).toBeDefined();
      expect(body.database).toMatch(/^(connected|disconnected)$/);
      
      // Verificar que timestamp es una fecha válida
      expect(new Date(body.timestamp).getTime()).toBeGreaterThan(0);
    });

    it('should have consistent response structure', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      const body = JSON.parse(response.body);
      
      expect(typeof body.status).toBe('string');
      expect(typeof body.timestamp).toBe('string');
      expect(typeof body.database).toBe('string');
      expect(typeof body.version).toBe('string');
    });
  });
}); 