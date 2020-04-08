import {Network} from './../../../libs/vis-network'
import {NetworkExporter} from "./IO operator/networkExporter"
import {RendererEventListener} from "./rendererEventListener";
import {NetworkImporter} from "./IO operator/networkImporter";
import {ipcRenderer as ipc} from 'electron';
import {OPTIONS} from "./networkInitOptions";

const dialogs = require('dialogs');
const Dialogs = dialogs();


export class NetworkController {
    constructor(networkCreationObject) {
        this.ipc = ipc;
        this.networkExporter = NetworkExporter;
        this.networkImporter = NetworkImporter;
        this.network = undefined;
        if (networkCreationObject) {
            this.network = new Network(networkCreationObject.container,
                networkCreationObject.data,
                OPTIONS);
        }
        this.networkCreationObject = networkCreationObject;
        this.eventListener = new RendererEventListener(this);
        this.setDocumentEventListeners();
        this.setInteractionEventListeners();
        this.eventListener.startMonitoring();

    }

    destroyCurrentNetwork() {
        try {
            this.network.destroy();
        } catch (e) {
            // It's ok
        } finally {
            this.network = undefined;
        }
    }

    setCurrentNetwork(networkCreationObject) {
        this.destroyCurrentNetwork();
        this.network = new Network(networkCreationObject.container,
            networkCreationObject.data, OPTIONS);
        this.setInteractionEventListeners()
    }

    setInteractionEventListeners() {

        this.network.on('doubleClick', params => {
            const e = params.event.srcEvent;
            this.network.releaseNode();
            if (params.nodes.length === 0 && params.edges.length === 0) {
                this.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, false)
            } else if (params.nodes.length !== 0) {
                this.initEditNode(params.nodes[0])
            }
        });

        this.network.on('oncontext', params => {
            this.initDeletion(this.network.getSelection())
        });

        this.network.on('click', params => {
            this.network.releaseNode();
            const e = params.event.srcEvent;
            if (e.shiftKey)
                this.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, true)


            else
            {
                console.log(this.network.getEdgeAt({x: params.pointer.DOM.x, y: params.pointer.DOM.y}))
                console.log(this.network.getNodeAt({x: params.pointer.DOM.x, y: params.pointer.DOM.y}))
            }
        });
    }


    setDocumentEventListeners() {
        document.addEventListener('keydown', (params) => {
            if (params.key === 'Shift') {
                this.network.addEdgeMode()
            }
        });

        document.addEventListener('keyup', (params) => {
            if (params.key === 'Shift') {
                this.network.disableEditMode()
            }
        });

        document.addEventListener('keydown', (params) => {
            if (params.key === 'Backspace') {
                this.initDeletion(this.network.getSelection())
            }
        });

        document.addEventListener('keydown', params => {
            if (params.code === 'KeyT') {
                const selected = this.network.getSelectedEdges()
                if (selected.length) {
                    selected.forEach((edge) => {
                        let to = this.network.body.edges[edge].options.arrows.to
                        to.enabled = !to.enabled;
                    })
                }
                this.network.redraw()
            }
        })

        document.addEventListener('keydown', params => {
            if (params.code === 'KeyS' && !params.metaKey) {
                const selected = this.network.getSelectedEdges()
                if (selected.length) {
                    selected.forEach((edge) => {
                        const fullEdge = this.network.body.data.edges.get(edge)
                        this.network.body.data.edges.update({
                            id: edge,
                            from: fullEdge.to,
                            to: fullEdge.from
                        })
                    })
                }
                this.network.redraw()
            }
        })
    }


    initDeletion(selection) {
        console.log(selection)
        if (selection.nodes)
            selection.nodes.forEach((node) => {
                this.__removeNode(node)
            })
        if (selection.edges)
            selection.edges.forEach((edge) => {
                this.__removeEdge(edge)
            })
    }


    initEditNode(nodeId) {
        Dialogs.prompt('Input node\'s new value: ', newValue => {
            if (newValue !== undefined) {
                this.__editNode(nodeId, newValue)
            }
        });
    }


    initAddNode(x, y, emptyNode) {
        const node = {};
        const id = (Math.random() * 1e7).toString(32);
        if (!emptyNode)
            Dialogs.prompt('Input new node value: ', value => {
                if (value !== undefined) {
                    node.id = id;
                    node.label = value;
                    node.x = x;
                    node.y = y;
                    this.__addNode(node)
                }
            });
        else {
            this.__addNode({id: id, x, y})
        }
    }


    __addNode(node) {
        this.network.body.data.nodes.add(node)
    }

    __editNode(nodeId, newValue) {
        this.network.body.data.nodes.update({id: nodeId, label: newValue})
    }

    __removeNode(nodeId) {
        this.network.body.data.nodes.remove({id: nodeId})
    }

    __removeEdge(edgeId) {
        this.network.body.data.edges.remove({id: edgeId})
    }

}
