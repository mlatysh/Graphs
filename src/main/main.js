import {app, BrowserWindow} from 'electron'
import {ipcMain as ipc} from 'electron'
import {setApplicationMenu} from "./menu/envSetting";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    setApplicationMenu();
    win.loadFile(`${__dirname}/../../static/index.html`);
    addEventListeners();
    win.webContents.openDevTools()
}
function addEventListeners() {
    ipc.on('total-exit', (e, args) => {
        app.quit()
    })
}
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});

app.allowRendererProcessReuse = true;

app.whenReady().then(createWindow);



