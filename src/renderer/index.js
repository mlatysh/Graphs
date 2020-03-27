import {NetworkController} from "./network/networkController";
import {getNetworkCreationObject} from "./network/networkCreationObject";

const containerID = 'network';

const NODES = [
    {id: 1, label: "Node 1"},
];

const EDGES = [
    {from: 1, to: 1},
];

const network = getNetworkCreationObject(containerID, NODES, EDGES);
const controller = new NetworkController(network);


