# Actualizar Base de Datos: Agregar Campo imageUrl

Este documento explica cómo agregar el campo `image_url` a las tablas existentes en Supabase.

## 📋 Pasos para Actualizar Supabase

### Paso 1: Ejecutar SQL en Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com
2. En el menú lateral izquierdo, haz clic en **"SQL Editor"**
3. Haz clic en **"+ New"** para crear una nueva query
4. Abre el archivo `supabase-add-imageurl.sql` en tu proyecto
5. Copia TODO el contenido del archivo
6. Pégalo en el editor SQL de Supabase
7. Haz clic en **"Run"** (o presiona Ctrl+Enter)
8. Deberías ver: **"Success. No rows returned"**

### Paso 2: Verificar que se agregaron las columnas

1. En Supabase, ve a **"Table Editor"** (en el menú lateral)
2. Selecciona cada tabla (`proyectos`, `productos`, `episodios_podcast`)
3. Verifica que cada tabla tenga una columna `image_url` de tipo `text`

## ✅ ¿Qué hace este SQL?

El SQL agrega una columna `image_url` (TEXT, opcional) a las tres tablas:
- `proyectos`
- `productos`
- `episodios_podcast`

**Nota**: La columna es opcional (NULL permitido), por lo que los registros existentes seguirán funcionando sin problemas.

## 🎯 Después de Ejecutar el SQL

Una vez que hayas ejecutado el SQL:
1. Los formularios admin ya tienen el campo `imageUrl` listo para usar
2. Puedes agregar URLs de imágenes a proyectos, productos y episodios
3. El sistema validará que las URLs sean imágenes válidas (jpg, jpeg, png, webp)
4. Se mostrará una vista previa de la imagen cuando ingreses una URL válida

## 🔍 Verificar que Funciona

1. Accede al panel de administración en tu web
2. Intenta crear o editar un proyecto/producto/episodio
3. Deberías ver el campo "URL de Imagen Principal" o "URL de Imagen de Portada"
4. Ingresa una URL de imagen válida (ej: `https://ejemplo.com/imagen.jpg`)
5. Deberías ver una vista previa de la imagen debajo del campo
