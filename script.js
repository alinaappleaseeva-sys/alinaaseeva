// Nav scroll effect
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile burger
const burger = document.getElementById('nav-burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Cover letter tabs
document.querySelectorAll('.cl-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cl-tab').forEach(t => t.classList.remove('cl-tab--active'));
    document.querySelectorAll('.cl-panel').forEach(p => p.classList.remove('cl-panel--active'));
    tab.classList.add('cl-tab--active');
    document.getElementById(tab.dataset.target).classList.add('cl-panel--active');
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.timeline__item, .edu-card, .portfolio-card, .talk-card, .ref-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// Apply visible class
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
