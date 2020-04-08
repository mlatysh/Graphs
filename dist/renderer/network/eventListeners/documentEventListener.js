'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DocumentEventListener = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visNetwork = require('../../../../libs/vis-network');

var vis = _interopRequireWildcard(_visNetwork);

var _colors = require('../colors');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentEventListener = exports.DocumentEventListener = function () {
    function DocumentEventListener(parent) {
        _classCallCheck(this, DocumentEventListener);

        this.parent = parent;
        this.isArrowing = false;
        this.addEventListeners();
    }

    _createClass(DocumentEventListener, [{
        key: 'addEventListeners',
        value: function addEventListeners() {
            document.addEventListener('dblclick', this.onDoubleClick.bind(this));
            document.addEventListener('contextmenu', this.onContext.bind(this));
            document.addEventListener('keyup', this.onKeyUp.bind(this));
            document.addEventListener('keydown', this.onKeyDown.bind(this));
            document.addEventListener('click', this.onClick.bind(this));
        }
    }, {
        key: 'onDoubleClick',
        value: function onDoubleClick(params) {
            this.parent.network.releaseNode();
            var coordinates = this.parent.network.DOMtoCanvas({ x: params.x, y: params.y });
            var nodes = this.parent.network.getNodeAt(this.parent.network.canvasToDOM(coordinates));
            var edges = this.parent.network.getEdgeAt(this.parent.network.canvasToDOM(coordinates));
            if (!nodes && !edges) this.parent.eventInitializer.initAddNode(coordinates.x, coordinates.y, false);else if (nodes) this.parent.eventInitializer.initEditNode(nodes);
        }
    }, {
        key: 'onContext',
        value: function onContext(params) {
            this.parent.eventInitializer.initDeletion(this.parent.network.getSelection());
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(params) {
            if (params.shiftKey && !params.metaKey) {
                this.parent.network.disableEditMode();
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(params) {
            var _this = this;

            if (params.code === 'KeyS' && !params.metaKey) {
                var selected = this.parent.network.getSelectedEdges();
                if (selected.length) {
                    selected.forEach(function (edge) {
                        var fullEdge = _this.parent.network.body.data.edges.get(edge);
                        _this.parent.network.body.data.edges.update({
                            id: edge,
                            from: fullEdge.to,
                            to: fullEdge.from
                        });
                    });
                }
                this.parent.network.redraw();
            }

            if (params.code === 'KeyT' && !params.metaKey) {
                var _selected = this.parent.network.getSelectedEdges();
                if (_selected.length) {
                    _selected.forEach(function (edge) {
                        var to = _this.parent.network.body.edges[edge].options.arrows.to;
                        to.enabled = !to.enabled;
                    });
                }
                this.parent.network.redraw();
            }

            if (params.key === 'Backspace' && !params.metaKey) {
                this.parent.eventInitializer.initDeletion(this.parent.network.getSelection());
            }

            if (params.shiftKey && !params.metaKey) {
                this.parent.network.addEdgeMode();
            }

            if (params.code === 'KeyC' && !params.metaKey) {
                var prompt = require('electron-prompt');
                prompt({
                    title: 'Prompt example',
                    label: 'URL:',
                    selectOptions: {
                        yellow: 'yellow',
                        blue: 'blue',
                        green: 'green',
                        orange: 'orange',
                        red: 'red'
                    },
                    // alwaysOnTop: true,
                    type: 'select'
                }).then(function (r) {
                    var selection = _this.parent.network.getSelection();
                    var color = r.toUpperCase();
                    var col = _colors.COLORS[color];
                    selection.nodes.forEach(function (nodeId) {
                        _this.parent.network.body.data.nodes.update({ id: nodeId, color: col, chosen: false });
                    });
                }).catch(console.error);
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(params) {
            this.parent.network.releaseNode();
            var coordinates = this.parent.network.DOMtoCanvas({ x: params.x, y: params.y });
            if (params.shiftKey && !this.parent.network.getNodeAt({ x: params.x, y: params.y })) this.parent.eventInitializer.initAddNode(coordinates.x, coordinates.y, true);
        }
    }]);

    return DocumentEventListener;
}();