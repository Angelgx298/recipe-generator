# Documentación del Frontend - Generador de Recetas

## Descripción General

Esta aplicación web, desarrollada con React, permite a los usuarios generar recetas personalizadas. Los usuarios pueden ingresar una lista de ingredientes, especificar sus preferencias dietéticas (opcional) y un tiempo máximo de preparación (opcional). La aplicación se encarga de enviar esta información al backend y mostrar la receta generada de forma clara y organizada.

## Tecnologías Principales

*   **React:** Biblioteca de JavaScript para construir interfaces de usuario interactivas y dinámicas.
*   **TypeScript:** Superset de JavaScript que añade tipado estático, mejorando la mantenibilidad y la detección de errores.
*   **Tailwind CSS:** Framework CSS utility-first para un diseño rápido, flexible y consistente.
*   **Vite:** Herramienta de desarrollo y empaquetado que ofrece un inicio instantáneo y una experiencia de desarrollo optimizada.

## Estructura del Proyecto

### Directorios Principales

*   **`/src`**: Contiene el código fuente principal de la aplicación.
*   **`/src/components`**: Componentes React reutilizables que conforman la interfaz de usuario.
*   **`/src/hooks`**: Hooks personalizados para encapsular la lógica de la aplicación y reutilizarla en diferentes componentes.
*   **`/src/services`**: Servicios que gestionan la comunicación con el backend, incluyendo las peticiones a la API.
*   **`/src/types`**: Definiciones de tipos TypeScript para mejorar la seguridad y la claridad del código.
*   **`/src/constants`**: Constantes y configuraciones globales de la aplicación, como límites y URLs.

## Componentes Principales

### `RecipeGenerator (Index)`

*   Componente principal que integra toda la funcionalidad de la aplicación.
*   Contiene:
    *   Formulario para ingresar ingredientes.
    *   Selector de preferencias dietéticas.
    *   Input para el tiempo máximo de preparación.
    *   Área para mostrar la receta generada.
    *   Manejo de estados de carga y errores.

### Subcomponentes

*   **`IngredientList`**: Permite a los usuarios agregar y eliminar ingredientes de la lista.
*   **`LoadingButton`**: Botón que muestra un estado de carga mientras se realiza una petición al backend.
*   **`ErrorMessage`**: Muestra mensajes de error de forma clara y consistente.
*   **`RecipeDetails`**: Muestra los detalles de la receta generada, incluyendo título, ingredientes, instrucciones, tiempo de preparación y dificultad.

## Tipos y Interfaces

### `Recipe`
```typescript
interface Recipe {
    title: string;
    ingredients: string[];
    instructions: string[];
    preparationTime: number;
    difficulty: string;
}
```
*   Define la estructura de las opciones dietéticas, con un valor que se utiliza internamente y una etiqueta para mostrar al usuario.

## Constantes y Configuración

### `CONSTANTS`

*   **`MAX_INGREDIENTS`**: `20` (Número máximo de ingredientes permitidos).
*   **`MIN_PREP_TIME`**: `1` (Tiempo mínimo de preparación en minutos).
*   **`MAX_PREP_TIME`**: `480` (Tiempo máximo de preparación en minutos).
*   **`API_URL`**: `"http://localhost:5000/api/recipes/generate"` (URL del endpoint del backend para generar recetas).

### Opciones Dietéticas

*   **Ninguna**
*   **Vegetariana**
*   **Vegana**
*   **Sin Gluten**

## Hooks Personalizados

### `useRecipeGenerator`

*   Gestiona la lógica principal de la aplicación, incluyendo:
    *   El estado de la lista de ingredientes.
    *   Las preferencias dietéticas seleccionadas.
    *   El tiempo de preparación especificado.
    *   Los estados de carga y error.
    *   La lógica para generar la receta mediante la llamada a la API.

## Servicios

### `recipeApi`

*   Maneja la comunicación con el backend.
*   Incluye:
    *   **`generateRecipe`**: Método para enviar una petición al backend con los datos del formulario y recibir la receta generada.
    *   Validación de las respuestas del backend.
    *   Manejo de errores de la API.

