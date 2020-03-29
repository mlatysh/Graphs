import {getNetworkCreationObject} from "./networkCreationObject";
import {NodeCreator} from "./primitiveElements/nodeCreator";
import {EdgeCreator} from "./primitiveElements/edgeCreator";


export class NetworkImporter {
    static NetworkCreationObject(serializedNetwork) {
        const edges = [];
        const nodes = [];
        serializedNetwork.forEach((element) => {
            switch (element.type) {
                case 'node': {
                    nodes.push(NodeCreator.getReadyForUseNode(element));
                    break;
                }
                case 'edge': {
                    edges.push(EdgeCreator.getReadyForUseEdge(element));
                    break;
                }

            }
        });
        return getNetworkCreationObject(nodes, edges)
    }
}
