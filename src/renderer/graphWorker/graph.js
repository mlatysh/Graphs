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
        console.log(this.nodesIds, this.edgesIds)
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
            fromIds: doneEdges
        }
    }

    findIndexByLineAndColumn(line, column, matrix) {
        const mat = matrix

    }

    __builtMatrix(network) {
        const temp = []
        const size = this.nodesIds.length + 1
        const matrix = math.zeros(size, size)
        for (let i = 1; i < size; i++) {
            matrix.set([0, i], this.nodesIds[i - 1])
            matrix.set([i, 0], this.nodesIds[i - 1])
        }
        this.nodesIds.forEach(nodeId => {
            temp.push(this.__getNodeById(nodeId, network))
        })
        temp.forEach(node => {
            const id = node.node.id
            const fromIds = node.fromIds
        })
        console.log(matrix)
    }
}
