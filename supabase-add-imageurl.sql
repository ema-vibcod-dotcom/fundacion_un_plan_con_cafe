-- Agregar campo imageUrl a las tablas existentes
-- Ejecuta este SQL en Supabase SQL Editor después de haber creado las tablas

-- Agregar imageUrl a proyectos
ALTER TABLE proyectos 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Agregar imageUrl a productos
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Agregar imageUrl a episodios_podcast (ya tiene imagen_portada, pero agregamos image_url para consistencia)
ALTER TABLE episodios_podcast 
ADD COLUMN IF NOT EXISTS image_url TEXT;
