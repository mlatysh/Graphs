"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Grpah = undefined;

var _nodeCreator = require("../network/IO operator/primitiveElements/nodeCreator");

var _edgeCreator = require("../network/IO operator/primitiveElements/edgeCreator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const totalNodes = network.body.data.nodes.length
// const totalEdges = Object.keys(network.body.edges).length


var Grpah = exports.Grpah = function Grpah(network) {
    var _this = this;

    _classCallCheck(this, Grpah);

    this.edges = [];
    this.nodes = [];
    network.body.data.nodes.forEach(function (node) {
        _this.nodes.push(node.id);
    });
    Object.keys(network.body.edges).forEach(function (edge) {
        _this.edges.push(edge);
    });
    console.log(this.nodes, this.edges);
};