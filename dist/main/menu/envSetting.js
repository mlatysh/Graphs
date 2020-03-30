'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setApplicationMenu = setApplicationMenu;

var _electron = require('electron');

var _menu = require('./menu.js');

function setApplicationMenu() {
    var appMenu = _electron.Menu.buildFromTemplate(_menu.menu);
    _electron.Menu.setApplicationMenu(appMenu);
}