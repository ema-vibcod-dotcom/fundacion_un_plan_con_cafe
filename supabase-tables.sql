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
  image_url TEXT,
  video_url TEXT,
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
  image_url TEXT,
  video_url TEXT,
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
  image_url TEXT,
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
