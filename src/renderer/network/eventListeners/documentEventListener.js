import * as vis from '../../../../libs/vis-network'
import {COLORS} from '../colors'

export class DocumentEventListener {
    constructor(parent) {
        this.parent = parent
        this.isArrowing = false
        this.addEventListeners()
    }

    addEventListeners() {
        document.addEventListener('dblclick', this.onDoubleClick.bind(this))
        document.addEventListener('contextmenu', this.onContext.bind(this))
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('click', this.onClick.bind(this));
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
                    false)
        else if (nodes)
            this.parent
                .eventInitializer
                .initEditNode(nodes)
    }

    onContext(params) {
        this.parent.eventInitializer.initDeletion(this.parent.network.getSelection())
    }

    onKeyUp(params) {
        if (params.shiftKey && !params.metaKey) {
            this.parent.network.disableEditMode()
        }
    }

    onKeyDown(params) {
        if (params.code === 'KeyS' && !params.metaKey) {
            const selected = this.parent.network.getSelectedEdges()
            if (selected.length) {
                selected.forEach((edge) => {
                    const fullEdge = this.parent.network.body.data.edges.get(edge)
                    this.parent.network.body.data.edges.update({
                        id: edge,
                        from: fullEdge.to,
                        to: fullEdge.from
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
            this.parent.eventInitializer.initDeletion(this.parent.network.getSelection())
        }

        if (params.shiftKey && !params.metaKey) {
            this.parent.network.addEdgeMode()
        }

        if (params.code === 'KeyC' && !params.metaKey) {
            const prompt = require('electron-prompt');
            prompt({
                title: 'Prompt example',
                label: 'URL:',
                selectOptions:{
                   yellow: 'yellow',
                    blue:'blue',
                    green: 'green',
                    orange: 'orange',
                    red: 'red'
                },
                // alwaysOnTop: true,
                type: 'select'
            })
                .then((r) => {
                    const selection = this.parent.network.getSelection()
                    let color = r.toUpperCase()
                    const col = COLORS[color]
                    selection.nodes.forEach(nodeId => {
                        this.parent.network.body.data.nodes.update({id: nodeId, color:col, chosen: false})
                    })
                })
                .catch(console.error);
        }

    }

    onClick(params) {
        this.parent.network.releaseNode();
        const coordinates = this.parent.network.DOMtoCanvas({x: params.x, y: params.y})
        if (params.shiftKey && !this.parent.network.getNodeAt({x: params.x, y: params.y}))
            this.parent.eventInitializer.initAddNode(coordinates.x, coordinates.y, true)
    }
}
