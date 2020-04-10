'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DocumentEventListener = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('../consts/colors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentEventListener = exports.DocumentEventListener = function () {
    function DocumentEventListener(parent) {
        _classCallCheck(this, DocumentEventListener);

        this.parent = parent;
        this.eventListeners = {
            onDoubleClick: this.onDoubleClick.bind(this),
            onContext: this.onContext.bind(this),
            onKeyDown: this.onKeyDown.bind(this)
        };
        this.callbacks = {
            setter: this.addEventListeners,
            remover: this.removeEventListeners
        };
        this.addEventListeners(this.eventListeners);
    }

    _createClass(DocumentEventListener, [{
        key: 'removeEventListeners',
        value: function removeEventListeners(eventListeners) {
            document.removeEventListener('dblclick', eventListeners.onDoubleClick);
            document.removeEventListener('contextmenu', eventListeners.onContext);
            document.removeEventListener('keydown', eventListeners.onKeyDown);
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners(eventListeners) {
            document.addEventListener('dblclick', eventListeners.onDoubleClick);
            document.addEventListener('contextmenu', eventListeners.onContext);
            document.addEventListener('keydown', eventListeners.onKeyDown);
        }
    }, {
        key: 'onDoubleClick',
        value: function onDoubleClick(params) {
            this.parent.network.releaseNode();
            var coordinates = this.parent.network.DOMtoCanvas({ x: params.x, y: params.y });
            var nodes = this.parent.network.getNodeAt(this.parent.network.canvasToDOM(coordinates));
            var edges = this.parent.network.getEdgeAt(this.parent.network.canvasToDOM(coordinates));

            if (!nodes && !edges) this.parent.eventInitializer.initAddNode(coordinates.x, coordinates.y, false, this.callbacks, this.eventListeners);else if (nodes) this.parent.eventInitializer.initEditNode(nodes, this.callbacks, this.eventListeners);
        }
    }, {
        key: 'onContext',
        value: function onContext(params) {
            var selectedNodes = this.parent.network.getSelectedNodes();
            if (selectedNodes.length === 1) this.parent.network.focus(selectedNodes[0], { animation: true });else this.parent.network.fit({ animation: true });
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(params) {
            var _this = this;

            if (params.code === 'KeyS' && !params.metaKey) {
                var selected = this.parent.network.getSelectedEdges();
                if (selected.length) {
                    selected.forEach(function (edge) {
                        var edgeObject = _this.parent.network.body.edges[edge];
                        if (edgeObject.options.arrows.to.enabled) _this.parent.network.body.data.edges.update({
                            id: edge,
                            from: edgeObject.toId,
                            to: edgeObject.fromId,
                            arrows: edgeObject.options.arrows
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
                this.parent.eventInitializer.initDeletion(this.parent.network.getSelection(), this.callbacks, this.eventListeners);
            }

            if (params.shiftKey && !params.metaKey) {
                if (this.parent.network.manipulation.editMode) this.parent.network.disableEditMode();else this.parent.network.addEdgeMode();
            }

            if (params.code === 'KeyC' && !params.metaKey) {
                var selection = this.parent.network.getSelection();
                if (selection.nodes.length || selection.edges.length) {
                    var prompt = require('electron-prompt');
                    prompt({
                        title: 'Choose color',
                        label: 'Color: ',
                        selectOptions: {
                            yellow: 'yellow',
                            blue: 'blue',
                            green: 'green',
                            orange: 'orange',
                            red: 'red'
                        },
                        alwaysOnTop: true,
                        type: 'select'
                    }).then(function (r) {
                        if (!r) return;
                        var selection = _this.parent.network.getSelection();
                        var color = r.toUpperCase();
                        var col = _colors.COLORS[color];
                        selection.nodes.forEach(function (nodeId) {
                            _this.parent.network.body.data.nodes.update({ id: nodeId, color: col });
                        });
                        selection.edges.forEach(function (edgeId) {
                            _this.parent.network.body.data.edges.update({
                                id: edgeId,
                                color: {
                                    color: col.border,
                                    hover: col.hover.border,
                                    highlight: col.highlight.border
                                }
                            });
                        });
                        _this.parent.network.redraw();
                    }).catch(console.error);
                }
            }
        }
    }]);

    return DocumentEventListener;
}();