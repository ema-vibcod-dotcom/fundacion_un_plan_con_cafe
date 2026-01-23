# Acceso del Administrador - Guía Completa

## 🎯 ¿Cómo Accede el Administrador?

El administrador accede al **panel de administración de Strapi** (Backoffice) a través de una URL específica. Este panel es completamente independiente del sitio web público (React).

---

## 🚀 Primer Acceso (Primera Vez)

### Paso 1: Iniciar Strapi

```bash
cd backend
npm run develop
```

Strapi se iniciará en: **http://localhost:1337**

### Paso 2: Crear Cuenta de Administrador

1. Abrir el navegador en: **http://localhost:1337/admin**
2. Aparecerá un formulario para crear el primer usuario administrador
3. Completar:
   - **Nombre completo**
   - **Email**
   - **Contraseña** (debe ser segura)
   - **Confirmar contraseña**

4. Hacer clic en **"Let's start"**

### Paso 3: Acceso al Panel

Una vez creada la cuenta, el administrador será redirigido automáticamente al panel de administración.

---

## 🔐 Acceso Posterior

### En Desarrollo (Local)

**URL**: `http://localhost:1337/admin`

1. Abrir el navegador
2. Ir a `http://localhost:1337/admin`
3. Ingresar:
   - **Email** (el que se usó al crear la cuenta)
   - **Contraseña**
4. Hacer clic en **"Sign in"**

### En Producción

**URL**: `https://tu-dominio-strapi.com/admin`

El proceso es el mismo, pero usando la URL de producción.

---

## 📋 Panel de Administración

Una vez dentro, el administrador verá:

### Menú Principal (Sidebar)

1. **Content Manager**
   - Ver y gestionar todos los contenidos
   - Crear, editar, eliminar proyectos, productos, episodios

2. **Content-Type Builder**
   - Crear nuevos tipos de contenido (solo para desarrolladores)

3. **Media Library**
   - Subir y gestionar imágenes y videos
   - Organizar archivos multimedia

4. **Settings**
   - **Roles & Permissions**: Gestionar usuarios y permisos
   - **Users**: Ver y gestionar usuarios
   - **Media Library**: Configuración de archivos
   - **Internationalization**: Configuración de idiomas (si aplica)

---

## 👥 Gestión de Usuarios y Roles

### Crear Nuevo Usuario Administrador

1. Ir a **Settings > Users**
2. Hacer clic en **"Invite user"** o **"Create new user"**
3. Completar:
   - **Email**
   - **Username** (opcional)
   - **First name**
   - **Last name**
   - **Password**
   - **Role**: Seleccionar "Administrator" o "Editor"

### Crear Usuario Editor

1. Ir a **Settings > Roles > Editor**
2. Configurar permisos para cada Content Type:
   - ✅ **find**: Ver listado
   - ✅ **findOne**: Ver detalle
   - ✅ **create**: Crear nuevo
   - ✅ **update**: Editar existente
   - ✅ **delete**: Eliminar

3. Crear el usuario y asignarle el rol "Editor"

### Roles Disponibles

#### 1. **Administrator** (Administrador)
- ✅ Acceso completo a todo
- ✅ Puede gestionar usuarios
- ✅ Puede cambiar configuraciones
- ✅ Puede crear/editar/eliminar todo el contenido

#### 2. **Editor**
- ✅ Puede crear/editar/eliminar contenido
- ❌ No puede gestionar usuarios
- ❌ No puede cambiar configuraciones del sistema
- ✅ Acceso limitado según permisos configurados

#### 3. **Public** (Público - Solo lectura)
- ✅ Solo puede leer contenido publicado
- ❌ No puede crear/editar/eliminar
- ❌ No requiere autenticación
- ⚠️ Este rol es para el frontend React (público)

---

## 📝 Flujo de Trabajo del Administrador

### 1. Gestionar Proyectos

1. Ir a **Content Manager > Proyecto**
2. Ver lista de proyectos existentes
3. **Crear nuevo**: Clic en **"Create new entry"**
4. **Editar**: Clic en un proyecto existente
5. **Eliminar**: Clic en el proyecto > **"Delete"**

### 2. Gestionar Productos

