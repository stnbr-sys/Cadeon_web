/* ─────────────────────────────────────────
   CADEON — main.js
   ───────────────────────────────────────── */

/* ── Custom Cursor ───────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left     = e.clientX + 'px';
  cursor.style.top      = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, input').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '6px';
    cursor.style.height = '6px';
    cursorRing.style.width  = '52px';
    cursorRing.style.height = '52px';
    cursorRing.style.borderColor = 'rgba(34,211,238,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(8,145,178,0.5)';
  });
});

/* ── Nav Scroll Effect ───────────────────── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Hero Wave Canvas ────────────────────── */
const canvas = document.getElementById('hero-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const waves = [
  { amp: 55, freq: 0.012, speed: 0.018, phase: 0,   alpha: 0.6,  color: '#0891B2', lineW: 1.5 },
  { amp: 35, freq: 0.018, speed: 0.012, phase: 2.1, alpha: 0.35, color: '#22D3EE', lineW: 1   },
  { amp: 22, freq: 0.025, speed: 0.008, phase: 4.4, alpha: 0.2,  color: '#10B981', lineW: 0.8 },
  { amp: 70, freq: 0.008, speed: 0.006, phase: 1.1, alpha: 0.13, color: '#0891B2', lineW: 2   },
];

let t = 0;
function animateWaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cy = canvas.height / 2;

  waves.forEach(w => {
    ctx.beginPath();
    ctx.strokeStyle = w.color;
    ctx.globalAlpha = w.alpha;
    ctx.lineWidth   = w.lineW;
    for (let x = 0; x <= canvas.width; x += 2) {
      const y = cy + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  });

  ctx.globalAlpha = 1;
  t++;
  requestAnimationFrame(animateWaves);
}
animateWaves();

/* ── Scroll Reveal ───────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));

/* ── Waitlist Form ───────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('email-input');
  const note  = document.getElementById('form-note');
  if (input.value) {
    note.textContent = '✓ Thank you — we\'ll be in touch.';
    note.style.color        = '#10B981';
    note.style.letterSpacing = '2px';
    input.value       = '';
    input.placeholder = 'Registered.';
  }
}
