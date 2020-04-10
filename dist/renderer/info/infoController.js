'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InfoController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graph = require('../graphWorker/graph');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoController = exports.InfoController = function () {
    function InfoController(networkController) {
        _classCallCheck(this, InfoController);

        this.leftDOMElement = document.getElementById('info-left');
        this.rightDOMElement = document.getElementById('info-right');
        this.updateCallback = this.updateState.bind(this);
        this.networkController = networkController;
    }

    _createClass(InfoController, [{
        key: 'getUpdateCallback',
        value: function getUpdateCallback() {
            return this.updateCallback;
        }
    }, {
        key: 'updateState',
        value: function updateState() {
            this.updateLeft(this.networkController.getNetwork());
            this.updateRight(this.networkController.getNetwork());
        }
    }, {
        key: 'updateLeft',
        value: function updateLeft(network) {
            var nodes = network.body.data.nodes;
            var totalNodes = 0;
            nodes.forEach(function (node) {
                if (typeof node.id !== 'string') totalNodes++;
                if (typeof node.id === 'string' && !node.id.startsWith('edgeId:')) totalNodes++;
            });
            var totalEdges = Object.keys(network.body.edges).length;
            var connected = new _graph.Graph(this.networkController.getNetwork()).isConnected();
            this.leftDOMElement.innerText = 'Nodes amount: ' + totalNodes + '\nEdges amount: ' + totalEdges + '\n\n' + ('Connected: ' + connected);
        }
    }, {
        key: 'updateRight',
        value: function updateRight(network) {
            var selectedNodes = network.getSelectedNodes();
            var rez = 'Edit mode: ' + network.manipulation.editMode + '\n\n';
            if (selectedNodes.length === 1) {
                var degree = network.getConnectedEdges(selectedNodes[0]).length;
                rez += 'Selected vertex degree: ' + degree;
            }
            this.rightDOMElement.innerText = rez;
        }
    }]);

    return InfoController;
}();