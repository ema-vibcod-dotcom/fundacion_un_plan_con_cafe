# Sistema de Administración - Backoffice con Strapi

## 📋 Descripción General

Este documento describe la implementación de un sistema de administración (Backoffice) para la Fundación Un Plan con Café, utilizando **Strapi** como Headless CMS y **React** como frontend.

El sistema permite que administradores no técnicos gestionen todo el contenido del sitio web mediante formularios visuales, sin necesidad de escribir código.

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐
│   React App     │  (Frontend Público)
│  (Frontend)     │
└────────┬────────┘
         │ HTTP/REST API
         │
┌────────▼────────┐
│   Strapi CMS    │  (Backoffice)
│  (Backend)      │
└─────────────────┘
```

### Componentes:
- **Frontend React**: Aplicación pública existente que consume datos de Strapi
- **Strapi Backoffice**: Panel de administración con formularios visuales
- **API REST**: Endpoints para CRUD de todos los contenidos

---

## 📁 Estructura del Proyecto

```
fundacion-un-plan-con-cafe/
├── frontend/                    # React App (actual)
│   ├── src/
│   │   ├── services/           # Servicios para consumir Strapi API
│   │   ├── components/
│   │   └── pages/
│   └── ...
│
└── backend/                     # Strapi CMS (nuevo)
    ├── config/
    │   ├── database.js
    │   ├── server.js
    │   └── plugins.js
    ├── src/
    │   ├── api/
    │   │   ├── proyecto/
    │   │   ├── producto/
    │   │   ├── episodio-podcast/
    │   │   └── multimedia/
    │   └── extensions/
    └── ...
```

---

## 🚀 Instalación de Strapi

### 1. Crear proyecto Strapi

```bash
# En la raíz del proyecto
npx create-strapi-app@latest backend --quickstart
```

### 2. Instalar plugins recomendados

```bash
cd backend
npm install @strapi/provider-upload-cloudinary
npm install strapi-plugin-upload
```

### 3. Configurar base de datos

Para producción, configurar PostgreSQL o MySQL en `config/database.js`.

---

## 📦 Plugins de Strapi Recomendados

### Plugins Esenciales:

1. **Upload Plugin** (incluido por defecto)
   - Gestión de archivos multimedia
   - Optimización de imágenes

2. **Cloudinary Provider** (opcional pero recomendado)
   - Almacenamiento en la nube
   - Optimización automática de imágenes
   - Transformación de videos

3. **Users & Permissions Plugin** (incluido por defecto)
   - Gestión de roles (Administrador y Editor)
   - Autenticación y autorización

4. **i18n Plugin** (opcional)
   - Soporte multiidioma si es necesario

### Instalación de Cloudinary Provider:

```bash
npm install @strapi/provider-upload-cloudinary
```

Configurar en `config/plugins.js`:
```javascript
module.exports = {
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
    },
  },
};
```

---

## 🔐 Gestión de Roles

### Roles Predefinidos:

1. **Administrador**
   - Acceso completo a todos los contenidos
   - Puede gestionar usuarios y roles
   - Acceso a configuraciones del sistema

2. **Editor**
   - Puede crear, editar y eliminar contenido
   - No puede gestionar usuarios ni configuraciones
   - Acceso limitado a ciertos contenidos según configuración

### Configuración en Strapi:

1. Ir a **Settings > Roles > Authenticated**
2. Configurar permisos para cada Content Type:
   - `find`: Leer contenido
   - `findOne`: Leer un elemento específico
   - `create`: Crear nuevo contenido
   - `update`: Editar contenido existente
   - `delete`: Eliminar contenido

---

## 🌐 Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de datos
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Para producción con PostgreSQL:
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=fundacion_db
# DATABASE_USERNAME=usuario
# DATABASE_PASSWORD=contraseña

# Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS=generar-con-strapi-generate
API_TOKEN_SALT=generar-con-strapi-generate
ADMIN_JWT_SECRET=generar-con-strapi-generate
TRANSFER_TOKEN_SALT=generar-con-strapi-generate

# Cloudinary (opcional)
CLOUDINARY_NAME=tu-cloud-name
CLOUDINARY_KEY=tu-api-key
CLOUDINARY_SECRET=tu-api-secret

# CORS (para desarrollo)
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

---

## 📝 Próximos Pasos

1. **Instalar Strapi** siguiendo las instrucciones anteriores
2. **Crear Content Types** usando los modelos proporcionados en `strapi-content-types/`
3. **Configurar permisos** para los roles
4. **Integrar con React** usando los servicios en `frontend/src/services/`
5. **Configurar Cloudinary** (opcional) para optimización de medios

---

## 🔗 Recursos Útiles

- [Documentación de Strapi](https://docs.strapi.io/)
- [Strapi Content Types](https://docs.strapi.io/dev-docs/backend-customization/models)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 📞 Soporte

Para dudas sobre la implementación, consultar la documentación de Strapi o los ejemplos en `frontend/src/services/`.
