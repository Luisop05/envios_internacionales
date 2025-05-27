# Envíos Internacionales API

API REST para gestión de envíos internacionales desarrollada con Fastify, TypeScript y Clean Architecture.

## 🚀 Características

- **Clean Architecture**: Separación clara de responsabilidades
- **TypeScript**: Tipado estático para mayor robustez
- **Fastify**: Framework web rápido y eficiente
- **PostgreSQL**: Base de datos relacional con driver nativo `pg`
- **Jest**: Testing unitario y de integración
- **ESLint + Prettier**: Linting y formateo de código
- **OpenAPI 3.0**: Documentación automática de la API
- **Swagger UI**: Interfaz interactiva para la documentación

## 📁 Estructura del Proyecto

```
src/
├── infrastructure/
│   └── database/
├── modules/
│   └── zonas/
│       ├── __tests__/
│       ├── controllers/
│       ├── domain/
│       │   ├── entities/
│       │   └── repositories/
│       ├── dto/
│       ├── repositories/
│       ├── routes/
│       └── usecases/
├── servers/
└── middlewares/
docs/
├── openapi.json
└── swagger-ui.html
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Luisop05/envios_internacionales.git
   cd envios-internacionales
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Configurar base de datos PostgreSQL**
   ```sql
   CREATE DATABASE envios_internacionales;
   
   CREATE TABLE zonas (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     codigo VARCHAR(50) UNIQUE NOT NULL,
     descripcion TEXT,
     activa BOOLEAN DEFAULT true,
     fecha_creacion TIMESTAMP DEFAULT NOW(),
     fecha_actualizacion TIMESTAMP DEFAULT NOW()
   );
   ```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor en modo desarrollo
npm run build        # Compila TypeScript a JavaScript
npm start            # Inicia el servidor en producción

# Testing
npm test             # Ejecuta todos los tests
npm run test:watch   # Ejecuta tests en modo watch
npm run test:coverage # Ejecuta tests con reporte de cobertura

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Ejecuta ESLint y corrige errores automáticamente
npm run format       # Formatea código con Prettier
```

## 📚 Documentación de la API

Una vez iniciado el servidor, la documentación estará disponible en:

- **Swagger UI**: http://localhost:3000/docs
- **OpenAPI JSON**: http://localhost:3000/openapi.json
- **Health Check**: http://localhost:3000/health

## 🧪 Testing

El proyecto incluye tests unitarios y de integración:

- **Tests unitarios**: Para casos de uso y lógica de negocio
- **Tests de integración**: Para endpoints y controladores
- **Cobertura**: Reportes detallados de cobertura de código

```bash
# Ejecutar todos los tests
npm test

# Ver cobertura
npm run test:coverage
```

## 🏗️ Arquitectura

### Clean Architecture

El proyecto sigue los principios de Clean Architecture:

1. **Entities**: Modelos de dominio (`src/modules/zonas/domain/entities/`)
2. **Use Cases**: Lógica de negocio (`src/modules/zonas/usecases/`)
3. **Interface Adapters**: Controladores y DTOs (`src/modules/zonas/controllers/`, `src/modules/zonas/dto/`)
4. **Frameworks & Drivers**: Repositorios y infraestructura (`src/modules/zonas/repositories/`, `src/infrastructure/`)

### Principios SOLID

- **S**ingle Responsibility: Cada clase tiene una única responsabilidad
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Las implementaciones pueden sustituir sus interfaces
- **I**nterface Segregation: Interfaces específicas y cohesivas
- **D**ependency Inversion: Dependencias hacia abstracciones, no concreciones

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `HOST` | Host del servidor | `0.0.0.0` |
| `LOG_LEVEL` | Nivel de logging | `info` |
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_NAME` | Nombre de la base de datos | `envios_internacionales` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `password` |

## 📝 API Endpoints

### Zonas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/v1/zonas` | Obtener todas las zonas |
| `GET` | `/api/v1/zonas/active` | Obtener zonas activas |
| `GET` | `/api/v1/zonas/:id` | Obtener zona por ID |
| `POST` | `/api/v1/zonas` | Crear nueva zona |
| `PUT` | `/api/v1/zonas/:id` | Actualizar zona |
| `DELETE` | `/api/v1/zonas/:id` | Eliminar zona |

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/health` | Estado del servidor y base de datos |

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Equipo

- **Desarrollo**: Equipo VibeCoding
- **Contacto**: dev@envios-internacionales.com 