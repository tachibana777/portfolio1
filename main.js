const body = document.body;
const counter = document.querySelector('.loader__count');
const loader = document.querySelector('.loader');
body.classList.add('is-loading');

let progress = 0;
const loadTimer = setInterval(() => {
  progress += Math.ceil(Math.random() * 13);
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadTimer);
    setTimeout(() => {
      loader.classList.add('done');
      body.classList.remove('is-loading');
      body.classList.add('loaded');
    }, 250);
  }
  counter.textContent = String(progress).padStart(3, '0');
}, 55);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const cursor = document.querySelector('.cursor');
const cursorLabel = cursor.querySelector('span');
let cursorX = -100;
let cursorY = -100;
let currentX = -100;
let currentY = -100;
window.addEventListener('mousemove', (event) => { cursorX = event.clientX; cursorY = event.clientY; });
function moveCursor() {
  currentX += (cursorX - currentX) * 0.16;
  currentY += (cursorY - currentY) * 0.16;
  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;
  requestAnimationFrame(moveCursor);
}
moveCursor();
document.querySelectorAll('[data-cursor]').forEach((item) => {
  item.addEventListener('mouseenter', () => { cursorLabel.textContent = item.dataset.cursor; cursor.classList.add('active'); });
  item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

document.querySelectorAll('.magnetic').forEach((element) => {
  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect();
    element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.15}px, ${(event.clientY - rect.top - rect.height / 2) * 0.15}px)`;
  });
  element.addEventListener('mouseleave', () => { element.style.transform = ''; });
});

const orb = document.querySelector('.hero__orb');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (orb && y < window.innerHeight * 1.25) orb.style.transform = `translateY(${y * 0.16}px) rotate(${y * 0.025}deg)`;
});

document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
document.querySelector('#year').textContent = new Date().getFullYear();