1. Ir a **Content Manager > Producto**
2. Ver lista de productos
3. **Crear nuevo**: Clic en **"Create new entry"**
4. **Editar stock**: Editar el campo "stock"
5. **Activar/Desactivar**: Usar el toggle "activo"

### 3. Gestionar Episodios de Podcast

1. Ir a **Content Manager > Episodio Podcast**
2. Ver lista de episodios
3. **Crear nuevo**: Clic en **"Create new entry"**
4. **Agregar URLs**: Completar campos de Spotify, Apple Podcast, YouTube

### 4. Subir Multimedia

1. Ir a **Media Library**
2. **Subir archivos**: Arrastrar y soltar o clic en **"Upload"**
3. **Organizar**: Crear carpetas si es necesario
4. **Usar en contenido**: Al crear/editar contenido, hacer clic en el campo de imagen/video y seleccionar de la biblioteca

---

## 🔒 Seguridad

### Contraseñas Seguras

- Mínimo 8 caracteres
- Combinar mayúsculas, minúsculas, números y símbolos
- No usar información personal

### Cambiar Contraseña

1. Hacer clic en el **avatar** (esquina superior derecha)
2. Seleccionar **"Profile"**
3. Ir a **"Change password"**
4. Ingresar contraseña actual y nueva

### Recuperar Contraseña

Si el administrador olvida su contraseña:

1. En la pantalla de login, clic en **"Forgot your password?"**
2. Ingresar el email
3. Revisar el correo para el link de recuperación
4. Seguir las instrucciones

---

## 🌐 Configuración para Producción

### Variables de Entorno

En producción, configurar en `backend/.env`:

```env
# URL del panel de administración
ADMIN_URL=https://admin.tu-dominio.com
APP_URL=https://api.tu-dominio.com

# Seguridad
ADMIN_JWT_SECRET=tu-secret-super-seguro
API_TOKEN_SALT=tu-salt-super-seguro
```

### Acceso en Producción

**URL del Panel**: `https://api.tu-dominio.com/admin`

El proceso de login es el mismo que en desarrollo.

---

## 📱 Acceso desde Móvil

Strapi tiene una interfaz responsive, pero para mejor experiencia:

1. Usar navegador móvil
2. Ir a la URL del admin
3. Hacer login normalmente
4. El panel se adaptará a la pantalla

---

## 🆘 Solución de Problemas

### No puedo acceder al panel

**Problema**: Error 404 o página no encontrada

**Solución**:
1. Verificar que Strapi esté corriendo: `npm run develop`
2. Verificar la URL: debe ser `/admin` (no `/admin/`)
3. Verificar el puerto: por defecto es 1337

### Olvidé mi contraseña

**Solución**: Usar "Forgot your password?" en la pantalla de login

### No puedo crear contenido

**Problema**: Botones deshabilitados o sin permisos

**Solución**:
1. Verificar el rol del usuario
2. Ir a **Settings > Roles > [Tu Rol]**
3. Habilitar permisos: `create`, `update`, `delete`

### Error de CORS

**Problema**: No se pueden cargar imágenes o hacer peticiones

**Solución**: Configurar CORS en `backend/config/middlewares.js`

---

## 📚 Recursos Adicionales

- [Strapi Admin Panel Documentation](https://docs.strapi.io/user-docs/intro)
- [Strapi User Guide](https://docs.strapi.io/user-docs/getting-started)
- [Strapi Roles & Permissions](https://docs.strapi.io/user-docs/users-roles-permissions)

---

## ✅ Checklist de Configuración Inicial

- [ ] Strapi instalado y funcionando
- [ ] Cuenta de administrador creada
- [ ] Permisos configurados para roles
- [ ] Content Types creados
- [ ] Usuarios adicionales creados (si es necesario)
- [ ] Media Library configurada
- [ ] Variables de entorno configuradas
- [ ] Acceso probado desde diferentes navegadores

---

## 🎯 Resumen

**URL de Acceso**: 
- Desarrollo: `http://localhost:1337/admin`
- Producción: `https://tu-dominio-strapi.com/admin`

**Credenciales**: Email y contraseña creados en el primer acceso

**Panel**: Interfaz visual completa para gestionar todo el contenido sin escribir código

¡El administrador puede empezar a gestionar contenido inmediatamente después del primer login! 🚀
