import {Network} from './../../../libs/vis-network'
import {NetworkExporter} from "./networkExporter"
import {consts as rendererActionConsts} from "../../main/eventConsts/rendererActionConsts";
import {consts as mainActionConsts} from "../../main/eventConsts/mainActionConsts";

const {ipcRenderer: ipc} = window.require('electron');

export class NetworkController {
    constructor(networkCreationObject) {
        this.networkExporter = NetworkExporter;
        this.network = undefined;
        if (networkCreationObject) {
            this.network = new Network(networkCreationObject.container,
                networkCreationObject.data,
                networkCreationObject.options);
        }
        this.addEventListeners()
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
            networkCreationObject.data,
            networkCreationObject.options);
    }

    addEventListeners() {

        ipc.on(rendererActionConsts.GET_CURRENT_ACTIVE_NETWORK, (event, filePath) => {
            event.sender.send(mainActionConsts.SAVE_CURRENT_NETWORK,
                [this.networkExporter.getSerializedNetwork(this.network), filePath])
        })



    }
}
