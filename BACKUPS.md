# Plan de Backups - Libros API

## 1. Información a respaldar

- Base de datos PostgreSQL: tabla libros con toda la información de los registros.
- Esquema de la base de datos: estructura de tablas, tipos de datos y restricciones.
- Variables de entorno: archivo .env con configuraciones sensibles, almacenado de forma segura.

## 2. Frecuencia de los respaldos

| Tipo de respaldo | Frecuencia | Retención |
| --- | --- | --- |
| Respaldo automático (Render) | Diario (automático por la plataforma) | 7 días |
| Exportación manual (dump SQL) | Semanal (realizado por el administrador) | 30 días |
| Snapshot de la base de datos | Mensual | 90 días |

## 3. Lugar de almacenamiento

- Respaldo automático: almacenado internamente por Render en su infraestructura cloud.
- Exportación manual: descargado como archivo .sql y almacenado en Google Drive o almacenamiento local seguro.
- Snapshot: almacenado en el panel de Render dentro de la sección de la base de datos.

## 4. Procedimiento de recuperación ante fallos

### Escenario A: Datos eliminados accidentalmente

1. Acceder al panel de Render → PostgreSQL → Backups.
2. Seleccionar el respaldo más reciente anterior al error.
3. Hacer clic en "Restore" para sobreescribir la base de datos.
4. Verificar los datos mediante el endpoint GET /api/libros.

### Escenario B: Corrupción de la base de datos

1. Crear una nueva base de datos PostgreSQL en Render.
2. Actualizar las variables de entorno en el servicio web con las nuevas credenciales.
3. Importar el dump SQL más reciente usando psql:

```bash
psql -h nueva-host -U nuevo_usuario -d nueva_db < backup.sql
```

4. Reiniciar el servicio web desde el panel de Render.
5. Verificar mediante GET /health y GET /api/libros.

### Escenario C: Pérdida total del servicio en Render

1. Crear una nueva cuenta o servicio en Render.
2. Conectar el repositorio de GitHub.
3. Configurar las variables de entorno desde el .env guardado de forma segura.
4. Crear una nueva base de datos PostgreSQL.
5. Importar el dump SQL manual más reciente.
6. Desplegar y verificar todos los endpoints.

## 5. Comandos útiles para respaldos manuales

```bash
# Exportar base de datos completa
pg_dump -h host -U usuario -d libros_db -F c -f backup_libros.dump

# Exportar como SQL plano
pg_dump -h host -U usuario -d libros_db > backup_libros.sql

# Importar desde dump
pg_restore -h host -U usuario -d libros_db backup_libros.dump

# Importar desde SQL
psql -h host -U usuario -d libros_db < backup_libros.sql
```

## 6. Responsable

El administrador del proyecto es responsable de:

- Verificar semanalmente que los respaldos automáticos se ejecuten correctamente.
- Realizar la exportación manual semanal.
- Probar el procedimiento de recuperación al menos una vez al mes.
- Mantener actualizado este documento.