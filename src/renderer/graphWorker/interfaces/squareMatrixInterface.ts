type position = [number, number]

interface ISquareMatrixStatic {
    setOnesToDiagonal(matrix: ISquareMatrix): ISquareMatrix,
    removeEmptyCrosses(matrix: ISquareMatrix): ISquareMatrix,
}

interface ISquareMatrix {
    getSize(): number
    getCopy(): ISquareMatrix
    get(position: position): any
    set(value: any, position: position): boolean
    remove(position: position): boolean
    removeRow(index: number): boolean
}



