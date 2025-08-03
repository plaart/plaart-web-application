# APIs

## Proyectos

### Crear proyectos

curl -X POST <http://localhost:8080/api/v1/projects?userId=user123> \
 -H "Content-Type: application/json" \
 -d '{"name":"Mi Proyecto","description":"Descripción del proyecto"}'

### Obtener proyectos

curl <http://localhost:8080/api/v1/projects?userId=user123>

### Buscar proyectos

curl <http://localhost:8080/api/v1/projects/search?userId=user123&searchTerm=diseño>

#### Endpoints de Proyectos

- `GET /api/v1/projects` - Obtener todos los proyectos
- `GET /api/v1/projects/{id}` - Obtener proyecto por ID
- `POST /api/v1/projects` - Crear nuevo proyecto
- `PUT /api/v1/projects/{id}` - Actualizar proyecto
- `DELETE /api/v1/projects/{id}` - Eliminar proyecto
- `GET /api/v1/projects/search` - Buscar proyectos
- `GET /api/v1/projects/count` - Contar proyectos
