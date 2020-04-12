"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require("electron");

var _envSetting = require("./menu/envSetting");

var _fileWorker = require("./fileWorker/fileWorker");

var _buitinConsts = require("./consts/buitinConsts");

var _mainActionConsts = require("./consts/mainActionConsts");

var _menuEventsEmitter = require("./menu/menuEventsEmitter");

var _menuHandlers = require("./menu/menuHandlers");

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _mainWindowSettings = require("./consts/mainWindowSettings");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);
    }

    _createClass(Main, [{
        key: "init",
        value: function init() {
            this.basicWindowTitle = _mainWindowSettings.BASIC_WINDOW_TITLE;
            this.mainWindow = undefined;
            this.ipc = _electron.ipcMain;
            this.menuEventsEmitter = undefined;
            this.openedFile = undefined;
            _electron.app.allowRendererProcessReuse = true;
            this.setMainIpcHandlers();
        }
    }, {
        key: "setMainIpcHandlers",
        value: function setMainIpcHandlers() {
            _electron.app.on(_buitinConsts.consts.READY, this.onReady.bind(this));
            _electron.app.on(_buitinConsts.consts.WINDOW_ALL_CLOSED, this.onWindowAllClosed.bind(this));
            _electron.app.on(_buitinConsts.consts.ACTIVATE, this.onActivate.bind(this));

            _electron.ipcMain.on(_mainActionConsts.consts.TOTAL_EXIT, this.onTotalExit.bind(this));
            _electron.ipcMain.on(_mainActionConsts.consts.SAVE_CURRENT_NETWORK, this.onSaveCurrentNetwork.bind(this));
            _electron.ipcMain.on(_mainActionConsts.consts.OPEN_FILE, this.onOpenFile.bind(this));
            _electron.ipcMain.on(_mainActionConsts.consts.CLEAR_SAVE_CURRENT_NETWORK, this.onClearSaveNetwork.bind(this));
            _electron.ipcMain.on(_mainActionConsts.consts.NEW_FILE_CREATION, this.onNewFileCreation.bind(this));
        }
    }, {
        key: "onNewFileCreation",
        value: function onNewFileCreation() {
            this.setOpenedFile();
        }
    }, {
        key: "onClearSaveNetwork",
        value: function onClearSaveNetwork() {
            if (this.openedFile) {
                _electron.ipcMain.emit(_mainActionConsts.consts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST, this.openedFile);
            } else {
                (0, _menuHandlers.saveAsFileHandler)();
            }
        }
    }, {
        key: "onSaveCurrentNetwork",
        value: function onSaveCurrentNetwork(event, args) {
            _fileWorker.FileWorker.saveJsonToFile(args[0], args[1]);
            this.setOpenedFile(args[1]);
        }
    }, {
        key: "onWindowAllClosed",
        value: function onWindowAllClosed() {
            if (process.platform !== 'darwin') {
                _electron.app.quit();
            }
        }
    }, {
        key: "onActivate",
        value: function onActivate() {
            if (_electron.BrowserWindow.getAllWindows().length === 0) {
                this.onReady();
            }
        }
    }, {
        key: "onOpenFile",
        value: function onOpenFile(filePath) {
            var serializedNetwork = _fileWorker.FileWorker.getJsonFromFile(filePath);
            _electron.ipcMain.emit(_mainActionConsts.consts.MENU_HANDLERS_REQUESTS.OPEN_FILE_REQUEST, serializedNetwork);
            this.setOpenedFile(filePath);
        }
    }, {
        key: "onReady",
        value: function onReady() {
            var _this = this;

            this.mainWindow = new _electron.BrowserWindow(_mainWindowSettings.MAIN_WINDOW_SETTINGS);
            this.menuEventsEmitter = new _menuEventsEmitter.MenuEventsEmitter(this.mainWindow);
            (0, _envSetting.setApplicationMenu)();
            this.mainWindow.on(_mainActionConsts.consts.READY_TO_SHOW, function () {
                _this.mainWindow.show();
            });
            this.mainWindow.loadFile(path.resolve(__dirname, 'index.html'));
            this.mainWindow.webContents.openDevTools();
            //DEBUG
        }
    }, {
        key: "setOpenedFile",
        value: function setOpenedFile(fileName) {
            if (fileName) {
                this.openedFile = fileName;
                this.mainWindow.setTitle('Graphs' + ' ' + '[ ' + this.openedFile + ' ]');
            } else {
                this.openedFile = undefined;
                this.mainWindow.setTitle(this.basicWindowTitle);
            }
        }
    }, {
        key: "onTotalExit",
        value: function onTotalExit() {
            _electron.app.quit();
        }
    }]);

    return Main;
}();

new Main().init();