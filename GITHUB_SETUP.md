# 📋 Instrucciones para GitHub y Vercel

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `growth-planner`
3. Descripción: `Herramienta de Growth Hacking con Matriz ICE - Dmente Digital`
4. Visibilidad: **Public** (para Vercel)
5. **NO marques** "Initialize this repository with"
6. Click en **Create repository**

## Paso 2: Hacer Push del Código Local

```bash
cd "c:\Users\diego\Documents\DIEGOSAN\PROYECTO D MENTE DIGITAL\GROWTH MARKETING"

# Agregar el remoto (cambia dmentdigital-cmd por tu usuario)
git remote add origin https://github.com/dmentdigital-cmd/growth-planner.git
git branch -M main
git push -u origin main
```

Te pedirá:
- **Usuario**: tu usuario de GitHub (ej: dmentdigital-cmd)
- **Contraseña**: Tu token personal (PAT) de GitHub

### ¿Cómo conseguir un Token Personal?
1. GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Nombre: "Growth Planner Push"
4. Selecciona: `repo` (acceso completo a repos)
5. Copia el token y úsalo como contraseña

## Paso 3: Desplegar en Vercel

### Opción A: Desde la interfaz de Vercel (Recomendado)
1. Ve a https://vercel.com/new
2. Selecciona "Import Git Repository"
3. Busca tu repo `growth-planner`
4. Click Import
5. Settings:
   - Framework Preset: **Other** (es static HTML)
   - Root Directory: `.` (raíz)
6. Click Deploy

### Opción B: Con Vercel CLI
```bash
npm install -g vercel
cd "c:\Users\diego\Documents\DIEGOSAN\PROYECTO D MENTE DIGITAL\GROWTH MARKETING"
vercel
```

## Paso 4: Verificar Deployment

Tu app estará en:
- https://growth-planner-XXXXX.vercel.app
- (Vercel te mostrará la URL exacta)

## 🚀 ¡Listo!

Tu Growth Planner estará:
✅ En GitHub: https://github.com/dmentdigital-cmd/growth-planner
✅ En Vercel: https://growth-planner-XXXXX.vercel.app
✅ Con dominio personalizado (opcional): puedes agregarlo desde Vercel Settings

---

**Nota**: Si hay errores de autenticación, asegúrate de:
- Tener GitHub configurado en Git: `git config --global user.email "tu@email.com"`
- Usar un token personal válido (no tu contraseña directa)
