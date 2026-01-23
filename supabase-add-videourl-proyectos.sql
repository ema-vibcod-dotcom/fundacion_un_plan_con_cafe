-- Script para agregar campo video_url a la tabla proyectos
-- Ejecuta este SQL en Supabase SQL Editor
-- Este campo es necesario para mostrar videos en el panel de administración y en la vista pública

-- Agregar video_url a proyectos
ALTER TABLE proyectos 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Comentario: Este campo almacena URLs de videos de YouTube, Vimeo o MP4 directos
-- que se pueden mostrar en el panel de administración y en la página pública de proyectos
