# Generador de Recetas

Este proyecto es una aplicación web que permite a los usuarios generar recetas personalizadas basadas en los ingredientes que tienen disponibles, sus preferencias dietéticas (opcional) y el tiempo máximo de preparación deseado. La aplicación se compone de un frontend desarrollado con React y un backend desarrollado con Node.js.

## Tecnologías Principales

*   **Frontend:**
    *   [React](https://reactjs.org/): Biblioteca de JavaScript para construir interfaces de usuario.
    *   [TypeScript](https://www.typescriptlang.org/): Superset de JavaScript que añade tipado estático.
    *   [Tailwind CSS](https://tailwindcss.com/): Framework CSS utility-first.
    *   [Vite](https://vitejs.dev/): Herramienta de desarrollo y empaquetado.
*   **Backend:**
    *   [Node.js](https://nodejs.org/): Entorno de ejecución de JavaScript del lado del servidor.
    *   [Express.js](https://expressjs.com/): Framework web para Node.js.
    *   [Groq API](https://groq.com/): API para el modelo de lenguaje Mixtral-8x7b-32768.

## Estructura del Proyecto
*   **`backend/`**: Contiene el código fuente del backend.
*   **`frontend/`**: Contiene el código fuente del frontend.
*   **`README.md`**: Este archivo, la documentación general del proyecto.

## Configuración

### Variables de Entorno

El proyecto utiliza variables de entorno para la configuración. Debes crear un archivo `.env` en la raíz del proyecto y en la carpeta `backend/` con las siguientes variables:

*   **`.env` (Raíz del proyecto):**
    *   `PORT`: Puerto del servidor backend (predeterminado: `5000`).
*   **`backend/.env`:**
    *   `GROQ_API_KEY`: Clave de API para el servicio Groq.
    *   `NODE_ENV`: Entorno de ejecución (`development` o `production`).

## Inicio del Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone <repository_url>
    cd <project_folder>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    cd backend
    npm install
    cd ../frontend
    npm install
    cd ..
    ```

3.  **Configurar las variables de entorno:**
    *   Crea un archivo `.env` en la raíz del proyecto y en la carpeta `backend/`.
    *   Añade las variables de entorno necesarias.

4.  **Iniciar el servidor backend:**
    ```bash
    cd backend
    npm start
    ```

5.  **Iniciar el servidor frontend:**
    ```bash
    cd frontend
    npm run dev
    ```

## Uso

1.  Abre tu navegador web y ve a la URL del frontend (normalmente `http://localhost:5173`).
2.  Ingresa los ingredientes que tienes disponibles.
3.  Selecciona tus preferencias dietéticas (opcional).
4.  Ingresa el tiempo máximo de preparación (opcional).
5.  Haz clic en el botón "Generar Receta".
6.  La aplicación mostrará la receta generada.

## Documentación Detallada

### Backend

Para obtener documentación detallada sobre el backend, consulta el archivo `backend/README.md`.

### Frontend

Para obtener documentación detallada sobre el frontend, consulta el archivo `frontend/README.md`.

## Contacto

Para cualquier duda o problema contáctame en <a href="mailto:angelruiznadal@gmail.com">angelruiznadal@gmail.com
