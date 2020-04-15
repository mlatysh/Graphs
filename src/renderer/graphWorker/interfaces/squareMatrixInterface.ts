type position = [number, number]

interface ISquareMatrixStatic {
    new(matrix: Array<Array<any>>): ISquareMatrix

    setOnesToDiagonal(matrix: ISquareMatrix): ISquareMatrix

    removeEmptyCrosses(matrix: ISquareMatrix): ISquareMatrix

    getZeroMatrix(size: number): ISquareMatrix

    changeValuesToOnes(matrix: ISquareMatrix): ISquareMatrix
}

interface ISquareMatrix {
    getSize(): number

    getCopy(): ISquareMatrix

    get(position: position): any

    set(value: any, position: position): boolean

    remove(position: position): boolean

    removeRow(index: number): boolean

    getCrossSum(index: number): number

    isSymmetric(): boolean
}



