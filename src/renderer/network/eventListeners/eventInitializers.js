export class EventInitializer {

    constructor(parent) {
        this.parent = parent
    }

    initDeletion(selection, setterAndRemover, eventListeners) {
        setterAndRemover.remover(eventListeners)
        if (selection.nodes)
            selection.nodes.forEach((node) => {
                this.__removeNode(node)
            })
        if (selection.edges)
            selection.edges.forEach((edge) => {
                this.__removeEdge(edge)
            })
        setterAndRemover.setter(eventListeners)
    }

    __removeNode(nodeId) {
        this.parent.network.body.data.nodes.remove({id: nodeId})
    }

    __removeEdge(edgeId) {
        this.parent.network.body.data.edges.remove({id: edgeId})
    }
}
