"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNetworkCreationObject = undefined;

var _visNetwork = require("../../../libs/vis-network");

var getNetworkCreationObject = exports.getNetworkCreationObject = function getNetworkCreationObject(nodesArray, edgesArray) {
    return {
        container: document.getElementById('network'),
        data: { nodes: new _visNetwork.DataSet(nodesArray), edges: new _visNetwork.DataSet(edgesArray) },
        saveData: { nodes: nodesArray, edges: edgesArray }
    };
};