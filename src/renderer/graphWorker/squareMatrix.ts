type IPosition = [number, number]
type Matrix = Array<Array<number>>


export const SquareMatrix: ISquareMatrixStatic = class implements ISquareMatrix {
    private readonly matrix: Matrix;

    constructor(matrix: Matrix) {
        this.matrix = matrix
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
        return this.constructor(this.matrix)
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


}
