# 📤 Guía: Subir Proyecto a GitHub

## 📋 Pasos para Subir tu Proyecto React a GitHub

### Paso 1: Verificar Estado Actual de Git

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
cd C:\Users\eucli\fundacion_un_plan_con_cafe
git status
```

Esto te mostrará qué archivos están pendientes de agregar o commitear.

### Paso 2: Agregar Todos los Archivos

```powershell
git add .
```

Esto agregará todos los archivos nuevos y modificados al staging area.

### Paso 3: Hacer Commit

```powershell
git commit -m "Migración completa a React - Proyecto listo para Vercel"
```

O si prefieres un mensaje más descriptivo:

```powershell
git commit -m "Migración de Flask/Python a React

- Convertido a SPA con React y Vite
- Implementado React Router para navegación
- Sistema de traducciones ES/EN
- Formulario de donaciones con validación
- Páginas: Home, Donations, Store, Learn, Podcast
- Listo para despliegue en Vercel
- Eliminados archivos legacy de Flask/Python"
```

### Paso 4: Crear Repositorio en GitHub

1. **Ve a GitHub:** https://github.com
2. **Inicia sesión** en tu cuenta
3. **Haz clic en el botón "+"** (arriba a la derecha) → **"New repository"**
4. **Configura el repositorio:**
   - **Repository name:** `fundacion-un-plan-con-cafe` (o el nombre que prefieras)
   - **Description:** "Aplicación React SPA para Fundación Un Plan con Café - Migrada desde Flask"
   - **Visibilidad:** Elige **Public** o **Private**
   - **NO marques** "Initialize this repository with a README" (ya tienes uno)
   - **NO agregues** .gitignore ni licencia (ya los tienes)
5. **Haz clic en "Create repository"**

### Paso 5: Conectar Repositorio Local con GitHub

GitHub te mostrará comandos después de crear el repositorio. Ejecuta estos comandos en PowerShell:

**Si es la primera vez que subes (sin rama main existente):**

```powershell
git branch -M main
git remote add origin https://github.com/TU_USUARIO/fundacion-un-plan-con-cafe.git
git push -u origin main
```

**Si ya tienes commits y solo necesitas agregar el remote:**

```powershell
git remote add origin https://github.com/TU_USUARIO/fundacion-un-plan-con-cafe.git
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANTE:** Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

### Paso 6: Autenticación

GitHub puede pedirte autenticación:

- **Si usas HTTPS:** Te pedirá tu usuario y un **Personal Access Token** (no tu contraseña)
- **Si usas SSH:** Necesitas tener configurada tu clave SSH

#### Crear Personal Access Token (si usas HTTPS):

1. Ve a: https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. Dale un nombre: `fundacion-un-plan-con-cafe`
4. Selecciona el scope: **`repo`** (acceso completo a repositorios)
5. Click en **"Generate token"**
6. **Copia el token** (solo se muestra una vez)
7. Úsalo como contraseña cuando Git te la pida

### Paso 7: Verificar que se Subió Correctamente

```powershell
git remote -v
```

Deberías ver algo como:
```
origin  https://github.com/TU_USUARIO/fundacion-un-plan-con-cafe.git (fetch)
origin  https://github.com/TU_USUARIO/fundacion-un-plan-con-cafe.git (push)
```

Luego ve a tu repositorio en GitHub y verifica que todos los archivos estén ahí.

## 🔄 Comandos para Futuras Actualizaciones

Cada vez que hagas cambios y quieras subirlos:

```powershell
# Ver qué archivos cambiaron
git status

# Agregar archivos modificados
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push
```

## 🔍 Comandos Útiles

```powershell
# Ver historial de commits
git log --oneline

# Ver qué archivos están siendo rastreados
git ls-files

# Ver diferencias antes de hacer commit
git diff

# Deshacer cambios en un archivo (antes de git add)
git checkout -- nombre-archivo.jsx

# Deshacer git add (quitar del staging)
git reset nombre-archivo.jsx
```

## ⚠️ Solución de Problemas

### Si ya existe un remote:

```powershell
# Ver remotes actuales
git remote -v

# Si necesitas cambiar el URL del remote
git remote set-url origin https://github.com/TU_USUARIO/fundacion-un-plan-con-cafe.git

# O eliminar y agregar de nuevo
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/fundacion-un-plan-con-cafe.git
```

### Si hay conflictos al hacer push:

```powershell
# Primero hacer pull para traer cambios remotos
git pull origin main --rebase

# Luego hacer push
git push origin main
```

### Si olvidaste agregar algo al último commit:

```powershell
git add archivo-olvidado.jsx
git commit --amend --no-edit
git push --force
```

**⚠️ Cuidado con `--force`:** Solo úsalo si trabajas solo o coordinaste con tu equipo.

## 📝 Resumen Rápido

```powershell
# 1. Agregar archivos
git add .

# 2. Hacer commit
git commit -m "Tu mensaje aquí"

# 3. Agregar remote (solo la primera vez)
git remote add origin https://github.com/TU_USUARIO/fundacion-un-plan-con-cafe.git

# 4. Subir a GitHub
git push -u origin main
```

## 🚀 Después de Subir a GitHub

Una vez que tu código esté en GitHub, puedes:

1. **Conectar con Vercel:**
   - Ve a https://vercel.com
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - ¡Despliegue automático!

2. **Compartir el código** con otros desarrolladores

3. **Hacer seguimiento de cambios** con el historial de Git

¡Listo! Tu proyecto React estará en GitHub. 🎉
