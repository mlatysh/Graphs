import {position} from "./squareMatrixInterface";

export type path = position[]

export interface IPathInterfaceStatic {
    new(): IPath

    getPathFromArray(array: position[]): IPath

    isValidPath(path: IPath): boolean
}


export interface IPath {
    addWay(position: position): void

    getLength(): number

    getPath(): path

    clearPath(): void

    equals(anotherPath: IPath): boolean

    getCopy(): IPath
}
