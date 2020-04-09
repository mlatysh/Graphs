export class InfoController {
    constructor(networkController) {
        this.networkController = networkController
        this.DOMElement = document.getElementById('info')
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
        let totalNodes = network.body.data.nodes.length
        let totalEdges = Object.keys(network.body.edges).length
        this.DOMElement.innerText = `Edges amount: ${totalEdges}\nNodes amount: ${totalNodes}`
    }
}
