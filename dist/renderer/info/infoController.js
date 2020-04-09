'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoController = exports.InfoController = function () {
    function InfoController(networkController) {
        _classCallCheck(this, InfoController);

        this.networkController = networkController;
        this.leftDOMElement = document.getElementById('info-left');
        this.rightDOMElement = document.getElementById('info-right');
        var upd = this.updateState.bind(this);
        document.addEventListener('keydown', upd);
        document.addEventListener('keyup', upd);
        document.addEventListener('click', upd);
        document.addEventListener('dblclick', upd);
        document.addEventListener('contextmenu', upd);
        this.updateState();
    }

    _createClass(InfoController, [{
        key: 'updateState',
        value: function updateState() {
            var network = this.networkController.getNetwork();
            this.updateLeft(network);
            this.updateRight(network);
        }
    }, {
        key: 'updateLeft',
        value: function updateLeft(network) {
            var totalNodes = network.body.data.nodes.length;
            var totalEdges = Object.keys(network.body.edges).length;
            this.leftDOMElement.innerText = 'Edges amount: ' + totalEdges + '\nNodes amount: ' + totalNodes + '\n\n';
        }
    }, {
        key: 'updateRight',
        value: function updateRight(network) {
            var selectedNodes = network.getSelectedNodes();
            if (selectedNodes.length === 1) {
                var degree = network.getConnectedEdges(selectedNodes[0]).length;
                this.rightDOMElement.innerText = 'Selected vertex degree: ' + degree;
            } else {
                this.rightDOMElement.innerText = '';
            }
        }
    }]);

    return InfoController;
}();