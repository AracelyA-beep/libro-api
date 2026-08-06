
---

## 📄 Archivo 12: `README.md`

```markdown
# 📚 Libros API

API REST para la gestión de libros construida con Node.js, Express y PostgreSQL.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Información de la API |
| GET | `/health` | Verificar estado del servicio y base de datos |
| GET | `/api/libros` | Obtener todos los libros |
| GET | `/api/libros/:id` | Obtener un libro por ID |
| POST | `/api/libros` | Crear un nuevo libro |

## Ejemplo de uso - Crear libro

```json
POST /api/libros
Content-Type: application/json

{
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "anio_publicacion": 1967,
  "genero": "Realismo mágico"
}