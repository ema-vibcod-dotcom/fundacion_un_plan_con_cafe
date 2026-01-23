-- ============================================
-- SCRIPT PARA HACER CAMPOS OPCIONALES Y INSERTAR PROYECTOS
-- ============================================
-- Este script:
-- 1. Hace que estado y fecha_inicio sean opcionales (NULL permitido)
-- 2. Inserta los dos proyectos principales: "Bilingüismo" y "Aldonarte"

-- Paso 1: Hacer que estado sea opcional (permitir NULL)
ALTER TABLE proyectos 
ALTER COLUMN estado DROP NOT NULL;

-- Paso 2: Hacer que fecha_inicio sea opcional (permitir NULL)
ALTER TABLE proyectos 
ALTER COLUMN fecha_inicio DROP NOT NULL;

-- Paso 3: Verificar si los proyectos ya existen
SELECT id, titulo, estado, fecha_inicio
FROM proyectos 
WHERE titulo ILIKE '%bilingüismo%' OR titulo ILIKE '%aldonarte%';

-- Paso 4: Insertar proyecto "Bilingüismo"
INSERT INTO proyectos (
  titulo,
  descripcion,
  estado,
  fecha_inicio,
  fecha_finalizacion,
  slug,
  image_url,
  video_url,
  voluntarios,
  porcentaje_financiado,
  socios,
  galeria_imagenes,
  video_corto
) VALUES (
  'Bilingüismo',
  'A través de nuestro programa de bilingüismo, estamos llevando la enseñanza del inglés a comunidades rurales que históricamente han tenido acceso limitado a educación de calidad. Nuestro enfoque contextualizado permite que los estudiantes aprendan inglés desde su realidad, conectando el idioma con su entorno, cultura y oportunidades económicas locales.',
  NULL, -- Estado será configurado por el administrador
  NULL, -- Fecha de inicio será configurada por el administrador
  NULL, -- Fecha de finalización será configurada por el administrador
  'bilingüismo',
  NULL, -- Se puede agregar una URL de imagen después
  NULL, -- Se puede agregar una URL de video después
  0, -- Voluntarios (se puede actualizar después)
  0, -- Porcentaje financiado (se puede actualizar después)
  0, -- Socios (se puede actualizar después)
  '[]'::jsonb, -- Galería de imágenes vacía por ahora
  NULL -- Video corto (se puede agregar después)
)
ON CONFLICT (slug) DO UPDATE SET
  descripcion = EXCLUDED.descripcion,
  titulo = EXCLUDED.titulo,
  updated_at = NOW();

-- Paso 5: Insertar proyecto "Aldonarte"
INSERT INTO proyectos (
  titulo,
  descripcion,
  estado,
  fecha_inicio,
  fecha_finalizacion,
  slug,
  image_url,
  video_url,
  voluntarios,
  porcentaje_financiado,
  socios,
  galeria_imagenes,
  video_corto
) VALUES (
  'Aldonarte',
  'Modelo de transformación educativa que equipa espacios de aprendizaje y los entrega a las autoridades locales para garantizar continuidad y sostenibilidad.

Fases del proyecto:
1. Equipar salón: Equipamos completamente los espacios educativos con materiales, mobiliario y recursos necesarios para crear un ambiente de aprendizaje óptimo.
2. Entrega a Alcaldía: Transferimos la responsabilidad y gestión del espacio equipado a las autoridades locales, asegurando la integración oficial en el sistema educativo municipal.
3. Continuidad: Garantizamos el seguimiento y apoyo continuo para asegurar que el proyecto se mantenga activo y genere impacto sostenible en la comunidad educativa.',
  NULL, -- Estado será configurado por el administrador
  NULL, -- Fecha de inicio será configurada por el administrador
  NULL, -- Fecha de finalización será configurada por el administrador
  'aldonarte',
  NULL, -- Se puede agregar una URL de imagen después
  NULL, -- Se puede agregar una URL de video después
  0, -- Voluntarios (se puede actualizar después)
  0, -- Porcentaje financiado (se puede actualizar después)
  0, -- Socios (se puede actualizar después)
  '[]'::jsonb, -- Galería de imágenes vacía por ahora
  NULL -- Video corto (se puede agregar después)
)
ON CONFLICT (slug) DO UPDATE SET
  descripcion = EXCLUDED.descripcion,
  titulo = EXCLUDED.titulo,
  updated_at = NOW();

-- Paso 6: Verificar que se insertaron correctamente
SELECT id, titulo, estado, fecha_inicio, fecha_finalizacion, slug, created_at
FROM proyectos 
WHERE titulo ILIKE '%bilingüismo%' OR titulo ILIKE '%aldonarte%' 
   OR slug IN ('bilingüismo', 'aldonarte')
ORDER BY created_at DESC;
