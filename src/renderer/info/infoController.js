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
        console.log('updating')
        const network = this.networkController.getNetwork()
        this.updateLeft(network)
        this.updateRight(network)
    }

    updateLeft(network) {
        const totalNodes = network.body.data.nodes.length
        const totalEdges = Object.keys(network.body.edges).length
        const connected = new Graph(this.networkController.getNetwork()).isConnected()
        this.leftDOMElement.innerText = `Nodes amount: ${totalNodes}\nEdges amount: ${totalEdges}\n\n`
            + `Connected: ${connected}`
    }

    updateRight(network) {
        const selectedNodes = network.getSelectedNodes()
        let rez = `Edit mode: ${network.manipulation.editMode}\n\n`
        if (selectedNodes.length === 1) {
            const degree = network.getConnectedEdges(selectedNodes[0]).length
            rez += `Selected vertex degree: ${degree}`
        }
        this.rightDOMElement.innerText = rez
    }
}
