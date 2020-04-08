export class DocumentEventListener {
    constructor(parent) {
        this.parent = parent
        this.addEventListeners()
    }

    addEventListeners() {
        document.addEventListener('keydown', (params) => {
            if (params.key === 'Shift' && !params.metaKey) {
                this.parent.network.addEdgeMode()
            }
        });

        document.addEventListener('keyup', (params) => {
            if (params.key === 'Shift' && !params.metaKey) {
                this.parent.network.disableEditMode()
            }
        });

        document.addEventListener('keydown', (params) => {
            if (params.key === 'Backspace' && !params.metaKey) {
                this.parent.eventInitializer.initDeletion(this.parent.network.getSelection())
            }
        });

        document.addEventListener('keydown', params => {
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
        })

        document.addEventListener('keydown', params => {
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
        })

        // document.addEventListener('keydown', params => {
        //     if (params.code === 'KeyC' && !params.metaKey)
        //         })
    }
}
