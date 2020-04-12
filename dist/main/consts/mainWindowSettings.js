'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BASIC_WINDOW_TITLE = exports.MAIN_WINDOW_SETTINGS = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAIN_WINDOW_SETTINGS = exports.MAIN_WINDOW_SETTINGS = {
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
        nodeIntegration: true
    },
    title: 'Graphs [New File]',
    show: false,
    icon: _path2.default.join(__dirname, 'assets/icon/icon.png'),
    webSecurity: false
};

var BASIC_WINDOW_TITLE = exports.BASIC_WINDOW_TITLE = 'Graphs [New File]';