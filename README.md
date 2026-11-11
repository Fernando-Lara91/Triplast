# Triplast · Web editable para Visual Studio Code

Proyecto estático organizado para **GitHub Pages**. No depende de Base44, de Flask ni de servicios de pago. El diseño es una **recreación editorial nueva inspirada en la estructura pública** de https://triplast.base44.app; **no** es una exportación del proyecto original ni incluye sus archivos internos, CMS, fotografías ni recursos de propiedad de terceros.

## Abrir en Windows
1. Descomprime el ZIP.
2. Abre la carpeta `Triplast_Web_Editable` en Visual Studio Code.
3. Ejecuta `python run.py` en la terminal, o utiliza `INICIAR.bat`.
4. Entra a http://localhost:8000.

**IMPORTANTE:** Abrir `index.html` con doble clic puede bloquear la carga de los JSON. Usa un servidor local.

## Carpetas
- `index.html`: estructura y secciones del sitio.
- `css/styles.css`: estilos, responsive, colores.
- `js/config.js`: correo y factores de la calculadora.
- `js/site.js`: navegación y calculadora.
- `js/content.js`: carga de noticias y fotos; tarjetas y ventanas emergentes.
- `data/noticias.json`: artículos que se publican ordenados por fecha.
- `data/galeria.json`: galería de fotos.
- `assets/img/proyecto/`: portada, prototipo y reconocimiento.
- `assets/img/equipo/`: retratos.
- `assets/img/noticias/`: fotografías de artículos.
- `assets/img/galeria/`: fotografías de galería.
- `scripts/`: comandos opcionales en Python para añadir publicaciones.
- `docs/`: manuales y control de calidad.

## Noticias y fotos
Consulta `docs/GUIA_DE_EDICION.md`. Para publicar contenido basta con subir al repositorio los nuevos JPG/PNG/WEBP y los JSON actualizados. **No hay panel administrativo ni subida desde la web publicada**: un GitHub Pages público no permite escrituras seguras sin backend. Para edición desde un panel de usuario se requiere CMS/servicio adicional y autenticación.

## GitHub Pages
1. Crea un repositorio público y sube **el contenido de esta carpeta** a la raíz de la rama `main` (index.html debe quedar en la raíz).
2. Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.
3. Espera a que Pages publique la URL.
4. Si luego compras dominio, Settings → Pages → Custom domain y configura DNS con tu proveedor siguiendo la documentación oficial: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
5. Activa HTTPS cuando esté disponible.

## Antes de hacer público
- Reemplaza fotos de muestra por fotos propias/licenciadas. Los recuadros indican exactamente qué falta.
- Valida el texto, nombres, hitos y datos institucionales con los responsables.
- La calculadora **no presenta cifras** hasta agregar factores verificables a `js/config.js`.
- Comprueba privacidad, uso de imagen, autorización de marcas y comunicaciones.
- Actualiza contacto, favicon, SEO y avisos legales según corresponda.

Fuente general de estructura y antecedentes públicos consultados el 11-11-2026: https://triplast.base44.app/ . Esta versión no reproduce los recursos originales ni garantiza equivalencia funcional de Base44.

## Tres noticias externas (octubre de 2026)
Se incorporaron como entradas independientes las publicaciones de CChC (22/10), Mediabanco (22/10) y Poder y Liderazgo (23/10). Cada tarjeta identifica el medio, resume la cobertura con redacción propia y enlaza a la noticia original. La nota genérica previa sobre el premio fue sustituida para evitar duplicados.

**Fotografías:** los nombres `cchc-triplast.jpg`, `mediabanco-triplast.jpg` y `poder-liderazgo-triplast.jpg` son espacios reservados. Copia fotografías con derechos de uso adecuados a `assets/img/noticias/`, o deja que se vea el recuadro de imagen pendiente.
