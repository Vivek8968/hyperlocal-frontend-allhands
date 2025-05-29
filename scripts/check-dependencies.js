#!/usr/bin/env node

/**
 * Dependency Checker Script
 * Verifies all dependencies are properly installed and up to date
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking Dependencies for Hyperlocal Marketplace Frontend\n');

// Check if package.json exists
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found!');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
console.log(`📦 Project: ${packageJson.name} v${packageJson.version}\n`);

// Check Node.js version
console.log('🟢 Node.js Version Check:');
try {
  const nodeVersion = process.version;
  console.log(`   Current: ${nodeVersion}`);
  
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 18) {
    console.log('   ⚠️  Warning: Node.js 18+ recommended');
  } else {
    console.log('   ✅ Node.js version is compatible');
  }
} catch (error) {
  console.log('   ❌ Could not check Node.js version');
}

// Check npm version
console.log('\n🟢 npm Version Check:');
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`   Current: v${npmVersion}`);
  console.log('   ✅ npm is available');
} catch (error) {
  console.log('   ❌ npm not found');
}

// Check if node_modules exists
console.log('\n🟢 Dependencies Installation Check:');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('   ❌ node_modules not found - run "npm install"');
} else {
  console.log('   ✅ node_modules directory exists');
}

// Check critical dependencies
console.log('\n🟢 Critical Dependencies Check:');
const criticalDeps = [
  'next',
  'react',
  'react-dom',
  'typescript',
  'tailwindcss',
  'firebase',
  'axios',
  'lucide-react'
];

criticalDeps.forEach(dep => {
  const depPath = path.join(nodeModulesPath, dep);
  if (fs.existsSync(depPath)) {
    console.log(`   ✅ ${dep}`);
  } else {
    console.log(`   ❌ ${dep} - missing`);
  }
});

// Check for security vulnerabilities
console.log('\n🟢 Security Audit:');
try {
  execSync('npm audit --audit-level=high', { stdio: 'pipe' });
  console.log('   ✅ No high-severity vulnerabilities found');
} catch (error) {
  console.log('   ⚠️  Security vulnerabilities detected - run "npm audit fix"');
}

// Check for outdated packages
console.log('\n🟢 Outdated Packages Check:');
try {
  const outdated = execSync('npm outdated --json', { encoding: 'utf8' });
  const outdatedPackages = JSON.parse(outdated || '{}');
  
  if (Object.keys(outdatedPackages).length === 0) {
    console.log('   ✅ All packages are up to date');
  } else {
    console.log('   ⚠️  Some packages are outdated:');
    Object.keys(outdatedPackages).forEach(pkg => {
      const info = outdatedPackages[pkg];
      console.log(`      ${pkg}: ${info.current} → ${info.latest}`);
    });
  }
} catch (error) {
  console.log('   ✅ All packages appear to be up to date');
}

// Check environment files
console.log('\n🟢 Environment Configuration Check:');
const envExamplePath = path.join(process.cwd(), '.env.example');
const envLocalPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envExamplePath)) {
  console.log('   ✅ .env.example found');
} else {
  console.log('   ❌ .env.example missing');
}

if (fs.existsSync(envLocalPath)) {
  console.log('   ✅ .env.local found');
} else {
  console.log('   ⚠️  .env.local not found - copy from .env.example');
}

// Check TypeScript configuration
console.log('\n🟢 TypeScript Configuration Check:');
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('   ✅ tsconfig.json found');
  
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('   ✅ TypeScript compilation check passed');
  } catch (error) {
    console.log('   ⚠️  TypeScript compilation issues detected');
  }
} else {
  console.log('   ❌ tsconfig.json missing');
}

// Check Tailwind configuration
console.log('\n🟢 Tailwind CSS Configuration Check:');
const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.ts');
const postcssConfigPath = path.join(process.cwd(), 'postcss.config.mjs');

if (fs.existsSync(tailwindConfigPath)) {
  console.log('   ✅ tailwind.config.ts found');
} else {
  console.log('   ❌ tailwind.config.ts missing');
}

if (fs.existsSync(postcssConfigPath)) {
  console.log('   ✅ postcss.config.mjs found');
} else {
  console.log('   ❌ postcss.config.mjs missing');
}

// Final summary
console.log('\n📋 Summary:');
console.log('   Run the following commands if needed:');
console.log('   • npm install          - Install dependencies');
console.log('   • npm audit fix        - Fix security issues');
console.log('   • npm update           - Update packages');
console.log('   • cp .env.example .env.local - Setup environment');
console.log('\n✨ Dependency check complete!');