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
  // Solo muestra resultados si están configuradas TODAS las tasas.
  const $range = $('#metros');
  function calculate() {
    const metres = Number($range.value), cfg = window.TRIPLAST_CONFIG.impacto;
    $('#metros-output').textContent = metres.toLocaleString('es-CL');
    const valid = [cfg.kgPetPorMetro,cfg.botellasPorKg,cfg.kgCO2eEvitadoPorMetro].every(x => typeof x === 'number' && Number.isFinite(x) && x > 0);
    const fmt = n => n.toLocaleString('es-CL',{maximumFractionDigits:2});
    $('#pet-result').textContent = valid ? fmt(metres*cfg.kgPetPorMetro) : '—';
    $('#bottles-result').textContent = valid ? fmt(Math.round(metres*cfg.kgPetPorMetro*cfg.botellasPorKg)) : '—';
    $('#co2-result').textContent = valid ? fmt(metres*cfg.kgCO2eEvitadoPorMetro) : '—';
    $('#calc-note').textContent = valid ? 'Valores referenciales según los factores ingresados por el equipo en js/config.js. Revisar metodología antes de publicar.' : 'Pendiente de factores técnicos validados. Edita js/config.js y documenta las fuentes antes de publicar cifras.';
  }
  $range.addEventListener('input',calculate); calculate();
})();
