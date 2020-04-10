"use strict";

var _networkController = require("./network/networkController");

var _networkCreationObject = require("./network/networkCreationObject");

var _infoController = require("./info/infoController");

var containerID = 'network';

var NODES = [{ id: 1, label: "Node 1" }, { id: 2, label: "Node 2" }, { id: 3, label: "Node 3" }];

var EDGES = [{ from: 1, to: 2 }, { from: 2, to: 1 }];

var network = (0, _networkCreationObject.getNetworkCreationObject)(NODES, EDGES);
var networkController = new _networkController.NetworkController(network);
var infoController = new _infoController.InfoController(networkController);
networkController.addInfoCallback(infoController.getUpdateCallback());