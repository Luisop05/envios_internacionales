# 📚 SISTEMA DE PROMPTS ESTANDARIZADOS - BACKEND

## 🎯 Propósito

Este sistema de prompts estandarizados permite a cualquier desarrollador de la empresa crear proyectos backend profesionales de forma consistente y eficiente usando asistentes de IA.

## 📁 Archivos Disponibles

### 1. `PROMPT_ESTANDAR_BACKEND.md`
**Prompt completo y detallado** (Recomendado para proyectos importantes)
- ✅ Instrucciones paso a paso completas
- ✅ 8 fases de implementación detalladas
- ✅ Criterios de éxito específicos
- ✅ Solución de problemas incluida
- ✅ Documentación exhaustiva

**Cuándo usar**: Proyectos de producción, nuevos desarrolladores, proyectos complejos

### 2. `PROMPT_RAPIDO.md`
**Prompt conciso para uso rápido** (Para desarrolladores experimentados)
- ✅ Instrucciones esenciales
- ✅ Especificaciones técnicas claras
- ✅ Criterios de éxito resumidos
- ✅ Formato compacto

**Cuándo usar**: Prototipos rápidos, desarrolladores experimentados, proyectos simples

### 3. `EJEMPLO_USO_PROMPT.md`
**Ejemplos prácticos de implementación**
- ✅ Casos de uso reales
- ✅ Parámetros de ejemplo
- ✅ Resultados esperados
- ✅ Solución de problemas

**Cuándo usar**: Primera vez usando los prompts, referencia rápida

## 🚀 Cómo Usar

### Paso 1: Elegir el Prompt Apropiado
```
Proyecto de Producción → PROMPT_ESTANDAR_BACKEND.md
Prototipo Rápido     → PROMPT_RAPIDO.md
Primera Vez          → EJEMPLO_USO_PROMPT.md
```

### Paso 2: Preparar Parámetros
```
NOMBRE_PROYECTO: [tu-proyecto]
NOMBRE_MODULO: [modulo-principal]
REPO_URL: [github-url]
```

### Paso 3: Enviar al Asistente IA
- Copia el prompt completo
- Reemplaza los parámetros
- Envía al asistente (Claude, ChatGPT, etc.)

### Paso 4: Verificar Resultado
- ✅ Servidor funciona en puerto 3000
- ✅ Tests pasan (40+ mínimo)
- ✅ Swagger UI en `/docs`
- ✅ Script demo ejecutable

## 🏗️ Arquitectura Generada

Todos los prompts generan la misma arquitectura estandarizada:

```
proyecto/
├── src/
│   ├── infrastructure/database/
│   │   ├── modules/[MODULO]/
│   │   │   ├── __tests__/ (4 archivos)
│   │   │   ├── controllers/
│   │   │   ├── domain/entities/
│   │   │   ├── domain/repositories/
│   │   │   ├── dto/
│   │   │   ├── repositories/ (PostgreSQL + InMemory)
│   │   │   ├── routes/
│   │   │   └── usecases/
│   │   ├── servers/
│   │   └── index.ts
│   ├── docs/ (OpenAPI + Swagger)
│   ├── scripts/ (demo.sh)
│   └── [archivos de configuración]
```

## 🛠️ Stack Tecnológico Estándar

- **Framework**: Fastify + TypeScript
- **Arquitectura**: Clean Architecture + SOLID
- **Base de datos**: PostgreSQL + fallback InMemory
- **Testing**: Jest (40+ tests)
- **Documentación**: OpenAPI 3.0 + Swagger UI
- **Calidad**: ESLint + Prettier
- **Git**: Configuración automática

## ✅ Garantías de Calidad

Todos los proyectos generados incluyen:

### 🚀 Funcionalidad
- Servidor funcional en puerto 3000
- CRUD completo para el módulo
- Health check endpoint
- Validaciones robustas
- Manejo de errores consistente

### 🧪 Testing
- Tests unitarios (casos de uso)
- Tests de integración (controladores)
- Tests end-to-end (flujos completos)
- Cobertura mínima 40+ tests

### 📚 Documentación
- README completo con badges
- Swagger UI interactiva
- OpenAPI 3.0 specification
- Script de demostración

### 🏗️ Arquitectura
- Clean Architecture implementada
- Principios SOLID aplicados
- Inyección de dependencias
- Separación clara de capas

## 🔄 Casos de Uso Comunes

### E-commerce
```
NOMBRE_PROYECTO: tienda-online
NOMBRE_MODULO: productos
```

### CRM
```
NOMBRE_PROYECTO: sistema-crm
NOMBRE_MODULO: clientes
```

### Inventario
```
NOMBRE_PROYECTO: control-inventario
NOMBRE_MODULO: articulos
```

### Usuarios
```
NOMBRE_PROYECTO: gestion-usuarios
NOMBRE_MODULO: usuarios
```

## 🚨 Solución de Problemas

### Puerto 3000 ocupado
```bash
lsof -i :3000
kill -9 [PID]
```

### PostgreSQL no disponible
- ✅ Sistema usa automáticamente repositorio en memoria
- ✅ Funcionalidad completa sin base de datos externa

### Tests fallan
```bash
npm test -- --verbose
```

### Servidor no inicia
```bash
npm run build
npm run lint
```

## 📊 Métricas de Éxito

Un proyecto exitoso debe tener:
- ✅ **40+ tests** pasando
- ✅ **7 endpoints** funcionando
- ✅ **0 errores** de linting
- ✅ **100% compilación** TypeScript
- ✅ **Swagger UI** accesible
- ✅ **Demo script** ejecutable

## 🔮 Próximas Mejoras

- [ ] Prompts para microservicios
- [ ] Integración con Docker
- [ ] Prompts para GraphQL
- [ ] Templates para diferentes dominios
- [ ] Integración con CI/CD

## 📞 Soporte

### Para Desarrolladores
1. Revisa `EJEMPLO_USO_PROMPT.md` primero
2. Usa `PROMPT_RAPIDO.md` para casos simples
3. Usa `PROMPT_ESTANDAR_BACKEND.md` para casos complejos

### Para Líderes Técnicos
- Todos los prompts siguen estándares de la empresa
- Arquitectura consistente en todos los proyectos
- Calidad garantizada con criterios objetivos

### Para DevOps
- Proyectos listos para containerización
- Variables de entorno estandarizadas
- Scripts de deployment incluidos

---

## 🏆 Beneficios del Sistema

### ⚡ Velocidad
- **30-60 minutos** para proyecto completo
- **0 configuración manual** requerida
- **Inmediatamente funcional**

### 🎯 Consistencia
- **Misma arquitectura** en todos los proyectos
- **Estándares de código** uniformes
- **Documentación** consistente

### 🛡️ Calidad
- **Testing automático** incluido
- **Validaciones** implementadas
- **Manejo de errores** robusto

### 📈 Escalabilidad
- **Clean Architecture** preparada para crecimiento
- **Principios SOLID** aplicados
- **Fácil mantenimiento**

---

**¡Con este sistema, cualquier desarrollador puede crear proyectos backend de calidad profesional de forma rápida y consistente!**

*Creado por: [Tu Empresa] - Equipo de Arquitectura*
*Versión: 1.0 - [Fecha]* 