#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR/recipes-mvc-frontend"
cp .env.example .env 2>/dev/null || true
npm install
npm run dev
