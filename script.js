/* ==========================================================
   Buenos días mi borreguita 🐑💖  — lógica de la web
   ========================================================== */

const EMAIL = 'matiprueva2020@gmail.com';
const STORAGE_KEY = 'borreguita_cartas';

const $ = (s) => document.querySelector(s);
const rand = (a, b) => a + Math.random() * (b - a);

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg, ms = 3000) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

/* ---------------- Fondo: cosas cayendo ---------------- */
const FALL_ITEMS = ['💖', '🌸', '⭐', '💕', '🎀', '☁️', '🍮', '✨', '🐑'];
function spawnFalling() {
  const el = document.createElement('span');
  el.className = 'fall';
  el.textContent = FALL_ITEMS[Math.floor(Math.random() * FALL_ITEMS.length)];
  el.style.left = rand(0, 100) + 'vw';
  el.style.fontSize = rand(14, 30) + 'px';
  el.style.animationDuration = rand(8, 15) + 's';
  el.addEventListener('animationend', () => el.remove());
  $('#falling').appendChild(el);
}
setInterval(spawnFalling, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnFalling, i * 250);

/* ---------------- Música ---------------- */
const music = $('#bg-music');
const musicBtn = $('#music-btn');
music.volume = 0.4;
function setMusic(on) {
  if (on) {
    music.play().then(() => {
      musicBtn.textContent = '🎵';
      musicBtn.classList.add('playing');
    }).catch(() => {});
  } else {
    music.pause();
    musicBtn.textContent = '🔇';
    musicBtn.classList.remove('playing');
  }
}
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  setMusic(music.paused);
});
// El navegador no deja reproducir sin interacción: arranca con el primer toque
document.addEventListener('pointerdown', function firstTouch(e) {
  if (e.target !== musicBtn) setMusic(true);
  document.removeEventListener('pointerdown', firstTouch);
}, { once: false });

