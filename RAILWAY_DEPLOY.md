# 🚂 Desplegar Strapi en Railway - Guía Paso a Paso

## 🎯 Objetivo

Desplegar Strapi en Railway (gratis) para que tu frontend en Vercel pueda acceder a él.

---

## ✅ Paso 1: Preparar Strapi Localmente

### 1.1 Instalar Strapi

```bash
# En la raíz del proyecto
npx create-strapi-app@latest backend --quickstart
```

### 1.2 Crear cuenta de administrador

1. Se abrirá `http://localhost:1337/admin`
2. Completa el formulario y crea tu cuenta

### 1.3 Configurar Content Types

Sigue las instrucciones en `strapi-content-types/README.md` para crear los Content Types.

---

## 🚂 Paso 2: Crear Proyecto en Railway

### 2.1 Crear cuenta

1. Ve a https://railway.app
2. Clic en **"Start a New Project"**
3. Inicia sesión con **GitHub**

### 2.2 Crear proyecto

1. Clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Autoriza Railway a acceder a tus repositorios
4. Selecciona tu repositorio: `fundacion-un-plan-con-cafe`
5. Railway detectará automáticamente el proyecto

---

## 🗄️ Paso 3: Agregar Base de Datos PostgreSQL

### 3.1 Crear base de datos

1. En tu proyecto de Railway, clic en **"+ New"**
2. Selecciona **"Database"**
3. Selecciona **"Add PostgreSQL"**
4. Railway creará automáticamente una base de datos PostgreSQL

### 3.2 Obtener credenciales

1. Clic en la base de datos PostgreSQL
2. Ve a la pestaña **"Variables"**
3. Verás las variables:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

**¡No las copies todavía!** Railway las conectará automáticamente.

---

## ⚙️ Paso 4: Configurar Servicio de Strapi

### 4.1 Agregar servicio

1. En tu proyecto de Railway, clic en **"+ New"**
2. Selecciona **"GitHub Repo"**
3. Selecciona tu repositorio
4. En **"Root Directory"**, escribe: `backend`
5. Railway detectará que es un proyecto Node.js

### 4.2 Configurar variables de entorno

1. Clic en tu servicio de Strapi
2. Ve a la pestaña **"Variables"**
3. Railway ya habrá agregado las variables de PostgreSQL automáticamente

4. **Agregar variables de Strapi**:

Clic en **"New Variable"** y agrega:

```
NODE_ENV = production
```

5. **Generar secrets de Strapi**:

En tu máquina local, en la carpeta `backend/`:

```bash
cd backend
npx strapi generate
```

Esto generará valores aleatorios. Copia cada uno a Railway:

- `APP_KEYS` → Agregar como variable en Railway
- `API_TOKEN_SALT` → Agregar como variable
- `ADMIN_JWT_SECRET` → Agregar como variable
- `TRANSFER_TOKEN_SALT` → Agregar como variable

6. **Configurar CORS**:

Agrega tu dominio de Vercel:

```
CORS_ORIGIN = https://tu-proyecto.vercel.app
```

O si quieres permitir todos (solo para desarrollo):

```
CORS_ORIGIN = *
```

### 4.3 Configurar base de datos

Railway ya conectó las variables de PostgreSQL, pero Strapi necesita nombres específicos.

Agrega estas variables (usando los valores de PostgreSQL que Railway creó):

```
DATABASE_CLIENT = postgres
DATABASE_HOST = ${PGHOST}
DATABASE_PORT = ${PGPORT}
DATABASE_NAME = ${PGDATABASE}
DATABASE_USERNAME = ${PGUSER}
DATABASE_PASSWORD = ${PGPASSWORD}
```

Railway usará automáticamente los valores de PostgreSQL.

---

## 📝 Paso 5: Crear archivo de configuración

### 5.1 Crear `backend/config/database.js`

Crea este archivo en `backend/config/database.js`:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'railway'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

### 5.2 Crear `backend/config/server.js`

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

### 5.3 Crear `backend/config/middlewares.js`

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
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: env.array('CORS_ORIGIN', ['http://localhost:5173']),
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

---

## 🚀 Paso 6: Deploy

### 6.1 Hacer commit y push

```bash
git add backend/
git commit -m "Agregar configuración de Strapi para Railway"
git push origin main
```

### 6.2 Railway hará el deploy automáticamente

1. Railway detectará el push
2. Hará el build automáticamente
3. Desplegará Strapi

### 6.3 Verificar deploy

1. Ve a tu servicio de Strapi en Railway
2. Ve a la pestaña **"Deployments"**
3. Verás el progreso del deploy
4. Cuando termine, verás una URL como: `https://tu-proyecto.railway.app`

---

## 🔗 Paso 7: Obtener URL y Configurar Vercel

### 7.1 Obtener URL de Railway

1. En Railway, ve a tu servicio de Strapi
2. Ve a **"Settings"** → **"Domains"**
3. Copia la URL (ejemplo: `https://fundacion-strapi.railway.app`)

### 7.2 Configurar en Vercel

1. Ve a https://vercel.com → Tu proyecto
2. **Settings** → **Environment Variables**
3. Agregar:
   ```
   Key: VITE_STRAPI_API_URL
   Value: https://tu-proyecto.railway.app
   Environments: ✅ Production
   ```
4. **Save**

### 7.3 Redeploy en Vercel

1. Ve a **Deployments**
2. Clic en **⋯** → **Redeploy**

---

## ✅ Verificar

### 1. Verificar Strapi

1. Abre la URL de Railway en el navegador
2. Deberías ver el login de Strapi
3. Inicia sesión con tus credenciales

### 2. Verificar Frontend

1. Ve a tu sitio en Vercel
2. Clic en el botón de admin
3. Ingresa contraseña: `admin2024`
4. Debería abrirse el panel de Strapi

---

## 🆘 Problemas Comunes

### Error: "Database connection failed"

**Solución**:
1. Verifica que las variables de PostgreSQL estén correctas
2. Verifica que la base de datos esté creada en Railway
3. Verifica el formato de `database.js`

### Error: "Build failed"

**Solución**:
1. Verifica los logs en Railway
2. Asegúrate de que `package.json` esté en `backend/`
3. Verifica que todas las dependencias estén instaladas

### Error: "CORS"

**Solución**:
1. Agrega tu dominio de Vercel a `CORS_ORIGIN` en Railway
2. Verifica `middlewares.js`

---

## 📝 Checklist

- [ ] Strapi instalado localmente
- [ ] Proyecto creado en Railway
- [ ] Base de datos PostgreSQL agregada
- [ ] Servicio de Strapi configurado
- [ ] Variables de entorno configuradas
- [ ] Archivos de configuración creados
- [ ] Deploy realizado
- [ ] URL obtenida de Railway
- [ ] Variable configurada en Vercel
- [ ] Probado acceso desde Vercel

---

## 🎯 Resumen

1. **Instalar Strapi localmente**
2. **Crear proyecto en Railway**
3. **Agregar PostgreSQL**
4. **Configurar variables de entorno**
5. **Deploy automático**
6. **Conectar con Vercel**

¡Listo! 🚀
