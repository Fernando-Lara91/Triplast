/* Carga noticias y fotografías desde JSON: no hay que editar el HTML. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const safeImage = path => typeof path === 'string' && /^assets\/img\/[a-zA-Z0-9_./-]+\.(jpg|jpeg|png|webp)$/i.test(path) && !path.includes('..') ? path : '';
  const photo = (path, alt, cls='') => `<div class="image-slot ${cls}"><img src="${esc(safeImage(path) || 'assets/img/logo-triplast.webp')}" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;
  async function getJson(path) { const response=await fetch(path,{cache:'no-cache'}); if(!response.ok) throw Error(`HTTP ${response.status}`); return response.json(); }
  const validators = [
    ['DIGUA','Mentoría y revisión en terreno.'],['MALPO','Retroalimentación sobre el diseño.'],['INDEPENDENCIA','Entrevistas con profesionales de la construcción.'],['CONEQUIP','Intercambio sobre propuesta y prototipo.'],['LAMA 3D','Asesoría sobre fabricación y producción.'],['UNIVERSIDAD FRANCISCO DE PAULA SANTANDER','Intercambio técnico académico internacional.']
  ];
  document.querySelector('#validators').innerHTML=validators.map(([name,txt],i)=>`<article class="validator"><span>VAL-${String(i+1).padStart(2,'0')}</span><h3>${esc(name)}</h3><p>${esc(txt)}</p></article>`).join('');
  const steps=[['Investigación','Estudio de alternativas y fundamentos del material.'],['Diseño del prototipo','Iteraciones de diseño, unión y apilamiento.'],['Retroalimentación industrial','Conversaciones con profesionales del sector.'],['Reto Construye Academia','Presentación del proyecto a la convocatoria.'],['Reconocimiento regional','Selección para representar a la región.'],['Reconocimiento nacional','Primer lugar nacional en 2026.']];
  document.querySelector('#timeline').innerHTML=steps.map(([title,txt],i)=>`<article class="step"><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(title)}</h3><p>${esc(txt)}</p></article>`).join('');
  const team=[['Maximiliano Olivares','Ingeniería Civil','Desarrollo técnico','assets/img/equipo/maximiliano.webp'],['Lucas Villar','Arquitectura','Diseño y prototipo','assets/img/equipo/lucas.webp'],['Marthin Arriagada','Ingeniería Civil','Validación técnica y modelo de negocio','assets/img/equipo/marthin.webp']];
  document.querySelector('#team-grid').innerHTML=team.map(([name,degree,role,img])=>`<article class="member">${photo(img,`Retrato de ${name}`,'member-photo')}<div class="member-meta"><h3>${esc(name)}</h3><p class="member-degree">${esc(degree)}</p><p class="member-role">${esc(role)}</p></div></article>`).join('');
  const dialog=document.querySelector('#news-dialog');
  const detail=document.querySelector('#news-detail');
  document.querySelector('#close-news').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  async function loadNews(){
    const grid=document.querySelector('#news-grid');
    try{
      const articles=await getJson('data/noticias.json');
      if(!Array.isArray(articles))throw Error('El archivo de noticias debe ser una lista');
      articles.sort((a,b)=>String(b.fecha).localeCompare(String(a.fecha)));
      if(!articles.length){grid.innerHTML='<p class="news-empty">Pronto publicaremos novedades.</p>';return;}
      grid.innerHTML=articles.map((item,index)=>`<article class="news-card">${photo(item.imagen,item.titulo,'news-card-img')}<div class="news-card-body"><time datetime="${esc(item.fecha)}">${esc(item.fecha)}</time>${item.medio ? `<p class="news-source">${esc(item.medio)}</p>` : ''}<h3>${esc(item.titulo)}</h3><p>${esc(item.resumen)}</p><button type="button" data-news="${index}">Leer noticia ↗</button></div></article>`).join('');
      grid.querySelectorAll('[data-news]').forEach(button=>button.addEventListener('click',()=>{
        const item=articles[Number(button.dataset.news)];
        detail.innerHTML=`<time>${esc(item.fecha)}</time>${item.medio ? `<p class="news-source">Medio: ${esc(item.medio)}</p>` : ''}<h2>${esc(item.titulo)}</h2>${photo(item.imagen,item.titulo,'news-card-img')}<p class="news-body">${esc(item.contenido)}</p>${item.enlace && /^https:\/\//.test(item.enlace) ? `<p><a class="text-link" href="${esc(item.enlace)}" target="_blank" rel="noopener noreferrer">Ver fuente externa ↗</a></p>`:''}`;
        window.triplastCheckImages(detail);dialog.showModal();
      }));
      window.triplastCheckImages(grid);
    }catch(err){grid.innerHTML='<p class="error-message">No se pudieron cargar las noticias. Abre el sitio con INICIAR.bat o python -m http.server 8000, no directamente como archivo.</p>';console.error(err)}
  }
  const lightbox=document.querySelector('#photo-dialog');
  document.querySelector('#close-photo').onclick=()=>lightbox.close();
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
  async function loadGallery(){
    const grid=document.querySelector('#gallery-grid');
    try{
      const list=await getJson('data/galeria.json');
      if(!Array.isArray(list))throw Error('La galería debe ser una lista');
      if(!list.length){grid.innerHTML='<p>Próximamente: fotografías del proyecto.</p>';return;}
      grid.innerHTML=list.map((item,index)=>`<button type="button" class="gallery-item" data-photo="${index}">${photo(item.imagen,item.descripcion)}<p>${esc(item.descripcion)}</p></button>`).join('');
      grid.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{
        const item=list[Number(button.dataset.photo)];
        const image=document.querySelector('#photo-full');image.src=safeImage(item.imagen)||'assets/img/logo-triplast.webp';image.alt=item.descripcion;document.querySelector('#photo-caption').textContent=item.descripcion;lightbox.showModal();
      }));
      window.triplastCheckImages(grid);
    }catch(err){grid.innerHTML='<p class="error-message">No se pudo cargar la galería.</p>';console.error(err)}
  }
  loadNews();loadGallery();window.triplastCheckImages();
})();
