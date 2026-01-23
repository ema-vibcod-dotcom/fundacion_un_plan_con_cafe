# ⚡ Inicio Rápido: Strapi + Railway + Vercel

## 🎯 Resumen

**Strapi NO puede ejecutarse en Vercel**. Necesitas:
- **Frontend (React)**: Vercel ✅
- **Backend (Strapi)**: Railway ✅ (gratis)

---

## 🚀 Pasos Rápidos (30 minutos)

### 1️⃣ Instalar Strapi Localmente (5 min)

```bash
# En la raíz del proyecto
npx create-strapi-app@latest backend --quickstart
```

- Se abrirá `http://localhost:1337/admin`
- Crea tu cuenta de administrador
- Guarda bien tu contraseña

### 2️⃣ Configurar Content Types (10 min)

1. En Strapi Admin, ve a **Content-Type Builder**
2. Crea los 3 Content Types:
   - **Proyecto** (ver `strapi-content-types/proyecto/schema.json`)
   - **Producto** (ver `strapi-content-types/producto/schema.json`)
   - **Episodio Podcast** (ver `strapi-content-types/episodio-podcast/schema.json`)

3. Configura permisos:
   - **Settings > Roles > Public**: ✅ find, ✅ findOne
   - **Settings > Roles > Authenticated**: ✅ todos los permisos

### 3️⃣ Desplegar en Railway (10 min)

1. Ve a https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Selecciona tu repositorio
4. En **Root Directory**, escribe: `backend`
5. Agrega **PostgreSQL** (Database → Add PostgreSQL)
6. Railway configurará todo automáticamente
7. Obtén la URL (ejemplo: `https://tu-proyecto.railway.app`)

### 4️⃣ Conectar con Vercel (5 min)

1. Ve a https://vercel.com → Tu proyecto
2. **Settings** → **Environment Variables**
3. Agregar:
   ```
   Key: VITE_STRAPI_API_URL
   Value: https://tu-proyecto.railway.app
   Environments: ✅ Production
   ```
4. **Redeploy**

---

## ✅ Verificar

1. **Strapi en Railway**: Abre la URL → Deberías ver login
2. **Frontend en Vercel**: Clic en botón admin → Ingresa `admin2024` → Debería abrir Strapi

---

## 📚 Documentación Completa

- **Instalación detallada**: `INSTALACION_STRAPI.md`
- **Deploy en Railway**: `RAILWAY_DEPLOY.md`
- **Configuración Vercel**: `CONFIGURACION_VERCEL.md`

---

## 🆘 ¿Problemas?

### "No puedo instalar Strapi"
- Verifica que tengas Node.js instalado
- Ejecuta: `node --version` (debe ser v18+)

### "Railway no detecta el proyecto"
- Asegúrate de que la carpeta `backend/` exista
- Verifica que `backend/package.json` exista

### "Error de base de datos"
- Verifica que PostgreSQL esté agregado en Railway
- Verifica las variables de entorno

---

## 💡 Tips

- **Railway es gratis** para empezar (500 horas/mes)
- **PostgreSQL es gratis** en Railway
- **Vercel es gratis** para proyectos personales
- Todo el stack es **gratis** para empezar

---

¡Empieza con el Paso 1! 🚀
