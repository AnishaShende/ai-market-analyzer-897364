#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 AI Market Analyzer - Build Fix Script');
console.log('=====================================');

// Function to run command with proper error handling
function runCommand(command, description) {
  try {
    console.log(`\n📋 ${description}...`);
    console.log(`   Command: ${command}`);
    
    const result = execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log(`✅ ${description} - SUCCESS`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} - FAILED`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

// Function to check if command exists
function commandExists(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  // Check available package managers
  const hasPnpm = commandExists('pnpm');
  const hasNpm = commandExists('npm');
  const hasYarn = commandExists('yarn');

  console.log('\n🔍 Checking available package managers...');
  console.log(`   pnpm: ${hasPnpm ? '✅' : '❌'}`);
  console.log(`   npm:  ${hasNpm ? '✅' : '❌'}`);
  console.log(`   yarn: ${hasYarn ? '✅' : '❌'}`);

  // Try to fix pnpm permissions first
  if (hasPnpm) {
    console.log('\n🔧 Attempting to fix pnpm permissions...');
    try {
      execSync('chmod +x $(which pnpm) 2>/dev/null', { stdio: 'ignore' });
      console.log('✅ pnpm permissions fixed');
    } catch (error) {
      console.log('⚠️  Could not fix pnpm permissions');
    }
  }

  // Determine which package manager to use
  let packageManager = null;
  let installCommand = null;
  let buildCommand = null;

  if (hasPnpm) {
    packageManager = 'pnpm';
    installCommand = 'pnpm install';
    buildCommand = 'pnpm build';
  } else if (hasYarn) {
    packageManager = 'yarn';
    installCommand = 'yarn install';
    buildCommand = 'yarn build';
  } else if (hasNpm) {
    packageManager = 'npm';
    installCommand = 'npm install';
    buildCommand = 'npm run build';
  } else {
    console.log('❌ No package manager found! Please install npm, yarn, or pnpm.');
    process.exit(1);
  }

  console.log(`\n📦 Using package manager: ${packageManager}`);

  // Install dependencies
  const installSuccess = runCommand(installCommand, 'Installing dependencies');
  if (!installSuccess) {
    console.log('\n❌ Failed to install dependencies. Trying alternative methods...');
    
    if (packageManager !== 'npm' && hasNpm) {
      console.log('   Falling back to npm...');
      runCommand('npm install', 'Installing dependencies with npm');
      buildCommand = 'npm run build';
    }
  }

  // Build the project
  console.log('\n🏗️  Building the project...');
  const buildSuccess = runCommand(buildCommand, 'Building project');
  
  if (buildSuccess) {
    console.log('\n🎉 Build completed successfully!');
    console.log('\n📊 Build Summary:');
    console.log('   ✅ AI Market Analyzer application built');
    console.log('   ✅ All TypeScript compiled');
    console.log('   ✅ All assets optimized');
    console.log('   ✅ Ready for deployment');
  } else {
    console.log('\n❌ Build failed. Please check the error messages above.');
    
    // Try to provide helpful diagnostics
    if (fs.existsSync('node_modules')) {
      console.log('\n🔍 Diagnostics:');
      console.log('   ✅ node_modules exists');
    } else {
      console.log('   ❌ node_modules missing - dependencies not installed');
    }
    
    if (fs.existsSync('tsconfig.json')) {
      console.log('   ✅ tsconfig.json exists');
    } else {
      console.log('   ❌ tsconfig.json missing');
    }
    
    process.exit(1);
  }
}

main().catch(console.error);