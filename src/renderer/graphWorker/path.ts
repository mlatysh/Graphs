import {IPath, IPathInterfaceStatic, path} from "./types/pathInterface";
import {position} from "./types/squareMatrixInterface";
import * as _ from 'lodash'

export const Path: IPathInterfaceStatic = class implements IPath {

    private readonly path: position[]

    constructor() {
        this.path = []
    }

    static getPathFromArray(array: path): IPath {
        const value = new Path()
        array.forEach(pair => {
            value.addWay(pair)
        })
        return value
    }

    static isValidPath(path: IPath): boolean {
        const way = path.getPath()
        const size = way.length
        let prevValue = way[0][1];
        for (let i = 1; i < size; i++) {
            if (way[i][0] !== prevValue) return false
            prevValue = way[i][1]
        }
        return true;
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

    getCopy(): IPath {
        return _.cloneDeep(this)
    }
}
