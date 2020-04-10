import {COLORS} from '../consts/colors'

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
        document.removeEventListener('dblclick', eventListeners.onDoubleClick)
        document.removeEventListener('contextmenu', eventListeners.onContext)
        document.removeEventListener('keydown', eventListeners.onKeyDown);
    }

    addEventListeners(eventListeners) {
        document.addEventListener('dblclick', eventListeners.onDoubleClick)
        document.addEventListener('contextmenu', eventListeners.onContext)
        document.addEventListener('keydown', eventListeners.onKeyDown);
    }

    onDoubleClick(params) {
        this.parent.network.releaseNode();
        const coordinates = this.parent.network.DOMtoCanvas({x: params.x, y: params.y})
        const nodes = this.parent.network.getNodeAt(this.parent.network.canvasToDOM(coordinates))
        const edges = this.parent.network.getEdgeAt(this.parent.network.canvasToDOM(coordinates))

        if (!nodes && !edges)
            this.parent
                .eventInitializer
                .initAddNode(coordinates.x,
                    coordinates.y,
                    false,
                    this.callbacks,
                    this.eventListeners)
        else if (nodes)
            this.parent
                .eventInitializer
                .initEditNode(nodes, this.callbacks, this.eventListeners)
    }

    onContext(params) {
        const selectedNodes = this.parent.network.getSelectedNodes()
        if (selectedNodes.length === 1) this.parent.network.focus(selectedNodes[0], {animation: true})
        else this.parent.network.fit({animation: true})
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
        }

        if (params.code === 'KeyT' && !params.metaKey) {
            const selected = this.parent.network.getSelectedEdges()
            if (selected.length) {
                selected.forEach((edge) => {
                    let to = this.parent.network.body.edges[edge].options.arrows.to
                    to.enabled = !to.enabled;
                })
            }
            this.parent.network.redraw()
        }

        if (params.key === 'Backspace' && !params.metaKey) {
            this.parent.eventInitializer.initDeletion(this.parent.network.getSelection(), this.callbacks, this.eventListeners)
        }

        if (params.shiftKey && !params.metaKey) {
            if (this.parent.network.manipulation.editMode)
                this.parent.network.disableEditMode()
            else this.parent.network.addEdgeMode()
        }

        if (params.code === 'KeyC' && !params.metaKey) {
            const selection = this.parent.network.getSelection()
            if (selection.nodes.length || selection.edges.length) {
                const prompt = require('electron-prompt');
                prompt({
                    title: 'Choose color',
                    label: 'Color: ',
                    selectOptions: {
                        yellow: 'yellow',
                        blue: 'blue',
                        green: 'green',
                        orange: 'orange',
                        red: 'red'
                    },
                    alwaysOnTop: true,
                    type: 'select'
                })
                    .then((r) => {
                        if (!r) return
                        const selection = this.parent.network.getSelection()
                        let color = r.toUpperCase()
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
                        this.parent.network.redraw()
                    })
                    .catch(console.error);
            }
        }
    }
}
