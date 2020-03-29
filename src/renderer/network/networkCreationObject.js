import {DataSet} from "../../../libs/vis-network";

export const getNetworkCreationObject = (nodesArray, edgesArray) => {
    return {
        container: document.getElementById('network'),
        data: {nodes: new DataSet(nodesArray), edges: new DataSet(edgesArray)},
    }
};
