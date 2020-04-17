import * as _ from "lodash";
import {ISquareMatrix, ISquareMatrixStatic, position} from "./types/squareMatrixInterface";

type IPosition = [number, number]
type Matrix = Array<Array<number>>


export const SquareMatrix: ISquareMatrixStatic = class implements ISquareMatrix {
    private readonly matrix: Matrix;

    constructor(matrix: Matrix) {
        this.matrix = _.cloneDeep(matrix)
    }

    static removeEmptyCrosses(matrix: ISquareMatrix): ISquareMatrix {
        const mat: ISquareMatrix = matrix.getCopy()
        let needToBeShifted: Array<number> = []
        const size = mat.getSize()
        for (let i = 0; i < size; i++) {
            let emptyLine: boolean = true
            let emptyColumn: boolean = true
            for (let j = 0; j < size; j++) {
                if (mat.get([i, j]) !== 0) {
                    emptyLine = false
                    break
                }
            }
            for (let j = 0; j < size; j++) {
                if (mat.get([j, i]) !== 0) {
                    emptyColumn = false
                }
            }
            if (emptyLine && emptyColumn) {
                needToBeShifted.push(i)
            }
        }
        needToBeShifted.forEach((cross) => {
            for (let i = 0; i < mat.getSize(); i++) {
                mat.remove([i, cross])
            }
            mat.removeRow(cross)
            for (let i = 0; i < needToBeShifted.length; i++) {
                needToBeShifted[i]--
            }
        })
        return mat
    }

    static setOnesToDiagonal(matrix: ISquareMatrix): ISquareMatrix {
        const size: number = matrix.getSize()
        const arr: ISquareMatrix = matrix.getCopy()
        for (let i = 0; i < size; i++) {
            arr.set(1, [i, i])
        }
        return arr
    }

    static getZeroMatrix(size: number): ISquareMatrix {
        const mainArray: Array<Array<any>> = []
        for (let i = 0; i < size; i++) {
            mainArray.push([])
            for (let j = 0; j < size; j++) {
                mainArray[i].push(0)
            }
        }
        return new SquareMatrix(mainArray)
    }

    static changeValuesToOnes(matrix: ISquareMatrix): ISquareMatrix {
        const mat = matrix.getCopy()
        const size = mat.getSize()
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (mat.get([i, j]) > 0)
                    mat.set(1, [i, j])
            }
        }
        return mat
    }

    get(position: IPosition): any {
        try {
            return this.matrix[position[0]][position[1]]
        } catch (e) {
            return false
        }
    }

    set(value: any, position: IPosition): boolean {
        try {
            this.matrix[position[0]][position[1]] = value
        } catch (e) {
            return false
        }
        return true

    }

    getSize(): number {
        return this.matrix.length;
    }

    getCopy(): ISquareMatrix {
        return new SquareMatrix(this.matrix)
    }

    remove(position: position): boolean {
        try {
            this.matrix[position[0]].splice(position[1], 1)
        } catch (e) {
            return false
        }
        return true

    }

    removeRow(index: number): boolean {
        try {
            this.matrix.splice(index, 1)
        } catch (e) {
            return false
        }
        return true
    }

    getCrossSum(index: number): number {
        const size = this.getSize()
        let sum = 0
        for (let i = 0; i < size; i++) {
            sum += this.get([i, index])
            sum += this.get([index, i])
        }
        return sum
    }

    isSymmetric(): boolean {
        const size = this.getSize()
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < i; j++) {
                if (this.get([i, j]) !== this.get([j, i]))
                    return false
            }
        }
        return true
    }


}
