import {NetworkController} from "./network/networkController";
import {getNetworkCreationObject} from "./network/networkCreationObject";
import {InfoController} from "./info/infoController";

const containerID = 'network';

const NODES = [
    {id: 1, label: "Node 1"},
    {id: 2, label: "Node 2"},
    {id: 3, label: "Node 3"}
];

const EDGES = [
    {from: 1, to: 2},
    {from: 2, to: 1},
];

const network = getNetworkCreationObject(NODES, EDGES);
const networkController = new NetworkController(network);
const infoController = new InfoController(networkController)
networkController.setInfoCallback(infoController.getUpdateCallback())
networkController.applyInfoCallback()




