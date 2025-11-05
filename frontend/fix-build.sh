#!/bin/bash

# Fix pnpm permissions and build the project
echo "Fixing pnpm permissions and building the project..."

# Try to make pnpm executable
if [ -f "/usr/local/bin/pnpm" ]; then
    chmod +x /usr/local/bin/pnpm 2>/dev/null || echo "Could not fix pnpm permissions"
fi

# Try different methods to install and build
if command -v pnpm >/dev/null 2>&1; then
    echo "Using pnpm..."
    pnpm install && pnpm build
elif command -v npm >/dev/null 2>&1; then
    echo "Using npm as fallback..."
    npm install && npm run build
else
    echo "Neither pnpm nor npm found!"
    exit 1
fi