const dialogs = require('dialogs');
const Dialogs = dialogs();

export class EventInitializer {

    constructor(parent) {
        this.parent = parent
    }

    initDeletion(selection) {
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
        this.parent.network.body.data.nodes.add(node)
    }

    __editNode(nodeId, newValue) {
        this.parent.network.body.data.nodes.update({id: nodeId, label: newValue})
    }

    __removeNode(nodeId) {
        this.parent.network.body.data.nodes.remove({id: nodeId})
    }

    __removeEdge(edgeId) {
        this.parent.network.body.data.edges.remove({id: edgeId})
    }
}
