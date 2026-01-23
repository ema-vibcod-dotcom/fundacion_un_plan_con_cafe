# 🚀 Instalación de Strapi - Guía Completa

## ⚠️ Importante: Strapi no puede ejecutarse en Vercel

**Vercel** es para frontends estáticos. **Strapi** necesita:
- Un servidor Node.js persistente
- Una base de datos (PostgreSQL, MySQL, etc.)
- Almacenamiento para archivos

**Solución**: Desplegar Strapi en **Railway** (gratis y fácil) y conectar tu frontend de Vercel con él.

---

## 📋 Plan de Instalación

1. **Instalar Strapi localmente** (para desarrollo)
2. **Configurar Content Types** (proyectos, productos, podcast)
3. **Desplegar Strapi en Railway** (producción)
4. **Conectar Vercel con Railway** (variable de entorno)

---

## 🛠️ Paso 1: Instalar Strapi Localmente

### 1.1 Crear proyecto Strapi

En la raíz de tu proyecto:

```bash
npx create-strapi-app@latest backend --quickstart
```

Esto creará una carpeta `backend/` con Strapi.

### 1.2 Esperar a que se instale

El proceso puede tardar unos minutos. Cuando termine:
- Se abrirá automáticamente el navegador en `http://localhost:1337/admin`
- Si no se abre, ve manualmente a esa URL

### 1.3 Crear cuenta de administrador

1. Completa el formulario:
   - **First name**: Tu nombre
   - **Last name**: Tu apellido
   - **Email**: Tu email
   - **Password**: Una contraseña segura (guárdala bien)
   - **Confirm password**: Confirma la contraseña

2. Clic en **"Let's start"**

3. ¡Listo! Ya tienes acceso al panel de Strapi

---

## 📦 Paso 2: Configurar Content Types

### 2.1 Copiar los Content Types

Los modelos ya están creados en `strapi-content-types/`. Necesitas copiarlos a Strapi:

**Opción A: Crear manualmente (Recomendado para principiantes)**

1. En el panel de Strapi, ve a **Content-Type Builder**
2. Clic en **"Create new collection type"**
3. Sigue las instrucciones en `strapi-content-types/README.md`

**Opción B: Copiar archivos (Para usuarios avanzados)**

1. Copia las carpetas de `strapi-content-types/` a `backend/src/api/`
2. Reinicia Strapi

### 2.2 Content Types a crear:

1. **Proyecto** (schema en `strapi-content-types/proyecto/schema.json`)
2. **Producto** (schema en `strapi-content-types/producto/schema.json`)
3. **Episodio Podcast** (schema en `strapi-content-types/episodio-podcast/schema.json`)

---

## 🔐 Paso 3: Configurar Permisos

### 3.1 Permisos Públicos (para el frontend)

1. Ve a **Settings > Roles > Public**
2. Para cada Content Type (Proyecto, Producto, Episodio Podcast):
   - ✅ Marca **find** (listar)
   - ✅ Marca **findOne** (ver detalle)
   - ❌ Deja sin marcar: create, update, delete

### 3.2 Permisos Autenticados (para administradores)

1. Ve a **Settings > Roles > Authenticated**
2. Para cada Content Type:
   - ✅ Marca todos: find, findOne, create, update, delete

---

## 🚀 Paso 4: Desplegar Strapi en Railway

### 4.1 Preparar Strapi para producción

1. **Crear archivo `.env` en `backend/`**:

```env
# Base de datos (Railway proporcionará esto)
DATABASE_CLIENT=postgres
DATABASE_HOST=tu-host-railway
DATABASE_PORT=5432
DATABASE_NAME=railway
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu-password-railway

# Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS=generar-con-strapi-generate
API_TOKEN_SALT=generar-con-strapi-generate
ADMIN_JWT_SECRET=generar-con-strapi-generate
TRANSFER_TOKEN_SALT=generar-con-strapi-generate

# CORS (agregar tu dominio de Vercel)
CORS_ORIGIN=https://tu-proyecto.vercel.app
```

### 4.2 Desplegar en Railway

1. **Crear cuenta en Railway**:
   - Ve a https://railway.app
   - Inicia sesión con GitHub

