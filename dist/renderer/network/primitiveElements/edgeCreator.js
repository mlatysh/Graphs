'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EdgeCreator = exports.EdgeCreator = function () {
    function EdgeCreator() {
        _classCallCheck(this, EdgeCreator);
    }

    _createClass(EdgeCreator, null, [{
        key: 'getSerializedEdge',
        value: function getSerializedEdge(edgeObject) {
            return {
                type: 'edge',
                id: edgeObject.id,
                from: edgeObject.from.id,
                to: edgeObject.to.id
            };
        }
    }, {
        key: 'getReadyForUseEdge',
        value: function getReadyForUseEdge(serializedEdge) {
            return {
                id: serializedEdge.id,
                from: serializedEdge.from,
                to: serializedEdge.to
            };
        }
    }]);

    return EdgeCreator;
}();