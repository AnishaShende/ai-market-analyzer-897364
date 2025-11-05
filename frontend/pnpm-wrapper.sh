#!/bin/bash

# PNPM wrapper script to handle permission issues
# This script provides a fallback mechanism when pnpm has permission issues

set -e

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to try fixing pnpm permissions
try_fix_pnpm() {
    if [ -f "/usr/local/bin/pnpm" ]; then
        chmod +x /usr/local/bin/pnpm 2>/dev/null && return 0
    fi
    return 1
}

# Function to run with pnpm
run_with_pnpm() {
    if command_exists pnpm; then
        echo "Using pnpm..."
        pnpm "$@"
        return $?
    fi
    return 1
}

# Function to run with npm
run_with_npm() {
    if command_exists npm; then
        echo "Falling back to npm..."
        case "$1" in
            "install")
                npm install
                ;;
            "build")
                npm run build
                ;;
            "dev")
                npm run dev
                ;;
            "preview")
                npm run preview
                ;;
            *)
                npm run "$@"
                ;;
        esac
        return $?
    fi
    return 1
}

# Function to run with yarn
run_with_yarn() {
    if command_exists yarn; then
        echo "Falling back to yarn..."
        case "$1" in
            "build")
                yarn build
                ;;
            *)
                yarn "$@"
                ;;
        esac
        return $?
    fi
    return 1
}

# Main execution
echo "🔧 PNPM Wrapper Script - AI Market Analyzer"
echo "Arguments: $@"

# Try to fix pnpm permissions first
if try_fix_pnpm; then
    echo "✅ Fixed pnpm permissions"
fi

# Try pnpm first
if run_with_pnpm "$@"; then
    echo "✅ Command executed successfully with pnpm"
    exit 0
fi

echo "⚠️ pnpm failed, trying alternatives..."

# Fall back to npm
if run_with_npm "$@"; then
    echo "✅ Command executed successfully with npm"
    exit 0
fi

# Fall back to yarn
if run_with_yarn "$@"; then
    echo "✅ Command executed successfully with yarn"
    exit 0
fi

echo "❌ All package managers failed"
exit 1