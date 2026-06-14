// ── Nav scroll shadow ──
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile burger ──
const burger = document.getElementById('nav-burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
  })
);

// ── Scroll-reveal with stagger ──
// Skip entirely when the user prefers reduced motion — content stays visible.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const STAGGER = 80;

  function addRevealClass(selector, stagger = false) {
    const groups = {};
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
      if (stagger) {
        const parent = el.parentElement;
        if (!groups[parent]) groups[parent] = [];
        groups[parent].push(el);
      }
    });
    if (stagger) {
      Object.values(groups).forEach(siblings => {
        siblings.forEach((el, i) => {
          el.style.setProperty('--reveal-delay', `${i * STAGGER}ms`);
        });
      });
    }
  }

  addRevealClass('.timeline__item', true);
  addRevealClass('.edu-card',       true);
  addRevealClass('.portfolio-card', true);
  addRevealClass('.talk-card',      true);
  addRevealClass('.ref-card',       true);
  addRevealClass('.section__title', false);
  addRevealClass('.section__subtitle', false);
  addRevealClass('.portfolio-subheading', false);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
