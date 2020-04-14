import {app, BrowserWindow, ipcMain as ipc} from 'electron'
import {setApplicationMenu} from "./menu/envSetting";
import {FileWorker} from "./fileWorker/fileWorker";
import {consts as builtinConsts} from "./consts/buitinConsts";
import {consts as mainActionConsts} from "./consts/mainActionConsts";
import {MenuEventsEmitter} from "./menu/menuEventsEmitter";
import {saveAsFileHandler} from "./menu/menuHandlers";
import * as path from 'path';
import {BASIC_WINDOW_TITLE, MAIN_WINDOW_SETTINGS} from "./consts/mainWindowSettings";

class Main {
    init() {
        this.basicWindowTitle = BASIC_WINDOW_TITLE;
        this.mainWindow = undefined;
        this.ipc = ipc;
        this.menuEventsEmitter = undefined;
        this.openedFile = undefined;
        app.allowRendererProcessReuse = true;
        this.setMainIpcHandlers()
    }

    setMainIpcHandlers() {
        app.on(builtinConsts.READY, this.onReady.bind(this));
        app.on(builtinConsts.WINDOW_ALL_CLOSED, this.onWindowAllClosed.bind(this));
        app.on(builtinConsts.ACTIVATE, this.onActivate.bind(this));

        ipc.on(mainActionConsts.TOTAL_EXIT, this.onTotalExit.bind(this));
        ipc.on(mainActionConsts.SAVE_CURRENT_NETWORK, this.onSaveCurrentNetwork.bind(this));
        ipc.on(mainActionConsts.OPEN_FILE, this.onOpenFile.bind(this));
        ipc.on(mainActionConsts.CLEAR_SAVE_CURRENT_NETWORK, this.onClearSaveNetwork.bind(this));
        ipc.on(mainActionConsts.NEW_FILE_CREATION, this.onNewFileCreation.bind(this))
    }


    onNewFileCreation() {
        this.setOpenedFile()
    }

    onClearSaveNetwork() {
        if (this.openedFile) {
            ipc.emit(mainActionConsts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST, this.openedFile)
        } else {
            saveAsFileHandler()
        }
    }

    onSaveCurrentNetwork(event, args) {
        FileWorker.saveJsonToFile(args[0], args[1]);
        this.setOpenedFile(args[1])
    };


    onWindowAllClosed() {
        app.quit()
    }

    onActivate() {
        if (BrowserWindow.getAllWindows().length === 0) {
            this.onReady()
        }
    }

    onOpenFile(filePath) {
        let serializedNetwork = FileWorker.getJsonFromFile(filePath);
        ipc.emit(mainActionConsts.MENU_HANDLERS_REQUESTS.OPEN_FILE_REQUEST, serializedNetwork);
        this.setOpenedFile(filePath)
    }

    onReady() {
        this.mainWindow = new BrowserWindow(MAIN_WINDOW_SETTINGS);
        this.menuEventsEmitter = new MenuEventsEmitter(this.mainWindow);
        setApplicationMenu();
        this.mainWindow.on(mainActionConsts.READY_TO_SHOW, () => {
            this.mainWindow.show()
        });
        this.mainWindow.loadFile(path.resolve(__dirname,'static','index.html'));
        this.mainWindow.webContents.openDevTools()
        //DEBUG
    }

    setOpenedFile(fileName) {
        if (fileName) {
            this.openedFile = fileName;
            this.mainWindow.setTitle('Graphs' + ' ' + '[ ' + this.openedFile + ' ]')
        } else {
            this.openedFile = undefined;
            this.mainWindow.setTitle(this.basicWindowTitle)
        }
    }


    onTotalExit() {
        app.quit()
    }
}

(new Main()).init();
