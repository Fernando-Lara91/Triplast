"""Servidor local de desarrollo para Triplast.

Ejecutar desde Visual Studio Code: python run.py
No usa Flask ni necesita paquetes adicionales.
GitHub Pages sirve el sitio estático independientemente de este archivo.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

# Asegurar que la raíz web sea la carpeta que contiene index.html.
os.chdir(Path(__file__).resolve().parent)

if __name__ == "__main__":
    address = ("127.0.0.1", 8000)
    print(f"Triplast disponible en http://{address[0]}:{address[1]}")
    print("Para detener el servidor, presiona Ctrl+C.")
    try:
        ThreadingHTTPServer(address, SimpleHTTPRequestHandler).serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
