export class InteractionEventListener {
    constructor(parent) {
        this.parent = parent
        this.addInteractionEventListeners()
    }

    addInteractionEventListeners() {
        this.parent.network.on('doubleClick', params => {
            console.log('dbl')
            const e = params.event.srcEvent;
            this.parent.network.releaseNode();
            if (params.nodes.length === 0 && params.edges.length === 0) {
                this.parent.eventInitializer.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, false)
            } else if (params.nodes.length !== 0) {
                this.parent.eventInitializer.initEditNode(params.nodes[0])
            }
        });

        this.parent.network.on('oncontext', params => {
            this.parent.eventInitializer.initDeletion(this.parent.network.getSelection())
        });

        this.parent.network.on('click', params => {
            const prompt = require('electron-prompt')
            this.parent.network.releaseNode();
            const e = params.event.srcEvent;
            if (e.shiftKey)
                this.parent.eventInitializer.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, true)
            // prompt({
            //     title: 'Choose color',
            //     label: 'Color:',
            //     value: 'red',
            //     inputAttrs: {
            //         type: 'text',
            //         required: true
            //     },
            //     type: 'input'
            // })
            //     .then((r) => {
            //         if (r === null) {
            //             console.log('user cancelled');
            //         } else {
            //             console.log(params, r)
            //             // this.onNodeColorChange(params.)
            //         }
            //     })
            //     .catch(console.error);
        })
    }
}
