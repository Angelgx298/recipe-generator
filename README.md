# 🍳 AI-Powered Recipe Generator

![Playwright Tests](https://github.com/Angelgx298/recipe-generator/actions/workflows/playwright.yml/badge.svg)
[![Vercel Deployment](https://img.shields.io/badge/deploy-vercel-black)](https://recipe-generator-peach.vercel.app)
[![Render Deployment](https://img.shields.io/badge/deploy-render-46E3B7)](https://recipe-generator-l694.onrender.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

A full-stack web application that leverages AI to generate personalized recipes based on available ingredients, dietary preferences, and preparation time constraints. Built with modern web technologies and complete E2E test coverage.

![Application Demo](/imgs/ejemplo.gif "Application Demo")

## 🚀 Live Demo

- **Frontend Application:** [recipe-generator-peach.vercel.app](https://recipe-generator-peach.vercel.app)
- **Backend API:** [recipe-generator-l694.onrender.com](https://recipe-generator-l694.onrender.com)

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [CI/CD Pipeline](#-cicd-pipeline)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Contact](#-contact)

## 🎯 Problem Statement

Planning meals with limited ingredients can be challenging and time-consuming. This application solves that problem by:
- Generating creative recipe ideas from available ingredients
- Accommodating dietary restrictions (vegetarian, vegan, gluten-free)
- Respecting time constraints for meal preparation
- Reducing food waste by utilizing existing ingredients

## ✨ Key Features

### Core Functionality
- 🤖 **AI-Powered Generation**: Utilizes Groq API with Llama-3.3-70b-versatile model for intelligent recipe creation
- 🥗 **Dietary Filters**: Support for vegetarian, vegan, and gluten-free preferences
- ⏱️ **Time Management**: Configurable maximum preparation time
- 🎨 **Responsive UI**: Mobile-first design with Tailwind CSS
- 🔄 **Real-time Processing**: Instant recipe generation with loading states

### Technical Features
- ✅ **E2E Test Coverage**: Comprehensive Playwright test suite
- 🔄 **Automated CI/CD**: GitHub Actions pipeline for continuous integration
- 🚀 **Cloud Deployment**: Zero-downtime deployments on Vercel and Render
- 🔒 **Environment Security**: Proper secret management and .env protection
- 📊 **Health Monitoring**: API health check endpoints
- 🔧 **Error Handling**: Graceful error management with user-friendly messages

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [React 18](https://reactjs.org/) | UI framework with hooks and functional components |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript for better DX |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Vite](https://vitejs.dev/) | Fast build tool and dev server |
| [Vercel](https://vercel.com/) | Serverless deployment platform |

### Backend
| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Express.js](https://expressjs.com/) | Web framework with middleware support |
| [Groq AI](https://groq.com/) | LLM inference API (Llama-3.3-70b-versatile) |
| [Render](https://render.com/) | Cloud hosting platform |

### Testing & DevOps
| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | E2E testing framework |
| [GitHub Actions](https://github.com/features/actions) | CI/CD automation |
| [pnpm](https://pnpm.io/) | Efficient package manager |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client (Browser)                     │
│                  recipe-generator.vercel.app             │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  Backend API (Express)                   │
│              recipe-generator.onrender.com               │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Routes → Controllers → Services → AI Provider   │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │ API Call
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    Groq AI API                           │
│              Llama-3.3-70b-versatile                     │
└─────────────────────────────────────────────────────────┘
```

### Project Structure
```
recipe-generator/
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Configuration
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API clients
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript definitions
│   └── package.json
├── tests/                 # E2E tests
│   └── e2e/
│       ├── home.spec.ts
│       └── generate-recipe.spec.ts
├── .github/workflows/     # CI/CD pipelines
│   └── playwright.yml
└── pnpm-workspace.yaml   # Monorepo config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 9.x (recommended) or npm
- [Groq API Key](https://console.groq.com/) (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Angelgx298/recipe-generator.git
   cd recipe-generator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   
   Create `backend/.env`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
   
   Create `frontend/.env.local`:
   ```env
   VITE_API_URL=http://localhost:5000/api/recipes/generate
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1: Backend API
   cd backend
   pnpm start
   
   # Terminal 2: Frontend App
   cd frontend
   pnpm dev
   ```

5. **Access the Application**
   ```
   http://localhost:5173
   ```

## 🧪 Testing

### Test Suite

The project includes comprehensive E2E tests covering critical user flows:

| Test Suite | Coverage |
|------------|----------|
| Homepage | Title, inputs, buttons, initial state |
| Recipe Generation | Full workflow, error handling, API integration |
| Backend Health | API availability and response validation |

### Running Tests

```bash
# Run all tests (headless)
pnpm test

# Interactive mode with UI
pnpm exec playwright test --ui

# View test report
pnpm exec playwright show-report

# Run specific test file
pnpm exec playwright test tests/e2e/home.spec.ts
```

### Test Architecture

- **Page Object Model (POM)**: Maintainable test structure
- **Data-driven**: Flexible test data management
- **Error Detection**: Graceful handling of API failures
- **Timeout Management**: Proper async handling for AI responses

See [`TESTING.md`](./TESTING.md) for detailed testing documentation.

## 🔄 CI/CD Pipeline

### Automated Workflow

Every push and pull request triggers:

1. ✅ **Dependency Installation**: Using pnpm for faster installs
2. ✅ **Environment Setup**: Automated .env creation from secrets
3. ✅ **Browser Installation**: Playwright browser binaries
4. ✅ **Test Execution**: Full E2E test suite
5. ✅ **Artifact Upload**: Test reports and screenshots
6. ✅ **Deployment**: Automatic deployment to Vercel/Render on merge

### GitHub Actions Status

View the latest test results: [Actions Tab](https://github.com/Angelgx298/recipe-generator/actions)

## 📡 API Documentation

### Base URL
```
Production: https://recipe-generator-l694.onrender.com
Development: http://localhost:5000
```

### Endpoints

#### `POST /api/recipes/generate`
Generate a recipe based on ingredients and preferences.

**Request Body:**
```json
{
  "ingredients": ["chicken", "rice", "vegetables"],
  "dietPreference": "vegetarian",
  "maxPreparationTime": 30
}
```

**Response:**
```json
{
  "title": "Vegetarian Rice Bowl",
  "ingredients": ["1 cup rice", "2 cups mixed vegetables", ...],
  "instructions": ["Cook rice according to package", ...],
  "preparationTime": 25,
  "difficulty": "Easy"
}
```

#### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`pnpm test`)
5. Commit using conventional commits (`git commit -m 'feat: add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

**Note:** All PRs must pass the automated test suite before merging.

## 📧 Contact

**Ángel Ruiz Nadal**
- 📧 Email: [angelruiznadal@gmail.com](mailto:angelruiznadal@gmail.com)
- 💼 GitHub: [@Angelgx298](https://github.com/Angelgx298)
- 🔗 LinkedIn: [linkedin.com/in/angel-ruiz-nadal](https://www.linkedin.com/in/angel-ruiz-nadal)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for providing fast LLM inference
- [Vercel](https://vercel.com/) and [Render](https://render.com/) for hosting
- The open-source community for amazing tools and frameworks

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**

Made with ❤️ by [Ángel Ruiz Nadal](https://github.com/Angelgx298)

</div>
