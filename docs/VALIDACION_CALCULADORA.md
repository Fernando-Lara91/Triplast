# Revisión de calculadora Triplast — 12 noviembre 2026

## Situación detectada
La versión anterior tenía tres factores `null` en `js/config.js`, por lo que el slider cambiaba de valor pero los resultados eran guiones (—).

## Factores reconstruidos a partir del sitio original
Consulta a https://triplast.base44.app/ para 500 metros:
- 48.750 kg PET / 500 m = **97,5 kg PET/m**.
- 1.950.000 botellas / 48.750 kg = **40 botellas/kg** (25 g/botella implícitos).
- 220.580 kg CO₂e / 500 m = **441,16 kg CO₂e/m**.

## Ecuaciones
- PET (kg) = perímetro (m) × 97,5 (kg/m)
- Botellas equivalentes = PET (kg) × 40 (botellas/kg)
- CO₂e ahorrado (kg) = perímetro (m) × 441,16 (kg CO₂e/m)

## Validaciones matemáticas
| Perímetro | PET kg | Botellas | CO₂e kg |
|---:|---:|---:|---:|
| 50 m | 4.875 | 195.000 | 22.058 |
| 500 m | 48.750 | 1.950.000 | 220.580 |
| 2.000 m | 195.000 | 7.800.000 | 882.320 |

## Advertencia de fondo
**Estos valores reproducen la simulación original, pero NO se han validado técnicamente.**
Especialmente el CO₂e debe sustentarse en un escenario de referencia, unidades funcionales,
vida útil, número de reutilizaciones y fuentes de factores de emisión. La equivalencia de botellas
supone implícitamente 25 g de PET por botella; ese peso debe comprobarse con muestras reales.
No presentar el ahorro como verificado ni certificado hasta contar con metodología y evidencia.
