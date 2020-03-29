import {Network} from './../../../libs/vis-network'
import {NetworkExporter} from "./networkExporter"
import {RendererEventListener} from "./rendererEventListener";
import {NetworkImporter} from "./networkImporter";
import {ipcRenderer as ipc} from 'electron';

const OPTIONS = {
    autoResize: true,
    clickToUse: false,
    interaction: {
        hover: true
    },
    manipulation: {
        enabled: true,
        addNode: function (node, callback) {
            node.label = 'Hi!';
            callback(node)
        },
        editNode: function (node, callback) {
            // SYNC PROMPT HERE!!!
            node.label = '';
            callback(node)
        },
        addEdge: function (edge, callback) {
            callback(edge)
        }
    }
};

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
        this.eventListener = new RendererEventListener(this);
        this.setInteractionEventListeners();
        this.eventListener.startMonitoring()
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

    setBasicNetworkHandlers() {
        this.network.editNodeMode()
    }

    setCurrentNetwork(networkCreationObject) {
        this.destroyCurrentNetwork();
        this.network = new Network(networkCreationObject.container,
            networkCreationObject.data, OPTIONS);
        this.setInteractionEventListeners()
    }

    setInteractionEventListeners() {
        this.network.on("doubleClick", params => {
            if (params.nodes.length !== 0) {
                this.network.editNode(params.nodes[0])
            }
        });

        this.network.on('click', params => {
            if (params.nodes.length === 0 && params.edges.length === 0) {
                this.network.addNodeMode();
                // this.network
                document.elementFromPoint(params.pointer.DOM.x, params.pointer.DOM.y).click()
            }
        });

        this.network.on('oncontext', params => {
            this.network.addEdgeMode()
        })
    }
}
