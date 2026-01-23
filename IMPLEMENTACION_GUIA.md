# Guía de Implementación - Sistema de Administración

## 📋 Resumen del Sistema

Este sistema permite que administradores no técnicos gestionen todo el contenido del sitio web mediante Strapi CMS, sin necesidad de escribir código.

---

## 🚀 Pasos de Implementación

### Paso 1: Instalar Strapi

```bash
# En la raíz del proyecto
npx create-strapi-app@latest backend --quickstart
```

Esto creará una carpeta `backend/` con Strapi instalado.

### Paso 2: Configurar Strapi

1. **Copiar archivos de configuración**:
   - Revisar `STRAPI_CONFIG.md` para configuraciones detalladas
   - Configurar `config/database.js`, `config/server.js`, `config/middlewares.js`

2. **Crear Content Types**:
   - Copiar las carpetas de `strapi-content-types/` a `backend/src/api/`
   - O crear manualmente desde el panel de administración de Strapi

### Paso 3: Configurar Permisos

1. Iniciar Strapi: `cd backend && npm run develop`
2. Acceder a http://localhost:1337/admin
3. Crear cuenta de administrador
4. Configurar permisos:
   - **Settings > Roles > Public**: Habilitar `find` y `findOne` para lectura pública
   - **Settings > Roles > Authenticated**: Habilitar todos los permisos para CRUD

### Paso 4: Configurar Variables de Entorno

1. En `frontend/` crear archivo `.env`:
```env
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=  # Opcional, para contenido protegido
```

2. En `backend/` crear archivo `.env` (ver `STRAPI_CONFIG.md`)

### Paso 5: Integrar con React

Los servicios ya están creados en `src/services/`:
- `strapiConfig.js` - Configuración base
- `proyectoService.js` - Servicios para proyectos
- `productoService.js` - Servicios para productos
- `podcastService.js` - Servicios para podcast

### Paso 6: Usar en Componentes

Ver ejemplos en `src/components/examples/`:
- `ProyectoCard.jsx` - Ejemplo de cómo mostrar proyectos
- `ProductoCard.jsx` - Ejemplo de cómo mostrar productos
- `EpisodioPodcastCard.jsx` - Ejemplo de cómo mostrar episodios

---

## 📝 Ejemplos de Uso

### Obtener todos los proyectos

```javascript
import { getProyectos } from '../services/proyectoService';

function ProyectosList() {
  const [proyectos, setProyectos] = useState([]);
  
  useEffect(() => {
    async function loadProyectos() {
      const response = await getProyectos({
        filters: { estado: 'en_curso' },
        pagination: { page: 1, pageSize: 10 }
      });
      setProyectos(response.data);
    }
    loadProyectos();
  }, []);
  
  return (
    <div>
      {proyectos.map(proyecto => (
        <ProyectoCard key={proyecto.id} proyectoId={proyecto.id} />
      ))}
    </div>
  );
}
```

### Obtener productos disponibles

```javascript
import { getProductosDisponibles } from '../services/productoService';

function ProductosList() {
  const [productos, setProductos] = useState([]);
  
  useEffect(() => {
    async function loadProductos() {
      const response = await getProductosDisponibles();
      setProductos(response.data);
    }
    loadProductos();
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {productos.map(producto => (
        <ProductoCard key={producto.id} productoId={producto.id} />
      ))}
    </div>
  );
}
```

### Obtener episodios recientes del podcast

```javascript
import { getEpisodiosRecientes } from '../services/podcastService';

function PodcastList() {
  const [episodios, setEpisodios] = useState([]);
  
  useEffect(() => {
    async function loadEpisodios() {
      const response = await getEpisodiosRecientes(5);
      setEpisodios(response.data);
    }
    loadEpisodios();
  }, []);
  
  return (
    <div>
      {episodios.map(episodio => (
        <EpisodioPodcastCard key={episodio.id} episodioId={episodio.id} />
      ))}
    </div>
  );
}
```

---

## 🎨 Actualizar Páginas Existentes

### Actualizar página de Proyectos

