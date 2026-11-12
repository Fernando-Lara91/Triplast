/* Interacciones principales: menú móvil, calculadora y recursos faltantes. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const menu = $('#menu-btn');
  const nav = $('#nav-links');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded','false');
  }));
  $('#year').textContent = new Date().getFullYear();
  const mail = window.TRIPLAST_CONFIG.correo;
  $('#contact-email').textContent = `${mail} ↗`;
  $('#contact-email').href = `mailto:${mail}`;

  // Cuando aún no se han agregado fotos, mostramos un recuadro informativo.
  function checkImage(img) {
    if (!img.complete || img.naturalWidth === 0) {
      img.classList.add('is-missing');
      img.parentElement?.setAttribute('data-label', img.dataset.fallback || 'Agrega aquí tu fotografía');
    }
  }
  window.triplastCheckImages = (root=document) => root.querySelectorAll('.image-slot img').forEach(img => {
    img.addEventListener('error', () => checkImage(img), {once:true});
    if (img.complete) checkImage(img);
  });
  window.triplastCheckImages();
  // CALCULADORA: calcula y muestra los tres resultados para cada cambio de perímetro.
  // Todas las constantes están en config.js para facilitar posteriores ajustes.
  const range = $('#metros');
  const petResult = $('#pet-result');
  const bottlesResult = $('#bottles-result');
  const co2Result = $('#co2-result');
  const metresOutput = $('#metros-output');
  const note = $('#calc-note');
  const formatInteger = value => new Intl.NumberFormat('es-CL', {maximumFractionDigits: 0}).format(value);
  const formatDecimal = value => new Intl.NumberFormat('es-CL', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value);

  function calculate() {
    const metres = Number(range.value);
    const cfg = window.TRIPLAST_CONFIG?.impacto;
    const valid = Number.isFinite(metres) && metres >= 0 && cfg &&
      [cfg.kgPetPorMetro, cfg.botellasPorKg, cfg.kgCO2eEvitadoPorMetro]
        .every(value => typeof value === 'number' && Number.isFinite(value) && value > 0);

    metresOutput.textContent = formatInteger(metres);
    if (!valid) {
      petResult.textContent = bottlesResult.textContent = co2Result.textContent = '—';
      note.textContent = 'No se pueden calcular resultados: revisa los factores en js/config.js.';
      return;
    }

    // Unidades: m × kg/m = kg de PET.
    const petKg = metres * cfg.kgPetPorMetro;
    // Unidades: kg de PET × botellas/kg = botellas equivalentes.
    const bottles = Math.round(petKg * cfg.botellasPorKg);
    // Unidades: m × kg de CO₂e/m = kg de CO₂e estimado.
    const co2Kg = metres * cfg.kgCO2eEvitadoPorMetro;

    petResult.textContent = `${formatDecimal(petKg)} kg`;
    bottlesResult.textContent = `${formatInteger(bottles)} botellas`;
    co2Result.textContent = `${formatDecimal(co2Kg)} kg`;
    note.textContent = 'Los resultados se actualizan automáticamente al mover el perímetro lineal. Valores referenciales sujetos a validación técnica.';
  }
  range.addEventListener('input', calculate);
  range.addEventListener('change', calculate);
  calculate();

})();
