const {showOpenDialog, showSaveDialog} = require('electron').remote.dialog;
const ipc = require('electron').ipcRenderer;
const fs = require('fs');

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
        if (!args.canceled) {
            //????
        }
    };
    showOpenDialog(
        createOptionsObject('Open file...', 'openFile')
    ).then(fileChosenHandler)
};


const saveFileHandler = () => {
    alert('SAVE')
};

const saveAsFileHandler = () => {
    const locationChosenHandler = (args) => {
        if (!args.canceled) {

        }
    };

    showSaveDialog(
        createOptionsObject('Save as...')
    ).then(locationChosenHandler)
};

const appQuitHandler = () => {
    ipc.send('total-exit')
};

export {appQuitHandler, saveAsFileHandler, saveFileHandler, openFileHandler}
