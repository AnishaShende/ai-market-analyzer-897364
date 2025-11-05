#!/bin/bash

# PNPM Permission Fix Script for AI Market Analyzer
# This script attempts to fix the spawnSync pnpm EACCES error

echo "🔧 PNPM Permission Fix Script"
echo "============================"

# Function to check if pnpm exists at a path
check_pnpm_path() {
    local path=$1
    if [ -f "$path" ]; then
        echo "📍 Found pnpm at: $path"
        
        # Check if it's executable
        if [ -x "$path" ]; then
            echo "   ✅ Already executable"
            return 0
        else
            echo "   ❌ Not executable, attempting to fix..."
            
            # Try to make it executable
            if chmod +x "$path" 2>/dev/null; then
                echo "   ✅ Fixed permissions successfully"
                return 0
            else
                echo "   ⚠️  Permission denied - may need sudo"
                return 1
            fi
        fi
    fi
    return 2
}

# Function to test pnpm functionality
test_pnpm() {
    echo "🧪 Testing pnpm functionality..."
    if command -v pnpm >/dev/null 2>&1; then
        if pnpm --version >/dev/null 2>&1; then
            echo "✅ pnpm is working correctly"
            return 0
        else
            echo "❌ pnpm found but not functioning"
            return 1
        fi
    else
        echo "❌ pnpm command not found"
        return 1
    fi
}

# Main execution
echo "🔍 Searching for pnpm installations..."

# Common pnpm locations
PNPM_PATHS=(
    "/usr/local/bin/pnpm"
    "/usr/bin/pnpm"
    "/opt/homebrew/bin/pnpm"
    "$(which pnpm 2>/dev/null)"
)

FIXED=false

for path in "${PNPM_PATHS[@]}"; do
    if [ -n "$path" ] && [ "$path" != "" ]; then
        if check_pnpm_path "$path"; then
            FIXED=true
            break
        fi
    fi
done

# Test if pnpm works now
if test_pnpm; then
    echo ""
    echo "🎉 SUCCESS: pnpm is now working!"
    echo ""
    echo "📋 You can now run:"
    echo "   pnpm install"
    echo "   pnpm build"
    echo ""
    echo "🤖 Or use the automated build script:"
    echo "   node fix-and-build.js"
else
    echo ""
    echo "⚠️  pnpm still not working. Alternative solutions:"
    echo ""
    echo "🔧 Manual fix (with sudo):"
    echo "   sudo chmod +x /usr/local/bin/pnpm"
    echo "   sudo chown $(whoami) /usr/local/bin/pnpm"
    echo ""
    echo "📦 Use npm instead:"
    echo "   npm install"
    echo "   npm run build"
    echo ""
    echo "🤖 Use automated script:"
    echo "   node fix-and-build.js"
fi