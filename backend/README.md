# Documentación del Backend - Generador de Recetas

## Descripción General

Este backend proporciona un servicio de generación de recetas utilizando la API de Groq con el modelo `Mixtral-8x7b-32768`. El sistema acepta una lista de ingredientes, preferencias dietéticas opcionales y un tiempo máximo de preparación opcional para generar recetas personalizadas.

## Configuración del Entorno

### Variables de Entorno (.env)

*   **`PORT`**: Puerto del servidor. (Predeterminado: `5000`)
*   **`GROQ_API_KEY`**: Clave de API para el servicio Groq.
*   **`NODE_ENV`**: Entorno de ejecución. (`development` / `production`)

## Estructura del Proyecto

### Directorios Principales

*   **`/src`**: Código fuente principal.
*   **`/config`**: Configuraciones del sistema.
*   **`/controllers`**: Controladores de la aplicación.
*   **`/middleware`**: Middleware personalizado.
*   **`/routes`**: Definición de rutas.
*   **`/services`**: Lógica de negocio.
*   **`/utils`**: Utilidades generales.

## API Endpoints

### Generación de Recetas

*   **Ruta**: `/api/recipes/generate`
*   **Método**: `POST`
*   **Body**:
    ```json
    {
      "ingredients": ["array de ingredientes"],
      "dietPreference": "preferencia dietética (opcional)",
      "maxPreparationTime": número en minutos (opcional)
    }
    ```
*   **Respuesta exitosa (200 OK)**:
    ```json
    {
      "title": "Nombre de la receta",
      "ingredients": ["ingredientes"],
      "instructions": ["pasos"],
      "preparationTime": "tiempo en minutos",
      "difficulty": "nivel de dificultad"
    }
    ```
*   **Respuesta de error (400 Bad Request, 500 Internal Server Error, etc.)**:
    ```json
    {
      "message": "Mensaje de error descriptivo",
      "status": "Código de estado HTTP"
    }
    ```

## Componentes Principales

### `RecipeService`

*   Gestiona la lógica de negocio para la generación de recetas.
*   Construye prompts para la API de Groq basados en los datos de entrada.
*   Realiza peticiones a la API de Groq.
*   Procesa y valida las respuestas de la API de Groq.
*   Formatea la respuesta para ser enviada al cliente.

### Middleware

*   **`validateRecipeRequest`**: Valida las solicitudes de generación de recetas, asegurando que los datos de entrada sean válidos y cumplan con los requisitos.
*   **`errorHandler`**: Manejo centralizado de errores. Registra errores en la consola y devuelve respuestas de error estructuradas con un formato consistente.

### Utilidades

*   **`jsonParser`**: Utilidad para analizar respuestas JSON de la API de Groq, manejando posibles errores de parsing.

## Manejo de Errores

*   El sistema incluye un manejador de errores centralizado que:
    *   Registra errores en la consola para facilitar la depuración.
    *   Devuelve respuestas de error estructuradas con un formato consistente, incluyendo un mensaje descriptivo y el código de estado HTTP.
*   Esto asegura una experiencia consistente para el cliente y facilita la identificación y resolución de problemas.

## Seguridad

*   **Implementación de CORS**: Permite el acceso al backend desde dominios específicos, evitando problemas de seguridad relacionados con CORS.
*   **Validación de datos de entrada**: Valida los datos de entrada para prevenir ataques de inyección y otros problemas de seguridad.
*   **Manejo seguro de variables de entorno**: Las variables de entorno se utilizan para almacenar información sensible, como la clave de API de Groq, y se manejan de forma segura.

## Requisitos del Sistema

*   [Node.js](https://nodejs.org/) (versión recomendada: v18 o superior)
*   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) (gestores de paquetes)
*   Conexión a Internet para acceder a la API de Groq.

## Inicio del Servidor

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
    o
    ```bash
    yarn install
    ```
2.  **Configurar variables de entorno**:
    *   Crea un archivo `.env` en la raíz del proyecto.
    *   Añade las variables de entorno necesarias:
        ```env
        PORT=5000
        GROQ_API_KEY=tu_clave_api_groq
        NODE_ENV=development
        ```
        *   Reemplaza `tu_clave_api_groq` con tu clave de API real de Groq.
        *   Ajusta `NODE_ENV` a `production` cuando despliegues el backend en un entorno de producción.
3.  **Iniciar el servidor**:
    ```bash
    npm start
    ```
    o
    ```bash
    yarn start
    ```
    *   El servidor se iniciará en el puerto especificado en la variable de entorno `PORT` (o en el puerto 5000 por defecto).

## Consideraciones de Desarrollo

*   El sistema está configurado para desarrollo por defecto (`NODE_ENV=development`).
*   Los logs detallados están habilitados para depuración en el entorno de desarrollo, proporcionando información útil sobre el flujo de la aplicación y los posibles errores.
*   Las respuestas de la API incluyen mensajes en español para facilitar la comprensión y el uso del sistema.
*   Se recomienda utilizar un cliente API como Postman o Insomnia para probar los endpoints.

Para cualquier duda o problema contáctame en <a href="mailto:angelruiznadal@gmail.com">angelruiznadal@gmail.com</a>
