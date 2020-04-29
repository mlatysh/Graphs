import {ISquareMatrix, position} from "./squareMatrixInterface";
import {IPath} from "./pathInterface";
import {idPair} from "../graph";

export interface IGraphStatic {
    new(matrix: ISquareMatrix, type: string): IGraph

    getReachabilityMatrix(matrix: ISquareMatrix): ISquareMatrix

    checkConnectionsStrict(matrix: ISquareMatrix): boolean | undefined

    getMatrixFromNetwork(network: any): ISquareMatrix

    getConnectivityFromNetwork(network: any): string

    isConnected(matrix: ISquareMatrix): boolean | undefined

    buildPathFromDifference(withPathMatrix: ISquareMatrix, withoutPathMatrix: ISquareMatrix, symmetric: boolean): IPath
}


export interface IGraph {
    isConnected(): boolean | undefined

    hasEulerCycle(): boolean

    getType(): string

    buildPathToMakeConnectedOriented(): IPath

    buildPathToMakeConnectedNotOriented(): IPath

    isEmpty(): boolean

    getIdsFromPosition(position: position): idPair

    getValues(): ISquareMatrix

    getPositionFromIds(id1: any, id2: any): position

    findDistanceBetweenTwoNodes(nodeIdFrom: any, nodeIdTo: any): number | undefined

    getAllPathsBetweenVertexes(vertexIdFrom: any, VertexIdTo: any): IPath[] | undefined
}
