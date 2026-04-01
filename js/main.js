/* =========================================
   KILONOVA SAÚDE — main.js
   ========================================= */

// ---- Language ----
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
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
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
    cards.forEach((c, i) => {
      c.style.display = i === current ? 'block' : 'none';
    });
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

function initSlider() {
  buildDots();
  goTo(0);
  resetAutoplay();
}

window.addEventListener('resize', initSlider);

// ---- Fade-in on scroll ----
const fadeEls = document.querySelectorAll('.service-card, .why-item, .testimonial-card, .about-grid, .contact-grid');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
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
    errorMsg.textContent = translations[currentLang]?.form_error || 'Please fill in all required fields.';
    errorMsg.style.display = 'block';
    return;
  }

  // Build mailto link as fallback (no backend yet)
  const t = translations[currentLang];
  const subject = encodeURIComponent('Pedido de Marcação — Kilonova Saúde');
  const body = encodeURIComponent(
    `Nome: ${name}\nTelefone: ${phone}\nEmail: ${email}\nServiço: ${form.service.value}\n\n${form.message.value}`
  );
  window.location.href = `mailto:info@kilonovasaude.pt?subject=${subject}&body=${body}`;

  successMsg.textContent = t?.form_success || 'Request sent!';
  successMsg.style.display = 'block';
  form.reset();
});

// ---- Init ----
applyTranslations(currentLang);
initSlider();
