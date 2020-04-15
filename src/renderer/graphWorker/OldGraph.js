import * as math from 'mathjs'


export class Graph {
    constructor(network) {
        this.edgesIds = [];
        this.nodesIds = [];
        this.oriented = true
        this.disoriented = true
        this.allDegreesAreEven = true
        network.body.data.nodes.forEach((node) => {
            if (typeof node.id === 'string' && !node.id.startsWith('edgeId:'))
                this.nodesIds.push(node.id)
            if (typeof node.id !== 'string')
                this.nodesIds.push(node.id)
            let edgesCount = 0
            const connectedEdges = network.getConnectedEdges(node.id)
            connectedEdges.forEach((edgeId) => {
                if (network.body.edges[edgeId].fromId === network.body.edges[edgeId].toId)
                    edgesCount += 2
                else
                    edgesCount++
            })
            if (edgesCount % 2 !== 0) this.allDegreesAreEven = false
        })
        Object.keys(network.body.edges).forEach((edge) => {
            this.edgesIds.push(edge)
            if (!network.body.edges[edge].options.arrows.to.enabled) this.oriented = false
            if (network.body.edges[edge].options.arrows.to.enabled) this.disoriented = false
        })
        try {
            this.__builtMatrix(network)
        } catch (e) {
            this.matrix = math.matrix([])
        }
    }

    static removeIsolatedVertexes(matrix) {
        const mat = matrix.slice()
        let needToBeShifted = []
        const length = mat.length
        for (let i = 0; i < length; i++) {
            let emptyLine = true
            let emptyColumn = true
            for (let j = 0; j < length; j++) {
                if (mat[i][j] !== 0) {
                    emptyLine = false
                    break
                }
            }
            for (let j = 0; j < length; j++) {
                if (mat[j][i] !== 0) {
                    emptyColumn = false
                }
            }
            if (emptyLine && emptyColumn) {
                needToBeShifted.push(i)
            }
        }
        needToBeShifted.forEach((cross) => {
            for (let i = 0; i < mat.length; i++) {
                mat[i].splice(cross, 1)
            }
            mat.splice(cross, 1)
            for (let i = 0; i < needToBeShifted.length; i++) {
                needToBeShifted[i]--
            }
        })
        return mat
    }

    static setOnesToDiagonal(array) {
        const size = array.length
        const arr = array.slice()
        for (let i = 0; i < size; i++) {
            arr[i][i] = 1
        }
        return arr
    }

    static getReachabilityMatrix(matrixWithIds, returnWithIds = false, givenWithIds = false) {

        if (returnWithIds && !givenWithIds) return undefined

        let mat = [...matrixWithIds]
        const firstColumn = []
        let firstLine = []
        if (givenWithIds) {

        }

        const copyLineWithAddition = (mainMatrix, indexLineFrom, indexLineWhere) => {
            const fromLine = mainMatrix[indexLineFrom]
            mainMatrix[indexLineWhere].forEach((element, index) => {
                if (fromLine[index] > 0 && element === 0)
                    mainMatrix[indexLineWhere][index] = 1
            })
        }

        mat.forEach((element, indexRow) => {
            element.forEach((subElement, indexColumn) => {
                if (mat[indexRow][indexColumn] > 0)
                    mat[indexRow][indexColumn] = 1
            })
        })
        mat.forEach((element, indexRow) => {
            element.forEach((subElement, indexColumn) => {
                if (subElement === 1)
                    copyLineWithAddition(mat, indexColumn, indexRow)
            })
        })
        if (returnWithIds) {
            mat.unshift(firstLine)
            mat.forEach((element, index) => {
                element.unshift(firstColumn[index])
            })
        }
        return mat
    }

