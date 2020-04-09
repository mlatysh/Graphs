import * as math from 'mathjs'


export class Graph {
    constructor(network) {
        this.edgesIds = [];
        this.nodesIds = [];
        network.body.data.nodes.forEach((node) => {
            this.nodesIds.push(node.id)
        })
        Object.keys(network.body.edges).forEach((edge) => {
            this.edgesIds.push(edge)
        })
        this.__builtMatrix(network)
    }


    __getNodeById(id, network) {
        const nodes = network.body.nodes
        const edges = network.body.edges
        let exactNode = undefined
        for (const node in nodes) {
            if (nodes.hasOwnProperty(node)
                && nodes[node].id === id) {
                exactNode = nodes[node]
                break
            }
        }
        const doneEdges = []
        exactNode.edges.forEach(edge => {
            if (edge.fromId === exactNode.id)
                doneEdges.push(
                    {
                        id: edge.id,
                        from: edge.fromId,
                        to: edge.toId,
                        arrowed: edge.options.arrows.to.enabled
                    })
        })
        return {
            node: exactNode,
            edges: doneEdges
        }
    }

    __findIndexByLineAndColumn(line, column, matrix) {
        const size = matrix.size()[0]
        let lineIndex = undefined
        let columnIndex = undefined
        for (let i = 1; i < size; i++) {
            if (matrix.get([i, 0]) === line)
                lineIndex = i
            if (matrix.get([0, i]) === column)
                columnIndex = i
        }
        return [lineIndex, columnIndex]
    }

    __builtMatrix(network) {
        const nodes = []
        const size = this.nodesIds.length + 1
        const matrix = math.zeros(size, size)
        for (let i = 1; i < size; i++) {
            matrix.set([0, i], this.nodesIds[i - 1])
            matrix.set([i, 0], this.nodesIds[i - 1])
        }
        this.nodesIds.forEach(nodeId => {
            nodes.push(this.__getNodeById(nodeId, network))
        })
        nodes.forEach(node => {
            node.edges.forEach(edge => {
                let indexes = this.__findIndexByLineAndColumn(edge.from, edge.to, matrix)
                let value = matrix.get(indexes)
                if (edge.arrowed) {
                    matrix.set(indexes, value + 1)
                } else {
                    matrix.set(indexes, value + 1)
                    indexes = [indexes[1], indexes[0]]
                    value = matrix.get(indexes)
                    matrix.set(indexes, value + 1)
                }
            })
        })
        this.matrix = matrix
    }

    getMatrix() {
        return this.matrix
    }
}
