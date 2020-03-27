import {getNetworkCreationObject} from "./networkCreationObject";

// function getNodeById(data, id) {
//     for (let n = 0; n < data.length; n++) {
//         if (data[n].id == id) {
//             return data[n];
//         }
//     }
// }
//
// function getNodeData(data) {
//     const networkNodes = [];
//     data.forEach(function(elem, index, array) {
//         networkNodes.push({ id: elem.id, label: elem.id, x: elem.x, y: elem.y });
//     });
//     return networkNodes;
// }
//
// function getEdgeData(data) {
//     const networkEdges = [];
//     data.forEach(function(node) {
//         node.connections.forEach(function(connId, cIndex, conns) {
//             networkEdges.push({ from: node.id, to: connId });
//             const cNode = getNodeById(data, connId);
//             const elementConnections = cNode.connections;
//             const duplicateIndex = elementConnections.findIndex(function(connection) {
//                 return connection == node.id;
//             });
//             if (duplicateIndex != -1) {
//                 elementConnections.splice(duplicateIndex, 1);
//             }
//         });
//     });
//     return networkEdges;
// }

const getNodeData = (data) => {
    return data.nodes
};

const getEdgesData = (data) => {
    return data.edges
};


export class NetworkImporter {
    static getNetworkCreationObject(serializedNetwork) {
        return getNetworkCreationObject('network',
            getNodeData(serializedNetwork),
            getEdgesData(serializedNetwork));
    }
}
