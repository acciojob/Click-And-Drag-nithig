const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Make each cube draggable
cubes.forEach(cube => {
  cube.style.position = 'absolute';
  cube.style.cursor = 'grab';

  // Initialize position so they're not stacked
  const rect = cube.getBoundingClientRect();
  cube.style.left = `${rect.left - container.getBoundingClientRect().left}px`;
  cube.style.top = `${rect.top - container.getBoundingClientRect().top}px`;

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.getBoundingClientRect().left;
    offsetY = e.clientY - cube.getBoundingClientRect().top;
    cube.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Constrain within container
  newLeft = Math.max(0, Math.min(container.clientWidth - cubeRect.width, newLeft));
  newTop = Math.max(0, Math.min(container.clientHeight - cubeRect.height, newTop));

  selectedCube.style.left = `${newLeft}px`;
  selectedCube.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.cursor = 'grab';
  }
  selectedCube = null;
});
