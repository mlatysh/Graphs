import {Network} from './../../../libs/vis-network'
import {NetworkExporter} from "./networkExporter"
import {RendererEventListener} from "./rendererEventListener";
import {NetworkImporter} from "./networkImporter";

const {ipcRenderer: ipc} = window.require('electron');

export class NetworkController {
    constructor(networkCreationObject) {
        this.ipc = ipc;
        this.networkExporter = NetworkExporter;
        this.networkImporter = NetworkImporter;
        this.network = undefined;
        if (networkCreationObject) {
            this.network = new Network(networkCreationObject.container,
                networkCreationObject.data,
                networkCreationObject.options);
        }
        this.eventListener = new RendererEventListener(this);
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
        console.log(networkCreationObject);
        this.destroyCurrentNetwork();
        this.network = new Network(networkCreationObject.container,
            networkCreationObject.data,
            networkCreationObject.options);
    }
}
