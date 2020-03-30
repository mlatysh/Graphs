'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeCreator = exports.NodeCreator = function () {
    function NodeCreator() {
        _classCallCheck(this, NodeCreator);
    }

    _createClass(NodeCreator, null, [{
        key: 'getSerializedNode',
        value: function getSerializedNode(nodeObject) {
            return {
                type: 'node',
                id: nodeObject.id,
                label: nodeObject.options.label
            };
        }
    }, {
        key: 'getReadyForUseNode',
        value: function getReadyForUseNode(serializedNode) {
            return {
                id: serializedNode.id,
                label: serializedNode.label
            };
        }
    }]);

    return NodeCreator;
}();