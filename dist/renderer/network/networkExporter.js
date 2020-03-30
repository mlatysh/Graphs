"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkExporter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeCreator = require("./primitiveElements/nodeCreator");

var _edgeCreator = require("./primitiveElements/edgeCreator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkExporter = exports.NetworkExporter = function () {
    function NetworkExporter() {
        _classCallCheck(this, NetworkExporter);
    }

    _createClass(NetworkExporter, null, [{
        key: "getSerializedNetwork",
        value: function getSerializedNetwork(network) {
            var serializedNetwork = [];
            var nodes = network.body.nodes;
            var edges = network.body.edges;
            for (var nodeKey in nodes) {
                if (nodes.hasOwnProperty(nodeKey)) {
                    serializedNetwork.push(_nodeCreator.NodeCreator.getSerializedNode(nodes[nodeKey]));
                }
            }
            for (var edgeKey in edges) {
                if (edges.hasOwnProperty(edgeKey)) {
                    serializedNetwork.push(_edgeCreator.EdgeCreator.getSerializedEdge(edges[edgeKey]));
                }
            }
            return serializedNetwork;
        }
    }]);

    return NetworkExporter;
}();