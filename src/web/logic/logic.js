// create an array with nodes
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

let nodes = new vis.DataSet(NODES);
let edges = new vis.DataSet(EDGES);


let container = document.getElementById("network");
let data = {
    nodes: NODES,
    edges: EDGES
};
let network = new vis.Network(container, data, OPTIONS);
