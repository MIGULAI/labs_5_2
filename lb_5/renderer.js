const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = 800;
const height = 600;
canvas.width = width;
canvas.height = height;

const cellSize = 5;
const numCells = Math.floor(width / cellSize);

const cells = new Array(numCells).fill(0);
cells[Math.floor(numCells / 2)] = 1;

function getNewCellValue(cells, i) {
    const left = cells[i - 1] || 0;
    const right = cells[i + 1] || 0;
    return (left ^ cells[i] ^ right) === 1 ? 1 : 0;
}

function update() {
    const newCells = cells.map((_, i) => getNewCellValue(cells, i));
    cells.splice(0, cells.length, ...newCells);
}

function draw() {
    context.clearRect(0, 0, width, height);
    cells.forEach((cell, i) => {
        if (cell) {
            context.fillRect(i * cellSize, 0, cellSize, cellSize);
        }
    });
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();