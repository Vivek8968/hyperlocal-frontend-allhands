# 📦 Dependencies Documentation

This document provides a comprehensive overview of all dependencies used in the Hyperlocal Marketplace Frontend project.

## 🚀 Core Framework Dependencies

### Next.js Framework
```json
{
  "next": "15.3.3",
  "react": "19.0.0",
  "react-dom": "19.0.0"
}
```
- **Next.js**: React framework with App Router, SSR, and TypeScript support
- **React**: Core React library for building user interfaces
- **React DOM**: React renderer for web applications

## 🎨 Styling Dependencies

### Tailwind CSS
```json
{
  "tailwindcss": "^3.4.1",
  "postcss": "^8.4.49",
  "autoprefixer": "^10.4.20"
}
```
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS transformation tool
- **Autoprefixer**: Adds vendor prefixes to CSS

## 🔧 Development Dependencies

### TypeScript
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "typescript": "^5"
}
```
- **TypeScript**: Static type checking for JavaScript
- **@types/node**: TypeScript definitions for Node.js
- **@types/react**: TypeScript definitions for React
- **@types/react-dom**: TypeScript definitions for React DOM

### ESLint
```json
{
  "eslint": "^9",
  "eslint-config-next": "15.3.3"
}
```
- **ESLint**: JavaScript/TypeScript linting tool
- **eslint-config-next**: Next.js specific ESLint configuration

## 🔐 Authentication Dependencies

### Firebase
```json
{
  "firebase": "^10.7.1"
}
```
- **Firebase**: Google's platform for authentication, database, and hosting
- Used for Google Login and Phone OTP authentication

## 🌐 HTTP Client Dependencies

### Axios
```json
{
  "axios": "^1.6.2"
}
```
- **Axios**: Promise-based HTTP client for API requests
- Used for backend communication and API integration

## 🎯 UI Components Dependencies

### Lucide React
```json
{
  "lucide-react": "^0.294.0"
}
```
- **Lucide React**: Beautiful & consistent icon library
- Provides all icons used throughout the application

## 📱 Production Dependencies Summary

All production dependencies (automatically installed with `npm install`):

```bash
npm install next@15.3.3 react@19.0.0 react-dom@19.0.0
npm install firebase@^10.7.1
npm install axios@^1.6.2
npm install lucide-react@^0.294.0
npm install tailwindcss@^3.4.1 postcss@^8.4.49 autoprefixer@^10.4.20
```

## 🛠 Development Dependencies Summary

All development dependencies:

```bash
npm install -D typescript@^5
npm install -D @types/node@^20 @types/react@^19 @types/react-dom@^19
npm install -D eslint@^9 eslint-config-next@15.3.3
```

## 🔄 Package Scripts

Available npm scripts defined in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Script Descriptions:
- **`npm run dev`**: Starts development server on http://localhost:3000
- **`npm run build`**: Creates optimized production build
- **`npm run start`**: Starts production server (requires build first)
- **`npm run lint`**: Runs ESLint to check code quality

## 🌍 Environment Dependencies

### Node.js Version
- **Minimum**: Node.js 18.x or higher
- **Recommended**: Node.js 20.x LTS

### Package Manager
- **npm**: 9.x or higher (comes with Node.js)
- **yarn**: 1.22.x or higher (alternative)
- **pnpm**: 8.x or higher (alternative)

## 🔧 Optional Dependencies

### Python Dependencies (requirements.txt)
For deployment automation and development tools:

```txt
requests==2.31.0
python-dotenv==1.0.0
black==23.12.1
flake8==7.0.0
pytest==7.4.4
pytest-cov==4.1.0
```

These are optional and only needed if you plan to use Python scripts for deployment or testing.

## 📋 Installation Commands

### Fresh Installation
```bash
# Clone the repository
git clone https://github.com/Vivek8968/hyperlocal-frontend-allhands.git
cd hyperlocal-frontend-allhands

# Install all dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Production Build
```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Start production server
npm start
```

## 🔍 Dependency Security

### Security Considerations:
1. **Regular Updates**: Keep dependencies updated for security patches
2. **Audit**: Run `npm audit` regularly to check for vulnerabilities
3. **Lock Files**: Commit `package-lock.json` for consistent installs
4. **Environment Variables**: Never commit sensitive data in dependencies

### Security Commands:
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

## 📊 Bundle Size Analysis

To analyze bundle size and dependencies:

```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Analyze bundle
npm run build
npm run analyze
```

## 🚀 Performance Optimization

### Tree Shaking
- All dependencies support tree shaking for optimal bundle size
- Import only what you need from libraries

### Code Splitting
- Next.js automatically splits code by pages
- Dynamic imports used for heavy components

### Example Optimized Imports:
```typescript
// ✅ Good - Tree shaking friendly
import { Search, User, ShoppingBag } from 'lucide-react'

// ❌ Avoid - Imports entire library
import * as Icons from 'lucide-react'
```

---

**📝 Note**: This documentation is automatically updated when dependencies change. Always refer to `package.json` for the most current dependency versions.