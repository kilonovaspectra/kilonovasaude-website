/* =========================================
   KILONOVA SAÚDE — main.js
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

  // Update dropdown display
  const flagEl = document.getElementById('lang-flag');
  const labelEl = document.getElementById('lang-label');
  if (flagEl) flagEl.textContent = langMeta[lang].flag;
  if (labelEl) labelEl.textContent = langMeta[lang].label;

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Lang dropdown toggle
const langDropdown = document.getElementById('lang-dropdown');
const langCurrentBtn = document.getElementById('lang-current-btn');
const langList = document.getElementById('lang-list');

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
  header.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---- Mobile nav ----
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
  });
});

// ---- Cookie banner ----
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');

if (!localStorage.getItem('ks-cookies')) {
  setTimeout(() => cookieBanner.classList.add('visible'), 1200);
}
cookieAccept.addEventListener('click', () => {
  localStorage.setItem('ks-cookies', '1');
  cookieBanner.classList.remove('visible');
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
// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});
// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});
// Expose globally for inline onclick
window.openModal = openModal;
window.closeModal = closeModal;

// ---- Hero canvas particles ----
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const NUM = 48;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(a, b) { return a + Math.random() * (b - a); }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = rand(0, canvas.width);
      this.y = rand(0, canvas.height);
      this.r = rand(1, 3.5);
      this.vx = rand(-0.3, 0.3);
      this.vy = rand(-0.4, -0.1);
      this.alpha = rand(0.08, 0.25);
      this.life = 0;
      this.maxLife = rand(200, 400);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha * Math.sin((this.life / this.maxLife) * Math.PI);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = '#7ECFC0';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < NUM; i++) {
    const p = new Particle();
    p.life = Math.floor(rand(0, p.maxLife));
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
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
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
      });
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
  if (isMobile()) {
    cards.forEach((c, i) => { c.style.display = i === current ? 'block' : 'none'; });
  } else {
    cards.forEach(c => c.style.display = 'block');
  }
  dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

document.getElementById('next-btn')?.addEventListener('click', () => { next(); resetAutoplay(); });
document.getElementById('prev-btn')?.addEventListener('click', () => { prev(); resetAutoplay(); });

function resetAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(next, 5000);
}

function initSlider() { buildDots(); goTo(0); resetAutoplay(); }
window.addEventListener('resize', initSlider);

// ---- Fade-in on scroll ----
document.querySelectorAll('.service-card, .why-item, .testimonial-card, .about-grid, .contact-grid, .event-card, .stat-item').forEach(el => {
  el.classList.add('fade-in');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---- Contact form ----
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMsg.style.display = 'none';
  successMsg.style.display = 'none';

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const privacy = form.privacy.checked;

  if (!name || !phone || !email || !privacy) {
    errorMsg.textContent = translations[currentLang]?.form_error || 'Por favor, preencha todos os campos obrigatórios.';
    errorMsg.style.display = 'block';
    return;
  }

  const subject = encodeURIComponent('Pedido de Marcação — Kilonova Saúde');
  const body = encodeURIComponent(
    `Nome: ${name}\nTelefone: ${phone}\nEmail: ${email}\nServiço: ${form.service.value}\n\n${form.message.value}`
  );
  window.location.href = `mailto:info@kilonovasaude.pt?subject=${subject}&body=${body}`;

  successMsg.textContent = translations[currentLang]?.form_success || 'Pedido enviado com sucesso!';
  successMsg.style.display = 'block';
  form.reset();
});

// ---- Init ----
applyTranslations(currentLang);
initSlider();
