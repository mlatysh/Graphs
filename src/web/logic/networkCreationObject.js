export const getNetworkCreationObject = (container, nodes, edges, options) => {
    return {
        container: container,
        data: {nodes: nodes, edges: edges},
        options: options
    }
};
