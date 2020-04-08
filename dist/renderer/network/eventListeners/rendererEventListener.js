"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RendererEventListener = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rendererActionConsts = require("../../../main/eventConsts/rendererActionConsts");

var _mainActionConsts = require("../../../main/eventConsts/mainActionConsts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RendererEventListener = exports.RendererEventListener = function () {
    function RendererEventListener(controller) {
        _classCallCheck(this, RendererEventListener);

        this.controller = controller;
        this.setRendererEventListeners();
    }

    _createClass(RendererEventListener, [{
        key: "addActionOnEvent",
        value: function addActionOnEvent(event, action) {
            this.controller.ipc.on(event, action);
        }
    }, {
        key: "setRendererEventListeners",
        value: function setRendererEventListeners() {
            this.addActionOnEvent(_rendererActionConsts.consts.GET_CURRENT_ACTIVE_NETWORK, this.onGetCurrentActiveNetworkHandler.bind(this));
            this.addActionOnEvent(_rendererActionConsts.consts.CHANGE_ACTIVE_NETWORK, this.onChangeActiveNetworkHandler.bind(this));
            this.addActionOnEvent(_rendererActionConsts.consts.CREATE_NEW_ACTIVE_NETWORK, this.onCreateNewActiveNetworkHandler.bind(this));
        }
    }, {
        key: "onGetCurrentActiveNetworkHandler",
        value: function onGetCurrentActiveNetworkHandler(event, filePath) {
            event.sender.send(_mainActionConsts.consts.SAVE_CURRENT_NETWORK, [this.controller.networkExporter.getSerializedNetwork(this.controller.network), filePath]);
        }
    }, {
        key: "onChangeActiveNetworkHandler",
        value: function onChangeActiveNetworkHandler(event, serializedNetwork) {
            this.controller.setCurrentNetwork(this.controller.networkImporter.NetworkCreationObject(serializedNetwork));
        }
    }, {
        key: "onCreateNewActiveNetworkHandler",
        value: function onCreateNewActiveNetworkHandler(event) {
            this.controller.destroyCurrentNetwork();
            event.sender.send(_mainActionConsts.consts.NEW_FILE_CREATION);
        }
    }]);

    return RendererEventListener;
}();