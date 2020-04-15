"use strict";
exports.__esModule = true;
var squareMatrix_1 = require("./squareMatrix");
exports.Graph = (function () {
    function class_1(matrix, type) {
        this.ids = this.getIdsFromMatrix(matrix);
        this.valuesMatrix = this.getMatrixWithoutIds(matrix);
        this.type = type;
        this.calcAllVertexesDegreesAreEven();
    }
    class_1.getReachabilityMatrix = function (matrix) {
        var mat = squareMatrix_1.SquareMatrix.changeValuesToOnes(matrix);
        var size = mat.getSize();
        var copyLineWithAddition = function (innerMatrix, indexRowFrom, indexRowWhere) {
            for (var i = 0; i < size; i++) {
                var taken = innerMatrix.get([indexRowFrom, i]);
                if (taken === 1)
                    innerMatrix.set(1, [indexRowWhere, i]);
            }
        };
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (mat.get([i, j]) === 1) {
                    copyLineWithAddition(mat, j, i);
                    break;
                }
            }
        }
        mat = squareMatrix_1.SquareMatrix.setOnesToDiagonal(mat);
        return mat;
    };
    class_1.checkConnectionsStrict = function (matrix) {
        return;
    };
    class_1.findIndexByRowAndColumnValue = function (rowValue, columnValue, matrix) {
        return;
    };
    class_1.getConnectivityFromNetwork = function (network) {
        var oriented = true;
        var disoriented = true;
        var state = undefined;
        Object.keys(network.body.edges).forEach(function (edge) {
            if (!network.body.edges[edge].options.arrows.to.enabled)
                oriented = false;
            if (network.body.edges[edge].options.arrows.to.enabled)
                disoriented = false;
        });
        if (oriented)
            state = 'directed';
        if (disoriented)
            state = 'not directed';
        if (!oriented && !disoriented)
            state = 'mixed';
        return state;
    };
    class_1.getMatrixFromNetwork = function (network) {
        var getNodeAndConnectedEdgesByNodeId = function (nodeId, network) {
            var nodes = network.body.nodes;
            var exactNode = undefined;
            for (var node in nodes) {
                if (nodes.hasOwnProperty(node)
                    && nodes[node].id === nodeId) {
                    exactNode = nodes[node];
                    break;
                }
            }
            var doneEdges = [];
            exactNode.edges.forEach(function (edge) {
                if (edge.fromId === exactNode.id)
                    doneEdges.push({
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
        };
        var findIndexesByRowAndColumnValue = function (rowValue, columnValue, matrix) {
            var size = matrix.getSize();
            var lineIndex = undefined;
            var columnIndex = undefined;
            for (var i = 1; i < size; i++) {
                if (matrix.get([i, 0]) === rowValue)
                    lineIndex = i;
                if (matrix.get([0, i]) === columnValue)
                    columnIndex = i;
            }
            if (lineIndex === undefined || columnIndex === undefined)
                return undefined;
            return [lineIndex, columnIndex];
        };
        var nodesIds = [];
        network.body.data.nodes.forEach(function (node) {
            if (typeof node.id === 'string' && !node.id.startsWith('edgeId:'))
                nodesIds.push(node.id);
            if (typeof node.id !== 'string')
                nodesIds.push(node.id);
        });
        var nodes = [];
        var amountOfNodes = nodesIds.length;
        var matrixSize = amountOfNodes + 1;
        var matrix = squareMatrix_1.SquareMatrix.getZeroMatrix(matrixSize);
        for (var i = 0, j = 1; i < amountOfNodes && j < matrixSize; i++, j++) {
            matrix.set(nodesIds[i], [0, j]);
            matrix.set(nodesIds[i], [j, 0]);
        }
        nodesIds.forEach(function (nodeId) {
            nodes.push(getNodeAndConnectedEdgesByNodeId(nodeId, network));
        });
        nodes.forEach(function (node) {
            node.edges.forEach(function (edge) {
                var indexes = findIndexesByRowAndColumnValue(edge.from, edge.to, matrix);
                var value = matrix.get(indexes);
                if (edge.arrowed) {
                    matrix.set(value + 1, indexes);
                }
                else {
                    matrix.set(value + 1, indexes);
                    value = matrix.get([indexes[1], indexes[0]]);
                    matrix.set(value + 1, [indexes[1], indexes[0]]);
                }
            });
        });
        return matrix;
    };
    class_1.prototype.getIdsFromMatrix = function (matrix) {
        var size = matrix.getSize();
        var ids = [];
        for (var i = 0; i < size; i++) {
            ids.push(matrix.get([i, 0]));
        }
        return ids;
    };
    class_1.prototype.getMatrixWithoutIds = function (matrix) {
        var size = matrix.getSize();
        var mat = matrix.getCopy();
        for (var i = 0; i < size; i++) {
            mat.remove([i, 0]);
        }
        mat.removeRow(0);
        return mat;
    };
    class_1.prototype.calcAllVertexesDegreesAreEven = function () {
        var size = this.valuesMatrix.getSize();
        var sum = 0;
        for (var i = 0; i < size; i++) {
            if (this.type === 'directed')
                sum += this.valuesMatrix.getCrossSum(i);
            if (this.type === 'not directed')
                sum += this.valuesMatrix.getCrossSum(i) / 2;
            if (this.type === 'mixed')
                return;
            var diagonalValue = this.valuesMatrix.get([i, i]);
            if (diagonalValue)
                sum += diagonalValue;
            if (sum % 2 !== 0) {
                this.allVertexesDegreesAreEven = false;
                return;
            }
        }
        this.allVertexesDegreesAreEven = true;
    };
    class_1.prototype.hasEulerCycle = function () {
        return false;
    };
    class_1.prototype.isConnected = function () {
        return;
    };
    class_1.prototype.getType = function () {
        return "";
    };
    return class_1;
}());
