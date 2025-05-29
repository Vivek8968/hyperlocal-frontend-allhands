# 🚀 Installation Guide

Complete installation guide for the Hyperlocal Marketplace Frontend.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js**: Version 18.x or higher (20.x LTS recommended)
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For cloning the repository

### Optional Software
- **yarn**: Alternative package manager
- **pnpm**: Alternative package manager
- **Python**: 3.8+ (for optional deployment scripts)

## 🔧 Quick Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Vivek8968/hyperlocal-frontend-allhands.git
cd hyperlocal-frontend-allhands
```

### 2. Install Dependencies
```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment file with your configuration
nano .env.local  # or use your preferred editor
```

### 4. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🌍 Environment Configuration

### Required Environment Variables

Create a `.env.local` file with the following variables:

```env
# Backend API Configuration
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Optional: Development Settings
NODE_ENV=development
```

### Firebase Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication
   - Enable Google and Phone providers

2. **Get Configuration**:
   - Go to Project Settings
   - Find "Your apps" section
   - Copy the config object values to your `.env.local`

## 📦 Dependency Installation Details

### Core Dependencies
```bash
# Framework dependencies
npm install next@15.3.3 react@19.0.0 react-dom@19.0.0

# Authentication
npm install firebase@^10.7.1

# HTTP Client
npm install axios@^1.6.2

# UI Components
npm install lucide-react@^0.294.0

# Styling
npm install tailwindcss@^3.4.1 postcss@^8.4.49 autoprefixer@^10.4.20
```

### Development Dependencies
```bash
# TypeScript
npm install -D typescript@^5 @types/node@^20 @types/react@^19 @types/react-dom@^19

# Linting
npm install -D eslint@^9 eslint-config-next@15.3.3
```

## 🐳 Docker Installation (Optional)

### Using Docker
```bash
# Build Docker image
docker build -t hyperlocal-frontend .

# Run container
docker run -p 3000:3000 hyperlocal-frontend
```

### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./.env.local:/app/.env.local
```

## 🔧 Development Setup

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Git Hooks Setup
```bash
# Install husky for git hooks
npm install -D husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

## 🚀 Production Deployment

### Build for Production
```bash
# Create optimized build
npm run build

# Start production server
npm start
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms
- **Netlify**: Connect GitHub repo and set build command to `npm run build`
- **AWS Amplify**: Use the Amplify console to connect your repository
- **Railway**: Connect GitHub and deploy automatically

## 🔍 Troubleshooting

### Common Issues

#### Node.js Version Issues
```bash
# Check Node.js version
node --version

# Use nvm to switch versions
nvm use 20.11.0
```

#### Package Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

#### Firebase Configuration Issues
- Verify all environment variables are set correctly
- Check Firebase project settings
- Ensure authentication providers are enabled

### Getting Help

1. **Check the logs**: Look at browser console and terminal output
2. **Verify environment**: Ensure all environment variables are set
3. **Check dependencies**: Run `npm audit` to check for issues
4. **Update dependencies**: Run `npm update` to get latest versions

## 📊 Performance Optimization

### Development Performance
```bash
# Use faster package manager
npm install -g pnpm
pnpm install

# Enable experimental features
export NODE_OPTIONS="--experimental-modules"
```

### Build Performance
```bash
# Analyze bundle size
npm install -D @next/bundle-analyzer
npm run build
npm run analyze
```

## 🧪 Testing Setup

### Install Testing Dependencies
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @types/jest
```

### Run Tests
```bash
npm test
```

---

**🎯 Quick Start Summary**:
1. `git clone https://github.com/Vivek8968/hyperlocal-frontend-allhands.git`
2. `cd hyperlocal-frontend-allhands`
3. `npm install`
4. `cp .env.example .env.local`
5. `npm run dev`

**📧 Need Help?** Open an issue on [GitHub](https://github.com/Vivek8968/hyperlocal-frontend-allhands/issues)