import {Graph} from "../graphWorker/graph";
import {SquareMatrix} from "../graphWorker/squareMatrix";

onmessage = function (message) {
    const type = message.data.type
    const matrix = message.data.matrix
    const matrixObject = new SquareMatrix(matrix.matrix)
    const graphObject = new Graph(matrixObject, type)
    if (type === 'directed') {
        const path = graphObject.buildPathToMakeConnectedOriented()
        postMessage({path})

    } else if (type === 'not directed') {
        const path = graphObject.buildPathToMakeConnectedNotOriented()
        postMessage({path})
    }
}
