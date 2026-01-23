# Configuración de Supabase para Vercel

Esta guía te ayudará a configurar Supabase como base de datos para tu aplicación desplegada en Vercel.

## 🎯 ¿Por qué Supabase?

- ✅ **100% Gratis** para proyectos pequeños/medianos
- ✅ **Compatible con Vercel** (serverless)
- ✅ **PostgreSQL** (base de datos robusta)
- ✅ **Storage** para imágenes y videos
- ✅ **Panel de administración** visual
- ✅ **API REST automática**

## 📋 Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Haz clic en **"Start your project"**
3. Inicia sesión con GitHub (recomendado) o crea una cuenta
4. Haz clic en **"New Project"**

## 📋 Paso 2: Configurar el proyecto

1. **Nombre del proyecto**: `fundacion-un-plan-con-cafe` (o el que prefieras)
2. **Database Password**: Genera una contraseña segura (guárdala)
3. **Region**: Elige la más cercana a tus usuarios
4. Haz clic en **"Create new project"**
5. Espera 2-3 minutos mientras se crea

## 📋 Paso 3: Obtener las credenciales

Una vez creado el proyecto:

1. Ve a **Settings** (⚙️) en el menú lateral
2. Haz clic en **API**
3. Copia estos valores:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANTE**: Usa el `service_role` key, NO el `anon` key, porque necesitamos permisos completos para el admin.

## 📋 Paso 4: Crear las tablas en Supabase

Ve a **SQL Editor** en el menú lateral y ejecuta este script:

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

## 📋 Paso 5: Configurar Storage para imágenes/videos

1. Ve a **Storage** en el menú lateral
2. Crea 3 buckets:
   - `proyectos-imagenes` (público)
   - `productos-imagenes` (público)
   - `videos` (público)

Para cada bucket:
- Haz clic en **"New bucket"**
- Nombre: `proyectos-imagenes` (o el correspondiente)
- Marca **"Public bucket"** ✅
- Haz clic en **"Create bucket"**

## 📋 Paso 6: Configurar variables de entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Agrega estas variables:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

4. Haz clic en **Save**
5. **Re-despliega** tu aplicación para que tome las nuevas variables

## 📋 Paso 7: Instalar dependencias localmente

En tu proyecto local, ejecuta:

```bash
npm install @supabase/supabase-js
```

## ✅ ¡Listo!

Ahora tu aplicación:
- ✅ Funciona 100% en Vercel
- ✅ Usa Supabase como base de datos
- ✅ El panel de administración funciona desde tu web
- ✅ Todo está en la nube, sin necesidad de servidores

## 🔍 Verificar que funciona

1. Despliega en Vercel con las variables de entorno configuradas
2. Accede a `/admin` en tu web
3. Intenta crear un proyecto/producto/episodio
4. Verifica en Supabase → **Table Editor** que los datos se guardaron

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
