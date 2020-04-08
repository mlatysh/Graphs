"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visNetwork = require("../../../libs/vis-network");

var _networkExporter = require("./IO operator/networkExporter");

var _rendererEventListener = require("./eventListeners/rendererEventListener");

var _networkImporter = require("./IO operator/networkImporter");

var _electron = require("electron");

var _networkInitOptions = require("./networkInitOptions");

var _documentEventListener = require("./eventListeners/documentEventListener");

var _interactionEventListener = require("./eventListeners/interactionEventListener");

var _eventInitializers = require("./eventInitializers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkController = exports.NetworkController = function () {
    function NetworkController(networkCreationObject) {
        _classCallCheck(this, NetworkController);

        this.ipc = _electron.ipcRenderer;
        this.networkCreationObject = networkCreationObject;
        this.init();
        this.networkExporter = _networkExporter.NetworkExporter;
        this.networkImporter = _networkImporter.NetworkImporter;
        this.eventInitializer = new _eventInitializers.EventInitializer(this);
        this.resetEventListeners();
    }

    _createClass(NetworkController, [{
        key: "init",
        value: function init() {
            this.networkCreationObject ? this.network = new _visNetwork.Network(this.networkCreationObject.container, this.networkCreationObject.data, _networkInitOptions.OPTIONS) : this.network = undefined;
        }
    }, {
        key: "resetEventListeners",
        value: function resetEventListeners() {
            this.rendererEventListener = new _rendererEventListener.RendererEventListener(this);
            this.documentEventListener = new _documentEventListener.DocumentEventListener(this);
            this.interactionEventListener = new _interactionEventListener.InteractionEventListener(this);
        }
    }, {
        key: "destroyCurrentNetwork",
        value: function destroyCurrentNetwork() {
            try {
                this.network.destroy();
            } catch (e) {} finally {
                this.network = undefined;
            }
        }
    }, {
        key: "setCurrentNetwork",
        value: function setCurrentNetwork(networkCreationObject) {
            this.destroyCurrentNetwork();
            this.network = new _visNetwork.Network(networkCreationObject.container, networkCreationObject.data, _networkInitOptions.OPTIONS);
            this.resetEventListeners();
        }
    }]);

    return NetworkController;
}();