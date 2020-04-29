import {Graph} from "../graphWorker/graph";
import {SquareMatrix} from "../graphWorker/squareMatrix";

onmessage = function (message) {
    const type = message.data.type
    const matrix = message.data.matrix
    const matrixObject = new SquareMatrix(matrix.matrix)
    const graphObject = new Graph(matrixObject, type)
    const paths = graphObject.getAllPathsBetweenVertexes(message.data.selection.nodes[0],
        message.data.selection.nodes[1])
    postMessage(paths)
}
