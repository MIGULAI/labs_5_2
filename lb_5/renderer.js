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

function transition(cells, i) {
    const left = cells[i - 1] || 0;
    const right = cells[i + 1] || 0;
    const current = cells[i]
    if (left === 1 && current === 1 && right === 1) {
        return 0;
    }
    if (left === 1 && current === 1 && right === 0) {
        return 0;
    }
    if (left === 1 && current === 0 && right === 1) {
        return 0;
    }
    if (left === 1 && current === 0 && right === 0) {
        return 1;
    }
    if (left === 0 && current === 1 && right === 1) {
        return 1;
    }
    if (left === 0 && current === 1 && right === 0) {
        return 1;
    }
    if (left === 0 && current === 0 && right === 1) {
        return 1;
    }
    if (left === 0 && current === 0 && right === 0) {
        return 0;
    }
    return 0;
}

function update() {
    const newCells = cells.map((_, i) => transition(cells, i));
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