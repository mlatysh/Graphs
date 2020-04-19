import {ipcMain as ipc} from 'electron';
import {consts as mainActionConsts} from '../consts/mainActionConsts'
import {consts as rendererConsts} from '../consts/rendererActionConsts'

export class MenuEventsEmitter {

    constructor(mainWindow) {
        this.eventsEmitter = mainWindow.webContents;
        this.setMenuHandlers()
    }

    send(event, args) {
        this.eventsEmitter.send(event, args);
    }

    setMenuHandlers() {
        ipc.on(mainActionConsts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST, (filePath) => {
            this.send(rendererConsts.GET_CURRENT_ACTIVE_NETWORK, filePath)
        });


        ipc.on(mainActionConsts.MENU_HANDLERS_REQUESTS.OPEN_FILE_REQUEST, (network) => {
            this.send(rendererConsts.CHANGE_ACTIVE_NETWORK, network)
        });

        ipc.on(mainActionConsts.MENU_HANDLERS_REQUESTS.NEW_FILE_CREATION_REQUEST, () => this.send(rendererConsts.CREATE_NEW_ACTIVE_NETWORK))
    }

    unsetMenuHandlers() {
        ipc.removeAllListeners(mainActionConsts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST)
        ipc.removeAllListeners(mainActionConsts.MENU_HANDLERS_REQUESTS.OPEN_FILE_REQUEST)
        ipc.removeAllListeners(mainActionConsts.MENU_HANDLERS_REQUESTS.NEW_FILE_CREATION_REQUEST)
    }
}