/* ---------------- Navegación ---------------- */
function go(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  $('#' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  resetNoButton();
  if (id === 'map-screen') initMap();
  if (id === 'letter-screen') resetLetter();
}
document.querySelectorAll('[data-go]').forEach((b) =>
  b.addEventListener('click', () => go(b.dataset.go))
);
// Abrir directamente una pantalla con #map-screen o #letter-screen
{
  const h = location.hash.slice(1);
  if (h && document.getElementById(h)?.classList.contains('screen')) setTimeout(() => go(h), 0);
}

/* ==========================================================
   📱 iPhone 15 rosa: huye del cursor… y si lo pilla, agujero negro
   ========================================================== */
const iphoneBtn = $('#iphone-btn');
const IPHONE_PHRASES = [
  '📱 Jeje nop 🙈', '📱 ¿Segura? 🥺', '📱 Muy rápida tú…', '📱 ¡Atrápame! 🏃‍♂️',
  '📱 Estoy ahorrando 🐷', '📱 Casiii 😝', '📱 IPHONE 15 rosa 💗', '📱 Uy, por poco',
];
let iphoneEscapes = 0;
let iphoneTired = false;
let iphoneGone = false;

function fleeIphone() {
  if (iphoneTired || iphoneGone) return;
  const r = iphoneBtn.getBoundingClientRect();
  if (iphoneBtn.style.position !== 'fixed') {
    // fija la posición actual antes de empezar a moverlo (para que la transición sea suave)
    iphoneBtn.style.width = r.width + 'px';
    iphoneBtn.style.position = 'fixed';
    iphoneBtn.style.left = r.left + 'px';
    iphoneBtn.style.top = r.top + 'px';
    iphoneBtn.offsetHeight; // reflow
  }
  const pad = 20;
  let x, y, tries = 0;
  do {
    x = rand(pad, innerWidth - r.width - pad);
    y = rand(80, innerHeight - r.height - pad);
    tries++;
  } while (Math.hypot(x - r.left, y - r.top) < 200 && tries < 20);
  iphoneBtn.style.left = x + 'px';
  iphoneBtn.style.top = y + 'px';
  iphoneBtn.textContent = IPHONE_PHRASES[iphoneEscapes % IPHONE_PHRASES.length];
  iphoneEscapes++;

  // De vez en cuando se "cansa" un ratito → ventana para pillarlo 😏
  if (iphoneEscapes >= 7 && Math.random() < 0.25) {
    iphoneTired = true;
    setTimeout(() => {
      if (iphoneGone) return;
      iphoneBtn.textContent = '📱 Uff… me canso 😮‍💨';
      setTimeout(() => (iphoneTired = false), 1600);
    }, 300);
  }
}

document.addEventListener('mousemove', (e) => {
  if (!$('#home').classList.contains('active') || iphoneGone) return;
  const r = iphoneBtn.getBoundingClientRect();
  const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  if (d < Math.max(r.width, r.height) / 2 + 60) fleeIphone();
});
iphoneBtn.addEventListener('touchstart', (e) => {
  if (iphoneTired) return; // si está cansado, deja que el toque llegue al click
  e.preventDefault();
  fleeIphone();
}, { passive: false });
iphoneBtn.addEventListener('click', () => blackHole());

function blackHole() {
  if (iphoneGone) return;
  iphoneGone = true;
  const r = iphoneBtn.getBoundingClientRect();
  const hole = document.createElement('div');
  hole.className = 'blackhole';
  hole.style.left = r.left + r.width / 2 + 'px';
  hole.style.top = r.top + r.height / 2 + 'px';
  document.body.appendChild(hole);
  iphoneBtn.textContent = '📱 ¡Noooo! 😱';
  setTimeout(() => {
    iphoneBtn.classList.add('swallowed');
    document.body.classList.add('screen-shake');
  }, 400);
  setTimeout(() => {
    iphoneBtn.remove();
    document.body.classList.remove('screen-shake');
    $('.iphone-slot').innerHTML = '<small style="opacity:.7;font-weight:700">🕳️ El iPhone fue absorbido por un agujero negro… jeje</small>';
    toast('🕳️ Uy… un agujero negro se ha tragado el iPhone 😇');
  }, 1900);
  setTimeout(() => hole.remove(), 2700);
}

/* ==========================================================
   🗺️ Mapa de Usera
   ========================================================== */
const PLACES = [
  { name: 'Burger King', emoji: '🍔', color: '#ffe17a', coords: [40.38549, -3.70838],
    text: 'C. de Marcelo Usera, 109<br>Comidita rica 🍟' },
  { name: 'Plaza Río 2', emoji: '🛍️', color: '#ffb8d4', coords: [40.39082, -3.70145],
    text: 'Av. del Manzanares, 210<br>A mirar ropita juntos 👗' },
  { name: 'Starbucks', emoji: '☕', color: '#9fd6ff', coords: [40.39125, -3.70060],
    text: 'Dentro de Plaza Río 2<br>Algo calentito para la garganta 🍫' },
];
let map, markers = [];

function initMap() {
  if (map) { setTimeout(fitAll, 150); return; }
  if (typeof L === 'undefined') {
    $('#map').innerHTML = '<p style="padding:40px">No se pudo cargar el mapa 🥺 (¿hay internet?)</p>';
    return;
  }
  map = L.map('map', { scrollWheelZoom: false }).setView([40.3885, -3.7045], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap', maxZoom: 19,
  }).addTo(map);

  PLACES.forEach((p, i) => {
    const icon = L.divIcon({
      className: 'cute-pin',
      html: `<div class="pin" style="background:${p.color};animation-delay:${i * 0.25}s"><span>${p.emoji}</span></div>`,
      iconSize: [52, 52], iconAnchor: [26, 52], popupAnchor: [0, -50],
    });
    const m = L.marker(p.coords, { icon }).addTo(map)
      .bindPopup(`<b>${p.emoji} ${p.name}</b><br>${p.text}`);
    markers.push(m);
  });

  L.polyline(PLACES.map((p) => p.coords), {
    color: '#ff7fae', weight: 5, dashArray: '2 12', lineCap: 'round',
  }).addTo(map);

  fitAll();
  setTimeout(fitAll, 200);
  setTimeout(fitAll, 700); // tras la animación de entrada de la pantalla
}
function fitAll() {
  map.invalidateSize();
  map.fitBounds(L.latLngBounds(PLACES.map((p) => p.coords)), { padding: [45, 35], maxZoom: 16 });
}

