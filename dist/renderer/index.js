"use strict";

var _networkController = require("./network/networkController");

var _networkCreationObject = require("./network/networkCreationObject");

var containerID = 'network';

var NODES = [{ id: 1, label: "Node 1" }];

var EDGES = [{ from: 1, to: 1 }];

var network = (0, _networkCreationObject.getNetworkCreationObject)(NODES, EDGES);
var controller = new _networkController.NetworkController(network);