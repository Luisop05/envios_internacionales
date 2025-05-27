# 📝 EJEMPLO DE USO DEL PROMPT ESTANDARIZADO

## 🎯 Caso de Uso: Sistema de Gestión de Productos

### 1. Parámetros del Proyecto
```
NOMBRE_PROYECTO: sistema-productos
NOMBRE_MODULO: productos
REPO_URL: https://github.com/miempresa/sistema-productos.git
```

### 2. Prompt a Enviar al Asistente IA

```
Eres un asistente de desarrollo backend especializado en crear APIs REST profesionales siguiendo las mejores prácticas de la industria. Tu objetivo es crear un proyecto backend completo, funcional y listo para producción.

Crea un proyecto backend con las siguientes características:
- Framework: Fastify + TypeScript
- Arquitectura: Clean Architecture
- Base de datos: PostgreSQL con fallback en memoria
- Testing: Jest con cobertura completa
- Documentación: OpenAPI 3.0 + Swagger UI
- Calidad: ESLint + Prettier + principios SOLID

PARÁMETROS DEL PROYECTO:
NOMBRE_PROYECTO: sistema-productos
NOMBRE_MODULO: productos
REPO_URL: https://github.com/miempresa/sistema-productos.git

Sigue EXACTAMENTE la estructura y fases definidas en el prompt estandarizado. El proyecto debe incluir:

1. Inicialización completa con npm y dependencias
2. Estructura Clean Architecture con módulo "productos"
3. Repositorios PostgreSQL e InMemory con fallback automático
4. CRUD completo para productos (nombre, codigo, precio, activo, etc.)
5. Testing completo (40+ tests mínimo)
6. Documentación Swagger UI en /docs
7. Script de demostración ejecutable
8. Git configurado y pusheado

CRITERIOS DE ÉXITO OBLIGATORIOS:
✅ Servidor funciona en puerto 3000
✅ Swagger UI en /docs
✅ 40+ tests pasando
✅ CRUD completo funcional
✅ Repositorio en memoria con datos de ejemplo
✅ Script demo ejecutable
✅ Clean Architecture implementada

¡El resultado debe ser un proyecto 100% funcional y listo para producción!
```

### 3. Resultado Esperado

Al finalizar, tendrás:

#### Estructura del Proyecto
```
sistema-productos/
├── src/
│   ├── infrastructure/database/DatabaseConnection.ts
│   ├── modules/productos/
│   │   ├── __tests__/
│   │   │   ├── ProductoUseCases.test.ts
│   │   │   ├── ProductoController.test.ts
│   │   │   ├── HealthEndpoint.test.ts
│   │   │   └── EndToEnd.test.ts
│   │   ├── controllers/ProductoController.ts
│   │   ├── domain/
│   │   │   ├── entities/Producto.ts
│   │   │   └── repositories/ProductoRepository.ts
│   │   ├── dto/ProductoDto.ts
│   │   ├── repositories/
│   │   │   ├── InMemoryProductoRepository.ts
│   │   │   └── PostgresProductoRepository.ts
│   │   ├── routes/productoRoutes.ts
│   │   └── usecases/ProductoUseCases.ts
│   ├── servers/FastifyServer.ts
│   └── index.ts
├── docs/
│   ├── openapi.json
│   └── swagger-ui.html
├── scripts/demo.sh
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── .gitignore
├── env.example
└── README.md
```

#### Endpoints Disponibles
```
GET    /health                     # Health check
GET    /api/v1/productos           # Listar todos los productos
GET    /api/v1/productos/active    # Listar productos activos
GET    /api/v1/productos/:id       # Obtener producto por ID
POST   /api/v1/productos           # Crear nuevo producto
PUT    /api/v1/productos/:id       # Actualizar producto
DELETE /api/v1/productos/:id       # Eliminar producto
```

#### Comandos Funcionales
```bash
npm run dev          # Servidor en http://localhost:3000
npm test             # 40+ tests pasando
./scripts/demo.sh    # Demostración completa
```

#### URLs Accesibles
- http://localhost:3000/docs (Swagger UI)
- http://localhost:3000/health (Health check)
- http://localhost:3000/api/v1/productos (API)

### 4. Datos de Ejemplo Incluidos

El repositorio en memoria incluirá productos como:
```json
[
  {
    "id": 1,
    "nombre": "Laptop Dell XPS 13",
    "codigo": "DELL-XPS13",
    "precio": 1299.99,
    "descripcion": "Laptop ultrabook de alta gama",
    "activo": true,
    "fechaCreacion": "2024-01-01T00:00:00Z",
    "fechaActualizacion": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "nombre": "iPhone 15 Pro",
    "codigo": "IPHONE-15PRO",
    "precio": 999.99,
    "descripcion": "Smartphone Apple última generación",
    "activo": true,
    "fechaCreacion": "2024-01-01T00:00:00Z",
    "fechaActualizacion": "2024-01-01T00:00:00Z"
  }
]
```

### 5. Validaciones Implementadas

- **nombre**: String requerido, 1-100 caracteres
- **codigo**: String requerido, 1-20 caracteres, único
- **precio**: Number requerido, mayor a 0
- **descripcion**: String opcional
- **activo**: Boolean opcional (default: true)

### 6. Tests Incluidos

- ✅ Tests unitarios de casos de uso
- ✅ Tests de integración de controladores
- ✅ Tests end-to-end completos
- ✅ Tests de validaciones
- ✅ Tests de manejo de errores
- ✅ Health check tests

---

## 🔄 Otros Ejemplos de Uso

### Sistema de Usuarios
```
NOMBRE_PROYECTO: sistema-usuarios
NOMBRE_MODULO: usuarios
REPO_URL: https://github.com/miempresa/sistema-usuarios.git
```

### Sistema de Inventario
```
NOMBRE_PROYECTO: inventario-almacen
NOMBRE_MODULO: articulos
REPO_URL: https://github.com/miempresa/inventario-almacen.git
```

### Sistema de Clientes
```
NOMBRE_PROYECTO: gestion-clientes
NOMBRE_MODULO: clientes
REPO_URL: https://github.com/miempresa/gestion-clientes.git
```

---

## 💡 Consejos para Mejores Resultados

1. **Sé específico** con los nombres de proyecto y módulo
2. **Usa nombres en singular** para el módulo (producto, usuario, cliente)
3. **Proporciona URL de repositorio válida** en GitHub
4. **Verifica que Node.js 18+** esté instalado
5. **Asegúrate de tener permisos** de escritura en el directorio

---

## 🚨 Solución de Problemas Comunes

### Puerto 3000 ocupado
```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# Detener proceso
kill -9 [PID]
```

### PostgreSQL no disponible
- ✅ El sistema automáticamente usa repositorio en memoria
- ✅ Todos los endpoints funcionan igual
- ✅ Tests pasan sin problemas

### Errores de permisos
```bash
# Verificar permisos del directorio
ls -la

# Cambiar permisos si es necesario
chmod 755 .
```

---

**¡Con este prompt estandarizado, cualquier desarrollador puede crear un proyecto backend profesional en 30-60 minutos!** 