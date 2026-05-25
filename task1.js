// ── HERO SLIDER ──
let heroIdx = 0;
const heroTotal = 4;
let heroTimer;

function updateHero() {
  document.getElementById('heroSlides').style.transform = `translateX(-${heroIdx * 100}%)`;
  document.querySelectorAll('.hero-dot').forEach((d,i) => d.classList.toggle('active', i === heroIdx));
}
function changeSlide(dir) {
  heroIdx = (heroIdx + dir + heroTotal) % heroTotal;
  updateHero(); resetHeroTimer();
}
function goSlide(i) { heroIdx = i; updateHero(); resetHeroTimer(); }
function resetHeroTimer() { clearInterval(heroTimer); heroTimer = setInterval(() => changeSlide(1), 5500); }
resetHeroTimer();

// ── NAVBAR SCROLL ──
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}

const sIds = ['hero-wrap','about-section','causes','get-involved','volunteers','gallery','blog','events','contact'];
const nMap = {'hero-wrap':'Home','about-section':'About Us','causes':'Causes','get-involved':'Causes','volunteers':'Volunteers','gallery':'Gallery','blog':'Blog','events':'Events','contact':'Contact'};
window.addEventListener('scroll', () => {
  const y = window.scrollY + 90;
  let cur = 'hero-wrap';
  sIds.forEach(id => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.textContent.trim() === (nMap[cur] || '')));
});

// ── GI SLIDER ──
let giIdx = 0;
function isMobile() { return window.innerWidth < 720; }
function updateGi() {
  const c = document.getElementById('giCards');
  if (!isMobile()) { c.style.transform = 'translateX(0)'; giIdx = 0; }
  else { const w = c.querySelector('.gi-card').offsetWidth + 22; c.style.transform = `translateX(-${giIdx * w}px)`; }
  document.querySelectorAll('.gi-dot').forEach((d,i) => d.classList.toggle('active', i === giIdx));
}
function slideGi(dir) {
  if (!isMobile()) return;
  giIdx = Math.max(0, Math.min(2, giIdx + dir));
  updateGi();
}
function goGi(i) { giIdx = i; updateGi(); }
window.addEventListener('resize', updateGi);

// Scroll reveal
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));