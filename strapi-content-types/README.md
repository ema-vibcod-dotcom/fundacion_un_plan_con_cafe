# Content Types para Strapi

Este directorio contiene los esquemas de los Content Types que deben crearse en Strapi.

## 📋 Instrucciones de Instalación

### Opción 1: Crear manualmente en Strapi Admin

1. Iniciar Strapi: `cd backend && npm run develop`
2. Acceder a http://localhost:1337/admin
3. Crear cada Content Type desde el panel de administración
4. Configurar los campos según los esquemas proporcionados

### Opción 2: Usar los archivos schema.json (Recomendado)

1. Copiar cada carpeta (`proyecto`, `producto`, `episodio-podcast`) a `backend/src/api/`
2. Reiniciar Strapi
3. Los Content Types se crearán automáticamente

## 📦 Content Types Incluidos

### 1. Proyecto
- **Ruta API**: `/api/proyectos`
- **Campos**: Título, Descripción (rich text), Estado, Fechas, Galería, Video

### 2. Producto
- **Ruta API**: `/api/productos`
- **Campos**: Nombre, Precio, Stock, Estado, Galería, Video del creador, Historia del creador

### 3. Episodio Podcast
- **Ruta API**: `/api/episodios-podcast`
- **Campos**: Título, Descripción, Fecha, URLs de plataformas, Imagen de portada

## 🔧 Configuración Post-Instalación

Después de crear los Content Types:

1. **Configurar Permisos**:
   - Settings > Roles > Authenticated
   - Habilitar `find`, `findOne`, `create`, `update`, `delete` para cada Content Type

2. **Configurar Public Permissions** (para el frontend):
   - Settings > Roles > Public
   - Habilitar solo `find` y `findOne` para lectura pública

3. **Configurar Upload Plugin**:
   - Settings > Media Library
   - Configurar tamaños máximos y formatos permitidos

## 📝 Notas

- Los campos `slug` se generan automáticamente desde `titulo` o `nombre`
- Los campos `draftAndPublish` permiten guardar borradores antes de publicar
- Los campos de tipo `richtext` usan el editor visual de Strapi
- Los campos de tipo `media` permiten subir imágenes y videos optimizados
