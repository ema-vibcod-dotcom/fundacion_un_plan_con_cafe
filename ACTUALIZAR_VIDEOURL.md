# Actualizar Base de Datos: Agregar Campo videoUrl

Este documento explica cómo agregar el campo `video_url` a la tabla de productos en Supabase.

## 📋 Pasos para Actualizar Supabase

### Paso 1: Ejecutar SQL en Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com
2. En el menú lateral izquierdo, haz clic en **"SQL Editor"**
3. Haz clic en **"+ New"** para crear una nueva query
4. Abre el archivo `supabase-add-videourl.sql` en tu proyecto
5. Copia TODO el contenido del archivo
6. Pégalo en el editor SQL de Supabase
7. Haz clic en **"Run"** (o presiona Ctrl+Enter)
8. Deberías ver: **"Success. No rows returned"**

### Paso 2: Verificar que se agregó la columna

1. En Supabase, ve a **"Table Editor"** (en el menú lateral)
2. Selecciona la tabla `productos`
3. Verifica que tenga una columna `video_url` de tipo `text`

## ✅ ¿Qué hace este SQL?

El SQL agrega una columna `video_url` (TEXT, opcional) a la tabla `productos`.

**Nota**: La columna es opcional (NULL permitido), por lo que los productos existentes seguirán funcionando sin problemas.

## 🎯 Después de Ejecutar el SQL

Una vez que hayas ejecutado el SQL:
1. El formulario admin ya tiene el campo `videoUrl` listo para usar
2. Puedes agregar URLs de videos a productos (YouTube, Vimeo o MP4 directo)
3. El sistema validará que las URLs sean válidas
4. El video se mostrará en la página de detalle del producto, debajo de la imagen

## 🔍 Verificar que Funciona

1. Accede al panel de administración en tu web
2. Intenta crear o editar un producto
3. Deberías ver el campo "URL de Video del Producto"
4. Ingresa una URL válida de YouTube, Vimeo o MP4
5. Guarda el producto
6. En la página de detalle del producto, deberías ver el video debajo de la imagen

## 📝 Formatos Soportados

- **YouTube**: `https://youtube.com/watch?v=...` o `https://youtu.be/...`
- **Vimeo**: `https://vimeo.com/...`
- **MP4 directo**: `https://ejemplo.com/video.mp4`
