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
        const selectedNodes =network.getSelectedNodes()
        const totalNodes = network.body.data.nodes.length
        const totalEdges = Object.keys(network.body.edges).length
        let connectedEdges = NaN
        if (selectedNodes.length === 1) {
            connectedEdges = network.getConnectedEdges(selectedNodes[0]).length
        }
        let rez = ""
        rez+= `Edges amount: ${totalEdges}\nNodes amount: ${totalNodes}\n\n`
        if(!isNaN(connectedEdges))
            rez+=`Selected vertex degree: ${connectedEdges}`
        this.DOMElement.innerText = rez
    }
}
