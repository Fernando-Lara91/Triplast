# Guía práctica para publicar noticias y fotografías

## A. Publicar una noticia
**Opción sencilla (Visual Studio Code):**
1. Coloca una fotografía en `assets/img/noticias/` (ej.: `nueva-obra.jpg`).
2. Abre `data/noticias.json` y copia un objeto entre `{ ... }` de una noticia existente.
3. Cambia `id` (único), `fecha` (AAAA-MM-DD), `titulo`, `resumen`, `contenido`, `imagen` y `enlace`.
4. Usa una coma entre noticias, pero nunca después de la última.
5. Guarda y recarga. Los artículos aparecen ordenados de más nuevos a antiguos.

**Opción asistida (Python):** `python scripts/agregar_noticia.py`, responde las preguntas y copia la foto a la ruta indicada. El texto de la noticia termina escribiendo `FIN` en una línea aparte.

## B. Subir fotografías a galería
1. Copia el archivo a `assets/img/galeria/`.
2. Añade un objeto a `data/galeria.json` como:
```json
{"imagen":"assets/img/galeria/visita-obra.jpg","descripcion":"Visita al prototipo"}
```
Alternativamente ejecuta `python scripts/agregar_foto.py` después de copiar la imagen.

## C. Cambiar la imagen principal y retratos
Reemplaza los archivos de acuerdo con estas rutas:
- `assets/img/proyecto/cierre-principal.jpg`
- `assets/img/proyecto/cierre-detalle.jpg`
- `assets/img/proyecto/reconocimiento.jpg`
- `assets/img/equipo/maximiliano.jpg`, `lucas.jpg`, `marthin.jpg`

## D. Publicar actualización
En GitHub Desktop o Visual Studio Code: revisa los cambios, haz **commit** y luego **push**. GitHub Pages actualizará la web cuando se complete el despliegue. No es necesario cambiar el dominio.

## E. Buenas prácticas fotográficas
- Exporta a JPG o WEBP, aproximadamente 1600 px de ancho para fotos grandes y 1200 px para tarjetas.
- Comprime imágenes: idealmente menos de 400 KB por foto de tarjeta, según calidad necesaria.
- Usa nombres sin espacios ni tildes; agrega texto alternativo descriptivo.
- Obtén autorización para usar retratos, imágenes de obras y logos de empresas.

## F. ¿Se pueden publicar noticias directamente desde una pantalla de administración?
Este sitio usa GitHub Pages (alojamiento estático). Por seguridad, **no** incluye un formulario público que escriba noticias o suba archivos. Para eso habría que incorporar un CMS (por ejemplo, una solución Git-based compatible con repositorios) y configurarlo con autenticación, o un backend administrado.
