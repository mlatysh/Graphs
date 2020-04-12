'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.newFileCreationHandler = exports.openFileHandler = exports.saveFileHandler = exports.saveAsFileHandler = exports.appQuitHandler = undefined;

var _electron = require('electron');

var _mainActionConsts = require('../consts/mainActionConsts');

var createOptionsObject = function createOptionsObject(title, type) {
    var rez = {
        title: title,
        defaultPath: getUserHome(),
        dontAddToRecent: true,
        properties: ['createDirectory'],
        filters: [{ name: 'Graph', extensions: ['graph', 'gph'] }, { name: 'Any', extensions: ['*'] }]
    };
    if (type === 'openFile') rez.properties.push(type);
    return rez;
};

function getUserHome() {
    return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
}

var openFileHandler = function openFileHandler() {
    var fileChosenHandler = function fileChosenHandler(args) {
        if (!args.canceled) {
            // WORKING
            _electron.ipcMain.emit(_mainActionConsts.consts.OPEN_FILE, args.filePaths[0]);
        }
    };
    _electron.dialog.showOpenDialog(createOptionsObject('Open file...', 'openFile')).then(fileChosenHandler);
};

var saveFileHandler = function saveFileHandler() {
    _electron.ipcMain.emit(_mainActionConsts.consts.CLEAR_SAVE_CURRENT_NETWORK);
};

var saveAsFileHandler = function saveAsFileHandler() {
    var locationChosenHandler = function locationChosenHandler(args) {
        if (!args.canceled) _electron.ipcMain.emit(_mainActionConsts.consts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST, args.filePath);
    };
    _electron.dialog.showSaveDialog(createOptionsObject('Save graph as...')).then(locationChosenHandler);
};

var newFileCreationHandler = function newFileCreationHandler() {
    _electron.ipcMain.emit(_mainActionConsts.consts.MENU_HANDLERS_REQUESTS.NEW_FILE_CREATION_REQUEST);
};

var appQuitHandler = function appQuitHandler() {
    _electron.ipcMain.emit('total-exit');
};

exports.appQuitHandler = appQuitHandler;
exports.saveAsFileHandler = saveAsFileHandler;
exports.saveFileHandler = saveFileHandler;
exports.openFileHandler = openFileHandler;
exports.newFileCreationHandler = newFileCreationHandler;