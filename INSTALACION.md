# 🚀 Instalación del Juego DarkOrbit Clone en tu PC

## 📋 Requisitos Previos

Antes de instalar el juego, necesitas tener instalado en tu PC:

1. **Node.js** (versión 18 o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica la instalación: `node --version`

2. **Git** (opcional, para clonar el repositorio)
   - Descarga desde: https://git-scm.com/

## 📥 Método 1: Descarga Directa

### Paso 1: Crear carpeta del proyecto
```bash
mkdir darkorbit-game
cd darkorbit-game
```

### Paso 2: Crear archivos del proyecto

Crea los siguientes archivos y carpetas con el contenido exacto:

#### `package.json`
```json
{
  "name": "darkorbit-clone",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "PORT=8000 next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@radix-ui/react-accordion": "^1.2.10",
    "@radix-ui/react-alert-dialog": "^1.1.13",
    "@radix-ui/react-aspect-ratio": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.9",
    "@radix-ui/react-checkbox": "^1.3.1",
    "@radix-ui/react-collapsible": "^1.1.10",
    "@radix-ui/react-context-menu": "^2.2.14",
    "@radix-ui/react-dialog": "^1.1.13",
    "@radix-ui/react-dropdown-menu": "^2.1.14",
    "@radix-ui/react-hover-card": "^1.1.13",
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-menubar": "^1.1.14",
    "@radix-ui/react-navigation-menu": "^1.2.12",
    "@radix-ui/react-popover": "^1.1.13",
    "@radix-ui/react-progress": "^1.1.6",
    "@radix-ui/react-radio-group": "^1.3.6",
    "@radix-ui/react-scroll-area": "^1.2.8",
    "@radix-ui/react-select": "^2.2.4",
    "@radix-ui/react-separator": "^1.1.6",
    "@radix-ui/react-slider": "^1.3.4",
    "@radix-ui/react-slot": "^1.2.2",
    "@radix-ui/react-switch": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.11",
    "@radix-ui/react-toggle": "^1.1.8",
    "@radix-ui/react-toggle-group": "^1.1.9",
    "@radix-ui/react-tooltip": "^1.2.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.509.0",
    "next": "15.3.2",
    "next-themes": "^0.4.6",
    "phaser": "^3.90.0",
    "react": "^19.0.0",
    "react-day-picker": "^9.8.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.3",
    "react-resizable-panels": "^3.0.1",
    "recharts": "^2.15.3",
    "socket.io": "^4.8.1",
    "socket.io-client": "^4.8.1",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.2.0",
    "vaul": "^1.1.2",
    "zod": "^3.24.4"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "15.3.2",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.6",
    "tw-animate-css": "^1.2.9",
    "typescript": "^5"
  }
}
```

### Paso 3: Instalar dependencias
```bash
npm install
```

### Paso 4: Crear estructura de carpetas
```bash
mkdir -p src/app src/components/game src/hooks src/lib public
```

### Paso 5: Copiar todos los archivos del código fuente

Necesitarás copiar todos los archivos que hemos creado:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/game/page.tsx`
- `src/app/api/socket/route.ts`
- `src/app/globals.css`
- `src/components/game/SimpleGame.tsx`
- `src/components/game/GameChat.tsx`
- `src/components/game/GameHUD.tsx`
- `src/components/ui/` (todos los componentes)
- `src/hooks/useGame.ts`
- `src/lib/socket.ts`
- `src/lib/utils.ts`
- `next.config.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `components.json`

## 🚀 Ejecutar el Juego

### Paso 1: Iniciar el servidor de desarrollo
```bash
npm run dev
```

### Paso 2: Abrir el juego en tu navegador
Abre tu navegador y ve a: `http://localhost:8000`

## 🎮 Cómo Jugar

1. **Crear Piloto**: Ingresa tu nombre y selecciona una facción
2. **Controles**:
   - **WASD** o **Flechas**: Mover la nave
   - **Click del mouse**: Disparar o recolectar recursos
   - **Chat**: Expandir y escribir mensajes

## 🛠 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Producción
npm run build        # Construir para producción
npm start           # Iniciar servidor de producción

# Utilidades
npm run lint        # Verificar código
```

## 🔧 Configuración Avanzada

### Cambiar Puerto
Edita `package.json` y cambia `PORT=8000` por el puerto deseado.

### Modo Producción
```bash
npm run build
npm start
```

## 📱 Características del Juego

- ✅ **Motor de juego HTML5 Canvas**
- ✅ **Sistema de facciones** (MMO, EIC, VRU)
- ✅ **Chat en tiempo real**
- ✅ **Recolección de recursos**
- ✅ **Sistema de experiencia y niveles**
- ✅ **Interfaz moderna y responsiva**
- ✅ **Minimapa con posiciones**

## 🐛 Solución de Problemas

### Error de puerto ocupado
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### Reinstalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🌟 Próximas Características

- 🔄 **Multijugador real con Socket.IO**
- 🎯 **Sistema de combate avanzado**
- 🏆 **Rankings y logros**
- 🌌 **Múltiples galaxias**
- 🛸 **Diferentes tipos de naves**

¡Disfruta explorando la galaxia! 🚀
