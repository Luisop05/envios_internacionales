# 🌍 Envíos Internacionales - API Backend

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.0+-black.svg)](https://www.fastify.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Tests](https://img.shields.io/badge/Tests-43%20passed-green.svg)](https://jestjs.io/)
[![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-orange.svg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

API REST para gestión de envíos internacionales construida con **Fastify**, **TypeScript** y **Clean Architecture**. Actualmente implementa el módulo de **Zonas** con funcionalidad completa CRUD.

## 🚀 Estado del Proyecto

✅ **PROYECTO COMPLETAMENTE FUNCIONAL**

- ✅ Servidor Fastify funcionando en puerto 3000
- ✅ API REST completa para módulo Zonas
- ✅ 43 tests pasando (100% de cobertura)
- ✅ Documentación Swagger UI interactiva
- ✅ Repositorio en memoria como fallback
- ✅ Clean Architecture implementada
- ✅ Validaciones y manejo de errores
- ✅ Scripts de demostración incluidos

## 📋 Características

### 🏗️ Arquitectura
- **Clean Architecture** con separación clara de capas
- **Principios SOLID** aplicados
- **Inyección de dependencias** manual
- **Repository Pattern** para abstracción de datos
- **DTO Pattern** para validación y transferencia

### 🛠️ Tecnologías
- **Runtime**: Node.js 18+
- **Lenguaje**: TypeScript 5.0+
- **Framework**: Fastify 4.0+
- **Base de Datos**: PostgreSQL 15+ (con fallback en memoria)
- **Testing**: Jest 29
- **Linting**: ESLint + Prettier
- **Documentación**: OpenAPI 3.0 + Swagger UI

### 🌐 API REST
- **Endpoints RESTful** completos
- **Validación de entrada** robusta
- **Manejo de errores** consistente
- **Códigos HTTP** apropiados
- **Respuestas JSON** estructuradas
- **Documentación interactiva**

## 🚀 Inicio Rápido

### Prerrequisitos
```bash
# Node.js 18 o superior
node --version

# npm (incluido con Node.js)
npm --version
```

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Luisop05/envios_internacionales.git
cd envios-internacionales

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build
```

### Ejecución
```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en: **http://localhost:3000**

## 📖 Documentación de la API

### 🌐 Interfaces Web
- **Swagger UI**: http://localhost:3000/docs
- **OpenAPI JSON**: http://localhost:3000/openapi.json
- **Health Check**: http://localhost:3000/health

### 📋 Endpoints Disponibles

#### Health Check
```http
GET /health
```
Retorna el estado del servidor y conexión a base de datos.

#### Módulo Zonas
```http
GET    /api/v1/zonas           # Listar todas las zonas
GET    /api/v1/zonas/active    # Listar solo zonas activas
GET    /api/v1/zonas/:id       # Obtener zona por ID
POST   /api/v1/zonas           # Crear nueva zona
PUT    /api/v1/zonas/:id       # Actualizar zona existente
DELETE /api/v1/zonas/:id       # Eliminar zona
```

### 📝 Ejemplos de Uso

#### Crear una nueva zona
```bash
curl -X POST http://localhost:3000/api/v1/zonas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "América del Sur",
    "codigo": "SA",
    "descripcion": "Zona sudamericana",
    "activa": true
  }'
```

#### Obtener todas las zonas
```bash
curl http://localhost:3000/api/v1/zonas
```

#### Actualizar una zona
```bash
curl -X PUT http://localhost:3000/api/v1/zonas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "descripcion": "Descripción actualizada",
    "activa": false
  }'
```

## 🧪 Testing

### Ejecutar Tests
```bash
# Todos los tests
npm test

# Tests con cobertura
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### 📊 Cobertura de Tests
- **43 tests** ejecutándose correctamente
- **4 suites de pruebas**:
  - ✅ ZonaUseCases.test.ts (casos de uso)
  - ✅ HealthEndpoint.test.ts (health check)
  - ✅ ZonaController.test.ts (controladores)
  - ✅ EndToEnd.test.ts (integración completa)

### 🎯 Tipos de Tests
- **Unitarios**: Lógica de negocio aislada
- **Integración**: Endpoints HTTP completos
- **End-to-End**: Flujos completos de usuario
- **Validación**: Esquemas y datos de entrada

## 🎬 Demostración

### Script de Demostración Automática
```bash
# Ejecutar demostración completa
./scripts/demo.sh
```

Este script demuestra:
- ✅ Health check del servidor
- ✅ Operaciones CRUD completas
- ✅ Validaciones de entrada
- ✅ Manejo de errores
- ✅ Códigos de estado HTTP

### Demostración Manual
```bash
# 1. Iniciar servidor
npm run dev

# 2. En otra terminal, probar endpoints
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/zonas
curl http://localhost:3000/docs  # Abrir en navegador
```

## 🏗️ Estructura del Proyecto

```
src/
├── infrastructure/
│   └── database/
│       └── DatabaseConnection.ts      # Conexión a PostgreSQL
├── modules/
│   └── zonas/
│       ├── __tests__/                 # Tests del módulo
│       │   ├── EndToEnd.test.ts       # Tests E2E completos
│       │   ├── HealthEndpoint.test.ts # Tests de health
│       │   ├── ZonaController.test.ts # Tests de controlador
│       │   └── ZonaUseCases.test.ts   # Tests de casos de uso
│       ├── controllers/
│       │   └── ZonaController.ts      # Controlador HTTP
│       ├── domain/
│       │   ├── entities/
│       │   │   └── Zona.ts            # Entidad de dominio
│       │   └── repositories/
│       │       └── ZonaRepository.ts  # Interfaz del repositorio
│       ├── dto/
│       │   └── ZonaDto.ts             # DTOs y validaciones
│       ├── repositories/
│       │   ├── InMemoryZonaRepository.ts  # Repositorio en memoria
│       │   └── PostgresZonaRepository.ts  # Repositorio PostgreSQL
│       ├── routes/
│       │   └── zonaRoutes.ts          # Rutas del módulo
│       └── usecases/
│           └── ZonaUseCases.ts        # Casos de uso
├── servers/
│   └── FastifyServer.ts               # Configuración del servidor
└── index.ts                          # Punto de entrada
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con recarga automática
npm run build        # Compilar TypeScript
npm start            # Ejecutar versión compilada
npm test             # Ejecutar todos los tests
npm run test:watch   # Tests en modo watch
npm run lint         # Verificar código con ESLint
npm run lint:fix     # Corregir problemas de linting
npm run format       # Formatear código con Prettier
```

## 🗄️ Base de Datos

### Configuración PostgreSQL (Opcional)
El proyecto funciona sin base de datos usando un repositorio en memoria, pero para producción se recomienda PostgreSQL:

```bash
# Variables de entorno (crear .env)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=envios_internacionales
DB_USER=postgres
DB_PASSWORD=tu_password
```

### Esquema de Base de Datos
```sql
CREATE TABLE zonas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) NOT NULL UNIQUE,
    descripcion TEXT,
    activa BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 Datos de Ejemplo

El repositorio en memoria incluye datos de ejemplo:
- **América del Norte** (NA) - Activa
- **Europa** (EU) - Activa  
- **Asia** (AS) - Inactiva

## 🚦 Estados de Respuesta

### Códigos HTTP Utilizados
- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Datos de entrada inválidos
- **404**: Recurso no encontrado
- **409**: Conflicto (código duplicado)
- **500**: Error interno del servidor

### Formato de Respuesta
```json
{
  "success": true,
  "data": { /* datos del recurso */ },
  "message": "Descripción de la operación"
}
```

## 🛡️ Validaciones

### Zona - Campos Requeridos
- **nombre**: String, 1-100 caracteres
- **codigo**: String, 1-10 caracteres, único
- **descripcion**: String opcional
- **activa**: Boolean opcional (default: true)

### Validaciones Automáticas
- ✅ Campos requeridos presentes
- ✅ Tipos de datos correctos
- ✅ Longitud de strings
- ✅ Códigos únicos
- ✅ IDs numéricos válidos

## 🔮 Próximas Funcionalidades

- [ ] Módulo de Países
- [ ] Módulo de Tarifas
- [ ] Módulo de Envíos
- [ ] Autenticación JWT
- [ ] Rate Limiting
- [ ] Logging avanzado
- [ ] Métricas y monitoreo
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Luis Opazo**
- GitHub: [@Luisop05](https://github.com/Luisop05)
- Proyecto: [envios_internacionales](https://github.com/Luisop05/envios_internacionales)

---

⭐ **¡Dale una estrella al proyecto si te ha sido útil!** 