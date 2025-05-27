# 🚀 PROMPT RÁPIDO - BACKEND API REST

## 📋 INSTRUCCIÓN PARA IA

Crea un proyecto backend completo con Fastify + TypeScript + Clean Architecture siguiendo estos parámetros:

**PARÁMETROS REQUERIDOS:**
```
NOMBRE_PROYECTO: [nombre-proyecto]
NOMBRE_MODULO: [modulo-principal] 
REPO_URL: [github-url]
```

## 🎯 ESPECIFICACIONES TÉCNICAS

### Stack Tecnológico
- **Framework**: Fastify + TypeScript
- **Arquitectura**: Clean Architecture + SOLID
- **Base de datos**: PostgreSQL + fallback en memoria
- **Testing**: Jest (40+ tests mínimo)
- **Documentación**: OpenAPI 3.0 + Swagger UI
- **Calidad**: ESLint + Prettier

### Estructura Obligatoria
```
src/
├── infrastructure/database/DatabaseConnection.ts
├── modules/[MODULO]/
│   ├── __tests__/ (4 archivos de test)
│   ├── controllers/[Modulo]Controller.ts
│   ├── domain/entities/[Modulo].ts
│   ├── domain/repositories/[Modulo]Repository.ts
│   ├── dto/[Modulo]Dto.ts
│   ├── repositories/
│   │   ├── InMemory[Modulo]Repository.ts
│   │   └── Postgres[Modulo]Repository.ts
│   ├── routes/[modulo]Routes.ts
│   └── usecases/[Modulo]UseCases.ts
├── servers/FastifyServer.ts
└── index.ts
```

### Endpoints Obligatorios
```
GET    /health
GET    /api/v1/[modulos]
GET    /api/v1/[modulos]/active  
GET    /api/v1/[modulos]/:id
POST   /api/v1/[modulos]
PUT    /api/v1/[modulos]/:id
DELETE /api/v1/[modulos]/:id
```

### Archivos de Configuración
- `package.json` (scripts completos)
- `tsconfig.json` 
- `.eslintrc.json`
- `.prettierrc`
- `jest.config.js`
- `.gitignore`
- `env.example`

### Documentación Requerida
- `README.md` completo con badges
- `docs/openapi.json`
- `docs/swagger-ui.html`
- `scripts/demo.sh` (script de demostración)

## ✅ CRITERIOS DE ÉXITO

**OBLIGATORIO - TODOS deben cumplirse:**

1. ✅ Servidor funciona en puerto 3000
2. ✅ Swagger UI en `/docs`
3. ✅ 40+ tests pasando (npm test)
4. ✅ CRUD completo funcional
5. ✅ Repositorio en memoria con datos de ejemplo
6. ✅ Fallback automático PostgreSQL → Memoria
7. ✅ Script demo ejecutable (`./scripts/demo.sh`)
8. ✅ Git configurado y pusheado
9. ✅ Clean Architecture implementada
10. ✅ Validaciones y manejo de errores

## 🚨 INSTRUCCIONES CRÍTICAS

- **NO omitas ningún paso**
- **Ejecuta tests después de cada fase**
- **Verifica que todo funciona antes de continuar**
- **Usa repositorio en memoria si PostgreSQL falla**
- **Documenta todo lo implementado**

## 🎯 RESULTADO ESPERADO

Al finalizar, el usuario debe poder ejecutar:
```bash
npm run dev     # Servidor en puerto 3000
npm test        # Todos los tests pasan
./scripts/demo.sh # Demostración completa
```

Y acceder a:
- http://localhost:3000/docs (Swagger UI)
- http://localhost:3000/health (Health check)
- http://localhost:3000/api/v1/[modulos] (API funcional)

**¡El proyecto debe estar 100% funcional y listo para producción!** 