2. **Crear nuevo proyecto**:
   - Clic en **"New Project"**
   - Selecciona **"Deploy from GitHub repo"**
   - Selecciona tu repositorio
   - Selecciona la carpeta `backend/`

3. **Agregar base de datos PostgreSQL**:
   - En tu proyecto de Railway, clic en **"+ New"**
   - Selecciona **"Database"** → **"Add PostgreSQL"**
   - Railway creará automáticamente la base de datos

4. **Configurar variables de entorno**:
   - Ve a tu servicio de Strapi en Railway
   - Clic en **"Variables"**
   - Railway ya habrá agregado las variables de la base de datos
   - Agrega las demás variables de Strapi (APP_KEYS, etc.)

5. **Generar secrets de Strapi**:
   - En tu máquina local, en la carpeta `backend/`:
   ```bash
   npx strapi generate
   ```
   - Copia los valores generados a Railway

6. **Deploy**:
   - Railway detectará automáticamente que es Strapi
   - Hará el build y deploy automáticamente
   - Te dará una URL como: `https://tu-proyecto.railway.app`

---

## 🔗 Paso 5: Conectar Vercel con Railway

### 5.1 Obtener URL de Railway

1. Ve a tu proyecto en Railway
2. Clic en tu servicio de Strapi
3. Ve a **"Settings"** → **"Domains"**
4. Copia la URL (ejemplo: `https://fundacion-strapi.railway.app`)

### 5.2 Configurar en Vercel

1. Ve a https://vercel.com → Tu proyecto
2. **Settings** → **Environment Variables**
3. Agregar:
   ```
   Key: VITE_STRAPI_API_URL
   Value: https://tu-proyecto.railway.app
   Environments: ✅ Production
   ```
4. **Save**

### 5.3 Redeploy en Vercel

1. Ve a **Deployments**
2. Clic en **⋯** → **Redeploy**

---

## ✅ Verificar que Todo Funciona

### 1. Verificar Strapi en Railway

1. Abre la URL de Railway en el navegador
2. Deberías ver la página de login de Strapi
3. Inicia sesión con tus credenciales

### 2. Verificar Frontend en Vercel

1. Ve a tu sitio en Vercel
2. Clic en el botón de admin (esquina inferior derecha)
3. Ingresa contraseña: `admin2024`
4. Debería abrirse el panel de Strapi

---

## 🆘 Solución de Problemas

### Error: "No se puede conectar a la base de datos"

**Solución**:
1. Verifica las variables de entorno en Railway
2. Asegúrate de que la base de datos PostgreSQL esté creada
3. Verifica que las credenciales sean correctas

### Error: "CORS" en el frontend

**Solución**:
1. En Railway, agrega tu dominio de Vercel a `CORS_ORIGIN`
2. O en Strapi Admin: Settings > Middlewares > CORS

### Error: "404" al acceder a `/admin`

**Solución**:
1. Verifica que Strapi esté desplegado correctamente
2. Verifica que la URL en Vercel sea correcta (sin `/admin` al final)

---

## 📝 Checklist de Instalación

- [ ] Strapi instalado localmente
- [ ] Cuenta de administrador creada
- [ ] Content Types creados (Proyecto, Producto, Episodio Podcast)
- [ ] Permisos configurados (Public y Authenticated)
- [ ] Strapi desplegado en Railway
- [ ] Base de datos PostgreSQL agregada en Railway
- [ ] Variables de entorno configuradas en Railway
- [ ] URL de Railway configurada en Vercel
- [ ] Probado acceso desde Vercel

---

## 🎯 Resumen

1. **Instalar Strapi localmente**: `npx create-strapi-app@latest backend --quickstart`
2. **Configurar Content Types** desde `strapi-content-types/`
3. **Desplegar en Railway**: Conectar GitHub y agregar PostgreSQL
4. **Conectar Vercel**: Agregar variable `VITE_STRAPI_API_URL`

---

## 📞 Recursos

- [Documentación de Strapi](https://docs.strapi.io/)
- [Railway Documentation](https://docs.railway.app/)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)

¡Listo para comenzar! 🚀
