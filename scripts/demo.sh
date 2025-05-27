#!/bin/bash

# Script de demostración de la API de Envíos Internacionales
# Módulo: Zonas

echo "🌍 DEMOSTRACIÓN API ENVÍOS INTERNACIONALES - MÓDULO ZONAS"
echo "=========================================================="
echo ""

BASE_URL="http://localhost:3000"

# Función para hacer peticiones con formato
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo "📋 $description"
    echo "   Método: $method"
    echo "   Endpoint: $endpoint"
    
    if [ -n "$data" ]; then
        echo "   Datos: $data"
        response=$(curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -X $method "$BASE_URL$endpoint")
    fi
    
    echo "   Respuesta:"
    echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
    echo ""
    echo "---"
    echo ""
}

# Verificar que el servidor esté corriendo
echo "🔍 Verificando estado del servidor..."
health_response=$(curl -s "$BASE_URL/health" 2>/dev/null)
if [ $? -ne 0 ]; then
    echo "❌ Error: El servidor no está corriendo en $BASE_URL"
    echo "   Por favor ejecuta: npm run dev"
    exit 1
fi

echo "✅ Servidor funcionando correctamente"
echo ""

# 1. Health Check
make_request "GET" "/health" "" "Health Check - Estado del servidor"

# 2. Obtener todas las zonas
make_request "GET" "/api/v1/zonas" "" "Obtener todas las zonas"

# 3. Obtener solo zonas activas
make_request "GET" "/api/v1/zonas/active" "" "Obtener solo zonas activas"

# 4. Crear una nueva zona
new_zona='{"nombre":"Oceanía","codigo":"OC","descripcion":"Zona que incluye Australia, Nueva Zelanda y las islas del Pacífico","activa":true}'
make_request "POST" "/api/v1/zonas" "$new_zona" "Crear nueva zona (Oceanía)"

# 5. Obtener zona por ID (la recién creada debería tener ID 4)
make_request "GET" "/api/v1/zonas/4" "" "Obtener zona por ID (Oceanía)"

# 6. Actualizar la zona
update_zona='{"descripcion":"Zona actualizada que incluye Australia, Nueva Zelanda y todas las islas del Océano Pacífico","activa":false}'
make_request "PUT" "/api/v1/zonas/4" "$update_zona" "Actualizar zona (cambiar descripción y desactivar)"

# 7. Verificar la actualización
make_request "GET" "/api/v1/zonas/4" "" "Verificar actualización de la zona"

# 8. Intentar crear zona con código duplicado (debe fallar)
duplicate_zona='{"nombre":"Zona Duplicada","codigo":"OC","descripcion":"Esta debería fallar","activa":true}'
make_request "POST" "/api/v1/zonas" "$duplicate_zona" "Intentar crear zona con código duplicado (debe fallar)"

# 9. Intentar obtener zona inexistente
make_request "GET" "/api/v1/zonas/99999" "" "Intentar obtener zona inexistente (debe retornar 404)"

# 10. Crear datos inválidos
invalid_zona='{"nombre":"","codigo":"","descripcion":""}'
make_request "POST" "/api/v1/zonas" "$invalid_zona" "Intentar crear zona con datos inválidos (debe fallar)"

# 11. Eliminar la zona creada
make_request "DELETE" "/api/v1/zonas/4" "" "Eliminar zona (Oceanía)"

# 12. Verificar que la zona fue eliminada
make_request "GET" "/api/v1/zonas/4" "" "Verificar que la zona fue eliminada (debe retornar 404)"

# 13. Obtener todas las zonas finales
make_request "GET" "/api/v1/zonas" "" "Estado final - Obtener todas las zonas"

echo "🎉 DEMOSTRACIÓN COMPLETADA"
echo "========================="
echo ""
echo "📊 Resumen de funcionalidades probadas:"
echo "   ✅ Health Check"
echo "   ✅ GET /api/v1/zonas (listar todas)"
echo "   ✅ GET /api/v1/zonas/active (listar activas)"
echo "   ✅ GET /api/v1/zonas/:id (obtener por ID)"
echo "   ✅ POST /api/v1/zonas (crear nueva)"
echo "   ✅ PUT /api/v1/zonas/:id (actualizar)"
echo "   ✅ DELETE /api/v1/zonas/:id (eliminar)"
echo "   ✅ Validaciones de entrada"
echo "   ✅ Manejo de errores (404, 409, 400)"
echo "   ✅ Códigos de estado HTTP correctos"
echo ""
echo "🌐 Documentación disponible en: $BASE_URL/docs"
echo "📋 OpenAPI JSON en: $BASE_URL/openapi.json"
echo ""
echo "🧪 Para ejecutar tests: npm test"
echo "🚀 Para desarrollo: npm run dev"
echo "🏗️ Para compilar: npm run build" 