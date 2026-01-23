# Buenas Prácticas - Sistema de Administración

## 🎯 Performance

### 1. Optimización de Imágenes

**Problema**: Imágenes grandes ralentizan la carga del sitio.

**Solución**:
- Usar formato WebP cuando sea posible
- Implementar lazy loading: `<img loading="lazy" />`
- Usar tamaños responsivos con `srcset`
- Comprimir imágenes antes de subirlas a Strapi

**Ejemplo**:
```javascript
<img
  src={getStrapiImageUrl(imagen)}
  alt={imagen.alternativeText}
  loading="lazy"
  className="w-full h-auto"
/>
```

### 2. Optimización de Videos

**Problema**: Videos grandes afectan la performance.

**Solución**:
- Limitar duración a 2 minutos máximo
- Usar `preload="metadata"` en lugar de `preload="auto"`
- Considerar usar servicios externos (YouTube, Vimeo) para videos largos
- Comprimir videos antes de subirlos

**Ejemplo**:
```javascript
<video
  src={videoUrl}
  controls
  preload="metadata"
  className="w-full"
>
  Tu navegador no soporta videos.
</video>
```

### 3. Paginación

**Problema**: Cargar todos los datos a la vez es lento.

**Solución**: Siempre usar paginación:

```javascript
const [page, setPage] = useState(1);
const [pageSize] = useState(10);

const response = await getProyectos({
  pagination: { page, pageSize }
});
```

### 4. Populate Selectivo

**Problema**: Cargar todos los campos y relaciones es innecesario.

**Solución**: Solo cargar lo necesario:

```javascript
// ❌ Mal: Cargar todo
const response = await getProyectos({ populate: '*' });

// ✅ Bien: Cargar solo lo necesario
const response = await getProyectos({
  populate: {
    galeriaImagenes: {
      fields: ['url', 'alternativeText'],
    },
  },
});
```

### 5. Caché en el Frontend

**Problema**: Hacer peticiones repetidas innecesarias.

**Solución**: Usar React Query o SWR para caché:

```javascript
import { useQuery } from '@tanstack/react-query';

function useProyectos() {
  return useQuery({
    queryKey: ['proyectos'],
    queryFn: () => getProyectos(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
```

---

## 🔒 Seguridad

### 1. Variables de Entorno

**Nunca** commitear archivos `.env` con credenciales:

```gitignore
# .gitignore
.env
.env.local
.env.production
```

### 2. API Tokens

**Problema**: Exponer tokens en el código.

**Solución**:
- Usar variables de entorno para tokens
- Crear tokens específicos para el frontend
- Usar tokens de solo lectura cuando sea posible
- Rotar tokens periódicamente

### 3. Validación de Datos

**Problema**: Confiar ciegamente en datos de la API.

**Solución**: Validar datos antes de usarlos:

```javascript
function validateProyecto(proyecto) {
  if (!proyecto?.attributes?.titulo) {
    throw new Error('Proyecto inválido: falta título');
  }
  return proyecto;
}
```

### 4. Sanitización de HTML

**Problema**: XSS attacks con contenido HTML.

**Solución**: Usar `dangerouslySetInnerHTML` con cuidado:

```javascript
// Solo usar con contenido confiable de Strapi
<div
  dangerouslySetInnerHTML={{
    __html: attributes.descripcion
  }}
/>
```

### 5. CORS Configuration

**Problema**: Permitir acceso desde cualquier origen.

**Solución**: Configurar CORS específicamente:

```javascript
// backend/config/middlewares.js
{
  name: 'strapi::cors',
  config: {
    origin: [
      'https://tu-dominio.com',
      'https://www.tu-dominio.com'
    ],
    credentials: true,
  },
}
```

---

## 📱 Responsive Design

### 1. Imágenes Responsivas

Usar `srcset` para diferentes tamaños:

```javascript
<img
  src={imageUrl}
  srcSet={`
    ${imageUrl}?width=400 400w,
    ${imageUrl}?width=800 800w,
    ${imageUrl}?width=1200 1200w
  `}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt={altText}
  loading="lazy"
/>
```

### 2. Grid Responsivo

Usar Tailwind CSS para grids responsivos:

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

---

## ♿ Accesibilidad

### 1. Alt Text en Imágenes

Siempre incluir texto alternativo:

```javascript
<img
  src={imageUrl}
  alt={imagen.alternativeText || 'Descripción de la imagen'}
/>
```

### 2. ARIA Labels

Usar labels descriptivos:

```javascript
<button
  aria-label="Ver detalles del proyecto"
  onClick={handleClick}
>
  Ver más
</button>
```

### 3. Contraste de Colores

Asegurar contraste adecuado:
- Texto oscuro sobre fondo claro
- Texto claro sobre fondo oscuro
- Usar herramientas como [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🧪 Testing

### 1. Manejo de Errores

Siempre manejar errores:

```javascript
try {
  const data = await getProyectos();
} catch (error) {
  console.error('Error:', error);
  // Mostrar mensaje al usuario
  setError('No se pudieron cargar los proyectos');
}
```

### 2. Estados de Carga

Mostrar estados de carga:

```javascript
if (loading) {
  return <div>Cargando...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

if (!data) {
  return <div>No hay datos</div>;
}
```

### 3. Validación de Datos

Validar antes de renderizar:

```javascript
{proyecto?.attributes?.galeriaImagenes?.length > 0 && (
  <img src={proyecto.attributes.galeriaImagenes[0].url} />
)}
```

---

## 📊 Monitoreo

### 1. Logging

Registrar errores importantes:

```javascript
try {
  const data = await getProyectos();
} catch (error) {
  console.error('Error cargando proyectos:', {
    error: error.message,
    timestamp: new Date().toISOString(),
  });
  // Enviar a servicio de monitoreo (Sentry, etc.)
}
```

### 2. Métricas de Performance

Medir tiempos de carga:

```javascript
const startTime = performance.now();
const data = await getProyectos();
const endTime = performance.now();
console.log(`Tiempo de carga: ${endTime - startTime}ms`);
```

---

## 🔄 Mantenimiento

### 1. Actualizar Dependencias

Mantener dependencias actualizadas:

```bash
npm outdated
npm update
```

### 2. Backup Regular

Hacer backups regulares de:
- Base de datos de Strapi
- Archivos multimedia
- Configuraciones

### 3. Documentación

Mantener documentación actualizada:
- Comentarios en código
- README actualizado
- Guías de uso para administradores

---

## 📝 Checklist de Performance

- [ ] Imágenes optimizadas (WebP, comprimidas)
- [ ] Lazy loading implementado
- [ ] Videos con preload="metadata"
- [ ] Paginación implementada
- [ ] Populate selectivo
- [ ] Caché configurado
- [ ] Errores manejados correctamente
- [ ] Estados de carga implementados
- [ ] Responsive design verificado
- [ ] Accesibilidad verificada

---

## 🎓 Recursos Adicionales

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Strapi Performance](https://docs.strapi.io/dev-docs/performance)
