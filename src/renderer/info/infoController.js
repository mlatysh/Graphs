import {Graph} from "../graphWorker/OldGraph";

export class InfoController {
    constructor(networkController) {
        this.leftDOMElement = document.getElementById('info-left')
        this.rightDOMElement = document.getElementById('info-right')
        this.updateCallback = this.updateState.bind(this)
        document.addEventListener('keyup', this.updateState.bind(this))
        this.networkController = networkController
    }

    getUpdateCallback() {
        return this.updateCallback
    }

    updateState() {
        this.updateLeft(this.networkController.getNetwork())
        this.updateRight(this.networkController.getNetwork())
    }

    updateLeft(network) {
        const nodes = network.body.data.nodes
        let totalNodes = 0
        nodes.forEach(node => {
            if (typeof node.id !== 'string')
                totalNodes++
            if (typeof node.id === 'string' && !node.id.startsWith('edgeId:'))
                totalNodes++
        })
        const totalEdges = Object.keys(network.body.edges).length
        const graph = new Graph(this.networkController.getNetwork())
        const connected = graph.isConnected()
        const oriented = graph.oriented
        const disoriented = graph.disoriented
        let hasEulerCycle = graph.hasEulerCycle()
        let state = undefined

        if (oriented) state = 'directed'
        if (disoriented) state = 'not directed'
        if (!oriented && !disoriented) state = 'mixed'
        if (hasEulerCycle === true) hasEulerCycle = 'yes'
        if (hasEulerCycle === false) hasEulerCycle = 'no'
        if (hasEulerCycle === undefined) hasEulerCycle = 'not applicable'
        this.leftDOMElement.innerText = `Nodes amount: ${totalNodes}\nEdges amount: ${totalEdges}\n\n`
            + `Type: ${state}\n`
            + `Connected: ${connected ? 'yes' : 'no'}\n`
            + `Has Euler cycle: ${hasEulerCycle}`
    }

    updateRight(network) {
        const selectedNodes = network.getSelectedNodes()
        let rez = `Edit mode: ${network.manipulation.editMode ? 'enabled' : 'disabled'}\n\n`
        if (selectedNodes.length === 1) {
            const connectedEdges = network.getConnectedEdges(selectedNodes[0])
            const edges = network.body.edges
            let amount = connectedEdges.length
            connectedEdges.forEach(edgeId => {
                const edge = edges[edgeId]
                if (edge.fromId === edge.toId)
                    amount++
            })
            rez += `Selected vertex degree: ${amount}`
        }
        this.rightDOMElement.innerText = rez
    }
}
