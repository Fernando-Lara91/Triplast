@echo off
REM Inicia un servidor web local para permitir cargar archivos JSON con fetch.
cd /d "%~dp0"
start "" http://localhost:8000
py -m http.server 8000 || python -m http.server 8000
pause
