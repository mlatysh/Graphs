type IPosition = [number, number]


export const Graph: IGraphStatic = class implements IGraph {
    private valuesMatrix: ISquareMatrix
    private ids: Array<any>
    private totalDirected: boolean
    private totalUndirected: boolean
    private allVertexesDegreesAreEven: boolean

    constructor(matrix: ISquareMatrix) {
        this.ids = this.getIdsFromMatrix(matrix)
        this.valuesMatrix = this.getMatrixWithoutIds(matrix)
        this.calcTotalDirected()
        this.calcTotalUndirected()
        this.calcAllVertexesDegreesAreEven()
    }

    static getReachabilityMatrix(matrix: ISquareMatrix): ISquareMatrix {
        return
    }

    static checkConnectionsStrict(matrix: ISquareMatrix): boolean {
        return
    }

    static findIndexByRowAndColumnValue(rowValue: any, columnValue: any, matrix: ISquareMatrix): IPosition {
        return
    }

    static getMatrixFromNetwork(network: any): ISquareMatrix {
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
    }

    private getIdsFromMatrix(matrix: ISquareMatrix): Array<any> {
        const size = matrix.getSize()
        const ids = []
        for (let i = 0; i < size; i++) {
            ids.push(matrix.get([i,0]))
        }
        return ids
    }

    private getMatrixWithoutIds(matrix: ISquareMatrix): ISquareMatrix{
        const size = matrix.getSize()
        const mat = matrix.getCopy()
        for (let i = 0; i < size; i++) {
            mat.remove([i,0])
        }
        mat.removeRow(0)
        return mat
    }

    private calcTotalDirected(): void {

    }

    private calcTotalUndirected(): void {

    }

    private calcAllVertexesDegreesAreEven(): void {

    }

    hasEulerCycle(): boolean {
        return false;
    }

    isConnected(): boolean {
        return false;
    }

    getType(): string {
        return "";
    }
}