    static checkConnectionsStrict(matrix) {
        const size = matrix.length
        if (!size) return undefined
        const mat = Graph.getReachabilityMatrix(matrix)
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (mat[i][j] === 0) return false
            }
        }
        return true
    }

    static matrixPow(pow, matrix) {
        const multiplyMatrix = (matrixA, matrixB) => {
            const rowsA = matrixA.length, colsA = matrixA[0].length,
                rowsB = matrixB.length, colsB = matrixB[0].length,
                rezMatrix = [];
            if (colsA !== rowsB) return false;
            for (let i = 0; i < rowsA; i++) rezMatrix[i] = [];
            for (let k = 0; k < colsB; k++) {
                for (let i = 0; i < rowsA; i++) {
                    let t = 0;
                    for (let j = 0; j < rowsB; j++) t += matrixA[i][j] * matrixB[j][k];
                    rezMatrix[i][k] = t;
                }
            }
            return rezMatrix;
        }
        if (pow === 0) return undefined
        if (pow === 1) return matrix;
        else return multiplyMatrix(matrix, Graph.matrixPow(pow - 1, matrix));
    }

    static isConnected(matrix) {
        return Graph.checkConnectionsStrict(
            Graph.setOnesToDiagonal(
                matrix
            )
        )
    }
    __getNodeById(id, network) {
        const nodes = network.body.nodes
        let exactNode = undefined
        for (const node in nodes) {
            if (nodes.hasOwnProperty(node)
                && nodes[node].id === id) {
                exactNode = nodes[node]
                break
            }
        }
        const doneEdges = []
        exactNode.edges.forEach(edge => {
            if (edge.fromId === exactNode.id)
                doneEdges.push(
                    {
                        id: edge.id,
                        from: edge.fromId,
                        to: edge.toId,
                        arrowed: edge.options.arrows.to.enabled
                    })
        })
        return {
            node: exactNode,
            edges: doneEdges
        }
    }

    __findIndexByLineAndColumn(line, column, matrix) {
        const size = matrix.size()[0]
        let lineIndex = undefined
        let columnIndex = undefined
        for (let i = 1; i < size; i++) {
            if (matrix.get([i, 0]) === line)
                lineIndex = i
            if (matrix.get([0, i]) === column)
                columnIndex = i
        }
        return [lineIndex, columnIndex]
    }

    __builtMatrix(network) {
        const nodes = []
        const size = this.nodesIds.length + 1
        const matrix = math.zeros(size, size)
        for (let i = 1; i < size; i++) {
            matrix.set([0, i], this.nodesIds[i - 1])
            matrix.set([i, 0], this.nodesIds[i - 1])
        }
        this.nodesIds.forEach(nodeId => {
            nodes.push(this.__getNodeById(nodeId, network))
        })
        nodes.forEach(node => {
            node.edges.forEach(edge => {
                let indexes = this.__findIndexByLineAndColumn(edge.from, edge.to, matrix)
                let value = matrix.get(indexes)
                if (edge.arrowed) {
                    matrix.set(indexes, value + 1)
                } else {
                    matrix.set(indexes, value + 1)
                    indexes = [indexes[1], indexes[0]]
                    value = matrix.get(indexes)
                    matrix.set(indexes, value + 1)
                }
            })
        })
        this.matrix = matrix
    }


    getMatrixAsArray() {
        return this.matrix.toArray()
    }

    isConnected() {
        return Graph.checkConnectionsStrict(
            Graph.setOnesToDiagonal(
                this.getValuesMatrix()
            )
        )
    }

    hasEulerCycle() {
        if (this.oriented) {
            return this.allDegreesAreEven && Graph.isConnected(
                Graph.removeIsolatedVertexes(
                    this.getValuesMatrix()
                )
            )
        }
        if (this.disoriented) {
            return this.allDegreesAreEven && Graph.isConnected(
                Graph.removeIsolatedVertexes(
                    this.getValuesMatrix()
                )
            )
        } else return undefined
    }

    getValuesMatrix() {
        const matrix = this.matrix.toArray()
        matrix.shift()
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].splice(0, 1)
        }
        return matrix
    }
}
