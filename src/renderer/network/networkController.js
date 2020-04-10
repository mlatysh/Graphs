import {Network} from '../../../libs/vis-network'
import {NetworkExporter} from "./IO operator/networkExporter"
import {RendererEventListener} from "./eventListeners/rendererEventListener";
import {NetworkImporter} from "./IO operator/networkImporter";
import {ipcRenderer as ipc} from 'electron';
import {OPTIONS} from "./networkInitOptions";
import {DocumentEventListener} from "./eventListeners/documentEventListener";
import {EventInitializer} from "./eventListeners/eventInitializers";


export class NetworkController {
    constructor(networkCreationObject) {
        this.ipc = ipc;
        this.networkCreationObject = networkCreationObject;
        this.infoCallback = null
        this.init()
        this.networkExporter = NetworkExporter;
        this.networkImporter = NetworkImporter;
        this.rendererEventListener = new RendererEventListener(this);
        this.eventInitializer = new EventInitializer(this);
        this.resetEventListeners()
    }

    addInfoCallback(callback) {
        this.infoCallback = callback
        const callbacks = this.network._callbacks

        for (const callbacksArray in callbacks) {
            if (callbacks.hasOwnProperty(callbacksArray))
                callbacks[callbacksArray].push(this.infoCallback)
        }
        this.infoCallback()
    }

    init() {
        this.networkCreationObject ?
            this.network = new Network(this.networkCreationObject.container,
                this.networkCreationObject.data,
                OPTIONS) :
            this.network = undefined;
    }

    resetEventListeners() {
        this.documentEventListener = new DocumentEventListener(this);
    }


    __destroyCurrentNetwork() {
        try {
            this.network.destroy();
        } catch (e) {
        } finally {
            this.network = undefined;
        }
    }

    setCurrentNetwork(networkCreationObject) {
        this.__destroyCurrentNetwork();
        this.network = new Network(networkCreationObject.container,
            networkCreationObject.data, OPTIONS);
        this.resetEventListeners()
        this.infoCallback()
    }

    getNetwork() {
        return this.network
    }
}
