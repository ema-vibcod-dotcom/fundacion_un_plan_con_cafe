# Fundación Un Plan con Café - React App

Aplicación React SPA (Single Page Application) para la Fundación Un Plan con Café, migrada desde Flask/Python.

## 🚀 Características

- **100% Frontend**: Aplicación React sin backend
- **Mobile-First**: Diseño optimizado para dispositivos móviles
- **Bilingüe**: Soporte para español e inglés
- **React Router**: Navegación SPA con React Router
- **TailwindCSS**: Estilos con TailwindCSS CDN
- **Listo para Vercel**: Configuración lista para despliegue en Vercel

## 📁 Estructura del Proyecto

```
src/
 ├── components/      # Componentes reutilizables
 ├── pages/          # Páginas de la aplicación
 ├── data/           # Datos mock (JSON simulado)
 ├── services/       # Servicios (simulación de backend)
 ├── contexts/       # Contextos de React (idioma)
 ├── App.jsx         # Componente principal
 └── main.jsx        # Punto de entrada
```

## ⚙️ Requisitos Previos

**IMPORTANTE:** Antes de continuar, necesitas tener Node.js instalado.

- **Node.js:** v18.x o superior (LTS recomendado)
- **npm:** Se instala automáticamente con Node.js

### ¿No tienes Node.js instalado?

Consulta el archivo `INSTALACION_NODEJS.md` para instrucciones detalladas de instalación.

**Descarga rápida:** https://nodejs.org/ (descarga la versión LTS)

## 🛠️ Instalación

Una vez que tengas Node.js instalado:

```bash
npm install
```

### ⚠️ Problema con PowerShell?

Si recibes un error sobre "ejecución de scripts deshabilitada", consulta el archivo `SOLUCION_POWERSHELL.md` para resolverlo.

**Solución rápida:** Ejecuta PowerShell como Administrador y luego:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🏃 Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Build para Producción

```bash
npm run build
```

El build se generará en la carpeta `dist/`

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Vite
3. El archivo `vercel.json` ya está configurado para SPA routing
4. ¡Listo! Tu aplicación estará desplegada

## 📄 Páginas

- **Home** (`/`): Página principal con información de la fundación
- **Donations** (`/donate`): Formulario de donaciones
- **Store** (`/store`): Tienda con productos
- **Learn** (`/learn`): Lecciones de educación bilingüe
- **Podcast** (`/podcast`): Episodios de podcast

## 🎨 Tecnologías

- React 18
- React Router 6
- Vite
- TailwindCSS (CDN)

## 📝 Notas

- Los datos están simulados en archivos JSON en `src/data/`
- Las donaciones se guardan en memoria (simulación)
- No hay backend real, todo es frontend
