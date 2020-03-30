"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visNetwork = require("./../../../libs/vis-network");

var _networkExporter = require("./networkExporter");

var _rendererEventListener = require("./rendererEventListener");

var _networkImporter = require("./networkImporter");

var _electron = require("electron");

var _networkInitOptions = require("./networkInitOptions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dialogs = require('dialogs');
var Dialogs = dialogs();

var NetworkController = exports.NetworkController = function () {
    function NetworkController(networkCreationObject) {
        _classCallCheck(this, NetworkController);

        this.ipc = _electron.ipcRenderer;
        this.networkExporter = _networkExporter.NetworkExporter;
        this.networkImporter = _networkImporter.NetworkImporter;
        this.network = undefined;
        if (networkCreationObject) {
            this.network = new _visNetwork.Network(networkCreationObject.container, networkCreationObject.data, _networkInitOptions.OPTIONS);
        }
        this.networkCreationObject = networkCreationObject;
        this.eventListener = new _rendererEventListener.RendererEventListener(this);
        this.setDocumentEventListeners();
        this.setInteractionEventListeners();
        this.eventListener.startMonitoring();
    }

    _createClass(NetworkController, [{
        key: "destroyCurrentNetwork",
        value: function destroyCurrentNetwork() {
            try {
                this.network.destroy();
            } catch (e) {
                // It's ok
            } finally {
                this.network = undefined;
            }
        }
    }, {
        key: "setCurrentNetwork",
        value: function setCurrentNetwork(networkCreationObject) {
            this.destroyCurrentNetwork();
            this.network = new _visNetwork.Network(networkCreationObject.container, networkCreationObject.data, _networkInitOptions.OPTIONS);
            this.setInteractionEventListeners();
        }
    }, {
        key: "setInteractionEventListeners",
        value: function setInteractionEventListeners() {
            var _this = this;

            this.network.on('doubleClick', function (params) {
                var e = params.event.srcEvent;
                _this.network.releaseNode();
                if (params.nodes.length === 0 && params.edges.length === 0) {
                    _this.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, false);
                } else if (params.nodes.length !== 0) {
                    _this.initEditNode(params.nodes[0]);
                }
            });

            this.network.on('oncontext', function (params) {
                console.log(params);
                _this.initDeleteNode(params.nodes[0]);
            });

            this.network.on('click', function (params) {
                _this.network.releaseNode();
                var e = params.event.srcEvent;
                if (e.ctrlKey || e.metaKey) _this.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, true);
            });
        }
    }, {
        key: "setDocumentEventListeners",
        value: function setDocumentEventListeners() {
            var _this2 = this;

            document.addEventListener('keydown', function (params) {
                if (params.key === 'Shift') {
                    _this2.network.addEdgeMode();
                }
            });

            document.addEventListener('keyup', function (params) {
                if (params.key === 'Shift') {
                    _this2.network.disableEditMode();
                }
            });

            document.addEventListener('keydown', function (params) {
                if (params.key === 'Backspace') {
                    _this2.initDeleteNode(_this2.network.getSelectedNodes()[0]);
                }
            });
        }
    }, {
        key: "initDeleteNode",
        value: function initDeleteNode(nodeId) {
            this.__removeNode(nodeId);
        }
    }, {
        key: "initEditNode",
        value: function initEditNode(nodeId) {
            var _this3 = this;

            Dialogs.prompt('Input node\'s new value: ', function (newValue) {
                if (newValue !== undefined) {
                    _this3.__editNode(nodeId, newValue);
                }
            });
        }
    }, {
        key: "initAddNode",
        value: function initAddNode(x, y, emptyNode) {
            var _this4 = this;

            var node = {};
            var id = (Math.random() * 1e7).toString(32);
            if (!emptyNode) Dialogs.prompt('Input new node value: ', function (value) {
                if (value !== undefined) {
                    node.id = id;
                    node.label = value;
                    node.x = x;
                    node.y = y;
                    _this4.__addNode(node);
                }
            });else {
                this.__addNode({ id: id, x: x, y: y });
            }
        }
    }, {
        key: "__addNode",
        value: function __addNode(node) {
            this.network.body.data.nodes.add(node);
        }
    }, {
        key: "__editNode",
        value: function __editNode(nodeId, newValue) {
            this.network.body.data.nodes.update({ id: nodeId, label: newValue });
        }
    }, {
        key: "__removeNode",
        value: function __removeNode(nodeId) {
            this.network.body.data.nodes.remove({ id: nodeId });
        }
    }]);

    return NetworkController;
}();