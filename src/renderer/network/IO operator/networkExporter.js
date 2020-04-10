import {NodeCreator} from "./primitiveElements/nodeCreator";
import {EdgeCreator} from "./primitiveElements/edgeCreator";

export class NetworkExporter {
    static getSerializedNetwork(network) {
        const serializedNetwork = [];
        const nodes = network.body.nodes;
        const edges = network.body.edges;
        for (const nodeKey in nodes) {
           if (nodes.hasOwnProperty(nodeKey)) {
             serializedNetwork.push(NodeCreator.getSerializedNode(nodes[nodeKey]))
           }
        }
        for (const edgeKey in edges) {
            if (edges.hasOwnProperty(edgeKey)){
                serializedNetwork.push(EdgeCreator.getSerializedEdge(edges[edgeKey]))
            }
        }
        return serializedNetwork
    }
}
