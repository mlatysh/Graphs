import {app, BrowserWindow, ipcMain as ipc} from 'electron'
import {setApplicationMenu} from "./menu/envSetting";
import {FileWorker} from "./fileWorker/fileWorker";
import {consts as builtinConsts} from "./eventConsts/buitinConsts";
import {consts as mainActionConsts} from "./eventConsts/mainActionConsts";
import {MenuEventsEmitter} from "./menu/menuEventsEmitter";

class Main {
    init() {
        this.mainWindow = undefined;
        this.ipc = ipc;
        this.menuEventsEmitter = undefined;
        app.allowRendererProcessReuse = true;
        app.on(builtinConsts.READY, this.onReady.bind(this));
        app.on(builtinConsts.WINDOW_ALL_CLOSED, this.onWindowAllClosed.bind(this));
        app.on(builtinConsts.ACTIVATE, this.onActivate.bind(this));

        this.setMainIpcHandlers()
    }

    setMainIpcHandlers() {
        ipc.on(mainActionConsts.TOTAL_EXIT, this.onTotalExit.bind(this));
        ipc.on(mainActionConsts.SAVE_CURRENT_NETWORK, this.onSaveCurrentNetwork.bind(this));
    }

    onSaveCurrentNetwork(event, args) {
        FileWorker.saveJsonToFile(args[0], args[1])
    };

    onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }

    onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.onReady()
        }
    }

    onReady() {
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
        this.menuEventsEmitter = new MenuEventsEmitter(this.mainWindow);
        setApplicationMenu();
        this.mainWindow.loadFile(`${__dirname}/../../static/index.html`);
        this.mainWindow.webContents.openDevTools()
    }

    onTotalExit() {
        app.quit()
    }
}

(new Main()).init();




