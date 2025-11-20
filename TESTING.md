# Playwright Tests Setup Guide

## Environment Setup

Para que los tests funcionen correctamente, necesitas configurar la API key del backend.

### Paso 1: Crear archivo .env en backend

```bash
cd backend
cat > .env << 'EOF'
GROQ_API_KEY=tu_clave_api_aqui
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF
cd ..
```

Reemplaza `tu_clave_api_aqui` con tu clave real de GROQ.

### Paso 2: Verificar que los servidores funcionan manualmente

Antes de ejecutar los tests, verifica que ambos servidores funcionan:

```bash
# Terminal 1: Backend
cd backend
pnpm start

# Terminal 2: Frontend
cd frontend
pnpm dev
```

Luego abre `http://localhost:5173` en tu navegador y prueba generar una receta manualmente.

### Paso 3: Ejecutar los tests

Una vez verificado que todo funciona manualmente:

```bash
# Asegúrate de estar en la raíz del proyecto
pnpm test
```

## Troubleshooting

### Error "failed to fetch"

Este error indica que el frontend no puede conectarse al backend. Verifica:

1. ✅ El archivo `backend/.env` existe y tiene `GROQ_API_KEY`
2. ✅ El backend se inicia correctamente en el puerto 5000
3. ✅ No hay otros procesos usando el puerto 5000 o 5173

Para verificar puertos:
```bash
# Ver qué está usando el puerto 5000
lsof -i :5000

# Ver qué está usando el puerto 5173
lsof -i :5173
```

### Los servidores no se detienen

Si Playwright se interrumpe y los servidores quedan corriendo:

```bash
# Matar procesos en los puertos
pkill -f "pnpm.*start"
pkill -f "pnpm.*dev"
```

## Modo interactivo

Para ver los tests en modo UI:

```bash
pnpm exec playwright test --ui
```

## Ver el reporte HTML

Después de ejecutar los tests:

```bash
pnpm exec playwright show-report
```
