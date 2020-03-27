import {NetworkController} from "./network/networkController";
import {getNetworkCreationObject} from "./network/networkCreationObject";

const containerID = 'network';

const NODES = [
    {id: 1, label: "Node 1"},
    {id: 2, label: "Node 2"},
    {id: 3, label: "Node 3"},
    {id: 4, label: "Node 4"},
    {id: 5, label: "Node 5"}
];

const EDGES = [
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
];

const OPTIONS = {
    autoResize: true,
    clickToUse: false
};
const network = getNetworkCreationObject(containerID, NODES, EDGES, OPTIONS);
const controller = new NetworkController(network);


