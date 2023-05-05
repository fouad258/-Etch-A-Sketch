window.onload = function() 
{
// Set default values
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 14;

//creating a div element using DOM Js
const grid = document.getElementById('grid');
const clear = document.getElementById('clearbtn');
const colorsbox = document.getElementById('colorsbox');
const sizeSlider = document.getElementById('sizeSlider');
const colorbtn = document.getElementById('colorbtn');
const mixColorbtn = document.getElementById('mixColorbtn');
const removebtn = document.getElementById('removebtn');
const sizediv = document.getElementById('sizediv');

function setCurrentcolor(newColor) {
  existingColor = newColor;
}
let existingColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function determineSize(newSize){
    currentSize = newSize
}

function refreshGrid() {
  clearGrid();
  createGrid(currentSize);
}

function changesize(value){
   determineSize(value)
   updateSize(value)
   refreshGrid()
}

function sizeValue(newSize) {
  currentSize = newSize;
}

function clearGrid() {
  grid.innerHTML = '';
}

function updateSize(value){
    sizediv.innerHTML = `${value} x ${value}`
}


colorsbox.oninput = (e) => setCurrentcolor(e.target.value)
colorbtn.onclick = () => setCurrentMode('color')
mixColorbtn.onclick = () => setCurrentMode('Mixcolor')
clear.onclick = () => setCurrentMode('clear')
removebtn.onclick = () => refreshGrid()
sizeSlider.onmousemove = (e) => updateSize(e.target.value)
sizeSlider.onchange = (e) => changesize(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
createGrid(currentSize)
document.body.onmouseup = () => (mouseDown = false)


//creating a div element using DOM Js
function createGrid(currentSize) {
  grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`

  for (let i = 0; i < currentSize * currentSize; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.addEventListener('mouseover', SwitchColor);
    gridSquare.addEventListener('mousedown', SwitchColor);
    grid.appendChild(gridSquare);
  }
}

function SwitchColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'Mixcolor') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = existingColor
  } else if (currentMode === 'clear') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

function activateButton(newMode) {
  if (currentMode === 'Mixcolor') {
    mixColorbtn.classList.remove('active');
  } else if (currentMode === 'color') {
    colorbtn.classList.remove('active');
  } else if (currentMode === 'clear') {
    clearbtn.classList.remove('active');
  }
  if (newMode === 'Mixcolor') {
    mixColorbtn.classList.add('active');
  } else if (newMode === 'color') {
    colorbtn.classList.add('active');
  } else if (newMode === 'clear') {
    clearbtn.classList.add('active');
  }
}

window.onload = () => {
  createGrid(currentSize);
  activateButton(currentMode);
};


}
