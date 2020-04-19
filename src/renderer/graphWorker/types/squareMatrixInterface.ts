export type position = [number, number]

export interface ISquareMatrixStatic {
    new(matrix: Array<Array<any>>): ISquareMatrix

    setOnesToDiagonal(matrix: ISquareMatrix): ISquareMatrix

    setNullsToDiagonal(matrix: ISquareMatrix): ISquareMatrix

    removeEmptyCrosses(matrix: ISquareMatrix): ISquareMatrix

    getZeroMatrix(size: number): ISquareMatrix

    changeValuesToOnes(matrix: ISquareMatrix): ISquareMatrix

    fullFillAnotherDiagonal(matrix: ISquareMatrix, symmetric: boolean): ISquareMatrix

    noEmptyRowsOrColumns(matrix: ISquareMatrix): boolean
}

export interface ISquareMatrix {
    getSize(): number

    getCopy(): ISquareMatrix

    get(position: position): any

    getLineReferring(index: number): any[]

    set(value: any, position: position): boolean

    toArray(): number[][]

    remove(position: position): boolean

    removeRow(index: number): boolean

    getCrossSum(index: number): number

    isSymmetric(): boolean

    countNulls(): number

    hasNoNulls(): boolean

    countNotNullsWithoutDiagonal(): number

}



