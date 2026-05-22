#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR"

read -p "This will permanently delete 'server/src' and 'client/src'. Type YES to confirm: " confirm
if [ "$confirm" = "YES" ]; then
  rm -rf server/src client/src
  echo "Deleted server/src and client/src"
else
  echo "Aborted. No files were removed."
fi
