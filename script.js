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

// ── Contact form (Formspree) ──────────────────────────────────
// Replace YOUR_FORM_ID below with the ID from your Formspree dashboard
// e.g. if your endpoint is https://formspree.io/f/abcd1234, use "abcd1234"
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojolybe';

const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');

form.addEventListener('submit', async e => {
  e.preventDefault();
  successMsg.style.display = 'none';
  errorMsg.style.display   = 'none';

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    errorMsg.textContent     = 'Please fill in all required fields.';
    errorMsg.style.display   = 'block';
    return;
  }

  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(form),
    });

    if (res.ok) {
      form.reset();
      successMsg.style.display = 'block';
      setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
    } else {
      const data = await res.json().catch(() => ({}));
      errorMsg.textContent   = data.error || 'Something went wrong. Please try again.';
      errorMsg.style.display = 'block';
    }
  } catch {
    errorMsg.textContent   = 'Network error — please check your connection and try again.';
    errorMsg.style.display = 'block';
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
  }
});
