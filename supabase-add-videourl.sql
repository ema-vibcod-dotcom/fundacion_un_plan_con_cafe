-- Agregar campo video_url a la tabla productos
-- Ejecuta este SQL en Supabase SQL Editor

-- Agregar video_url a productos
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS video_url TEXT;
