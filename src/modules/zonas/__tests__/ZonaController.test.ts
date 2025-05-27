import { FastifyServer } from '../../../servers/FastifyServer';
import { FastifyInstance } from 'fastify';

describe('ZonaController', () => {
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

  describe('GET /api/v1/zonas', () => {
    it('should return all zonas with status 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.message).toBe('Zonas obtenidas exitosamente');
    });
  });

  describe('GET /api/v1/zonas/active', () => {
    it('should return active zonas with status 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas/active',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.message).toBe('Zonas activas obtenidas exitosamente');
    });
  });

  describe('POST /api/v1/zonas', () => {
    it('should create a new zona with valid data', async () => {
      const newZona = {
        nombre: 'Test Zona',
        codigo: 'TEST',
        descripcion: 'Zona de prueba',
        activa: true,
      };

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/zonas',
        payload: newZona,
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data.nombre).toBe(newZona.nombre);
      expect(body.data.codigo).toBe(newZona.codigo.toUpperCase());
      expect(body.message).toBe('Zona creada exitosamente');
    });

    it('should return 400 for invalid data', async () => {
      const invalidZona = {
        nombre: '',
        codigo: '',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/zonas',
        payload: invalidZona,
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Datos de entrada inválidos');
      expect(Array.isArray(body.details)).toBe(true);
    });
  });

  describe('GET /api/v1/zonas/:id', () => {
    it('should return 400 for invalid ID', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas/invalid',
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('ID inválido');
    });

    it('should return 404 for non-existent zona', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas/99999',
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Zona no encontrada');
    });
  });

  describe('PUT /api/v1/zonas/:id', () => {
    it('should return 400 for invalid ID', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/api/v1/zonas/invalid',
        payload: { nombre: 'Updated' },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('ID inválido');
    });

    it('should return 404 for non-existent zona', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/api/v1/zonas/99999',
        payload: { nombre: 'Updated' },
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Zona no encontrada');
    });
  });

  describe('DELETE /api/v1/zonas/:id', () => {
    it('should return 400 for invalid ID', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/api/v1/zonas/invalid',
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('ID inválido');
    });

    it('should return 404 for non-existent zona', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/api/v1/zonas/99999',
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Zona no encontrada');
    });
  });
}); 