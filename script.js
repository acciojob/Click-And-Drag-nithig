const container = document.querySelector('.items');
  const cubes = document.querySelectorAll('.item');

  let selected = null;
  let offsetX = 0;
  let offsetY = 0;

  cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
      selected = cube;
      const rect = cube.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Set initial position
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Ensure absolute positioning
      cube.style.position = 'absolute';
      cube.style.left = (rect.left - containerRect.left) + 'px';
      cube.style.top = (rect.top - containerRect.top) + 'px';
      cube.style.zIndex = 1000;
      cube.style.cursor = 'grabbing';
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!selected) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = selected.getBoundingClientRect();

    let left = e.clientX - containerRect.left - offsetX;
    let top = e.clientY - containerRect.top - offsetY;

    // Boundary checks
    left = Math.max(0, Math.min(left, container.clientWidth - cubeRect.width));
    top = Math.max(0, Math.min(top, container.clientHeight - cubeRect.height));

    selected.style.left = left + 'px';
    selected.style.top = top + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (selected) {
      selected.style.cursor = 'grab';
      selected = null;
    }
  });