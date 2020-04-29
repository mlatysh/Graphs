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
        this.connectionWorker = new Worker(path.resolve(__dirname, 'anotherGenius.js'))
        this.updaters = {
            updateLeft: this.updateLeft.bind(this),
            updateRight: this.updateRight.bind(this),
            control: this.manageControlElements.bind(this)
        }
        this.spinner = new Spinner(opts)
        this.createControlElements()
        this.updateCallback = this.updateState.bind(this)
        document.addEventListener('keyup', this.updateState.bind(this))
        this.networkController = networkController
        this.setWorkerReaction()
        this.setConnectorReaction()
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
        this.updateRight(network)
        this.manageControlElements(graph)
    }

    emptyFunction() {

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

    createControlElements() {
        this.controlElements = {}

        this.controlElements.makeGraphConnectedButton = document.createElement('button')
        this.controlElements.makeGraphConnectedButton.style.fontSize = '100%'
        this.controlElements.makeGraphConnectedButton.style.display = 'none'
        this.controlElements.makeGraphConnectedButton.innerText = 'Make graph connected'
        this.actionsDOMElement.appendChild(this.controlElements.makeGraphConnectedButton)
        this.controlElements.makeGraphConnectedButton
            .addEventListener('click', this.makeGraphConnectedListener.bind(this))

        this.controlElements.findDistanceBetweenTwoNodes = document.createElement('button')
        this.controlElements.findDistanceBetweenTwoNodes.style.fontSize = '100%'
        this.controlElements.findDistanceBetweenTwoNodes.style.display = 'inline'
        this.controlElements.findDistanceBetweenTwoNodes.style.marginLeft = '10px'
        this.controlElements.findDistanceBetweenTwoNodes.innerText = 'Find distance between two nodes'
        this.actionsDOMElement.appendChild(this.controlElements.findDistanceBetweenTwoNodes)
        this.controlElements.findDistanceBetweenTwoNodes
            .addEventListener('click', this.findDistanceBetweenTwoNodesListener.bind(this))

        this.controlElements.findAllPathsBetweenTwoNodes = document.createElement('button')
        this.controlElements.findAllPathsBetweenTwoNodes.style.fontSize = '100%'
        this.controlElements.findAllPathsBetweenTwoNodes.style.display = 'inline'
        this.controlElements.findAllPathsBetweenTwoNodes.style.marginLeft = '10px'
        this.controlElements.findAllPathsBetweenTwoNodes.innerText = 'Find all paths between two nodes'
        this.actionsDOMElement.appendChild(this.controlElements.findAllPathsBetweenTwoNodes)
        this.controlElements.findAllPathsBetweenTwoNodes
            .addEventListener('click', this.findAllPathsBetweenTwoNodesListener.bind(this))
    }

    findAllPathsBetweenTwoNodesListener() {
        alert('Pay attention that first selected node is going to be "from" node!')
        const selection = this.networkController.getNetwork().getSelection()
        if (selection.nodes.length && selection.edges.length) {
            alert('Select only two nodes!')
            return
        }
        if (selection.nodes.length !== 2) {
            alert('Select exactly two nodes!')
            return
        }
        if (this.getGraph().getType() === 'directed' || this.getGraph().getType() === 'not directed') {
            if (this.getGraph().isEmpty()) return;
            const matrix = Graph.getMatrixFromNetwork(this.networkController.getNetwork())
            this.spinner.spin(document.getElementById('network'))
            this.emptyUpdaters()
            this.connectionWorker.postMessage({type: this.getGraph().getType(), matrix, selection})
        } else alert("Graph connectivity is not defined!")
    }


    findDistanceBetweenTwoNodesListener() {
        alert('Pay attention that first selected node is going to be "from" node!')
        const selection = this.networkController.getNetwork().getSelection()
        if (selection.nodes.length && selection.edges.length) {
            alert('Select only two nodes!')
            return
        }
        if (selection.nodes.length !== 2) {
            alert('Select exactly two nodes!')
            return
        }
        const path = this.getGraph().findDistanceBetweenTwoNodes(selection.nodes[0], selection.nodes[1])
        alert(path ? `The distance is ${path}` : 'No path exists!')
    }

    manageControlElements(graph) {
        if (graph.isConnected() || graph.getType() === 'mixed' || graph.getType() === 'not applicable')
            this.controlElements.makeGraphConnectedButton.style.display = 'none'
        else
            this.controlElements.makeGraphConnectedButton.style.display = 'inline'
    }

    setConnectorReaction() {
        this.connectionWorker.onmessage = function (event) {
            this.spinner.stop()
            const data = event.data;
            if (data.length !== 0) {
                let final = "Paths:\n\n";
                const data = event.data
                data.forEach(path => {
                    path.forEach(node => {
                        const label = this.networkController.getNetwork().body.nodes[node].options.label
                        final += label + ' -> '
                    })
                    final = final.slice(0, -4)
                    final += '\n\n'
                })
                final += 'The smallest path:\n\n'
                let smallest = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].length < smallest) smallest = i
                }
                data[smallest].forEach(element => {
                    const label = this.networkController.getNetwork().body.nodes[element].options.label
                    final += label + ' -> '
                })
                final = final.slice(0, -4)
                alert(final)
            }
            this.setUpdaters()
            this.updateState()
        }.bind(this)

        this.connectionWorker.onerror = function (error) {
            alert(error.message)
            this.spinner.stop()
            this.setUpdaters()
            this.updateState()
        }.bind(this)
    }

    setWorkerReaction() {
        this.worker.onmessage = function (event) {
            const graph = this.getGraph()
            const network = this.networkController.getNetwork()
            if (event.data.type === 'directed') {
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
            } else if (event.data.type === 'not directed') {
                const path = Path.getPathFromArray(event.data.path.path)
                const pathArray = path.getPath()
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
                for (const edge in network.body.edges) {
                    network.body.edges[edge].options.arrows.to = false
                }
            }
            this.spinner.stop()
            this.setUpdaters()
            this.updateState()
        }.bind(this)

        this.worker.onerror = function (error) {
            alert(error.message)
            this.spinner.stop()
            this.setUpdaters()
            this.updateState()
        }.bind(this)
    }

    makeGraphConnectedListener(event) {
        const graph = this.getGraph()
        const network = this.networkController.getNetwork()
        if (graph.isEmpty()) return
        const matrix = Graph.getMatrixFromNetwork(network)
        this.spinner.spin(document.getElementById('network'))
        this.emptyUpdaters()
        this.worker.postMessage({type: graph.getType(), matrix})
    }

    emptyUpdaters() {
        this.networkController.disableInteractivity()
        this.networkController
            .documentEventListener
            .removeEventListeners(this.networkController
                .documentEventListener
                .eventListeners)
        this.networkController.rendererEventListener.removeAllListeners()
        this.controlElements.makeGraphConnectedButton.style.display = 'none'
        this.controlElements.findDistanceBetweenTwoNodes.style.display = 'none'
        this.controlElements.findAllPathsBetweenTwoNodes.style.display = 'none'

        this.updateRight = this.emptyFunction
        this.updateLeft = this.emptyFunction
        this.manageControlElements = this.emptyFunction
    }

    setUpdaters() {
        this.networkController.enableInteractivity()
        this.updateRight = this.updaters.updateRight
        this.updateLeft = this.updaters.updateLeft
        this.controlElements.findDistanceBetweenTwoNodes.style.display = 'inline'
        this.controlElements.findAllPathsBetweenTwoNodes.style.display = 'inline'

        this.manageControlElements = this.updaters.control
        this.networkController
            .documentEventListener
            .addEventListeners(this.networkController
                .documentEventListener
                .eventListeners)
        this.networkController.rendererEventListener.setRendererEventListeners()
    }

}
