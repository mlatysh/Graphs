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
        this.DOMElement = document.getElementById('info');
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
            var totalNodes = network.body.data.nodes.length;
            var totalEdges = Object.keys(network.body.edges).length;
            this.DOMElement.innerText = 'Edges amount: ' + totalEdges + '\nNodes amount: ' + totalNodes;
        }
    }]);

    return InfoController;
}();