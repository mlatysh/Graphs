"use strict";
exports.__esModule = true;
var _ = require("lodash");
exports.SquareMatrix = (function () {
    function class_1(matrix) {
        this.matrix = _.cloneDeep(matrix);
    }
    class_1.removeEmptyCrosses = function (matrix) {
        var mat = matrix.getCopy();
        var needToBeShifted = [];
        var size = mat.getSize();
        for (var i = 0; i < size; i++) {
            var emptyLine = true;
            var emptyColumn = true;
            for (var j = 0; j < size; j++) {
                if (mat.get([i, j]) !== 0) {
                    emptyLine = false;
                    break;
                }
            }
            for (var j = 0; j < size; j++) {
                if (mat.get([j, i]) !== 0) {
                    emptyColumn = false;
                }
            }
            if (emptyLine && emptyColumn) {
                needToBeShifted.push(i);
            }
        }
        needToBeShifted.forEach(function (cross) {
            for (var i = 0; i < mat.getSize(); i++) {
                mat.remove([i, cross]);
            }
            mat.removeRow(cross);
            for (var i = 0; i < needToBeShifted.length; i++) {
                needToBeShifted[i]--;
            }
        });
        return mat;
    };
    class_1.setOnesToDiagonal = function (matrix) {
        var size = matrix.getSize();
        var arr = matrix.getCopy();
        for (var i = 0; i < size; i++) {
            arr.set(1, [i, i]);
        }
        return arr;
    };
    class_1.getZeroMatrix = function (size) {
        var mainArray = [];
        for (var i = 0; i < size; i++) {
            mainArray.push([]);
            for (var j = 0; j < size; j++) {
                mainArray[i].push(0);
            }
        }
        return new exports.SquareMatrix(mainArray);
    };
    class_1.changeValuesToOnes = function (matrix) {
        var mat = matrix.getCopy();
        var size = mat.getSize();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (mat.get([i, j]) > 0)
                    mat.set(1, [i, j]);
            }
        }
        return mat;
    };
    class_1.prototype.get = function (position) {
        try {
            return this.matrix[position[0]][position[1]];
        }
        catch (e) {
            return false;
        }
    };
    class_1.prototype.set = function (value, position) {
        try {
            this.matrix[position[0]][position[1]] = value;
        }
        catch (e) {
            return false;
        }
        return true;
    };
    class_1.prototype.getSize = function () {
        return this.matrix.length;
    };
    class_1.prototype.getCopy = function () {
        return new exports.SquareMatrix(this.matrix);
    };
    class_1.prototype.remove = function (position) {
        try {
            this.matrix[position[0]].splice(position[1], 1);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    class_1.prototype.removeRow = function (index) {
        try {
            this.matrix.splice(index, 1);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    class_1.prototype.getCrossSum = function (index) {
        var size = this.getSize();
        var sum = 0;
        for (var i = 0; i < size; i++) {
            sum += this.get([i, index]);
            sum += this.get([index, i]);
        }
        return sum;
    };
    class_1.prototype.isSymmetric = function () {
        var size = this.getSize();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < i; j++) {
                if (this.get([i, j]) !== this.get([j, i]))
                    return false;
            }
        }
        return true;
    };
    return class_1;
}());
