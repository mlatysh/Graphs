import {Graph} from "../graphWorker/graph";

export class InfoController {
    constructor(networkController) {
        this.leftDOMElement = document.getElementById('info-left')
        this.rightDOMElement = document.getElementById('info-right')
        this.updateCallback = this.updateState.bind(this)
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
        const connected = new Graph(this.networkController.getNetwork()).isConnected()
        this.leftDOMElement.innerText = `Nodes amount: ${totalNodes}\nEdges amount: ${totalEdges}\n\n`
            + `Connected: ${connected ? 'yes' : 'no'}`
    }

    updateRight(network) {
        const selectedNodes = network.getSelectedNodes()
        let rez = `Edit mode: ${network.manipulation.editMode ? 'enabled' : 'disabled'}\n\n`
        if (selectedNodes.length === 1) {
            const degree = network.getConnectedEdges(selectedNodes[0]).length
            rez += `Selected vertex degree: ${degree}`
        }
        this.rightDOMElement.innerText = rez
    }
}
