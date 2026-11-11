"""Agrega una foto a la galería. Debes copiar primero la imagen a assets/img/galeria/."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'/'galeria.json'
name=input('Nombre del archivo (ej.: visita-obra.jpg): ').strip()
if '/' in name or '\\' in name or '..' in name or not name.lower().endswith(('.jpg','.jpeg','.png','.webp')):
    raise SystemExit('Escribe únicamente un nombre de imagen JPG, PNG o WEBP.')
caption=input('Descripción de la foto: ').strip()
file=ROOT/'assets'/'img'/'galeria'/name
if not file.is_file():
    raise SystemExit(f'Primero copia la fotografía aquí: {file}')
items=json.loads(DATA.read_text(encoding='utf-8'))
items.append({'imagen':'assets/img/galeria/'+name,'descripcion':caption})
DATA.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Fotografía agregada correctamente a la galería.')
