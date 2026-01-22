# 🔧 Solución: Error de Política de Ejecución de PowerShell

## ⚠️ Problema Detectado

El error indica que PowerShell está bloqueando la ejecución de scripts de npm debido a la política de ejecución del sistema.

**Error:** `No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1 porque la ejecución de scripts está deshabilitada en este sistema.`

## ✅ Soluciones (Elige una)

### Solución 1: Cambiar Política de Ejecución (Recomendado)

Ejecuta PowerShell **como Administrador** y luego ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Cuando te pregunte, responde **"S" (Sí)**.

Luego intenta de nuevo:
```powershell
npm install
```

### Solución 2: Usar npm.cmd directamente

En lugar de `npm`, usa `npm.cmd`:

```powershell
npm.cmd install
```

### Solución 3: Usar CMD en lugar de PowerShell

1. Abre **CMD** (Símbolo del sistema) en lugar de PowerShell
2. Navega a tu proyecto:
   ```cmd
   cd C:\Users\eucli\fundacion_un_plan_con_cafe
   ```
3. Ejecuta:
   ```cmd
   npm install
   ```

### Solución 4: Cambiar Política Solo para Esta Sesión

Si no quieres cambiar la política permanentemente:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
npm install
```

**Nota:** Esta solución solo funciona para la sesión actual de PowerShell.

## 🔍 Verificar Política Actual

Para ver qué política tienes actualmente:

```powershell
Get-ExecutionPolicy -List
```

## 📋 Políticas de Ejecución Explicadas

- **Restricted**: No permite ejecutar ningún script (más restrictivo)
- **RemoteSigned**: Permite scripts locales y scripts remotos firmados (recomendado)
- **Unrestricted**: Permite todos los scripts (menos seguro)

## ✅ Después de Resolver

Una vez que puedas ejecutar `npm install`:

1. **Instala las dependencias:**
   ```powershell
   npm install
   ```

2. **Ejecuta el proyecto:**
   ```powershell
   npm run dev
   ```

## 🛡️ Seguridad

La política `RemoteSigned` es segura porque:
- Permite ejecutar scripts locales (como npm.ps1)
- Requiere que scripts descargados de internet estén firmados
- Es la configuración recomendada por Microsoft para desarrolladores

## ❓ ¿Problemas Persistentes?

Si ninguna solución funciona:

1. **Reinicia PowerShell** después de cambiar la política
2. **Verifica que Node.js esté correctamente instalado:**
   ```powershell
   node --version
   ```
3. **Usa CMD** como alternativa temporal mientras resuelves el problema de PowerShell
