const getNetworkCreationObject = (container, nodes, edges, options) => {
    return {
        container: container,
        data: {nodes: nodes, edges: edges},
        options: options
    }
};
exports.getNetworkCreationObject = getNetworkCreationObject;