En `src/pages/Projects.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { getProyectos } from '../services/proyectoService';
import ProyectoCard from '../components/examples/ProyectoCard';

export default function Projects() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProyectos() {
      try {
        const response = await getProyectos({
          pagination: { page: 1, pageSize: 20 }
        });
        setProyectos(response.data || []);
      } catch (error) {
        console.error('Error cargando proyectos:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProyectos();
  }, []);

  if (loading) {
    return <div>Cargando proyectos...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {proyectos.map(proyecto => (
        <ProyectoCard key={proyecto.id} proyectoId={proyecto.id} />
      ))}
    </div>
  );
}
```

### Actualizar página de Tienda

En `src/pages/Store.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { getProductosDisponibles } from '../services/productoService';
import ProductoCard from '../components/examples/ProductoCard';

export default function Store() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductos() {
      try {
        const response = await getProductosDisponibles();
        setProductos(response.data || []);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProductos();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map(producto => (
        <ProductoCard key={producto.id} productoId={producto.id} />
      ))}
    </div>
  );
}
```

### Actualizar página de Podcast

En `src/pages/Podcast.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { getEpisodiosPodcast } from '../services/podcastService';
import EpisodioPodcastCard from '../components/examples/EpisodioPodcastCard';

export default function Podcast() {
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEpisodios() {
      try {
        const response = await getEpisodiosPodcast({
          pagination: { page: 1, pageSize: 20 }
        });
        setEpisodios(response.data || []);
      } catch (error) {
        console.error('Error cargando episodios:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEpisodios();
  }, []);

  if (loading) {
    return <div>Cargando episodios...</div>;
  }

  return (
    <div className="space-y-6">
      {episodios.map(episodio => (
        <EpisodioPodcastCard key={episodio.id} episodioId={episodio.id} />
      ))}
    </div>
  );
}
```

---

## 🔧 Buenas Prácticas

### 1. Manejo de Errores

Siempre usar try-catch al consumir la API:

```javascript
try {
  const data = await getProyectos();
} catch (error) {
  console.error('Error:', error);
  // Mostrar mensaje al usuario
}
```

### 2. Loading States

Siempre mostrar estados de carga:

```javascript
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadData() {
    setLoading(true);
    try {
      const data = await getProyectos();
      setProyectos(data);
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []);
```

### 3. Lazy Loading de Imágenes

Siempre usar `loading="lazy"` en imágenes:

```javascript
<img 
  src={imageUrl} 
  alt={altText}
  loading="lazy"
/>
```

### 4. Paginación

Usar paginación para listas grandes:

```javascript
const [page, setPage] = useState(1);
const response = await getProyectos({
  pagination: { page, pageSize: 10 }
});
```

### 5. Optimización de Consultas

Solo cargar campos necesarios:

```javascript
// En lugar de populate: '*'
const response = await getProyectos({
  populate: {
    galeriaImagenes: {
      fields: ['url', 'alternativeText'],
    },
  },
});
```

---

## 🚨 Troubleshooting

### Error: CORS

**Problema**: Error de CORS al consumir la API.

**Solución**: Configurar CORS en `backend/config/middlewares.js`:

```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  },
}
```

### Error: 403 Forbidden

**Problema**: No se pueden leer los datos.

**Solución**: Configurar permisos en Strapi Admin:
- Settings > Roles > Public
- Habilitar `find` y `findOne` para cada Content Type

### Error: Imágenes no cargan

**Problema**: Las URLs de imágenes no funcionan.

**Solución**: Usar la función `getStrapiImageUrl()` del servicio:

```javascript
import { getStrapiImageUrl } from '../services/strapiConfig';

const imageUrl = getStrapiImageUrl(imagen.attributes);
```

---

## 📚 Recursos Adicionales

- [Documentación de Strapi](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [React Hooks](https://react.dev/reference/react)

---

## ✅ Checklist de Implementación

- [ ] Strapi instalado y configurado
- [ ] Content Types creados
- [ ] Permisos configurados
- [ ] Variables de entorno configuradas
- [ ] Servicios de React funcionando
- [ ] Componentes de ejemplo integrados
- [ ] Páginas actualizadas para usar Strapi
- [ ] Pruebas de carga y performance realizadas
- [ ] Documentación revisada
