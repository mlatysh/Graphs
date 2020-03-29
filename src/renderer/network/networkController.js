import {Network} from './../../../libs/vis-network'
import {NetworkExporter} from "./networkExporter"
import {RendererEventListener} from "./rendererEventListener";
import {NetworkImporter} from "./networkImporter";

const {ipcRenderer: ipc} = window.require('electron');
const OPTIONS = {
    autoResize: true,
    clickToUse: false,
    interaction: {
        hover: true
    },
    manipulation: {
        enabled: true
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
        this.setInteractionEventListeners()
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
        this.network.on("doubleClick", params => {
            if (params.nodes.length === 0 && params.edges.length === 0) {
                this.network.addNodeMode();
            }
        });

        this.network.on('click', params => {
            console.log(this.network.body.nodes, this.network.body.edges)
        })
    }
}
