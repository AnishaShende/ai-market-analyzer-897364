#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 AI Market Analyzer - Fix and Build Script');
console.log('===========================================');

// Function to run command with better error handling
function runCommand(command, options = {}) {
    try {
        console.log(`\n📋 Running: ${command}`);
        const result = execSync(command, {
            stdio: 'inherit',
            cwd: process.cwd(),
            ...options
        });
        return { success: true, result };
    } catch (error) {
        console.log(`❌ Command failed: ${error.message}`);
        return { success: false, error };
    }
}

// Function to check if a binary exists and is executable
function checkBinary(binaryPath) {
    try {
        const stats = fs.statSync(binaryPath);
        const isExecutable = !!(stats.mode & parseInt('111', 8));
        return { exists: true, executable: isExecutable, stats };
    } catch (error) {
        return { exists: false, executable: false, error };
    }
}

// Function to fix pnpm permissions
function fixPnpmPermissions() {
    const pnpmPaths = [
        '/usr/local/bin/pnpm',
        '/usr/bin/pnpm',
        '/opt/homebrew/bin/pnpm'
    ];

    for (const pnpmPath of pnpmPaths) {
        const check = checkBinary(pnpmPath);
        if (check.exists) {
            console.log(`\n🔍 Found pnpm at: ${pnpmPath}`);
            console.log(`   Executable: ${check.executable}`);
            
            if (!check.executable) {
                console.log('   Attempting to fix permissions...');
                const fixResult = runCommand(`chmod +x ${pnpmPath}`, { stdio: 'pipe' });
                if (fixResult.success) {
                    console.log('   ✅ Fixed permissions');
                    return true;
                } else {
                    console.log('   ⚠️ Could not fix permissions (may need sudo)');
                }
            } else {
                console.log('   ✅ Already executable');
                return true;
            }
        }
    }

    console.log('⚠️ No pnpm binary found in standard locations');
    return false;
}

// Function to test if pnpm works
function testPnpm() {
    try {
        console.log('\n🧪 Testing pnpm...');
        const result = runCommand('pnpm --version', { stdio: 'pipe' });
        if (result.success) {
            console.log('✅ pnpm is working');
            return true;
        }
    } catch (error) {
        console.log('❌ pnpm test failed');
    }
    return false;
}

// Function to install dependencies with fallback
function installDependencies() {
    console.log('\n📦 Installing dependencies...');

    // Try pnpm first
    if (testPnpm()) {
        const pnpmResult = runCommand('pnpm install');
        if (pnpmResult.success) {
            console.log('✅ Dependencies installed with pnpm');
            return { success: true, manager: 'pnpm' };
        }
    }

    // Fall back to npm
    console.log('🔄 Falling back to npm...');
    const npmResult = runCommand('npm install');
    if (npmResult.success) {
        console.log('✅ Dependencies installed with npm');
        return { success: true, manager: 'npm' };
    }

    return { success: false };
}

// Function to build the project
function buildProject(packageManager = 'pnpm') {
    console.log('\n🏗️  Building project...');

    let buildCommand;
    if (packageManager === 'pnpm') {
        buildCommand = 'pnpm build';
    } else {
        buildCommand = 'npm run build';
    }

    const buildResult = runCommand(buildCommand);
    return buildResult.success;
}

// Main function
async function main() {
    try {
        console.log('📍 Current directory:', process.cwd());

        // Step 1: Check if package.json exists
        if (!fs.existsSync('package.json')) {
            console.log('❌ package.json not found in current directory');
            process.exit(1);
        }

        // Step 2: Fix pnpm permissions
        console.log('\n🔧 Step 1: Fixing pnpm permissions...');
        const pnpmFixed = fixPnpmPermissions();

        // Step 3: Install dependencies
        console.log('\n📦 Step 2: Installing dependencies...');
        const installResult = installDependencies();
        
        if (!installResult.success) {
            console.log('❌ Failed to install dependencies with any package manager');
            process.exit(1);
        }

        // Step 4: Build the project
        console.log('\n🏗️  Step 3: Building project...');
        const buildSuccess = buildProject(installResult.manager);

        if (buildSuccess) {
            console.log('\n🎉 BUILD SUCCESSFUL!');
            console.log('📊 Summary:');
            console.log(`   ✅ Package Manager: ${installResult.manager}`);
            console.log('   ✅ Dependencies installed');
            console.log('   ✅ TypeScript compiled');
            console.log('   ✅ Vite build completed');
            console.log('   ✅ Assets optimized');
            console.log('\n📁 Output: ./dist directory created');
            console.log('🚀 Ready for deployment!');
        } else {
            console.log('\n❌ BUILD FAILED!');
            console.log('\n🔍 Troubleshooting suggestions:');
            console.log('   1. Check TypeScript errors above');
            console.log('   2. Verify all imports are correct');
            console.log('   3. Check if all dependencies are installed');
            console.log('   4. Try: npm run build');
            process.exit(1);
        }

    } catch (error) {
        console.log('\n💥 Unexpected error:', error.message);
        console.log(error.stack);
        process.exit(1);
    }
}

// Run the main function
main();