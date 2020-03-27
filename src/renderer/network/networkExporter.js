const objectToArray = object => {
    return Object.keys(object).map(function (key) {
        object[key].id = key;
        return object[key]
    });
};


export class NetworkExporter {
    static getSerializedNetwork(network) {
        const serializedNetwork = objectToArray(network.getPositions());
        serializedNetwork.forEach((node, index) => {
            node.connections = network.getConnectedNodes(index);
        });
        return serializedNetwork
    }
}
