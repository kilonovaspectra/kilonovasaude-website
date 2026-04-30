/* =========================================
   KILONOVA SAÚDE — main.js (WordPress theme)
   ========================================= */

// ---- Language ----
const langMeta = {
  pt: { flag: '🇵🇹', label: 'Português' },
  en: { flag: '🇬🇧', label: 'English' },
  fr: { flag: '🇫🇷', label: 'Français' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
};
let currentLang = localStorage.getItem('ks-lang') || 'pt';

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  currentLang = lang;
  localStorage.setItem('ks-lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  const flagEl = document.getElementById('lang-flag');
  const labelEl = document.getElementById('lang-label');
  if (flagEl) flagEl.textContent = langMeta[lang].flag;
  if (labelEl) labelEl.textContent = langMeta[lang].label;
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  translateCF7(t);
}

// ---- CF7 form i18n ----
// Traduz os elementos do Contact Form 7 que não suportam data-i18n diretamente:
// placeholders dos inputs, opções do select e o botão de submissão.
function translateCF7(t) {
  const form = document.querySelector('.wpcf7-form');
  if (!form) return;

  // Helper: remove o " *" do final do label para usar como placeholder
  const strip = str => (str || '').replace(/\s*\*$/, '').trim();

  // --- Inputs de texto (tenta vários nomes comuns do CF7) ---
  const nameInput = form.querySelector(
    'input[name="your-name"], input[name="nome"], input[name="name"]'
  );
  const phoneInput = form.querySelector(
    'input[name="your-phone"], input[name="telefone"], input[name="phone"]'
  );
  const emailInput = form.querySelector(
    'input[name="your-email"], input[name="email"]'
  );
  const msgArea = form.querySelector(
    'textarea[name="your-message"], textarea[name="mensagem"], textarea[name="message"]'
  );

  if (nameInput  && t.form_name)               nameInput.placeholder  = strip(t.form_name);
  if (phoneInput && t.form_phone)              phoneInput.placeholder = strip(t.form_phone);
  if (emailInput && t.form_email)              emailInput.placeholder = strip(t.form_email);
  if (msgArea    && t.form_message_placeholder) msgArea.placeholder   = t.form_message_placeholder;

  // --- Select de serviço ---
  const select = form.querySelector('select');
  if (select) {
    const opts = [
      t.form_service_placeholder,
      t.form_srv1,
      t.form_srv2,
      t.form_srv3,
      t.form_srv4,
    ];
    select.querySelectorAll('option').forEach((opt, i) => {
      if (opts[i] !== undefined) opt.textContent = opts[i];
    });
  }

  // --- Botão de submissão ---
  const submit = form.querySelector('input[type="submit"], button[type="submit"]');
  if (submit && t.form_submit) {
    if (submit.tagName === 'INPUT') submit.value = t.form_submit;
    else submit.textContent = t.form_submit;
  }

  // --- Texto do RGPD / Privacidade ---
  const privacySpan = form.querySelector('[data-i18n="form_privacy_1"]');
  const privacyLink = form.querySelector('[data-i18n="form_privacy_link"]');
  if (privacySpan && t.form_privacy_1) privacySpan.textContent = t.form_privacy_1;
  if (privacyLink && t.form_privacy_link) privacyLink.textContent = t.form_privacy_link;
}

// Lang dropdown
const langDropdown = document.getElementById('lang-dropdown');
const langCurrentBtn = document.getElementById('lang-current-btn');
langCurrentBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = langDropdown.classList.toggle('open');
  langCurrentBtn.setAttribute('aria-expanded', isOpen);
});
document.addEventListener('click', () => {
  langDropdown?.classList.remove('open');
  langCurrentBtn?.setAttribute('aria-expanded', 'false');
});
document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => {
    applyTranslations(btn.dataset.lang);
    langDropdown.classList.remove('open');
  });
});

// ---- Header scroll ----
const header = document.getElementById('header');
function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---- Mobile nav ----
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mainNav?.classList.toggle('open');
});
mainNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mainNav?.classList.remove('open');
  });
});

// ---- Cookie banner ----
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
if (!localStorage.getItem('ks-cookies')) {
  setTimeout(() => cookieBanner?.classList.add('visible'), 1200);
}
cookieAccept?.addEventListener('click', () => {
  localStorage.setItem('ks-cookies', '1');
  cookieBanner?.classList.remove('visible');
});

// ---- Modals ----
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});
window.openModal = openModal;
window.closeModal = closeModal;

// ---- Hero canvas particles ----
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const NUM = 48;
  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize);
  resize();
  function rand(a, b) { return a + Math.random() * (b - a); }
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = rand(0, canvas.width); this.y = rand(0, canvas.height);
      this.r = rand(1, 3.5); this.vx = rand(-0.3, 0.3); this.vy = rand(-0.4, -0.1);
      this.alpha = rand(0.08, 0.25); this.life = 0; this.maxLife = rand(200, 400);
    }
    update() { this.x += this.vx; this.y += this.vy; this.life++; if (this.life > this.maxLife || this.y < -10) this.reset(); }
    draw() {
      ctx.save(); ctx.globalAlpha = this.alpha * Math.sin((this.life / this.maxLife) * Math.PI);
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = '#7ECFC0'; ctx.fill(); ctx.restore();
    }
  }
  for (let i = 0; i < NUM; i++) { const p = new Particle(); p.life = Math.floor(rand(0, p.maxLife)); particles.push(p); }
  function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
  animate();
})();

// ---- Stats counter ----
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const isLarge = target >= 1000;
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(ease * target);
    el.textContent = isLarge ? value.toLocaleString('pt-PT') : value;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isLarge ? target.toLocaleString('pt-PT') : target;
  }
  requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => animateCounter(el, parseInt(el.dataset.target, 10)));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ---- Testimonials slider ----
const track = document.getElementById('testimonials-track');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
const dotsContainer = document.getElementById('slider-dots');
let current = 0;
let autoplayTimer;
function isMobile() { return window.innerWidth < 768; }
function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  const total = isMobile() ? cards.length : Math.ceil(cards.length / 3);
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
}
function goTo(idx) {
  const total = isMobile() ? cards.length : Math.ceil(cards.length / 3);
  current = (idx + total) % total;
  if (isMobile()) { cards.forEach((c, i) => { c.style.display = i === current ? 'block' : 'none'; }); }
  else { cards.forEach(c => c.style.display = 'block'); }
  dotsContainer?.querySelectorAll('.dot').forEach((d, i) => { d.classList.toggle('active', i === current); });
}
function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }
document.getElementById('next-btn')?.addEventListener('click', () => { next(); resetAutoplay(); });
document.getElementById('prev-btn')?.addEventListener('click', () => { prev(); resetAutoplay(); });
function resetAutoplay() { clearInterval(autoplayTimer); autoplayTimer = setInterval(next, 5000); }
function initSlider() { buildDots(); goTo(0); resetAutoplay(); }
window.addEventListener('resize', initSlider);

// ---- Fade-in on scroll ----
document.querySelectorAll('.service-card, .why-item, .testimonial-card, .about-grid, .contact-grid, .event-card, .stat-item').forEach(el => {
  el.classList.add('fade-in');
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---- Init ----
applyTranslations(currentLang);
initSlider();
