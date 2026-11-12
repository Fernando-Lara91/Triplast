"""Verifica rutas de las fotos y los cálculos referenciales de Triplast."""
from pathlib import Path
import json, re
base = Path(__file__).resolve().parents[1]
for filename in ('data/noticias.json','data/galeria.json'):
    for obj in json.loads((base / filename).read_text(encoding='utf-8')):
        image = base / obj['imagen']
        assert image.is_file(), f'Falta imagen: {image}'
for name in ('assets/favicon.png','favicon.ico','apple-touch-icon.png','assets/img/logo-triplast.webp','js/config.js','js/site.js','run.py'):
    assert (base/name).is_file(), f'Falta archivo: {name}'
config=(base/'js/config.js').read_text(encoding='utf-8')
coeffs = {k:float(re.search(r'\b'+k+r'\s*:\s*([0-9.]+)',config).group(1)) for k in ('kgPetPorMetro','botellasPorKg','kgCO2eEvitadoPorMetro')}
for m in (50,100,500,1000,2000):
    pet = m * coeffs['kgPetPorMetro']
    bottles = round(pet*coeffs['botellasPorKg'])
    co2 = m*coeffs['kgCO2eEvitadoPorMetro']
    assert pet>0 and bottles>0 and co2>0
assert 500*coeffs['kgPetPorMetro']==48750
assert 500*coeffs['kgPetPorMetro']*coeffs['botellasPorKg']==1950000
assert round(500*coeffs['kgCO2eEvitadoPorMetro'])==220580
print('OK: rutas de imágenes, favicon y cálculos de 50 a 2000 m.')
