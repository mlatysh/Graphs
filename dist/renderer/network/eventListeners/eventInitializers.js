'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dialogs = require('dialogs');
var Dialogs = dialogs();

var EventInitializer = exports.EventInitializer = function () {
    function EventInitializer(parent) {
        _classCallCheck(this, EventInitializer);

        this.parent = parent;
    }

    _createClass(EventInitializer, [{
        key: 'initDeletion',
        value: function initDeletion(selection, setterAndRemover, eventListeners) {
            var _this = this;

            setterAndRemover.remover(eventListeners);
            if (selection.nodes) selection.nodes.forEach(function (node) {
                _this.__removeNode(node);
            });
            if (selection.edges) selection.edges.forEach(function (edge) {
                _this.__removeEdge(edge);
            });
            setterAndRemover.setter(eventListeners);
        }
    }, {
        key: 'initEditNode',
        value: function initEditNode(nodeId, setterAndRemover, eventListeners) {
            var _this2 = this;

            setterAndRemover.remover(eventListeners);
            Dialogs.prompt('Input node\'s new value: ', function (newValue) {
                if (newValue !== undefined) {
                    _this2.__editNode(nodeId, newValue);
                }
                setterAndRemover.setter(eventListeners);
            });
        }
    }, {
        key: 'initAddNode',
        value: function initAddNode(x, y, emptyNode, setterAndRemover, eventListeners) {
            var _this3 = this;

            setterAndRemover.remover(eventListeners);
            var node = {};
            var id = (Math.random() * 1e7).toString(32);
            if (!emptyNode) Dialogs.prompt('Input new node value: ', function (value) {
                if (value !== undefined) {
                    node.id = id;
                    node.label = value;
                    node.x = x;
                    node.y = y;
                    _this3.__addNode(node);
                }
                setterAndRemover.setter(eventListeners);
            });else {
                this.__addNode({ id: id, x: x, y: y });
                setterAndRemover.setter(eventListeners);
            }
        }
    }, {
        key: '__addNode',
        value: function __addNode(node) {
            this.parent.network.body.data.nodes.add(node);
        }
    }, {
        key: '__editNode',
        value: function __editNode(nodeId, newValue) {
            this.parent.network.body.data.nodes.update({ id: nodeId, label: newValue });
        }
    }, {
        key: '__removeNode',
        value: function __removeNode(nodeId) {
            this.parent.network.body.data.nodes.remove({ id: nodeId });
        }
    }, {
        key: '__removeEdge',
        value: function __removeEdge(edgeId) {
            this.parent.network.body.data.edges.remove({ id: edgeId });
        }
    }]);

    return EventInitializer;
}();