const state = {
  currentTool: 'select',
  selected: null,
  nextId: 1,
  dragOffsetX: 0,
  dragOffsetY: 0,
  resizing: false,
};

const toolbarButtons = {
  select: document.getElementById('tool-select'),
  text: document.getElementById('tool-text'),
  rect: document.getElementById('tool-rect'),
  image: document.getElementById('tool-image'),
};

Object.keys(toolbarButtons).forEach(key => {
  toolbarButtons[key].addEventListener('click', () => {
    Object.values(toolbarButtons).forEach(btn => btn.classList.remove('active'));
    toolbarButtons[key].classList.add('active');
    state.currentTool = key;
    if (key === 'image') {
      document.getElementById('image-file').click();
    }
  });
});

document.getElementById('image-file').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    addImage(img);
  };
  img.src = URL.createObjectURL(file);
  e.target.value = '';
});

const canvas = document.getElementById('canvas');

canvas.addEventListener('mousedown', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (state.currentTool === 'text') {
    addText('Text', x, y);
    return;
  }
  if (state.currentTool === 'rect') {
    addRect(x, y);
    return;
  }
  const target = e.target.closest('.canvas-element');
  if (target) {
    selectElement(target);
    const br = target.querySelector('.handle.br');
    const brRect = br.getBoundingClientRect();
    if (
      e.clientX >= brRect.left &&
      e.clientX <= brRect.right &&
      e.clientY >= brRect.top &&
      e.clientY <= brRect.bottom
    ) {
      state.resizing = true;
    } else {
      state.dragOffsetX = x - parseInt(target.style.left);
      state.dragOffsetY = y - parseInt(target.style.top);
    }
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  } else {
    deselect();
  }
});

function handleMove(e) {
  if (!state.selected) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (state.resizing) {
    const width = Math.max(20, x - parseInt(state.selected.style.left));
    const height = Math.max(20, y - parseInt(state.selected.style.top));
    state.selected.style.width = width + 'px';
    state.selected.style.height = height + 'px';
  } else {
    state.selected.style.left = x - state.dragOffsetX + 'px';
    state.selected.style.top = y - state.dragOffsetY + 'px';
  }
}

function handleUp() {
  state.resizing = false;
  document.removeEventListener('mousemove', handleMove);
  document.removeEventListener('mouseup', handleUp);
}

function selectElement(el) {
  deselect();
  state.selected = el;
  el.classList.add('selected');
}

function deselect() {
  if (state.selected) {
    state.selected.classList.remove('selected');
    state.selected = null;
  }
}

function createElement() {
  const el = document.createElement('div');
  el.classList.add('canvas-element');
  el.id = 'el-' + state.nextId++;
  el.style.left = '50px';
  el.style.top = '50px';
  el.style.width = '100px';
  el.style.height = '50px';
  const handle = document.createElement('div');
  handle.classList.add('handle', 'br');
  el.appendChild(handle);
  canvas.appendChild(el);
  return el;
}

function addText(text, x, y) {
  const el = createElement();
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.background = 'transparent';
  const div = document.createElement('div');
  div.classList.add('editable');
  div.contentEditable = true;
  div.textContent = text;
  el.appendChild(div);
  selectElement(el);
}

function addRect(x, y) {
  const el = createElement();
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.background = '#ffcc00';
  selectElement(el);
}

function addImage(img) {
  const el = createElement();
  el.style.width = img.width + 'px';
  el.style.height = img.height + 'px';
  el.appendChild(img);
  selectElement(el);
}

