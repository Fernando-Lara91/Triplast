"""Crea una noticia en data/noticias.json con validaciones sencillas.
Ejecutar desde la raíz: python scripts/agregar_noticia.py
No requiere librerías externas.
"""
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data' / 'noticias.json'

def ask(prompt, default=''):
    return input(f'{prompt}' + (f' [{default}]' if default else '') + ': ').strip() or default

def main():
    news = json.loads(DATA.read_text(encoding='utf-8'))
    title = ask('Título de la noticia')
    if not title:
        raise SystemExit('El título no puede estar vacío.')
    raw_date = ask('Fecha AAAA-MM-DD', date.today().isoformat())
    date.fromisoformat(raw_date)
    summary = ask('Resumen (1 frase)')
    print('Contenido de la noticia: escribe texto; termina con una línea que diga FIN')
    lines=[]
    while True:
        line=input()
        if line == 'FIN': break
        lines.append(line)
    image=ask('Ruta de la foto (en assets/img/noticias/)', 'assets/img/noticias/nueva-noticia.jpg')
    if not image.startswith('assets/img/noticias/') or '..' in image:
        raise SystemExit('La imagen debe estar dentro de assets/img/noticias/.')
    external=ask('Enlace de noticia externa (opcional)')
    if external and not external.startswith('https://'):
        raise SystemExit('El enlace debe empezar por https://')
    news.append({'id':f'noticia-{date.today().strftime("%Y%m%d")}-{len(news)+1}', 'fecha':raw_date,'titulo':title,'resumen':summary,'contenido':'\n'.join(lines),'imagen':image,'enlace':external})
    DATA.write_text(json.dumps(news,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Noticia añadida. Recuerda copiar la fotografía a {image} y subir los cambios a GitHub.')
if __name__=='__main__': main()
