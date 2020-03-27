import {DataSet} from "../../../libs/vis-network";

export const getNetworkCreationObject = (containerId, nodesArray, edgesArray) => {
    return {
        container: document.getElementById(containerId),
        data: {nodes: new DataSet(nodesArray), edges: new DataSet(edgesArray)},
        saveData: {nodes: nodesArray, edges: edgesArray}
    }
};
