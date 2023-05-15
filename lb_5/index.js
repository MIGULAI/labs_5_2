const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;


const WIDTH = 100;
const HEIGHT = 100;
const CELL_SIZE = 5;
const ALIVE_COLOR = '#000000';
const DEAD_COLOR = '#FFFFFF';

let cells;

// function createCells(width, height) {
//   return Array.from({ length: width }, () => Array.from({ length: height }, () => false));
// }

// function countNeighbors(x, y) {
//   let count = 0;

//   for (let i = -1; i <= 1; i++) {
//     for (let j = -1; j <= 1; j++) {
//       if (i === 0 && j === 0) {
//         continue;
//       }

//       const nx = x + i;
//       const ny = y + j;

//       if (nx < 0 || ny < 0 || nx >= WIDTH || ny >= HEIGHT) {
//         continue;
//       }

//       if (cells[nx][ny]) {
//         count++;
//       }
//     }
//   }

//   return count;
// }

// function nextGeneration() {
//   const newCells = createCells(WIDTH, HEIGHT);

//   for (let x = 0; x < WIDTH; x++) {
//     for (let y = 0; y < HEIGHT; y++) {
//       const neighbors = countNeighbors(x, y);

//       if (cells[x][y]) {
//         if (neighbors === 2 || neighbors === 3) {
//           newCells[x][y] = true;
//         }
//       } else {
//         if (neighbors === 3) {
//           newCells[x][y] = true;
//         }
//       }
//     }
//   }

//   cells = newCells;
// }

// function drawGrid(ctx) {
//   ctx.strokeStyle = '#CCCCCC';

//   for (let x = 0; x <= WIDTH; x++) {
//     ctx.beginPath();
//     ctx.moveTo(x * CELL_SIZE, 0);
//     ctx.lineTo(x * CELL_SIZE, HEIGHT * CELL_SIZE);
//     ctx.stroke();
//   }

//   for (let y = 0; y <= HEIGHT; y++) {
//     ctx.beginPath();
//     ctx.moveTo(0, y * CELL_SIZE);
//     ctx.lineTo(WIDTH * CELL_SIZE, y * CELL_SIZE);
//     ctx.stroke();
//   }
// }

// function drawCells(ctx) {
//   for (let x = 0; x < WIDTH; x++) {
//     for (let y = 0; y < HEIGHT; y++) {
//       if (cells[x][y]) {
//         ctx.fillStyle = ALIVE_COLOR;
//         ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 1, CELL_SIZE - 1);
//       } else {
//         ctx.fillStyle = DEAD_COLOR;
//         ctx.fillRect(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE - 1, CELL_SIZE - 1);
//       }
//     }
//   }
// }

// function draw() {
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

//   canvas.width = WIDTH * CELL_SIZE;
//   canvas.height = HEIGHT * CELL_SIZE;

//   drawCells(ctx);
//   drawGrid(ctx);

//   nextGeneration();

//   requestAnimationFrame(draw);
// }


function createWindow() {
  mainWindow = new BrowserWindow({
    width: WIDTH * CELL_SIZE + 20,
    height: HEIGHT * CELL_SIZE + 40,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setMenu(null);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});