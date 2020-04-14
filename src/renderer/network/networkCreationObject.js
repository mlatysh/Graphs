import {DataSet} from "../../../visjs/vis-network";

export const getNetworkCreationObject = (nodesArray, edgesArray) => {
    return {
        container: document.getElementById('network'),
        data: {nodes: new DataSet(nodesArray), edges: new DataSet(edgesArray)},
        saveData: {nodes: nodesArray, edges: edgesArray}
    }
};
