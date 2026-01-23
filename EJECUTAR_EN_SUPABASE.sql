-- ============================================
-- SCRIPT PARA EJECUTAR EN SUPABASE SQL EDITOR
-- ============================================
-- Copia y pega TODO este código en el SQL Editor de Supabase
-- Luego haz clic en "Run" o presiona Ctrl + Enter

-- Agregar image_url a proyectos (si no existe)
ALTER TABLE proyectos 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Agregar video_url a proyectos (si no existe)
ALTER TABLE proyectos 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Agregar image_url a productos (si no existe)
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Agregar video_url a productos (si no existe)
ALTER TABLE productos 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Agregar image_url a episodios_podcast (si no existe)
ALTER TABLE episodios_podcast 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Verificar que las columnas se agregaron correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'proyectos' 
AND column_name IN ('image_url', 'video_url');
