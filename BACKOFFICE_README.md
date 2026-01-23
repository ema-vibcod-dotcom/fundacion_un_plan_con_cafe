# Sistema de Administración - Backoffice

## 📋 Resumen

Sistema completo de administración para la Fundación Un Plan con Café, utilizando **Strapi** como Headless CMS y **React** como frontend. Permite que administradores no técnicos gestionen todo el contenido del sitio mediante formularios visuales.

---

## 📁 Estructura de Archivos

```
fundacion-un-plan-con-cafe/
│
├── 📄 BACKOFFICE_SETUP.md          # Guía de instalación y configuración
├── 📄 STRAPI_CONFIG.md              # Configuración detallada de Strapi
├── 📄 IMPLEMENTACION_GUIA.md        # Guía paso a paso de implementación
├── 📄 BUENAS_PRACTICAS.md           # Buenas prácticas y optimización
│
├── 📁 strapi-content-types/          # Modelos de contenido para Strapi
│   ├── proyecto/
│   │   └── schema.json              # Schema del Content Type "Proyecto"
│   ├── producto/
│   │   └── schema.json              # Schema del Content Type "Producto"
│   ├── episodio-podcast/
│   │   └── schema.json              # Schema del Content Type "Episodio Podcast"
│   └── README.md                    # Instrucciones de instalación
│
└── 📁 src/
    ├── services/                    # Servicios para consumir Strapi API
    │   ├── strapiConfig.js          # Configuración base
    │   ├── proyectoService.js       # Servicios de proyectos
    │   ├── productoService.js       # Servicios de productos
    │   └── podcastService.js        # Servicios de podcast
    │
    └── components/
        └── examples/                # Componentes de ejemplo
            ├── ProyectoCard.jsx     # Ejemplo: Mostrar proyecto
            ├── ProductoCard.jsx      # Ejemplo: Mostrar producto
            └── EpisodioPodcastCard.jsx # Ejemplo: Mostrar episodio
```

---

## 🚀 Inicio Rápido

### 1. Instalar Strapi

```bash
npx create-strapi-app@latest backend --quickstart
```

### 2. Configurar Content Types

Copiar las carpetas de `strapi-content-types/` a `backend/src/api/`

### 3. Configurar Variables de Entorno

Crear `.env` en `frontend/`:
```env
VITE_STRAPI_API_URL=http://localhost:1337
```

### 4. Iniciar Strapi

```bash
cd backend
npm run develop
```

### 5. Configurar Permisos

En Strapi Admin (http://localhost:1337/admin):
- Settings > Roles > Public: Habilitar `find` y `findOne`
- Settings > Roles > Authenticated: Habilitar todos los permisos

### 6. Usar en React

```javascript
import { getProyectos } from './services/proyectoService';

const response = await getProyectos();
console.log(response.data);
```

---

## 📚 Documentación

### Para Instalación
👉 Ver [BACKOFFICE_SETUP.md](./BACKOFFICE_SETUP.md)

### Para Configuración de Strapi
👉 Ver [STRAPI_CONFIG.md](./STRAPI_CONFIG.md)

### Para Implementación Paso a Paso
👉 Ver [IMPLEMENTACION_GUIA.md](./IMPLEMENTACION_GUIA.md)

### Para Buenas Prácticas
👉 Ver [BUENAS_PRACTICAS.md](./BUENAS_PRACTICAS.md)

---

## 🎯 Funcionalidades

### ✅ Proyectos de la Fundación
- Crear, editar y eliminar proyectos
- Campos: Título, Descripción (rich text), Estado, Fechas, Galería, Video
- Estados: En curso, Completado, Urgente

### ✅ Tienda Solidaria
- Gestión completa de productos
- Control de inventario (stock)
- Activar/desactivar productos
- Campos: Nombre, Precio, Stock, Estado, Galería, Video del creador, Historia del creador

### ✅ Podcast
- Archivo de episodios
- Campos: Título, Descripción, Fecha, URLs de plataformas (Spotify, Apple, YouTube)

### ✅ Multimedia
- Subida de imágenes optimizadas
- Subida de videos cortos
- Lazy loading en el frontend

---

## 🔧 Tecnologías

- **Frontend**: React + Vite
- **Backend**: Strapi (Headless CMS)
- **API**: REST API
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Almacenamiento**: Local (desarrollo) / Cloudinary (producción opcional)

---

## 📝 Endpoints Principales

### Proyectos
- `GET /api/proyectos` - Listar proyectos
- `GET /api/proyectos/:id` - Obtener proyecto por ID
- `GET /api/proyectos?filters[slug][$eq]=:slug` - Obtener por slug

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/:id` - Obtener producto por ID
- `GET /api/productos?filters[activo][$eq]=true` - Productos activos

### Podcast
- `GET /api/episodios-podcast` - Listar episodios
- `GET /api/episodios-podcast/:id` - Obtener episodio por ID

---

## 🎨 Colores del Sistema

El sistema usa los colores existentes de la web:
- **Principal**: `bg-amber-900`, `text-amber-900`
- **Secundario**: `bg-amber-800`, `bg-amber-50`
- **Fondos**: `bg-gradient-to-br from-amber-50 to-amber-100`

---

## 🔐 Roles y Permisos

### Administrador
- Acceso completo a todos los contenidos
- Puede gestionar usuarios y roles
- Acceso a configuraciones

### Editor
- Puede crear, editar y eliminar contenido
- No puede gestionar usuarios
- Acceso limitado a configuraciones

---

## 📞 Soporte

Para dudas o problemas:
1. Revisar la documentación en los archivos `.md`
2. Consultar [Documentación de Strapi](https://docs.strapi.io/)
3. Revisar los ejemplos en `src/components/examples/`

---

## ✅ Checklist de Implementación

- [ ] Strapi instalado
- [ ] Content Types creados
- [ ] Permisos configurados
- [ ] Variables de entorno configuradas
- [ ] Servicios de React funcionando
- [ ] Componentes integrados
- [ ] Páginas actualizadas
- [ ] Pruebas realizadas

---

## 🎓 Próximos Pasos

1. **Instalar Strapi** siguiendo `BACKOFFICE_SETUP.md`
2. **Configurar Content Types** desde `strapi-content-types/`
3. **Integrar con React** usando los servicios en `src/services/`
4. **Actualizar páginas** siguiendo `IMPLEMENTACION_GUIA.md`
5. **Optimizar** siguiendo `BUENAS_PRACTICAS.md`

---

¡Listo para comenzar! 🚀
