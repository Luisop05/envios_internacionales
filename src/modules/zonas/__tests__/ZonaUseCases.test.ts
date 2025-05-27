import { ZonaUseCases } from '../usecases/ZonaUseCases';
import { ZonaRepository } from '../domain/repositories/ZonaRepository';
import { Zona, CreateZonaRequest, UpdateZonaRequest } from '../domain/entities/Zona';

// Mock del repositorio
const mockZonaRepository: jest.Mocked<ZonaRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByCode: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ZonaUseCases', () => {
  let zonaUseCases: ZonaUseCases;

  beforeEach(() => {
    zonaUseCases = new ZonaUseCases(mockZonaRepository);
    jest.clearAllMocks();
  });

  const mockZona: Zona = {
    id: 1,
    nombre: 'Test Zona',
    codigo: 'TEST',
    descripcion: 'Zona de prueba',
    activa: true,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
  };

  describe('getAllZonas', () => {
    it('should return all zonas', async () => {
      mockZonaRepository.findAll.mockResolvedValue([mockZona]);

      const result = await zonaUseCases.getAllZonas();

      expect(result).toEqual([mockZona]);
      expect(mockZonaRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getZonaById', () => {
    it('should return zona when found', async () => {
      mockZonaRepository.findById.mockResolvedValue(mockZona);

      const result = await zonaUseCases.getZonaById(1);

      expect(result).toEqual(mockZona);
      expect(mockZonaRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw error for invalid ID', async () => {
      await expect(zonaUseCases.getZonaById(0)).rejects.toThrow('El ID debe ser un número positivo');
      await expect(zonaUseCases.getZonaById(-1)).rejects.toThrow('El ID debe ser un número positivo');
    });
  });

  describe('getZonaByCode', () => {
    it('should return zona when found', async () => {
      mockZonaRepository.findByCode.mockResolvedValue(mockZona);

      const result = await zonaUseCases.getZonaByCode('TEST');

      expect(result).toEqual(mockZona);
      expect(mockZonaRepository.findByCode).toHaveBeenCalledWith('TEST');
    });

    it('should throw error for empty code', async () => {
      await expect(zonaUseCases.getZonaByCode('')).rejects.toThrow('El código no puede estar vacío');
      await expect(zonaUseCases.getZonaByCode('   ')).rejects.toThrow('El código no puede estar vacío');
    });
  });

  describe('createZona', () => {
    const createRequest: CreateZonaRequest = {
      nombre: 'Nueva Zona',
      codigo: 'nueva',
      descripcion: 'Descripción',
      activa: true,
    };

    it('should create zona successfully', async () => {
      mockZonaRepository.findByCode.mockResolvedValue(null);
      mockZonaRepository.create.mockResolvedValue(mockZona);

      const result = await zonaUseCases.createZona(createRequest);

      expect(result).toEqual(mockZona);
      expect(mockZonaRepository.findByCode).toHaveBeenCalledWith('nueva');
      expect(mockZonaRepository.create).toHaveBeenCalledWith({
        nombre: 'Nueva Zona',
        codigo: 'NUEVA',
        descripcion: 'Descripción',
        activa: true,
      });
    });

    it('should throw error if code already exists', async () => {
      mockZonaRepository.findByCode.mockResolvedValue(mockZona);

      await expect(zonaUseCases.createZona(createRequest)).rejects.toThrow('Ya existe una zona con el código: nueva');
    });
  });

  describe('updateZona', () => {
    const updateRequest: UpdateZonaRequest = {
      nombre: 'Zona Actualizada',
    };

    it('should update zona successfully', async () => {
      mockZonaRepository.findById.mockResolvedValue(mockZona);
      mockZonaRepository.update.mockResolvedValue({ ...mockZona, nombre: 'Zona Actualizada' });

      const result = await zonaUseCases.updateZona(1, updateRequest);

      expect(result?.nombre).toBe('Zona Actualizada');
      expect(mockZonaRepository.findById).toHaveBeenCalledWith(1);
      expect(mockZonaRepository.update).toHaveBeenCalledWith(1, { nombre: 'Zona Actualizada' });
    });

    it('should throw error for invalid ID', async () => {
      await expect(zonaUseCases.updateZona(0, updateRequest)).rejects.toThrow('El ID debe ser un número positivo');
    });

    it('should throw error if zona not found', async () => {
      mockZonaRepository.findById.mockResolvedValue(null);

      await expect(zonaUseCases.updateZona(1, updateRequest)).rejects.toThrow('No se encontró la zona con ID: 1');
    });
  });

  describe('deleteZona', () => {
    it('should delete zona successfully', async () => {
      mockZonaRepository.findById.mockResolvedValue(mockZona);
      mockZonaRepository.delete.mockResolvedValue(true);

      const result = await zonaUseCases.deleteZona(1);

      expect(result).toBe(true);
      expect(mockZonaRepository.findById).toHaveBeenCalledWith(1);
      expect(mockZonaRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error for invalid ID', async () => {
      await expect(zonaUseCases.deleteZona(0)).rejects.toThrow('El ID debe ser un número positivo');
    });

    it('should throw error if zona not found', async () => {
      mockZonaRepository.findById.mockResolvedValue(null);

      await expect(zonaUseCases.deleteZona(1)).rejects.toThrow('No se encontró la zona con ID: 1');
    });
  });

  describe('getActiveZonas', () => {
    it('should return only active zonas', async () => {
      const inactiveZona = { ...mockZona, id: 2, activa: false };
      mockZonaRepository.findAll.mockResolvedValue([mockZona, inactiveZona]);

      const result = await zonaUseCases.getActiveZonas();

      expect(result).toEqual([mockZona]);
      expect(result.length).toBe(1);
      expect(result[0].activa).toBe(true);
    });
  });
}); 