document.querySelectorAll('.step').forEach((s) =>
  s.addEventListener('click', () => {
    if (!map) return;
    const i = +s.dataset.place;
    map.flyTo(PLACES[i].coords, 17, { duration: 1 });
    setTimeout(() => markers[i].openPopup(), 1000);
    $('#map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  })
);

/* ---------------- ¡Vamos! / No (hacker) ---------------- */
const yesBtn = $('#yes-btn');
const noBtn = $('#no-btn');
const HACK_MSGS = [
  'ACCESS DENIED', '404: "No" not found', 'teleport.exe ✔', 'nope.exe', 'ERROR 💖',
  'sudo say yes', 'firewall: amor', '> no.dll corrupto', 'glitch 😈',
];
let noBusy = false;

function hackerText(x, y) {
  const t = document.createElement('div');
  t.className = 'hacker-text';
  t.textContent = HACK_MSGS[Math.floor(Math.random() * HACK_MSGS.length)];
  t.style.left = Math.min(x, innerWidth - 200) + 'px';
  t.style.top = y + 'px';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 900);
}

function teleportNo() {
  if (noBusy) return;
  noBusy = true;
  const r = noBtn.getBoundingClientRect();
  hackerText(r.left, r.top);
  noBtn.classList.remove('glitch-in');
  noBtn.classList.add('glitch-out');
  setTimeout(() => {
    noBtn.classList.add('hacker');
    noBtn.style.left = rand(15, innerWidth - r.width - 15) + 'px';
    noBtn.style.top = rand(80, innerHeight - r.height - 15) + 'px';
    noBtn.classList.remove('glitch-out');
    noBtn.offsetHeight;
    noBtn.classList.add('glitch-in');
    setTimeout(() => (noBusy = false), 120);
  }, 180);
}
function resetNoButton() {
  noBtn.classList.remove('hacker', 'glitch-in', 'glitch-out');
  noBtn.style.left = noBtn.style.top = '';
  noBusy = false;
}

document.addEventListener('mousemove', (e) => {
  if (!$('#map-screen').classList.contains('active')) return;
  const r = noBtn.getBoundingClientRect();
  const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  if (d < Math.max(r.width, r.height) / 2 + 45) teleportNo();
});
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); teleportNo(); }, { passive: false });
noBtn.addEventListener('click', (e) => { e.preventDefault(); teleportNo(); });
addEventListener('scroll', () => { if (noBtn.classList.contains('hacker')) resetNoButton(); });

yesBtn.addEventListener('click', () => {
  confetti();
  setTimeout(() => $('#date-modal').classList.remove('hidden'), 400);
});
$('#date-close').addEventListener('click', () => {
  $('#date-modal').classList.add('hidden');
  confetti();
});

/* ---------------- Confeti de corazones ---------------- */
function confetti() {
  const c = $('#confetti');
  const ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const colors = ['#ff7fae', '#ffb8d4', '#ffe17a', '#9fd6ff', '#c9b6ff', '#ffffff'];
  const parts = Array.from({ length: 160 }, () => ({
    x: innerWidth / 2 + rand(-60, 60), y: innerHeight * 0.6,
    vx: rand(-9, 9), vy: rand(-18, -7), s: rand(8, 16), rot: rand(0, 6), vr: rand(-0.2, 0.2),
    c: colors[Math.floor(Math.random() * colors.length)], heart: Math.random() < 0.55,
  }));
  let frame = 0;
  function heart(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
    ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
    ctx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
    ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
    ctx.fill();
  }
  (function tick() {
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach((p) => {
      p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.heart) heart(0, 0, p.s * 1.4); else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    });
    if (++frame < 200) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, c.width, c.height);
  })();
}

/* ==========================================================
   💌 Carta mágica
   ========================================================== */
const envelope = $('#envelope');
const stage = $('#envelope-stage');
const sheet = $('#sheet');
const titleIn = $('#plan-title');
const textIn = $('#plan-text');
const saveStatus = $('#save-status');
let opening = false;

