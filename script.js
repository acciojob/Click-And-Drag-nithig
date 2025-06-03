const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selected = null;
let offsetX = 0;
let offsetY = 0;

const cubeWidth = 200;
const cubeHeight = 200;
const gap = 20;
const columns = 6;

cubes.forEach((cube, index) => {
  cube.style.position = 'absolute';
  const row = Math.floor(index / columns);
  const col = index % columns;

  cube.style.left = `${col * (cubeWidth + gap)}px`;
  cube.style.top = `${row * (cubeHeight + gap)}px`;

  cube.addEventListener('mousedown', (e) => {
    selected = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selected) return;
  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Optional: bounds check
  x = Math.max(0, Math.min(x, container.clientWidth - selected.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - selected.offsetHeight));

  selected.style.left = `${x}px`;
  selected.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (selected) {
    selected.style.cursor = 'grab';
    selected = null;
  }
});
