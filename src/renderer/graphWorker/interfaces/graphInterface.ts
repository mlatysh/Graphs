interface IGraphStatic{
    getReachabilityMatrix(matrix: ISquareMatrix): ISquareMatrix
    checkConnectionsStrict(matrix: ISquareMatrix): boolean
    findIndexByRowAndColumnValue(rowValue: any, columnValue: any, matrix: ISquareMatrix): [number, number]
    getMatrixFromNetwork(network: any): ISquareMatrix
}


interface IGraph {
    isConnected(): boolean
    hasEulerCycle(): boolean
    getType(): string
}