function resetLetter() {
  opening = false;
  envelope.classList.remove('shake', 'open');
  stage.classList.remove('hidden');
  sheet.classList.add('hidden');
  saveStatus.textContent = '';
}

envelope.addEventListener('click', () => {
  if (opening) return;
  opening = true;
  envelope.classList.add('shake');
  setTimeout(() => {
    envelope.classList.remove('shake');
    envelope.classList.add('open');
  }, 800);
  setTimeout(() => {
    stage.classList.add('hidden');
    sheet.classList.remove('hidden');
    autoGrow();
    setTimeout(() => titleIn.focus({ preventScroll: true }), 1200);
  }, 1700);
});

function autoGrow() {
  textIn.style.height = 'auto';
  textIn.style.height = Math.max(111, textIn.scrollHeight) + 'px';
}
textIn.addEventListener('input', autoGrow);

/* ---------------- Guardar plan ---------------- */
const getLetters = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const setLetters = (l) => localStorage.setItem(STORAGE_KEY, JSON.stringify(l));

$('#save-btn').addEventListener('click', async () => {
  const title = titleIn.value.trim();
  const text = textIn.value.trim();
  if (!title && !text) {
    toast('Escribe algo primero, mi amor 🥺✏️');
    return;
  }
  const letter = { id: Date.now(), title: title || 'Mi plan 💕', text, date: new Date().toISOString() };
  const letters = getLetters();
  letters.push(letter);
  setLetters(letters);

  flyToBasket();
  confetti();
  updateBadge();

  // 📧 Envío por email (solo funciona con la web subida a internet / servidor)
  if (location.protocol.startsWith('http')) {
    saveStatus.textContent = '📧 Enviando tu plan a Matías…';
    try {
      const res = await fetch('https://formsubmit.co/ajax/' + EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: '💌 Nuevo plan de tu borreguita: ' + letter.title,
          _template: 'box',
          _captcha: 'false',
          Titulo: letter.title,
          Plan: letter.text || '(sin texto)',
          Fecha: new Date(letter.date).toLocaleString('es-ES'),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && String(data.success) !== 'false') {
        saveStatus.textContent = '✅ ¡Plan enviado a Matías! 💌 (y guardado en la canasta 🧺)';
      } else throw new Error(data.message || 'fallo');
    } catch (err) {
      saveStatus.textContent = '🧺 Guardado en la canasta. Descárgalo y mándamelo por WhatsApp 💕';
    }
  } else {
    saveStatus.textContent = '🧺 ¡Guardado en la canasta! Ábrela para descargar la carta 💕';
  }

  setTimeout(() => {
    titleIn.value = '';
    textIn.value = '';
    autoGrow();
  }, 600);
});

function flyToBasket() {
  const from = $('#save-btn').getBoundingClientRect();
  const to = $('#basket-btn').getBoundingClientRect();
  const img = document.createElement('img');
  img.src = 'img/sobre.png';
  img.className = 'flying-letter';
  img.style.left = from.left + from.width / 2 - 40 + 'px';
  img.style.top = from.top - 30 + 'px';
  document.body.appendChild(img);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    img.style.left = to.left + 4 + 'px';
    img.style.top = to.top + 10 + 'px';
    img.style.transform = 'scale(.4) rotate(360deg)';
    img.style.opacity = '.6';
  }));
  setTimeout(() => {
    img.remove();
    const b = $('#basket-btn');
    b.classList.remove('bump'); b.offsetHeight; b.classList.add('bump');
  }, 1150);
}

/* ==========================================================
   🧺 Canasta
   ========================================================== */
