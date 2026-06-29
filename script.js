/* ============================================================
   BRAINSOFT SYSTEMS INC. — Script
   ============================================================ */

// ── Footer year ──────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Sticky header ────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav ───────────────────────────────────────────────
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Scroll-spy: highlight active nav link ────────────────────
const sections  = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-link:not(.nav-cta)');

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => spyObserver.observe(s));

// ── Fade-in on scroll ────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// ── Contact form ─────────────────────────────────────────────
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');

form.addEventListener('submit', e => {
  e.preventDefault();
  successMsg.style.display = 'none';
  errorMsg.style.display   = 'none';

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    errorMsg.style.display = 'block';
    return;
  }

  // Disable button while "sending"
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';

  // Simulate submission — swap for Formspree / EmailJS / etc.
  setTimeout(() => {
    form.reset();
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
  }, 900);
});