## Estilos

*   Utiliza **Tailwind CSS** para un desarrollo rápido y flexible de estilos.
*   Diseño **responsivo** que se adapta a diferentes tamaños de pantalla, ofreciendo una experiencia de usuario óptima en dispositivos móviles, tabletas y ordenadores de escritorio.
*   Utiliza **gradientes y sombras** para mejorar la apariencia visual de los elementos.
*   Incluye **animaciones y transiciones suaves** para mejorar la experiencia del usuario.

## Características de UI/UX

*   **Interfaz limpia y moderna**: Diseño intuitivo y fácil de usar.
*   **Feedback visual para acciones del usuario**: Los usuarios reciben retroalimentación visual clara al interactuar con la aplicación.
*   **Indicadores de carga**: Muestra un indicador de carga mientras se espera la respuesta del backend.
*   **Mensajes de error claros**: Los mensajes de error son descriptivos y ayudan al usuario a entender qué ha salido mal.
*   **Animaciones suaves**: Las animaciones mejoran la experiencia del usuario, haciendo que la interacción sea más fluida y agradable.
*   **Diseño adaptable**: La aplicación se adapta a diferentes tamaños de pantalla, ofreciendo una experiencia consistente en todos los dispositivos.

## Validaciones

*   **Límite máximo de ingredientes**: La aplicación valida que el número de ingredientes no exceda el límite máximo definido en las constantes.
*   **Tiempo de preparación válido**: Se asegura de que el tiempo de preparación esté dentro del rango válido definido en las constantes.
*   **Ingredientes no duplicados**: Evita que los usuarios ingresen ingredientes duplicados en la lista.
*   **Campos requeridos**: Valida que los campos obligatorios estén completos antes de enviar la petición al backend.

## Manejo de Errores

*   **Mensajes de error visuales**: Los errores se muestran al usuario de forma clara y visible en la interfaz.
*   **Validación de datos de entrada**: La aplicación valida los datos de entrada para prevenir errores y asegurar que la información enviada al backend sea correcta.
*   **Manejo de errores de API**: La aplicación maneja los errores que puedan ocurrir al comunicarse con el backend, mostrando mensajes de error apropiados al usuario.
*   **Feedback al usuario**: Proporciona retroalimentación al usuario en caso de errores, indicando qué ha salido mal y cómo puede solucionarlo.

## Requisitos del Sistema

*   **Node.js**: Entorno de ejecución de JavaScript.
*   **npm** o **yarn**: Gestores de paquetes para instalar las dependencias del proyecto.
*   **Navegador moderno con soporte para ES6+**: La aplicación requiere un navegador web actualizado que soporte las últimas características de JavaScript.

## Inicio del Proyecto

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
    o
    ```bash
    yarn install
    ```
2.  **Iniciar en desarrollo**:
    ```bash
    npm run dev
    ```
    o
    ```bash
    yarn dev
    ```
    Esto iniciará el servidor de desarrollo de Vite y abrirá la aplicación en tu navegador.
3.  **Construir para producción**:
    ```bash
    npm run build
    ```
    o
    ```bash
    yarn build
    ```
    Esto generará una versión optimizada de la aplicación lista para ser desplegada en un entorno de producción.

## Consideraciones de Desarrollo

*   **Código TypeScript tipado**: El código está escrito en TypeScript, lo que mejora la mantenibilidad y la detección de errores en tiempo de desarrollo.
*   **Componentes funcionales con hooks**: La aplicación utiliza componentes funcionales y hooks de React para una gestión de estado más eficiente y un código más limpio.
*   **Patrones de diseño React modernos**: Se siguen patrones de diseño React modernos para una mejor organización del código y una mayor reutilización de componentes.
*   **Gestión de estado local**: La aplicación utiliza el estado local de React para gestionar el estado de los componentes.

Para cualquier duda o problema contáctame en <a href="mailto:angelruiznadal@gmail.com">angelruiznadal@gmail.com</a>
