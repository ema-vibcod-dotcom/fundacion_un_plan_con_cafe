# Configuración de Strapi

## 📋 Archivos de Configuración

### 1. config/database.js

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'sqlite'),
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    // Para PostgreSQL en producción:
    // connection: {
    //   host: env('DATABASE_HOST', 'localhost'),
    //   port: env.int('DATABASE_PORT', 5432),
    //   database: env('DATABASE_NAME', 'fundacion_db'),
    //   user: env('DATABASE_USERNAME', 'usuario'),
    //   password: env('DATABASE_PASSWORD', 'contraseña'),
    //   ssl: env.bool('DATABASE_SSL', false) && {
    //     rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
    //   },
    // },
    useNullAsDefault: true,
  },
});
```

### 2. config/server.js

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('STRAPI_URL', 'http://localhost:1337'),
});

```

### 3. config/middlewares.js

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com', // Si usas Cloudinary
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: env.array('CORS_ORIGIN', [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://tu-dominio-frontend.com',
      ]),
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 4. config/plugins.js (Opcional - Cloudinary)

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
```

---

## 🔐 Configuración de Permisos

### Permisos Públicos (Frontend)

En Strapi Admin: **Settings > Roles > Public**

Habilitar para cada Content Type:
- ✅ `find` - Listar contenido
- ✅ `findOne` - Ver detalle de contenido
- ❌ `create` - No permitir
- ❌ `update` - No permitir
- ❌ `delete` - No permitir

### Permisos Autenticados (Backoffice)

En Strapi Admin: **Settings > Roles > Authenticated**

Habilitar para cada Content Type:
- ✅ `find` - Listar contenido
- ✅ `findOne` - Ver detalle
- ✅ `create` - Crear contenido
- ✅ `update` - Editar contenido
- ✅ `delete` - Eliminar contenido

---

## 📸 Configuración de Media Library

### Límites Recomendados:

1. **Imágenes**:
   - Tamaño máximo: 5MB
   - Formatos: JPG, PNG, WebP
   - Optimización automática a WebP

2. **Videos**:
   - Tamaño máximo: 50MB
   - Duración máxima: 2 minutos
   - Formatos: MP4, WebM

### Configuración en Strapi:

1. Ir a **Settings > Media Library**
2. Configurar:
   - **Maximum upload file size**: 50MB
   - **Allowed file types**: images, videos
   - **Image optimization**: Habilitar

---

## 🎨 Configuración del Editor Rich Text

El editor de Strapi incluye por defecto:
- Formato de texto (negrita, cursiva, subrayado)
- Listas (ordenadas y desordenadas)
- Enlaces
- Encabezados (H1-H6)
- Citas
- Código inline

### Personalización (Opcional):

Para agregar más opciones, editar `config/plugins.js`:

```javascript
module.exports = {
  'content-manager': {
    config: {
      wysiwyg: {
        enabled: true,
        options: {
          // Configuraciones del editor
        },
      },
    },
  },
};
```

---

## 🚀 Optimización de Performance

### 1. Lazy Loading de Imágenes

En el frontend React, usar:
```jsx
<img 
  src={imageUrl} 
  loading="lazy" 
  alt={altText}
/>
```

### 2. Compresión de Imágenes

- Usar Cloudinary para transformación automática
- O configurar Strapi para generar múltiples tamaños

### 3. Paginación

Siempre usar paginación en las consultas:
```javascript
getProyectos({
  pagination: { page: 1, pageSize: 10 }
})
```

### 4. Populate Selectivo

Solo cargar los campos necesarios:
```javascript
// ❌ Mal: Cargar todo
populate: '*'

// ✅ Bien: Cargar solo lo necesario
populate: {
  galeriaImagenes: {
    fields: ['url', 'alternativeText'],
  },
}
```

---

## 🔒 Seguridad

### 1. Variables de Entorno

Nunca commitear archivos `.env` con credenciales.

### 2. API Tokens

- Crear tokens específicos para el frontend
- Rotar tokens periódicamente
- Usar tokens de solo lectura cuando sea posible

### 3. Rate Limiting

Configurar límites de peticiones en producción.

### 4. CORS

Configurar correctamente los orígenes permitidos en `config/middlewares.js`.

---

## 📝 Variables de Entorno (.env)

```env
# Base de datos
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS=generar-con-strapi-generate
API_TOKEN_SALT=generar-con-strapi-generate
ADMIN_JWT_SECRET=generar-con-strapi-generate
TRANSFER_TOKEN_SALT=generar-con-strapi-generate

# URLs
STRAPI_URL=http://localhost:1337
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Cloudinary (opcional)
CLOUDINARY_NAME=tu-cloud-name
CLOUDINARY_KEY=tu-api-key
CLOUDINARY_SECRET=tu-api-secret
```

---

## 🧪 Testing de la API

### Usar Postman o curl:

```bash
# Obtener todos los proyectos
curl http://localhost:1337/api/proyectos?populate=*

# Obtener un proyecto específico
curl http://localhost:1337/api/proyectos/1?populate=*

# Obtener productos disponibles
curl http://localhost:1337/api/productos?filters[activo][$eq]=true&populate=*
```

---

## 📚 Recursos Adicionales

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Content Types](https://docs.strapi.io/dev-docs/backend-customization/models)
