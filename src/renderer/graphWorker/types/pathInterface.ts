import {position} from "./squareMatrixInterface";

export type path = position[]

export interface IPathInterfaceStatic {
    new(): IPath
}


export interface IPath {
    addWay(position: position): void

    getLength(): number

    getPath(): path

    clearPath(): void

    equals(anotherPath: IPath): boolean
}
