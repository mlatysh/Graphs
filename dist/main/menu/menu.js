"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.menu = undefined;

var _menuHandlers = require("./menuHandlers");

var menu = exports.menu = [{
    label: "File",
    submenu: [{
        label: "New File",
        accelerator: "CmdOrCtrl+N",
        click: _menuHandlers.newFileCreationHandler
    }, {
        label: 'Open...',
        accelerator: 'CmdOrCtrl+O',
        click: _menuHandlers.openFileHandler
    }, {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: _menuHandlers.saveFileHandler
    }, {
        label: 'Save as...',
        click: _menuHandlers.saveAsFileHandler

    }, {
        type: 'separator'
    }, {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: _menuHandlers.appQuitHandler
    }]
}];