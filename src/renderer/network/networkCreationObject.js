import {DataSet} from "../../../libs/vis-network";

export const getNetworkCreationObject = (containerId = 'network', nodesArray, edgesArray, options) => {
    return {
        container: document.getElementById(containerId),
        data: {nodes: new DataSet(nodesArray), edges: new DataSet(edgesArray)},
        options: options
    }
};
