# Backend API - Recipe Generator

RESTful API service for AI-powered recipe generation using Groq's Llama-3.3-70b-versatile model.

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Error Handling](#-error-handling)
- [Security](#-security)

## 🎯 Overview

This Express.js backend provides a robust API for generating personalized recipes based on:

- Available ingredients
- Dietary preferences (vegetarian, vegan, gluten-free)
- Maximum preparation time constraints

## 🛠️ Tech Stack

| Technology                                     | Purpose                                 |
| ---------------------------------------------- | --------------------------------------- |
| [Node.js](https://nodejs.org/)                 | Runtime environment                     |
| [Express.js](https://expressjs.com/)           | Web framework                           |
| [Groq AI](https://groq.com/)                   | LLM inference (Llama-3.3-70b-versatile) |
| [CORS](https://www.npmjs.com/package/cors)     | Cross-origin resource sharing           |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management         |

## 🏗️ Architecture

```
src/
├── config/
│   └── environment.js      # Environment configuration
├── controllers/
│   └── recipeController.js # Request handlers
├── middleware/
│   ├── errorHandler.js     # Global error handling
│   └── requestValidator.js # Input validation
├── routes/
│   ├── recipeRoutes.js     # Recipe endpoints
│   └── healthRoutes.js     # Health check
├── services/
│   └── recipeService.js    # Business logic & AI integration
├── utils/
│   └── jsonParser.js       # JSON parsing utilities
└── app.js                  # Express app configuration
```

### Request Flow

```
Client Request
    ↓
Express Router
    ↓
Validation Middleware
    ↓
Controller
    ↓
Service Layer
    ↓
Groq AI API
    ↓
Response Formatting
    ↓
Client Response
```

## 📡 API Endpoints

### Generate Recipe

**Endpoint:** `POST /api/recipes/generate`

Generate a personalized recipe based on ingredients and preferences.

**Request Body:**

```json
{
    "ingredients": ["chicken", "rice", "vegetables"],
    "dietPreference": "vegetarian",
    "maxPreparationTime": 30
}
```

**Response (200 OK):**

```json
{
    "title": "Vegetarian Rice Bowl",
    "ingredients": [
        "1 cup rice",
        "2 cups mixed vegetables",
        "1 tbsp olive oil"
    ],
    "instructions": [
        "Cook rice according to package instructions",
        "Sauté vegetables in olive oil",
        "Combine and serve"
    ],
    "preparationTime": 25,
    "difficulty": "Easy"
}
```

**Error Response (400/500):**

```json
{
    "message": "Descriptive error message",
    "status": 400
}
```

### Health Check

**Endpoint:** `GET /health`

Check API availability and status.

**Response (200 OK):**

```json
{
    "status": "ok",
    "message": "Server is running",
    "timestamp": "2025-11-20T10:30:00.000Z"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Groq API Key ([Get one here](https://console.groq.com/))

### Installation

1. **Navigate to backend directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Configure environment:**
   Create a `.env` file (see [Environment Variables](#-environment-variables))

4. **Start the server:**

    ```bash
    # Development
    pnpm dev

    # Production
    pnpm start
    ```

The server will start on `http://localhost:5000` (or your configured PORT).

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional (with defaults)
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Variable Descriptions

| Variable       | Description                              | Default                 |
| -------------- | ---------------------------------------- | ----------------------- |
| `GROQ_API_KEY` | Groq AI API authentication key           | **Required**            |
| `PORT`         | Server port number                       | `5000`                  |
| `NODE_ENV`     | Environment (`development`/`production`) | `development`           |
| `FRONTEND_URL` | Allowed CORS origin                      | `http://localhost:5173` |

## 🛡️ Error Handling

### Centralized Error Handler

The API implements a global error handling middleware that:

- Logs errors to console for debugging
- Returns consistent error responses
- Sanitizes error messages for production
- Includes appropriate HTTP status codes

### Error Response Format

```json
{
    "message": "User-friendly error description",
    "status": 400
}
```

### Common Error Codes

| Code | Description                                  |
| ---- | -------------------------------------------- |
| 400  | Bad Request - Invalid input data             |
| 401  | Unauthorized - Invalid API key               |
| 500  | Internal Server Error - Server/AI API issues |

## 🔒 Security

### Implemented Security Measures

- ✅ **CORS Protection**: Configured allowed origins
- ✅ **Input Validation**: Request data validation middleware
- ✅ **Environment Variables**: Secure secret management
- ✅ **Error Sanitization**: No sensitive data in error responses
- ✅ **Rate Limiting**: (Recommended for production)

### CORS Configuration

```javascript
const corsOptions = {
    origin:
        NODE_ENV === "production"
            ? [FRONTEND_URL]
            : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
};
```

## 📦 Core Components

### RecipeService

**Purpose:** Business logic for recipe generation

**Responsibilities:**

- Construct AI prompts from user input
- Make requests to Groq AI API
- Parse and validate AI responses
- Format responses for client consumption

### Middleware

#### `validateRecipeRequest`

- Validates incoming recipe generation requests
- Ensures required fields are present
- Validates data types and constraints

#### `errorHandler`

- Centralized error handling
- Consistent error response formatting
- Error logging for debugging

### Utilities

#### `jsonParser`

- Safely parse JSON responses from Groq AI
- Handle malformed JSON gracefully
- Extract JSON from markdown code blocks

## 🧪 Testing

Run the backend tests:

```bash
# Unit tests (if available)
pnpm test

# Manual API testing
curl -X POST http://localhost:5000/api/recipes/generate \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["chicken","rice"]}'
```

## 📊 Development

### Development Mode

```bash
pnpm dev
```

Features:

- Detailed logging for debugging
- Auto-restart on file changes (with nodemon)
- Comprehensive error messages

### Production Mode

```bash
NODE_ENV=production pnpm start
```

Features:

- Optimized logging
- Production CORS settings
- Sanitized error messages
- Enhanced security

## 📧 Contact

**Ángel Ruiz Nadal**

- Email: [angelruiznadal@gmail.com](mailto:angelruiznadal@gmail.com)
- GitHub: [@Angelgx298](https://github.com/Angelgx298)
- LinkedIn: [linkedin.com/in/angel-ruiz-nadal](https://www.linkedin.com/in/angel-ruiz-nadal)

---

[← Back to Main README](../README.md)

