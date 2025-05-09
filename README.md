# eCommerce Application 🛍️

A modern online store built with React, CommerceTools, TypeScript, and Vite. This project implements best practices for code quality, testing, and developer experience.

## Technology Stack 🛠️

### Core Technologies

- ⚛️ React 19
- 📘 TypeScript
- ⚡ Vite (build tool)
- 🎨 Sass (styling)

### Code Quality & Formatting

- 🔍 ESLint (code linting)
- 💅 Prettier (code formatting)
- 🐶 Husky (Git hooks)
- 🚨 lint-staged (staged file processing)

### Testing

- 🧪 Vitest (unit testing)

## Project Setup 🚀

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended) or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EvgenOzr/eCommerce-Application.git
   ```
2. Navigate to project directory:
   ```bash
   cd eCommerce-Application
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Available scripts

### Development

- npm run dev - Starts development server
- npm run preview - Previews production build locally

### Building

- npm run build - Creates production-ready build

### Code Quality

- npm run lint - Runs ESLint on all files
- npm run format - Formats all files with Prettier
- npm run check - Checks formatting without modifying files

### Testing

- npm run test - Runs Vitest tests

### Git Hooks

- Pre-commit: Automatically runs ESLint and Prettier on staged files
