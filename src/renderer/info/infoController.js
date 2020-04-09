export class InfoController {
    constructor(networkController) {
        this.networkController = networkController
        this.leftDOMElement = document.getElementById('info-left')
        this.rightDOMElement = document.getElementById('info-right')
        const upd = this.updateState.bind(this)
        document.addEventListener('keydown', upd)
        document.addEventListener('keyup', upd)
        document.addEventListener('click', upd)
        document.addEventListener('dblclick', upd)
        document.addEventListener('contextmenu', upd)
        this.updateState()
    }

    updateState() {
        const network = this.networkController.getNetwork()
        this.updateLeft(network)
        this.updateRight(network)
    }

    updateLeft(network){
        const totalNodes = network.body.data.nodes.length
        const totalEdges = Object.keys(network.body.edges).length
        this.leftDOMElement.innerText = `Edges amount: ${totalEdges}\nNodes amount: ${totalNodes}\n\n`
    }

    updateRight(network) {
        const selectedNodes =network.getSelectedNodes()
        if (selectedNodes.length === 1) {
            const degree = network.getConnectedEdges(selectedNodes[0]).length
            this.rightDOMElement.innerText = `Selected vertex degree: ${degree}`
        } else {
            this.rightDOMElement.innerText = ''
        }
    }
}
