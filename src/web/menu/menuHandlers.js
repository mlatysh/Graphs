const dialog = require('electron').remote.dialog;
const ipc = require('electron').ipcRenderer;

const openFileHandler = () => {
    const FileChosenHandler = (args) => {
        if (!args.canceled)
            console.log(args.filePaths)
    }

    dialog.showOpenDialog({properties: ['openFile']})
        .then(FileChosenHandler)
};

const saveFileHandler = () => {
    alert('SAVE')
};

const saveAsFileHandler = () => {
    alert('Save as')
};

const appQuitHandler = () => {
    ipc.send('total-exit')
};

exports.handlers = {
    openFileHandler, saveAsFileHandler, appQuitHandler, saveFileHandler
};
