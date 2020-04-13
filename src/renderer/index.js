import {NetworkController} from "./network/networkController";
import {getNetworkCreationObject} from "./network/networkCreationObject";
import {InfoController} from "./info/infoController";
import {Graph} from "./graphWorker/graph";

const containerID = 'network';

const NODES = [
    {id: 'abc', label: "Node 1"},
    {id: 'bcd', label: "Node 2"},
    {id: 'cde', label: "Node 3"}
];

const EDGES = [
    {from: 'abc', to: 'bcd'},
    {from: 'bcd', to: 'abc'},
];

const network = getNetworkCreationObject(NODES, EDGES);
const networkController = new NetworkController(network);
const infoController = new InfoController(networkController)
networkController.setInfoCallback(infoController.getUpdateCallback())
networkController.applyInfoCallback()
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyB') {
        const matrix =Graph.setOnesToDiagonal(new Graph(networkController.getNetwork()).getValuesMatrix())
        console.log(matrix)
        console.log(Graph.matrixPow(matrix.length, matrix))
    }
})




