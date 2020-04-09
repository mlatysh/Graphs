import {NetworkController} from "./network/networkController";
import {getNetworkCreationObject} from "./network/networkCreationObject";
import {InfoController} from "./info/infoController";

const containerID = 'network';

const NODES = [
    {id: 1, label: "Node 1"},
    {id:2, label: "Node 2"}
];

const EDGES = [
    {from: 1, to: 2},
];

const network = getNetworkCreationObject(NODES, EDGES);
const controller = new NetworkController(network);
const informator = new InfoController(controller);


