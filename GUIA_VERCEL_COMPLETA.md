# 🚀 Guía Completa: Administración en Vercel con Supabase

Esta guía te ayudará a configurar tu sistema de administración **100% en Vercel** usando Supabase como base de datos.

## ✅ ¿Qué hemos hecho?

1. ✅ Creado **Vercel Serverless Functions** para la API (`/api/proyectos`, `/api/productos`, `/api/podcast`)
2. ✅ Actualizado todos los servicios React para usar las funciones de Vercel
3. ✅ Actualizado los componentes admin para trabajar con Supabase
4. ✅ Configurado `vercel.json` para manejar las rutas de API

## 📋 Pasos para Configurar

### Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Haz clic en **"Start your project"**
3. Inicia sesión con GitHub (recomendado)
4. Haz clic en **"New Project"**
5. Completa:
   - **Nombre**: `fundacion-un-plan-con-cafe`
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Elige la más cercana
6. Haz clic en **"Create new project"**
7. Espera 2-3 minutos

### Paso 2: Obtener credenciales de Supabase

1. En tu proyecto de Supabase, ve a **Settings** (⚙️) → **API**
2. Copia estos valores:
   - **Project URL** → Lo usarás como `SUPABASE_URL`
   - **service_role key** (secret) → Lo usarás como `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANTE**: Usa el `service_role` key, NO el `anon` key.

### Paso 3: Crear las tablas en Supabase

1. En Supabase, ve a **SQL Editor** (en el menú lateral)
2. Haz clic en **"New query"**
3. Pega este SQL y haz clic en **"Run"**:

```sql
-- Tabla de Proyectos
CREATE TABLE IF NOT EXISTS proyectos (
  id BIGSERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'en_curso' CHECK (estado IN ('en_curso', 'completado', 'urgente')),
  fecha_inicio DATE NOT NULL,
  fecha_finalizacion DATE,
  galeria_imagenes JSONB DEFAULT '[]'::jsonb,
  video_corto TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  voluntarios INTEGER DEFAULT 0,
  porcentaje_financiado DECIMAL(5,2) DEFAULT 0,
  socios INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion_corta TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  estado VARCHAR(20) NOT NULL DEFAULT 'disponible' CHECK (estado IN ('disponible', 'agotado')),
  activo BOOLEAN NOT NULL DEFAULT true,
  galeria_imagenes JSONB DEFAULT '[]'::jsonb,
  video_creador TEXT,
  historia_creador TEXT NOT NULL,
  nombre_creador VARCHAR(255) NOT NULL,
  categoria VARCHAR(20) DEFAULT 'otros' CHECK (categoria IN ('cafe', 'artesanias', 'otros')),
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Episodios de Podcast
CREATE TABLE IF NOT EXISTS episodios_podcast (
  id BIGSERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha DATE NOT NULL,
  url_spotify TEXT,
  url_apple_podcast TEXT,
  url_youtube TEXT,
  imagen_portada TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  numero_episodio INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_proyectos_estado ON proyectos(estado);
CREATE INDEX idx_proyectos_fecha ON proyectos(fecha_inicio);
CREATE INDEX idx_productos_activo ON productos(activo);
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_podcast_fecha ON episodios_podcast(fecha);
```

4. Deberías ver: **"Success. No rows returned"**

### Paso 4: Instalar dependencias localmente

En tu proyecto, ejecuta:

```bash
npm install
```

Esto instalará `@supabase/supabase-js` que agregamos al `package.json`.

### Paso 5: Configurar variables de entorno en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com
2. Haz clic en tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega estas variables:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

5. Haz clic en **Save**
6. **IMPORTANTE**: Ve a **Deployments** y haz clic en **"Redeploy"** en el último deployment para que tome las nuevas variables

### Paso 6: Probar localmente (opcional)

Para probar localmente, crea un archivo `.env.local` en la raíz del proyecto:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

⚠️ **NO subas este archivo a GitHub**. Ya está en `.gitignore`.

Luego ejecuta:

```bash
npm run dev
```

Y prueba acceder a `/admin` en `http://localhost:5173`

## ✅ Verificar que funciona

1. Despliega en Vercel (o usa `npm run dev` localmente)
2. Accede a tu web desplegada
3. Haz clic en el botón de administrador (en Home)
4. Ingresa la contraseña: `admin2024`
5. Intenta crear un proyecto/producto/episodio
6. Verifica en Supabase → **Table Editor** que los datos se guardaron

## 🎯 Estructura Final

```
tu-proyecto/
├── api/                    # Vercel Serverless Functions
│   ├── proyectos/
│   │   └── index.js       # API de proyectos
│   ├── productos/
│   │   └── index.js       # API de productos
│   └── podcast/
│       └── index.js       # API de podcast
├── src/
│   ├── services/
│   │   ├── apiConfig.js   # Configuración de API
│   │   ├── proyectoService.js
│   │   ├── productoService.js
│   │   └── podcastService.js
│   └── components/admin/  # Componentes admin
└── vercel.json            # Configuración de Vercel
```

## 🔍 Solución de Problemas

### Error: "Cannot find module '@supabase/supabase-js'"

**Solución**: Ejecuta `npm install` localmente y vuelve a desplegar.

### Error: "SUPABASE_URL is not defined"

**Solución**: Verifica que las variables de entorno estén configuradas en Vercel y que hayas hecho redeploy.

### Error: "relation does not exist"

**Solución**: Verifica que hayas ejecutado el SQL para crear las tablas en Supabase.

### Las funciones API no funcionan en desarrollo local

**Solución**: Las funciones de Vercel solo funcionan cuando están desplegadas. Para desarrollo local, necesitarías usar `vercel dev`, pero es más fácil probar directamente en Vercel.

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 ¡Listo!

Ahora tienes un sistema de administración **100% en Vercel**:
- ✅ Frontend React en Vercel
- ✅ API Serverless en Vercel
- ✅ Base de datos en Supabase (gratis)
- ✅ Panel de administración integrado en tu web
- ✅ Sin necesidad de servidores adicionales
