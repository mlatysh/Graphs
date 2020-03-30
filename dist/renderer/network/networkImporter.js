"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkImporter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _networkCreationObject = require("./networkCreationObject");

var _nodeCreator = require("./primitiveElements/nodeCreator");

var _edgeCreator = require("./primitiveElements/edgeCreator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkImporter = exports.NetworkImporter = function () {
    function NetworkImporter() {
        _classCallCheck(this, NetworkImporter);
    }

    _createClass(NetworkImporter, null, [{
        key: "NetworkCreationObject",
        value: function NetworkCreationObject(serializedNetwork) {
            var edges = [];
            var nodes = [];
            serializedNetwork.forEach(function (element) {
                switch (element.type) {
                    case 'node':
                        {
                            nodes.push(_nodeCreator.NodeCreator.getReadyForUseNode(element));
                            break;
                        }
                    case 'edge':
                        {
                            edges.push(_edgeCreator.EdgeCreator.getReadyForUseEdge(element));
                            break;
                        }

                }
            });
            return (0, _networkCreationObject.getNetworkCreationObject)(nodes, edges);
        }
    }]);

    return NetworkImporter;
}();