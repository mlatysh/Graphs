import {ipcMain as ipc} from 'electron';
import {consts as mainActionConsts} from './../eventConsts/mainActionConsts'
import {consts as rendererConsts} from './../eventConsts/rendererActionConsts'
export class MenuEventsEmitter {

    constructor(mainWindow) {
        this.eventsEmitter = mainWindow.webContents;
        this.setMenuHandlers()
    }

    send(event, args) {
        this.eventsEmitter.send(event, args);
    }

    setMenuHandlers() {
        ipc.on(mainActionConsts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST,(filePath) => {
            this.send(rendererConsts.GET_CURRENT_ACTIVE_NETWORK, filePath)
        })
    }
}
