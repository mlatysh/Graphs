import {dialog} from 'electron';
import {ipcMain as ipc} from 'electron';
import {consts as mainActionConsts} from "../eventConsts/mainActionConsts";

const createOptionsObject = (title, type) => {
    let rez = {
        title: title,
        defaultPath: getUserHome(),
        dontAddToRecent: true,
        properties: ['createDirectory'],
        filters: [
            {name: 'Graph', extensions: ['graph', 'gph']},
            {name: 'Any', extensions: ['*']}
        ]
    };
    if (type === 'openFile')
        rez.properties.push(type);
    return rez
};


function getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

const openFileHandler = () => {
    const fileChosenHandler = (args) => {
        if (!args.canceled){
            // WORKING
            ipc.emit(mainActionConsts.OPEN_FILE,
                args.filePaths[0])}
    };
    dialog.showOpenDialog(
        createOptionsObject('Open file...', 'openFile')
    ).then(fileChosenHandler)
};


const saveFileHandler = () => {
    alert('SAVE')
};

const saveAsFileHandler = () => {
    const locationChosenHandler = (args) => {
        if (!args.canceled)
            ipc.emit(mainActionConsts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST,
                args.filePath)
    };
    dialog.showSaveDialog(
        createOptionsObject('Save graph as...')
    ).then(locationChosenHandler)
};

const appQuitHandler = () => {
    ipc.emit('total-exit')
};

export {appQuitHandler, saveAsFileHandler, saveFileHandler, openFileHandler}
