import {Graph} from "../graphWorker/graph";
import * as path from "path";
import {Path} from "../graphWorker/path";
import {Spinner} from "./spin";
import {opts} from "./spinOpts";


export class InfoController {
    constructor(networkController) {
        this.leftDOMElement = document.getElementById('info-left')
        this.rightDOMElement = document.getElementById('info-right')
        this.actionsDOMElement = document.getElementById('actions')
        this.worker = new Worker(path.resolve(__dirname, 'genius.js'))
        this.spinner = new Spinner(opts)
        this.createControlElements()
        this.updateCallback = this.updateState.bind(this)
        document.addEventListener('keyup', this.updateState.bind(this))
        this.networkController = networkController
        this.setWorkerReaction()

    }

    getGraph() {
        const network = this.networkController.getNetwork()
        return new Graph(Graph.getMatrixFromNetwork(network),
            Graph.getConnectivityFromNetwork(network))
    }

    getUpdateCallback() {
        return this.updateCallback
    }

    updateState() {
        const network = this.networkController.getNetwork()
        const graph = this.getGraph()
        this.updateLeft(network, graph)
        this.updateRight(network, graph)
        this.manageControlElements(graph)
    }

    updateLeft(network, graph) {
        const nodes = network.body.data.nodes
        let totalNodes = 0
        nodes.forEach(node => {
            if (typeof node.id !== 'string')
                totalNodes++
            if (typeof node.id === 'string' && !node.id.startsWith('edgeId:'))
                totalNodes++
        })
        const totalEdges = Object.keys(network.body.edges).length
        const connected = graph.isConnected()
        let hasEulerCycle = graph.hasEulerCycle()
        const type = graph.getType()
        if (hasEulerCycle === true) hasEulerCycle = 'yes'
        if (hasEulerCycle === false) hasEulerCycle = 'no'
        if (hasEulerCycle === undefined) hasEulerCycle = 'not applicable'


        this.leftDOMElement.innerText = `Nodes amount: ${totalNodes}\nEdges amount: ${totalEdges}\n\n`
            + `Type: ${type}\n`
            + `Connected: ${connected ? 'yes' : 'no'}\n`
            + `Has Euler cycle: ${hasEulerCycle}`
    }

    updateRight(network, graph) {
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

    createControlElements() {
        this.controlElements = {}
        this.controlElements.makeGraphConnectedButton = document.createElement('button')
        this.controlElements.makeGraphConnectedButton.style.fontSize = '2vw'
        this.controlElements.makeGraphConnectedButton.style.display = 'none'
        this.controlElements.makeGraphConnectedButton.innerText = 'Make graph connected'
        this.actionsDOMElement.appendChild(this.controlElements.makeGraphConnectedButton)
        this.controlElements.makeGraphConnectedButton
            .addEventListener('click', this.makeGraphConnectedListener.bind(this))
    }

    manageControlElements(graph) {
        if (graph.isConnected() || graph.getType() === 'mixed' || graph.getType() === 'not applicable')
            this.controlElements.makeGraphConnectedButton.style.display = 'none'
        else
            this.controlElements.makeGraphConnectedButton.style.display = 'block'
    }

    setWorkerReaction() {
        this.worker.onmessage = function (event) {
            const graph = this.getGraph()
            const network = this.networkController.getNetwork()
            if (graph.getType() === 'directed') {
                const path = Path.getPathFromArray(event.data.path.path)
                if (path) {
                    path.getPath().forEach(one => {
                        const ids = graph.getIdsFromPosition(one)
                        network.body.data.edges.add(
                            {
                                from: ids[0],
                                to: ids[1]
                            }
                        )
                    })
                }
            } else if (graph.getType() === 'not directed') {
                const path = event.data.path
                if (path) {
                    path.getPath().forEach(one => {
                        const ids = graph.getIdsFromPosition(one)
                        network.body.data.edges.add(
                            {
                                from: ids[0],
                                to: ids[1],
                            }
                        )
                    })
                }
                for (const edge in network.body.edges) {
                    network.body.edges[edge].options.arrows.to = false
                }
            }
            this.spinner.stop()
        }.bind(this)
    }

    makeGraphConnectedListener(event) {
        const graph = this.getGraph()
        const network = this.networkController.getNetwork()
        if (graph.isEmpty()) return
        const matrix = Graph.getMatrixFromNetwork(network)
        this.spinner.spin(document.getElementById('network'))
        this.worker.postMessage({type: graph.getType(), matrix})
    }

}
