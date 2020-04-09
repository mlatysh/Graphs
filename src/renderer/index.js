import {NetworkController} from "./network/networkController";
import {getNetworkCreationObject} from "./network/networkCreationObject";
import {InfoController} from "./info/infoController";
import {Graph} from "./graphWorker/graph";

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
const controller = new NetworkController(network);
const informator = new InfoController(controller);
document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyB')
        console.log(Graph.checkConnections(Graph.setOnesToDiagonal(new Graph(controller.getNetwork()).getValuesMatrix())))
})



