const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { Client } = require('discord-rpc');
const config = require('./config.json');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 650,
    height: 650,
    resizable: false,
    titleBarStyle: 'hidden',
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const clientId = config.clientId;

const rpc = new Client({ transport: 'ipc' });
let startedTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  const values = await mainWindow.webContents.executeJavaScript('window.values');

  if(!values.timestamp)
    startedTimestamp = undefined;
  rpc.setActivity({
        details: values.title,
        state: values.state,
        startTimestamp: startedTimestamp,
		    largeImageKey: values.largeImageKey,
		    largeImageText: values.largeImageText,
		    smallImageKey: values.smallImageKey,
		    smallImageText: values.smallImageText,
        instance: false
    });

}

rpc.on('ready', () => {
  setActivity();
  console.log('Ready')

  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login(clientId).catch(console.error);