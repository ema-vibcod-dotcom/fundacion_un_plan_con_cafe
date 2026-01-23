-- Script para agregar campos image_url y video_url a las tablas existentes
-- Ejecuta este SQL en Supabase SQL Editor
-- Las tablas ya existen, solo agregamos los campos faltantes

-- Agregar image_url a proyectos
ALTER TABLE proyectos 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Agregar image_url a productos
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Agregar video_url a productos
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Agregar image_url a episodios_podcast
ALTER TABLE episodios_podcast 
ADD COLUMN IF NOT EXISTS image_url TEXT;
