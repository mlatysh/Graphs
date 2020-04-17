import {IPath, path} from "./types/pathInterface";
import {position} from "./types/squareMatrixInterface";
import * as _ from 'lodash'

export const Path = class implements IPath {

    private readonly path: position[]

    constructor() {
        this.path = []
    }

    addWay(position: position): void {
        this.path.push(_.cloneDeep(position))
    }

    getLength(): number {
        return this.path.length
    }

    getPath(): path {
        return _.cloneDeep(this.path)
    }

    clearPath(): void {
        this.path.splice(0, this.getLength())
    }

    equals(anotherPath: IPath): boolean {
        return this.getLength() === anotherPath.getLength() &&
            _.isEqual(this.path, anotherPath.getPath())
    }
}
