import { FastifyServer } from '../../../servers/FastifyServer';
import { FastifyInstance } from 'fastify';

describe('End-to-End Tests - Zonas API', () => {
  let server: FastifyServer;
  let app: FastifyInstance;
  let createdZonaId: number;

  beforeAll(async () => {
    server = new FastifyServer();
    app = server.getFastifyInstance();
    await app.ready();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('🏥 Health Check', () => {
    it('should return server health status', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.status).toBe('ok');
      expect(body.version).toBe('1.0.0');
      expect(body.timestamp).toBeDefined();
      expect(['connected', 'disconnected']).toContain(body.database);
    });
  });

  describe('📋 GET /api/v1/zonas - Listar todas las zonas', () => {
    it('should return all zonas with status 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);
      expect(body.message).toBe('Zonas obtenidas exitosamente');
      
      // Verificar estructura de zona
      const zona = body.data[0];
      expect(zona).toHaveProperty('id');
      expect(zona).toHaveProperty('nombre');
      expect(zona).toHaveProperty('codigo');
      expect(zona).toHaveProperty('activa');
      expect(zona).toHaveProperty('fechaCreacion');
      expect(zona).toHaveProperty('fechaActualizacion');
    });
  });

  describe('🟢 GET /api/v1/zonas/active - Listar zonas activas', () => {
    it('should return only active zonas', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas/active',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.message).toBe('Zonas activas obtenidas exitosamente');
      
      // Verificar que todas las zonas están activas
      body.data.forEach((zona: any) => {
        expect(zona.activa).toBe(true);
      });
    });
  });

  describe('➕ POST /api/v1/zonas - Crear nueva zona', () => {
    it('should create a new zona successfully', async () => {
      const newZona = {
        nombre: 'Oceanía',
        codigo: 'OC',
        descripcion: 'Zona que incluye Australia y Nueva Zelanda',
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
      expect(body.data.codigo).toBe(newZona.codigo);
      expect(body.data.descripcion).toBe(newZona.descripcion);
      expect(body.data.activa).toBe(newZona.activa);
      expect(body.data.id).toBeDefined();
      expect(body.message).toBe('Zona creada exitosamente');
      
      // Guardar ID para tests posteriores
      createdZonaId = body.data.id;
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
      expect(body.details.length).toBeGreaterThan(0);
    });

    it('should return 409 for duplicate codigo', async () => {
      const duplicateZona = {
        nombre: 'Zona Duplicada',
        codigo: 'NA', // Código que ya existe
        descripcion: 'Zona con código duplicado',
        activa: true,
      };

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/zonas',
        payload: duplicateZona,
      });

      expect(response.statusCode).toBe(409);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(false);
      expect(body.error).toBe('Conflicto');
      expect(body.message).toContain('Ya existe una zona con el código');
    });
  });

  describe('🔍 GET /api/v1/zonas/:id - Obtener zona por ID', () => {
    it('should return zona by valid ID', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/zonas/${createdZonaId}`,
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(true);
      expect(body.data.id).toBe(createdZonaId);
      expect(body.data.nombre).toBe('Oceanía');
      expect(body.data.codigo).toBe('OC');
      expect(body.message).toBe('Zona obtenida exitosamente');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas/invalid',
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(false);
      expect(body.error).toBe('ID inválido');
    });

    it('should return 404 for non-existent ID', async () => {
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

  describe('✏️ PUT /api/v1/zonas/:id - Actualizar zona', () => {
    it('should update zona successfully', async () => {
      const updateData = {
        nombre: 'Oceanía Actualizada',
        descripcion: 'Descripción actualizada para Oceanía',
        activa: false,
      };

      const response = await app.inject({
        method: 'PUT',
        url: `/api/v1/zonas/${createdZonaId}`,
        payload: updateData,
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(true);
      expect(body.data.id).toBe(createdZonaId);
      expect(body.data.nombre).toBe(updateData.nombre);
      expect(body.data.descripcion).toBe(updateData.descripcion);
      expect(body.data.activa).toBe(updateData.activa);
      expect(body.data.codigo).toBe('OC'); // No debe cambiar
      expect(body.message).toBe('Zona actualizada exitosamente');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/api/v1/zonas/invalid',
        payload: { nombre: 'Test' },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(false);
      expect(body.error).toBe('ID inválido');
    });

    it('should return 404 for non-existent ID', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/api/v1/zonas/99999',
        payload: { nombre: 'Test' },
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(false);
      expect(body.error).toBe('Zona no encontrada');
    });
  });

  describe('🗑️ DELETE /api/v1/zonas/:id - Eliminar zona', () => {
    it('should return 400 for invalid ID format', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/api/v1/zonas/invalid',
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(false);
      expect(body.error).toBe('ID inválido');
    });

    it('should return 404 for non-existent ID', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/api/v1/zonas/99998',
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(false);
      expect(body.error).toBe('Zona no encontrada');
    });

    it('should delete zona successfully', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: `/api/v1/zonas/${createdZonaId}`,
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(true);
      expect(body.message).toBe('Zona eliminada exitosamente');
    });

    it('should confirm zona was deleted', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/api/v1/zonas/${createdZonaId}`,
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(false);
      expect(body.error).toBe('Zona no encontrada');
    });
  });

  describe('📊 Flujo completo de datos', () => {
    it('should verify data consistency after all operations', async () => {
      // Obtener todas las zonas
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/zonas',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
      
      // Verificar que la zona eliminada no está en la lista
      const deletedZona = body.data.find((zona: any) => zona.id === createdZonaId);
      expect(deletedZona).toBeUndefined();
    });
  });
}); 