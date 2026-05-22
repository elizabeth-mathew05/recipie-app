#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)

# Backend
cd "$ROOT_DIR/recipes-mvc-backend"
cp .env.example .env 2>/dev/null || true
if [ ! -d node_modules ]; then
  echo "Installing backend dependencies..."
  npm install
fi

echo "Starting backend (will run in background)..."
npm run dev &
BACK_PID=$!

# Frontend
cd "$ROOT_DIR/recipes-mvc-frontend"
cp .env.example .env 2>/dev/null || true
if [ ! -d node_modules ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

echo "Starting frontend..."
npm run dev

# When frontend exits, kill background backend if still running
if ps -p $BACK_PID > /dev/null 2>&1; then
  echo "Stopping backend (pid $BACK_PID)..."
  kill $BACK_PID || true
fi
