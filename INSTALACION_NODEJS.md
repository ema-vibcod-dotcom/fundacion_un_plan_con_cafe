# 📦 Instalación de Node.js - Guía Rápida

## ⚠️ Problema Detectado

Node.js no está instalado en tu sistema, por lo que no puedes ejecutar `npm install`.

## ✅ Solución: Instalar Node.js

### Opción 1: Instalador Oficial (Recomendado)

1. **Descarga Node.js:**
   - Ve a: https://nodejs.org/
   - Descarga la versión **LTS (Long Term Support)** - Recomendada para la mayoría de usuarios
   - El instalador será un archivo `.msi` para Windows

2. **Instala Node.js:**
   - Ejecuta el archivo descargado
   - Sigue el asistente de instalación
   - **IMPORTANTE:** Asegúrate de marcar la opción "Add to PATH" durante la instalación
   - Completa la instalación

3. **Verifica la instalación:**
   - Cierra y vuelve a abrir PowerShell/Terminal
   - Ejecuta:
     ```powershell
     node --version
     npm --version
     ```
   - Deberías ver números de versión (ej: v20.10.0 y 10.2.3)

### Opción 2: Usando Chocolatey (Si lo tienes instalado)

```powershell
choco install nodejs
```

### Opción 3: Usando winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## 🚀 Después de Instalar Node.js

Una vez instalado Node.js:

1. **Cierra y vuelve a abrir PowerShell/Terminal** (importante para que reconozca los nuevos comandos)

2. **Navega a tu proyecto:**
   ```powershell
   cd C:\Users\eucli\fundacion_un_plan_con_cafe
   ```

3. **Instala las dependencias:**
   ```powershell
   npm install
   ```

4. **Ejecuta el proyecto en desarrollo:**
   ```powershell
   npm run dev
   ```

## 📋 Versiones Recomendadas

- **Node.js:** v18.x o v20.x (LTS)
- **npm:** Se instala automáticamente con Node.js

## ❓ ¿Problemas?

Si después de instalar Node.js sigues teniendo problemas:

1. **Reinicia tu computadora** para asegurar que las variables de entorno se actualicen
2. Verifica que Node.js esté en el PATH:
   ```powershell
   $env:PATH -split ';' | Select-String node
   ```
3. Si no aparece, agrega manualmente la ruta de Node.js al PATH del sistema

## 🔗 Enlaces Útiles

- **Node.js oficial:** https://nodejs.org/
- **Documentación npm:** https://docs.npmjs.com/
- **Guía de instalación:** https://nodejs.org/en/download/package-manager/
