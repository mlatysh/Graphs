const objectToArray = object => {
    return Object.keys(object).map(function (key) {
        object[key].id = key;
        return object[key]
    });
};


export class NetworkExporter {
    static getSerializedNetwork(saveData) {
        const serializedNetwork = {
            nodes: saveData.nodes,
            edges: saveData.edges
        };

        //     objectToArray(network.getPositions());
        // serializedNetwork.forEach((node) => {
        //     node.connections = network.getConnectedNodes(node.id);
        // });
        return serializedNetwork
    }
}
