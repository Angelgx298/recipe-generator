# Frontend Application - Recipe Generator

Modern React application with TypeScript and Tailwind CSS for AI-powered recipe generation.

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Components](#-components)
- [Getting Started](#-getting-started)
- [Features](#-features)
- [Development](#-development)

## 🎯 Overview

A responsive, user-friendly interface that allows users to:

- Input available ingredients
- Select dietary preferences
- Specify maximum preparation time
- View AI-generated recipes with detailed instructions

## 🛠️ Tech Stack

| Technology                                    | Purpose                        |
| --------------------------------------------- | ------------------------------ |
| [React 18](https://reactjs.org/)              | UI library with hooks          |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript           |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first CSS framework    |
| [Vite](https://vitejs.dev/)                   | Fast build tool and dev server |

## 🏗️ Architecture

```
src/
├── components/
│   └── RecipeGenerator/
│       ├── Index.tsx           # Main container
│       ├── IngredientList.tsx  # Ingredient management
│       ├── LoadingButton.tsx   # Async button component
│       ├── ErrorMessage.tsx    # Error display
│       └── RecipeDetails.tsx   # Recipe result display
├── hooks/
│   └── useRecipeGenerator.ts   # Custom hook for state management
├── services/
│   └── recipeApi.ts            # API client
├── types/
│   └── recipe.ts               # TypeScript definitions
├── constants/
│   └── recipe.ts               # App constants
└── App.jsx                     # Root component
```

### Component Hierarchy

```
App
 └── RecipeGenerator (Index)
      ├── IngredientList
      ├── LoadingButton
      ├── ErrorMessage
      └── RecipeDetails
```

## 🧩 Components

### Main Components

#### `RecipeGenerator (Index)`

**Purpose:** Main container component

**Features:**

- Ingredient input form
- Dietary preference selector
- Preparation time input
- Recipe display area
- Loading and error state management

#### `IngredientList`

**Purpose:** Manage ingredient list

**Props:**

```typescript
interface IngredientListProps {
  ingredients: string[];
  onRemove: (index: number) => void;
}
```

**Features:**

- Display ingredient chips
- Remove ingredients
- Visual feedback

#### `LoadingButton`

**Purpose:** Async action button with loading state

**Props:**

```typescript
interface LoadingButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}
```

**States:**

- Default: "Buscar Receta"
- Loading: Spinner + "Generando..."

#### `ErrorMessage`

**Purpose:** Display error messages

**Props:**

```typescript
interface ErrorMessageProps {
  message: string;
}
```

**Features:**

- Styled error container
- Icon indicator
- `data-testid` for testing

#### `RecipeDetails`

**Purpose:** Display generated recipe

**Props:**

```typescript
interface RecipeDetailsProps {
  recipe: Recipe;
}
```

**Displays:**

- Recipe title
- Preparation time
- Difficulty level
- Ingredient list
- Step-by-step instructions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure environment:**
   Create `.env.local`:

   ```env
   VITE_API_URL=http://localhost:5000/api/recipes/generate
   ```

4. **Start development server:**

   ```bash
   pnpm dev
   ```

5. **Access the application:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Create optimized build
pnpm build

# Preview production build
pnpm preview
```

## ✨ Features

### Core Functionality

- ✅ **Ingredient Management**: Add/remove ingredients dynamically
- ✅ **Dietary Filters**: Vegetarian, vegan, gluten-free options
- ✅ **Time Constraints**: Configurable max preparation time
- ✅ **Real-time Validation**: Input validation with user feedback
- ✅ **Loading States**: Visual feedback during API calls
- ✅ **Error Handling**: User-friendly error messages

### UI/UX Features

- 🎨 **Modern Design**: Clean, intuitive interface
- 📱 **Responsive Layout**: Mobile-first design
- ⚡ **Smooth Animations**: Transitions and hover effects
- 🔄 **Loading Indicators**: Clear async operation feedback
- ❌ **Error Messages**: Descriptive error handling
- ♿ **Accessibility**: Semantic HTML and ARIA labels

## 🔧 Configuration

### Constants

```typescript
export const CONSTANTS = {
  MAX_INGREDIENTS: 20,
  MIN_PREP_TIME: 1,
  MAX_PREP_TIME: 480,
  API_URL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/recipes/generate",
} as const;
```

### Dietary Options

```typescript
export const dietOptions: DietOption[] = [
  { value: "", label: "Tipo de dieta" },
  { value: "vegetarian", label: "Vegetariana" },
  { value: "vegan", label: "Vegana" },
  { value: "gluten-free", label: "Sin Gluten" },
];
```

## 🪝 Custom Hooks

### `useRecipeGenerator`

**Purpose:** Centralized state management for recipe generation

**State Management:**

```typescript
const {
  ingredients, // string[]
  currentIngredient, // string
  dietPreference, // string
  maxPreparationTime, // string
  recipe, // Recipe | null
  isLoading, // boolean
  error, // string | null
  addIngredient, // () => void
  removeIngredient, // (index: number) => void
  handleSubmit, // () => Promise<void>
} = useRecipeGenerator();
```

**Features:**

- Ingredient list management
- Form state handling
- API call orchestration
- Error state management
- Loading state control

## 📡 API Integration

### `recipeApi.ts`

**Purpose:** HTTP client for backend communication

```typescript
export const generateRecipe = async ({
  ingredients,
  dietPreference,
  maxPreparationTime,
}: GenerateRecipeParams): Promise<Recipe> => {
  const response = await fetch(CONSTANTS.API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ingredients,
      dietPreference,
      maxPreparationTime,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message || "Error en la respuesta del servidor"
    );
  }

  return await response.json();
};
```

## 🎨 Styling

### Tailwind CSS Approach

- **Utility-first**: Rapid development with utility classes
- **Responsive**: Mobile-first breakpoints
- **Custom Colors**: Indigo color scheme
- **Gradients**: Visual depth and modern look
- **Shadows**: Elevation and hierarchy
- **Transitions**: Smooth interactions

### Key Design Patterns

```css
/* Card Container */
.max-w-3xl.w-full.mx-auto.bg-white.rounded-2xl.shadow-xl

/* Primary Button */
.bg-gradient-to-r.from-indigo-600.to-indigo-700.hover:from-indigo-700

/* Input Field */
.border-2.border-gray-200.focus:ring-2.focus:ring-indigo-500
```

## ✅ Validation

### Input Validation Rules

| Field            | Validation                             |
| ---------------- | -------------------------------------- |
| Ingredients      | Max 20 items, no duplicates, non-empty |
| Preparation Time | 1-480 minutes range                    |
| Diet Preference  | Valid option from predefined list      |

### Error States

- Empty ingredient input
- Duplicate ingredients
- Maximum ingredients reached
- Invalid preparation time
- API errors

## 🧪 Testing

The frontend is covered by E2E tests using Playwright. See the main [TESTING.md](../TESTING.md) for details.

### Test Coverage

- ✅ Homepage rendering
- ✅ Ingredient management
- ✅ Form validation
- ✅ Recipe generation flow
- ✅ Error handling

## 🔄 Development Workflow

### Development Mode

```bash
pnpm dev
```

Features:

- Hot Module Replacement (HMR)
- Fast refresh for instant updates
- Source maps for debugging
- Development server on port 5173

### Type Checking

```bash
# Run TypeScript compiler for type validation
pnpm tsc --noEmit
```

### Linting

```bash
# Run ESLint for code quality
pnpm lint
```

## 📦 Build Output

```bash
pnpm build
```

Generates optimized production build in `dist/`:

- Minified JavaScript bundles
- Optimized and purged CSS
- Compressed assets
- Intelligent code splitting
- Tree-shaking for smaller bundle size

## 📧 Contact

**Ángel Ruiz Nadal**

- Email: [angelruiznadal@gmail.com](mailto:angelruiznadal@gmail.com)
- GitHub: [@Angelgx298](https://github.com/Angelgx298)
- LinkedIn: [linkedin.com/in/angel-ruiz-nadal](https://www.linkedin.com/in/angel-ruiz-nadal)

---

[← Back to Main README](../README.md)

