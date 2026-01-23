# Configuración de Vercel para Acceso de Administrador

## 🔧 Problema

Si no puedes acceder a la administración desde Vercel, es porque falta configurar la URL de Strapi como variable de entorno.

---

## ✅ Solución: Configurar Variable de Entorno en Vercel

### Paso 1: Obtener la URL de tu Strapi

Primero necesitas saber dónde está desplegado tu Strapi:

- **Si Strapi está en un servidor propio**: `https://api.tu-dominio.com`
- **Si Strapi está en Railway**: `https://tu-proyecto.railway.app`
- **Si Strapi está en Render**: `https://tu-proyecto.onrender.com`
- **Si Strapi está en otro servicio**: Usa la URL base de tu API

### Paso 2: Configurar en Vercel

1. **Ir a tu proyecto en Vercel**
   - Ve a https://vercel.com
   - Selecciona tu proyecto

2. **Ir a Settings**
   - Clic en el proyecto
   - Clic en **"Settings"** en el menú superior

3. **Ir a Environment Variables**
   - En el menú lateral, busca **"Environment Variables"**
   - O ve directamente a: `Settings > Environment Variables`

4. **Agregar Variable**
   - Clic en **"Add New"**
   - **Key**: `VITE_STRAPI_API_URL`
   - **Value**: La URL de tu Strapi (ejemplo: `https://api.tu-dominio.com`)
   - **Environment**: Selecciona:
     - ✅ Production
     - ✅ Preview (opcional)
     - ✅ Development (opcional)
   - Clic en **"Save"**

5. **Redeploy**
   - Después de agregar la variable, necesitas hacer un nuevo deploy
   - Ve a **"Deployments"**
   - Clic en los tres puntos (⋯) del último deployment
   - Selecciona **"Redeploy"**
   - O simplemente haz un nuevo push a GitHub

---

## 📋 Ejemplo de Configuración

```
Variable Name: VITE_STRAPI_API_URL
Value: https://api.fundacion-un-plan-con-cafe.com
Environments: Production, Preview
```

---

## 🚀 Opciones de Despliegue de Strapi

Si aún no tienes Strapi desplegado, aquí tienes opciones:

### Opción 1: Railway (Recomendado - Gratis)

1. Ve a https://railway.app
2. Conecta tu repositorio de GitHub
3. Selecciona el proyecto Strapi
4. Railway detectará automáticamente que es Strapi
5. Agrega las variables de entorno necesarias
6. Railway te dará una URL como: `https://tu-proyecto.railway.app`
7. Usa esa URL en Vercel como `VITE_STRAPI_API_URL`

### Opción 2: Render (Gratis con limitaciones)

1. Ve a https://render.com
2. Crea un nuevo "Web Service"
3. Conecta tu repositorio
4. Configura:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Render te dará una URL
6. Usa esa URL en Vercel

### Opción 3: Servidor Propio (VPS)

Si tienes un servidor propio:
1. Instala Node.js y npm
2. Clona el repositorio de Strapi
3. Configura un dominio (ej: `api.tu-dominio.com`)
4. Usa esa URL en Vercel

---

## 🔍 Verificar Configuración

### En Vercel

1. Ve a **Settings > Environment Variables**
2. Verifica que `VITE_STRAPI_API_URL` esté configurada
3. Verifica que esté habilitada para **Production**

### En el Código

El código busca la variable así:
```javascript
const strapiUrl = import.meta.env.VITE_STRAPI_API_URL;
```

Si no está configurada, mostrará un mensaje de error.

---

## 🆘 Solución de Problemas

### Error: "La URL de Strapi no está configurada"

**Causa**: La variable `VITE_STRAPI_API_URL` no está configurada en Vercel.

**Solución**:
1. Configura la variable en Vercel (ver Paso 2 arriba)
2. Haz un nuevo deploy

### Error: "CORS" o "No se puede acceder"

**Causa**: Strapi no permite peticiones desde tu dominio de Vercel.

**Solución**:
1. Ve a tu panel de Strapi
2. **Settings > Middlewares > CORS**
3. Agrega tu dominio de Vercel a los orígenes permitidos:
   - Ejemplo: `https://tu-proyecto.vercel.app`
   - O usa `*` para desarrollo (no recomendado en producción)

### Error: "404 Not Found" al acceder a `/admin`

**Causa**: La URL de Strapi está mal configurada o Strapi no está desplegado.

**Solución**:
1. Verifica que Strapi esté corriendo
2. Verifica que la URL en Vercel sea correcta (sin `/admin` al final)
3. La URL debe ser solo la base: `https://api.tu-dominio.com`
4. El código agregará `/admin` automáticamente

---

## 📝 Checklist

- [ ] Strapi está desplegado y funcionando
- [ ] Tengo la URL de Strapi
- [ ] Variable `VITE_STRAPI_API_URL` configurada en Vercel
- [ ] Variable habilitada para Production
- [ ] Nuevo deploy realizado después de configurar la variable
- [ ] CORS configurado en Strapi para permitir el dominio de Vercel
- [ ] Probado el acceso desde Vercel

---

## 🎯 Resumen Rápido

1. **Obtén la URL de Strapi** (donde esté desplegado)
2. **En Vercel**: Settings > Environment Variables
3. **Agrega**: `VITE_STRAPI_API_URL` = `https://tu-url-strapi.com`
4. **Redeploy** el proyecto
5. **¡Listo!** El botón de admin funcionará

---

## 📞 ¿Necesitas Ayuda?

Si después de seguir estos pasos aún tienes problemas:

1. Verifica los logs de Vercel en el deployment
2. Verifica que Strapi esté accesible desde el navegador
3. Verifica la configuración de CORS en Strapi
4. Revisa la consola del navegador para errores específicos
