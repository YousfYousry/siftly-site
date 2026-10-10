'use strict';
const examples = [
  { src: 'assets/lake.jpg', alt: 'Mountain lake, example photo', caption: 'The weekend escape.' },
  { src: 'assets/mountain.jpg', alt: 'Mountain summit, example photo', caption: 'Worth the early start.' },
  { src: 'assets/adventure.jpg', alt: 'Golden landscape, example photo', caption: 'The long way home.' }
];
let current = 0;
let history = [];
let busy = false;
const photo = document.querySelector('#demo-photo');
const image = document.querySelector('#demo-image');
const status = document.querySelector('#demo-status');
function render() {
  const item = examples[current];
  image.src = item.src;
  image.alt = item.alt;
  document.querySelector('#demo-caption').textContent = item.caption;
  document.querySelector('#demo-counter').textContent = `${current + 1} / ${examples.length}`;
  document.querySelector('#demo-undo').disabled = !history.length;
}
function decide(keep) {
  if (busy) return;
  busy = true;
  history.push(current);
  const stamp = document.querySelector('#demo-stamp');
  stamp.textContent = keep ? 'KEEP ♡' : 'LET GO';
  stamp.style.color = keep ? '#77d9ff' : '#ff97a8';
  stamp.style.display = 'block';
  photo.style.transform = `translateX(${keep ? 25 : -25}px) rotate(${keep ? 5 : -5}deg)`;
  setTimeout(() => {
    current = (current + 1) % examples.length;
    render();
    stamp.style.display = 'none';
    photo.style.transform = '';
    status.textContent = keep ? 'Saved to demo favorites. A little more of what you love.' : 'Moved to demo Trash. Change your mind? Tap Undo.';
    busy = false;
  }, 240);
}
document.querySelector('#demo-trash').addEventListener('click', () => decide(false));
document.querySelector('#demo-keep').addEventListener('click', () => decide(true));
document.querySelector('#demo-undo').addEventListener('click', () => {
  if (busy || !history.length) return;
  current = history.pop();
  render();
  status.textContent = 'Restored. Your memories, your decisions.';
});
let startX = null;
let startY = null;
photo.addEventListener('pointerdown', e => { startX = e.clientX; startY = e.clientY; });
photo.addEventListener('pointerup', e => {
  if (startX === null) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) decide(dx > 0);
  startX = startY = null;
});
photo.addEventListener('pointercancel', () => { startX = startY = null; });
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.07 });
  document.querySelectorAll('.experience, .section-top, .tool-card, .privacy, .faq, .final-cta').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
}
