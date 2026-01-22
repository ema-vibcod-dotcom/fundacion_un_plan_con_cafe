# 🔧 Solución: Error "spawn EPERM" con esbuild

## ⚠️ Problema Detectado

El error `Error: spawn EPERM` ocurre cuando esbuild no puede ejecutarse debido a restricciones de permisos o bloqueos del antivirus.

## ✅ Soluciones (Prueba en orden)

### Solución 1: Ejecutar PowerShell como Administrador

1. **Cierra Cursor/VS Code**
2. **Abre PowerShell como Administrador:**
   - Presiona `Win + X`
   - Selecciona "Windows PowerShell (Administrador)" o "Terminal (Administrador)"
3. **Navega a tu proyecto:**
   ```powershell
   cd C:\Users\eucli\fundacion_un_plan_con_cafe
   ```
4. **Ejecuta:**
   ```powershell
   npm run dev
   ```

### Solución 2: Agregar excepción en Antivirus

Si tienes Windows Defender u otro antivirus:

1. **Windows Defender:**
   - Abre "Seguridad de Windows"
   - Ve a "Protección contra virus y amenazas"
   - "Administrar configuración" → "Exclusiones"
   - Agrega la carpeta: `C:\Users\eucli\fundacion_un_plan_con_cafe\node_modules\esbuild`

2. **Otros Antivirus:**
   - Busca la opción de "Exclusiones" o "Whitelist"
   - Agrega la carpeta del proyecto o específicamente `node_modules\esbuild`

### Solución 3: Reinstalar esbuild

```powershell
npm uninstall esbuild
npm install esbuild --save-dev
```

### Solución 4: Limpiar y Reinstalar

```powershell
# Eliminar node_modules y package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstalar todo
npm install

# Intentar de nuevo
npm run dev
```

### Solución 5: Usar CMD en lugar de PowerShell

A veces CMD funciona mejor que PowerShell:

1. Abre **CMD** (Símbolo del sistema)
2. Navega al proyecto:
   ```cmd
   cd C:\Users\eucli\fundacion_un_plan_con_cafe
   ```
3. Ejecuta:
   ```cmd
   npm run dev
   ```

### Solución 6: Verificar Permisos de Archivos

```powershell
# Verificar permisos de esbuild
Get-Acl node_modules\esbuild\esbuild.exe | Format-List

# Si es necesario, dar permisos completos (ejecutar como Admin)
icacls "node_modules\esbuild\esbuild.exe" /grant Everyone:F
```

## 🔍 Verificar el Problema

Para confirmar que es un problema de esbuild:

```powershell
# Verificar si esbuild existe
Test-Path node_modules\esbuild\esbuild.exe

# Intentar ejecutar esbuild directamente
.\node_modules\esbuild\esbuild.exe --version
```

## 📋 Información Adicional

- **esbuild** es un bundler rápido usado por Vite
- El error EPERM significa "Error: Permission Denied"
- Es común en Windows con antivirus activos
- La solución más efectiva suele ser ejecutar como Administrador o agregar excepciones

## ✅ Después de Resolver

Una vez que puedas ejecutar `npm run dev`:

1. El servidor debería iniciar en `http://localhost:5173`
2. Verás un mensaje como: `Local: http://localhost:5173/`
3. Abre esa URL en tu navegador