function updateBadge() {
  const n = getLetters().length;
  const badge = $('#basket-count');
  badge.textContent = n;
  badge.classList.toggle('hidden', n === 0);
}
updateBadge();

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderBasket() {
  const list = $('#basket-list');
  const letters = getLetters().slice().reverse();
  if (!letters.length) {
    list.innerHTML = '<p class="empty">Aún no hay cartitas… ¡escribe un plan! 💌</p>';
    return;
  }
  const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [new File(['x'], 'carta.html', { type: 'text/html' })] }));
  list.innerHTML = letters.map((l) => `
    <div class="letter-item" data-id="${l.id}">
      <img src="img/sobre.png" alt="" />
      <div class="letter-info">
        <b>${esc(l.title)}</b>
        <p>${esc(l.text || '')}</p>
        <small>${new Date(l.date).toLocaleString('es-ES')}</small>
      </div>
      <div class="letter-actions">
        <button class="btn btn-pink small" data-act="download">⬇️ Descargar</button>
        ${canShareFiles ? '<button class="btn btn-blue small" data-act="share">📲 WhatsApp</button>' : ''}
        <button class="btn btn-gray small" data-act="delete">🗑️</button>
      </div>
    </div>`).join('');
}

$('#basket-btn').addEventListener('click', () => {
  renderBasket();
  $('#basket-panel').classList.remove('hidden');
});
$('#basket-close').addEventListener('click', () => $('#basket-panel').classList.add('hidden'));
document.querySelectorAll('.overlay').forEach((o) =>
  o.addEventListener('click', (e) => { if (e.target === o) o.classList.add('hidden'); })
);

$('#basket-list').addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const id = +btn.closest('.letter-item').dataset.id;
  const letter = getLetters().find((l) => l.id === id);
  if (!letter) return;

  if (btn.dataset.act === 'download') {
    downloadLetter(letter);
  } else if (btn.dataset.act === 'share') {
    const file = new File([buildLetterHTML(letter)], 'carta.html', { type: 'text/html' });
    try {
      await navigator.share({ files: [file], title: letter.title, text: '💌 Mi plan para ti 🐑💕' });
    } catch (err) {
      if (err.name !== 'AbortError') downloadLetter(letter);
    }
  } else if (btn.dataset.act === 'delete') {
    if (confirm('¿Borrar esta cartita? 🥺')) {
      setLetters(getLetters().filter((l) => l.id !== id));
      renderBasket();
      updateBadge();
    }
  }
});

function downloadLetter(letter) {
  const blob = new Blob([buildLetterHTML(letter)], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'carta.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast('⬇️ ¡carta.html descargada! Ahora mándamela por WhatsApp 📲💕', 4000);
}

function buildLetterHTML(l) {
  const fecha = new Date(l.date).toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' });
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>💌 ${esc(l.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Caveat:wght@500;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;
    background:linear-gradient(160deg,#ffe4f0,#fff4d6 50%,#dff1ff);font-family:'Caveat',cursive;color:#7a4a3a}
  body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(rgba(255,255,255,.8) 2px,transparent 2.5px);background-size:26px 26px;pointer-events:none}
  .sheet{position:relative;width:min(560px,100%);padding:34px 30px 30px 62px;border-radius:20px;
    background:repeating-linear-gradient(180deg,transparent 0,transparent 37px,#ffd0e2 37px,#ffd0e2 39px),#fffdf8;
    box-shadow:0 18px 40px rgba(122,74,58,.2),0 0 0 5px #fff,0 0 0 9px #ffb8d4}
  .sheet::before{content:'♡ ♡ ♡ ♡ ♡ ♡';position:absolute;left:20px;top:40px;bottom:30px;width:20px;color:#ff7fae;
    font-size:20px;line-height:2.4;word-wrap:break-word;border-right:2px solid #ffb3cf}
  .deco{text-align:center;font-size:26px;letter-spacing:10px;margin-bottom:8px}
  h1{font-family:'Fredoka',sans-serif;color:#ff7fae;font-size:34px;line-height:1.2;margin-bottom:10px;text-shadow:2px 2px 0 #fff}
  .text{font-size:27px;line-height:39px;white-space:pre-wrap;word-wrap:break-word}
  .foot{margin-top:24px;text-align:right;font-size:24px}
  .date{font-family:sans-serif;font-size:12px;opacity:.6;text-align:right;margin-top:6px}
</style></head>
<body><div class="sheet">
  <div class="deco">🌸 🐑 🎀</div>
  <h1>${esc(l.title)}</h1>
  <div class="text">${esc(l.text || '')}</div>
  <div class="foot">Con amor, tu borreguita 🐑💖</div>
  <div class="date">${esc(fecha)}</div>
</div></body></html>`;
}
