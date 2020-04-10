'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Graph = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mathjs = require('mathjs');

var math = _interopRequireWildcard(_mathjs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = exports.Graph = function () {
    function Graph(network) {
        var _this = this;

        _classCallCheck(this, Graph);

        this.edgesIds = [];
        this.nodesIds = [];
        network.body.data.nodes.forEach(function (node) {
            if (typeof node.id === 'string' && !node.id.startsWith('edgeId:')) _this.nodesIds.push(node.id);
            if (typeof node.id !== 'string') _this.nodesIds.push(node.id);
        });
        Object.keys(network.body.edges).forEach(function (edge) {
            _this.edgesIds.push(edge);
        });
        try {
            this.__builtMatrix(network);
        } catch (e) {
            this.matrix = math.matrix([]);
        }
    }

    _createClass(Graph, [{
        key: '__getNodeById',
        value: function __getNodeById(id, network) {
            var nodes = network.body.nodes;
            var edges = network.body.edges;
            var exactNode = undefined;
            for (var node in nodes) {
                if (nodes.hasOwnProperty(node) && nodes[node].id === id) {
                    exactNode = nodes[node];
                    break;
                }
            }
            var doneEdges = [];
            exactNode.edges.forEach(function (edge) {
                if (edge.fromId === exactNode.id) doneEdges.push({
                    id: edge.id,
                    from: edge.fromId,
                    to: edge.toId,
                    arrowed: edge.options.arrows.to.enabled
                });
            });
            return {
                node: exactNode,
                edges: doneEdges
            };
        }
    }, {
        key: '__findIndexByLineAndColumn',
        value: function __findIndexByLineAndColumn(line, column, matrix) {
            var size = matrix.size()[0];
            var lineIndex = undefined;
            var columnIndex = undefined;
            for (var i = 1; i < size; i++) {
                if (matrix.get([i, 0]) === line) lineIndex = i;
                if (matrix.get([0, i]) === column) columnIndex = i;
            }
            return [lineIndex, columnIndex];
        }
    }, {
        key: '__builtMatrix',
        value: function __builtMatrix(network) {
            var _this2 = this;

            var nodes = [];
            var size = this.nodesIds.length + 1;
            var matrix = math.zeros(size, size);
            for (var i = 1; i < size; i++) {
                matrix.set([0, i], this.nodesIds[i - 1]);
                matrix.set([i, 0], this.nodesIds[i - 1]);
            }
            this.nodesIds.forEach(function (nodeId) {
                nodes.push(_this2.__getNodeById(nodeId, network));
            });
            nodes.forEach(function (node) {
                node.edges.forEach(function (edge) {
                    var indexes = _this2.__findIndexByLineAndColumn(edge.from, edge.to, matrix);
                    var value = matrix.get(indexes);
                    if (edge.arrowed) {
                        matrix.set(indexes, value + 1);
                    } else {
                        matrix.set(indexes, value + 1);
                        indexes = [indexes[1], indexes[0]];
                        value = matrix.get(indexes);
                        matrix.set(indexes, value + 1);
                    }
                });
            });
            this.matrix = matrix;
        }
    }, {
        key: 'getMatrix',
        value: function getMatrix() {
            return this.matrix;
        }
    }, {
        key: 'isConnected',
        value: function isConnected() {
            console.log(this.getValuesMatrix());
            return Graph.checkConnections(Graph.setOnesToDiagonal(this.getValuesMatrix()));
        }
    }, {
        key: 'getValuesMatrix',
        value: function getValuesMatrix() {
            var matrix = this.matrix.clone().toArray();
            matrix.shift();
            for (var i = 0; i < matrix.length; i++) {
                matrix[i].splice(0, 1);
            }
            return matrix;
        }
    }], [{
        key: 'setOnesToDiagonal',
        value: function setOnesToDiagonal(array) {
            var size = array.length;
            var arr = array.slice();
            for (var i = 0; i < size; i++) {
                arr[i][i] = 1;
            }
            return arr;
        }
    }, {
        key: 'checkConnections',
        value: function checkConnections(matrix) {
            var size = matrix.length;
            var rez = Graph.matrixPow(size, matrix);
            if (!rez) return undefined;
            var connected = true;
            rez.forEach(function (line) {
                line.forEach(function (element) {
                    if (element <= 0) {
                        connected = false;
                        return connected;
                    }
                });
            });
            return connected;
        }
    }, {
        key: 'multiplyMatrix',
        value: function multiplyMatrix(matrixA, matrixB) {
            var rowsA = matrixA.length,
                colsA = matrixA[0].length,
                rowsB = matrixB.length,
                colsB = matrixB[0].length,
                rezMatrix = [];
            if (colsA !== rowsB) return false;
            for (var i = 0; i < rowsA; i++) {
                rezMatrix[i] = [];
            }for (var k = 0; k < colsB; k++) {
                for (var _i = 0; _i < rowsA; _i++) {
                    var t = 0;
                    for (var j = 0; j < rowsB; j++) {
                        t += matrixA[_i][j] * matrixB[j][k];
                    }rezMatrix[_i][k] = t;
                }
            }
            return rezMatrix;
        }
    }, {
        key: 'matrixPow',
        value: function matrixPow(pow, matrix) {
            if (pow === 0) return undefined;
            if (pow === 1) return matrix;else return this.multiplyMatrix(matrix, Graph.matrixPow(pow - 1, matrix));
        }
    }]);

    return Graph;
}();