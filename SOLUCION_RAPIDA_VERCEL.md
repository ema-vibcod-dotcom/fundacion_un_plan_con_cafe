# 🚀 Solución Rápida: Acceso de Administrador en Vercel

## ⚡ Pasos Rápidos (2 minutos)

### 1. Obtener URL de Strapi

¿Dónde está desplegado tu Strapi?
- **Railway**: Ve a tu proyecto → Settings → Domains → Copia la URL
- **Render**: Ve a tu servicio → Copia la URL
- **Otro**: Copia la URL base (sin `/admin`)

### 2. Configurar en Vercel

1. Ve a https://vercel.com → Tu proyecto
2. **Settings** → **Environment Variables**
3. Clic en **"Add New"**
4. Completa:
   ```
   Key: VITE_STRAPI_API_URL
   Value: https://tu-url-strapi.com
   Environments: ✅ Production
   ```
5. **Save**

### 3. Redeploy

1. Ve a **Deployments**
2. Clic en **⋯** del último deployment
3. **Redeploy**

### 4. Probar

1. Ve a tu sitio en Vercel
2. Clic en el botón de admin (esquina inferior derecha)
3. Ingresa contraseña: `admin2024`
4. Debería abrirse el panel de Strapi

---

## ❌ Si No Funciona

### Error: "URL no configurada"

✅ **Solución**: Configura `VITE_STRAPI_API_URL` en Vercel (paso 2)

### Error: "CORS" o bloqueado

✅ **Solución**: 
1. Ve a tu panel de Strapi
2. Settings → Middlewares → CORS
3. Agrega tu dominio de Vercel

### Error: "404" en `/admin`

✅ **Solución**: 
- La URL debe ser solo la base: `https://api.com`
- NO incluyas `/admin` al final
- El código lo agrega automáticamente

---

## 📝 Ejemplo Completo

**Si tu Strapi está en Railway:**
```
URL: https://fundacion-strapi.railway.app
```

**En Vercel, configura:**
```
VITE_STRAPI_API_URL = https://fundacion-strapi.railway.app
```

**Después del login, abrirá:**
```
https://fundacion-strapi.railway.app/admin
```

---

## 🆘 ¿Aún No Funciona?

1. Verifica que Strapi esté corriendo (abre la URL en el navegador)
2. Verifica que la variable esté en **Production** (no solo Preview)
3. Verifica que hayas hecho **Redeploy** después de agregar la variable
4. Revisa la consola del navegador (F12) para ver errores específicos

---

## 📞 Información Adicional

Para más detalles, ver: **CONFIGURACION_VERCEL.md**
