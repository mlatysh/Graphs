import {COLORS} from '../consts/colors'
import {PromptController} from "./promptController";
import {DIALOG_OPTIONS} from "../consts/dialogOptions";

export class DocumentEventListener {
    constructor(parent) {
        this.parent = parent
        this.eventListeners = {
            onDoubleClick: this.onDoubleClick.bind(this),
            onContext: this.onContext.bind(this),
            onKeyDown: this.onKeyDown.bind(this),
        }
        this.callbacks = {
            setter: this.addEventListeners,
            remover: this.removeEventListeners
        }
        this.addEventListeners(this.eventListeners)
    }

    removeEventListeners(eventListeners) {
        const net = document.getElementById('network')
        net.removeEventListener('dblclick', eventListeners.onDoubleClick)
        net.removeEventListener('contextmenu', eventListeners.onContext)
        document.removeEventListener('keydown', eventListeners.onKeyDown);
    }

    addEventListeners(eventListeners) {
        const net = document.getElementById('network')
        net.addEventListener('dblclick', eventListeners.onDoubleClick)
        net.addEventListener('contextmenu', eventListeners.onContext)
        document.addEventListener('keydown', eventListeners.onKeyDown);
    }

    onDoubleClick(params) {
        this.parent.network.releaseNode();
        const coordinates = this.parent.network.DOMtoCanvas({x: params.x, y: params.y})
        const node = this.parent.network.getNodeAt(this.parent.network.canvasToDOM(coordinates))
        const edge = this.parent.network.getEdgeAt(this.parent.network.canvasToDOM(coordinates))
        console.log(edge, node)
        if (!node && !edge)
            PromptController.init(this.callNodeCreationDialog(true),
                this.callNodeCreationDialog(), this,
                {callbacks: this.callbacks, eventListeners: this.eventListeners},
                coordinates)
        else if (node) {
            PromptController.init(this.callNodeRenamingDialog(true),
                this.callNodeRenamingDialog(), this,
                {callbacks: this.callbacks, eventListeners: this.eventListeners})
        } else if (edge) {
            PromptController.init(this.callEdgeRenamingDialog(true),
                this.callEdgeRenamingDialog(), this,
                {callbacks: this.callbacks, eventListeners: this.eventListeners})
        }
    }

    onContext(params) {
        const selectedNodes = this.parent.network.getSelectedNodes()
        if (selectedNodes.length === 1) this.parent.network.focus(selectedNodes[0], {animation: true})
        else this.parent.network.fit({animation: true})
    }

    callNodeCreationDialog(options = false) {
        if (options) return DIALOG_OPTIONS.CREATING_NODE
        else {
            return function (response, extra) {
                const node = {};
                node.id = (Math.random() * 1e7).toString(32);
                node.label = response;
                node.x = extra.x;
                node.y = extra.y;
                this.parent.network.body.data.nodes.add(node)
            }
        }
    }

    callNodeRenamingDialog(options = false) {
        if (options) return DIALOG_OPTIONS.RENAMING_NODE
        else return function (response) {
            const selected = this.parent.network.getSelectedNodes()
            selected.forEach(nodeId => {
                this.parent.network.body.data.nodes.update({id: nodeId, label: response})
            })
        }
    }

    callEdgeRenamingDialog(options = false) {
        if (options) return DIALOG_OPTIONS.RENAMING_EDGE
        else return function (response) {
            const selected = this.parent.network.getSelectedEdges()
            selected.forEach(edgeId => {
                this.parent.network.body.data.edges.update({id: edgeId, label: response})
            })
        }
    }

    callNodeShapeSelectionDialog(options = false) {
        if (options) return DIALOG_OPTIONS.NODE_SHAPE_SELECTION
        else return function (response) {
            const selected = this.parent.network.getSelectedNodes()
            selected.forEach(nodeId => {
                this.parent.network.body.data.nodes.update({id: nodeId, shape: response})
            })
        }
    }

    callColorSelectionDialog(options = false) {
        if (options) return DIALOG_OPTIONS.COLOR_SELECTION
        else return function (response) {
            const selection = this.parent.network.getSelection()
            let color = response.toUpperCase()
            const col = COLORS[color]
            selection.nodes.forEach(nodeId => {
                this.parent.network.body.data.nodes.update({id: nodeId, color: col})
            })
            selection.edges.forEach(edgeId => {
                this.parent.network.body.data.edges.update(
                    {
                        id: edgeId,
                        color: {
                            color: col.border,
                            hover: col.hover.border,
                            highlight: col.highlight.border
                        }
                    })
            })
        }
    }

    onKeyDown(params) {
        if (params.code === 'KeyS' && !params.metaKey) {
            const selected = this.parent.network.getSelectedEdges()
            if (selected.length) {
                selected.forEach((edge) => {
                    const edgeObject = this.parent.network.body.edges[edge]
                    if (edgeObject.options.arrows.to.enabled)
                        this.parent.network.body.data.edges.update({
                            id: edge,
                            from: edgeObject.toId,
                            to: edgeObject.fromId,
                            arrows: edgeObject.options.arrows
                        })
                })
            }
            this.parent.network.redraw()
        } else if (params.code === 'KeyT' && !params.metaKey) {
            const selected = this.parent.network.getSelection()
            const edges = selected.edges
            const nodes = selected.nodes
            if (nodes.length && edges.length) {
                alert('Select only edges or only nodes!')
                return
            }
            if (edges.length) {
                edges.forEach((edge) => {
                    const to = this.parent.network.body.edges[edge].options.arrows.to
                    to.enabled = !to.enabled;
                })
            }
            if (nodes.length) {
                PromptController.init(this.callNodeShapeSelectionDialog(true),
                    this.callNodeShapeSelectionDialog(), this)
            }
        } else if (params.key === 'Backspace' && !params.metaKey) {
            this.parent.eventInitializer.initDeletion(this.parent.network.getSelection(),
                this.callbacks,
                this.eventListeners)
        } else if (params.shiftKey && !params.metaKey) {
            if (this.parent.network.manipulation.editMode)
                this.parent.network.disableEditMode()
            else this.parent.network.addEdgeMode()
        } else if (params.code === 'KeyC' && !params.metaKey) {
            const selection = this.parent.network.getSelection()
            if (selection.nodes.length || selection.edges.length) {
                PromptController.init(this.callColorSelectionDialog(true),
                    this.callColorSelectionDialog(), this)
            }
        }
    }
}
