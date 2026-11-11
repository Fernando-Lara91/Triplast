#!/usr/bin/env sh
# Ejecuta en macOS/Linux desde esta carpeta.
cd "$(dirname "$0")" || exit 1
python3 -m http.server 8000
