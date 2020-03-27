import {app, BrowserWindow, ipcMain as ipc} from 'electron'
import {setApplicationMenu} from "./menu/envSetting";


class Main {
    init() {
        this.mainWindow = undefined;
        this.ipc = ipc;
        app.allowRendererProcessReuse = true;
        app.on('ready', this.createWindow);
        app.on('window-all-closed', this.onWindowAllClosed);
        app.on('activate', this.onActivate);

        this.setIpcHandlers()

    }

    setIpcHandlers() {
        ipc.on('total-exit', this.onTotalExit)
    }

    onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.mainWindow.createWindow()
        }
    }

    createWindow() {
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
        setApplicationMenu();
        this.mainWindow.loadFile(`${__dirname}/../../static/index.html`);
        this.mainWindow.webContents.openDevTools()
    }

    onTotalExit() {
        app.quit()
    }

}


(new Main()).init();


