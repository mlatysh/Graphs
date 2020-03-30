'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MenuEventsEmitter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _mainActionConsts = require('./../eventConsts/mainActionConsts');

var _rendererActionConsts = require('./../eventConsts/rendererActionConsts');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuEventsEmitter = exports.MenuEventsEmitter = function () {
    function MenuEventsEmitter(mainWindow) {
        _classCallCheck(this, MenuEventsEmitter);

        this.eventsEmitter = mainWindow.webContents;
        this.setMenuHandlers();
    }

    _createClass(MenuEventsEmitter, [{
        key: 'send',
        value: function send(event, args) {
            this.eventsEmitter.send(event, args);
        }
    }, {
        key: 'setMenuHandlers',
        value: function setMenuHandlers() {
            var _this = this;

            _electron.ipcMain.on(_mainActionConsts.consts.MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST, function (filePath) {
                _this.send(_rendererActionConsts.consts.GET_CURRENT_ACTIVE_NETWORK, filePath);
            });

            _electron.ipcMain.on(_mainActionConsts.consts.MENU_HANDLERS_REQUESTS.OPEN_FILE_REQUEST, function (network) {
                _this.send(_rendererActionConsts.consts.CHANGE_ACTIVE_NETWORK, network);
            });

            _electron.ipcMain.on(_mainActionConsts.consts.MENU_HANDLERS_REQUESTS.NEW_FILE_CREATION_REQUEST, function () {
                return _this.send(_rendererActionConsts.consts.CREATE_NEW_ACTIVE_NETWORK);
            });
        }
    }]);

    return MenuEventsEmitter;
}();