const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const WIDTH = 100;
const HEIGHT = 100;
const CELL_SIZE = 5;

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