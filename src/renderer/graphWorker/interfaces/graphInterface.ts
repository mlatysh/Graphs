interface IGraphStatic{
    new(matrix: ISquareMatrix, type: string): IGraph
    getReachabilityMatrix(matrix: ISquareMatrix): ISquareMatrix
    checkConnectionsStrict(matrix: ISquareMatrix): boolean

    getMatrixFromNetwork(network: any): ISquareMatrix

    getConnectivityFromNetwork(network: any): string
}


interface IGraph {
    isConnected(): boolean
    hasEulerCycle(): boolean
    getType(): string
}
