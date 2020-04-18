import {SquareMatrix} from "./squareMatrix";
import {IGraph, IGraphStatic} from "./types/graphInterface";
import {ISquareMatrix, position} from "./types/squareMatrixInterface";
import {IPath} from "./types/pathInterface";
import {combination} from 'js-combinatorics'
import {Path} from "./path";

type IExtendedNodeInfo = {
    node: any,
    edges: Array<any>
}
type IExtendedEdgeInfo = {
    id: any,
    from: any,
    to: any,
    arrowed: boolean | undefined
}

export type idPair = [any, any]


export const Graph: IGraphStatic = class implements IGraph {
    private readonly valuesMatrix: ISquareMatrix
    private readonly ids: Array<any>
    private readonly type: string
    private allVertexesDegreesAreEven: boolean

    constructor(matrix: ISquareMatrix, type: string) {
        this.ids = this.getIdsFromMatrix(matrix)
        this.valuesMatrix = this.getMatrixWithoutIds(matrix)
        this.type = type
        this.calcAllVertexesDegreesAreEven()
    }

    static getReachabilityMatrix(matrix: ISquareMatrix): ISquareMatrix {
        let mat = SquareMatrix.changeValuesToOnes(matrix)
        const size = mat.getSize()

        const copyLineWithAddition = (innerMatrix: ISquareMatrix, indexRowFrom: number, indexRowWhere: number) => {
            for (let i = 0; i < size; i++) {
                const taken = innerMatrix.get([indexRowFrom, i])
                if (taken === 1)
                    innerMatrix.set(1, [indexRowWhere, i])
            }
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (mat.get([i, j]) === 1) {
                    copyLineWithAddition(mat, j, i)
                }
            }
        }
        mat = SquareMatrix.setOnesToDiagonal(mat)
        return mat
    }

    static checkConnectionsStrict(matrix: ISquareMatrix): boolean | undefined {
        const size = matrix.getSize()
        if (!size) return undefined
        const mat = Graph.getReachabilityMatrix(matrix)
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (mat.get([i, j]) === 0) return false
            }
        }
        return true
    }

    static getConnectivityFromNetwork(network: any): string {
        let oriented = true
        let disoriented = true
        let state = undefined
        Object.keys(network.body.edges).forEach((edge) => {
            if (!network.body.edges[edge].options.arrows.to.enabled) oriented = false
            if (network.body.edges[edge].options.arrows.to.enabled) disoriented = false
        })
        if (oriented) state = 'directed'
        if (disoriented) state = 'not directed'
        if (!oriented && !disoriented) state = 'mixed'
        return state
    }

    static getMatrixFromNetwork(network: any): ISquareMatrix {
        const getNodeAndConnectedEdgesByNodeId = (nodeId: any, network: any): IExtendedNodeInfo | undefined => {
            const nodes = network.body.nodes
            let exactNode: any = undefined
            for (const node in nodes) {
                if (nodes.hasOwnProperty(node)
                    && nodes[node].id === nodeId) {
                    exactNode = nodes[node]
                    break
                }
            }
            const doneEdges: IExtendedEdgeInfo[] = []
            exactNode.edges.forEach((edge: any) => {
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

        const findIndexesByRowAndColumnValue =
            (rowValue: any, columnValue: any, matrix: ISquareMatrix): position | undefined => {
                const size = matrix.getSize()
                let lineIndex = undefined
                let columnIndex = undefined
                for (let i = 1; i < size; i++) {
                    if (matrix.get([i, 0]) === rowValue)
                        lineIndex = i
                    if (matrix.get([0, i]) === columnValue)
                        columnIndex = i
                }
                if (lineIndex === undefined || columnIndex === undefined) return undefined
                return [lineIndex, columnIndex]
            }

        const nodesIds: any[] = []
        network.body.data.nodes.forEach((node: any) => {
            if (typeof node.id === 'string' && !node.id.startsWith('edgeId:'))
                nodesIds.push(node.id)
            if (typeof node.id !== 'string')
                nodesIds.push(node.id)
        })
        const nodes: any[] = []
        const amountOfNodes = nodesIds.length
        const matrixSize = amountOfNodes + 1
        const matrix: ISquareMatrix = SquareMatrix.getZeroMatrix(matrixSize)
        for (let i = 0, j = 1; i < amountOfNodes && j < matrixSize; i++, j++) {
            matrix.set(nodesIds[i], [0, j])
            matrix.set(nodesIds[i], [j, 0])
        }
        nodesIds.forEach(nodeId => {
            nodes.push(getNodeAndConnectedEdgesByNodeId(nodeId, network))
        })
        nodes.forEach(node => {
            node.edges.forEach((edge: IExtendedEdgeInfo) => {
                let indexes: position = findIndexesByRowAndColumnValue(edge.from, edge.to, matrix)
                let value = matrix.get(indexes)
                if (edge.arrowed) {
                    matrix.set(value + 1, indexes)
                } else {
                    matrix.set(value + 1, indexes)
                    value = matrix.get([indexes[1], indexes[0]])
                    matrix.set(value + 1, [indexes[1], indexes[0]])
                }
            })
        })
        return matrix
    }

    static isConnected(matrix: ISquareMatrix): boolean | undefined {
        return Graph.checkConnectionsStrict(
            SquareMatrix.setOnesToDiagonal(
                matrix
            )
        )
    }

    private getIdsFromMatrix(matrix: ISquareMatrix): Array<any> {
        const size = matrix.getSize()
        const ids = []
        for (let i = 0; i < size; i++) {
            ids.push(matrix.get([i, 0]))
        }
        return ids
    }

    private getMatrixWithoutIds(matrix: ISquareMatrix): ISquareMatrix {
        const size = matrix.getSize()
        const mat = matrix.getCopy()
        for (let i = 0; i < size; i++) {
            mat.remove([i, 0])
        }
        mat.removeRow(0)
        return mat
    }

    private calcAllVertexesDegreesAreEven(): void {
        const size = this.valuesMatrix.getSize()
        let sum = 0
        for (let i = 0; i < size; i++) {
            if (this.type === 'directed')
                sum += this.valuesMatrix.getCrossSum(i)
            if (this.type === 'not directed')
                sum += this.valuesMatrix.getCrossSum(i) / 2
            if (this.type === 'mixed')
                return;
            const diagonalValue = this.valuesMatrix.get([i, i])
            if (diagonalValue) sum += diagonalValue
            if (sum % 2 !== 0) {
                this.allVertexesDegreesAreEven = false
                return
            }
        }
        this.allVertexesDegreesAreEven = true
    }

    private getIdsFromPosition(position: position): idPair {
        return [this.ids[position[0] + 1], this.ids[position[1] + 1]]
    }

    buildPathToMakeConnected(): IPath | boolean {

        const getPositions = (matrix: ISquareMatrix): position[] => {
            const size = matrix.getSize()
            const mat = matrix.getCopy()
            const values: position[] = []
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (mat.get([i, j]) === 0) {
                        values.push([i, j])
                    }
                }
            }
            return values
        }

        const setPath = (path: IPath, matrix: ISquareMatrix) => {
            const mat = matrix.getCopy()
            path.getPath().forEach(one => {
                mat.set(1, [one[0], one[1]])
            })
            return mat
        }

        const readyMatrix = SquareMatrix.setOnesToDiagonal(this.valuesMatrix)
        const positions: position[] = getPositions(readyMatrix)
        const nullsAmount = readyMatrix.countNulls()

        for (let i = 1; i <= nullsAmount; i++) {
            const combinations: [number, number][][] = combination(positions, i).toArray()
            for (let j = 0; j < combinations.length; j++) {
                const fullPath = Path.getPathFromArray(combinations[j])
                if (Graph.isConnected(setPath(fullPath, this.valuesMatrix))) {
                    return fullPath
                }
            }
        }
    }

    hasEulerCycle(): boolean | undefined {
        if (this.getType() === 'directed' || this.getType() === 'not directed') {
            return this.allVertexesDegreesAreEven &&
                Graph.isConnected(SquareMatrix.setOnesToDiagonal(
                    SquareMatrix.removeEmptyCrosses(this.valuesMatrix)))
        } else return undefined
    }

    isConnected(): boolean | undefined {
        return Graph.checkConnectionsStrict(
            SquareMatrix.setOnesToDiagonal(
                this.valuesMatrix
            )
        )
    }

    getType(): string {
        return this.type;
    }

    isEmpty(): boolean {
        return this.valuesMatrix.getSize() === 0
    }
}
