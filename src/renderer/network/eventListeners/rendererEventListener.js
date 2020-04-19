import {consts as rendererActionConsts} from "../../../main/consts/rendererActionConsts";
import {consts as mainActionConsts} from "../../../main/consts/mainActionConsts";
import {getNetworkCreationObject} from "../networkCreationObject";

export class RendererEventListener {
    constructor(controller) {
        this.controller = controller;
        this.setRendererEventListeners()
    }

    addActionOnEvent(event, action) {
        this.controller.ipc.on(event, action)
    }

    setRendererEventListeners() {
        this.addActionOnEvent(rendererActionConsts.GET_CURRENT_ACTIVE_NETWORK,
            this.onGetCurrentActiveNetworkHandler.bind(this));
        this.addActionOnEvent(rendererActionConsts.CHANGE_ACTIVE_NETWORK,
            this.onChangeActiveNetworkHandler.bind(this));
        this.addActionOnEvent(rendererActionConsts.CREATE_NEW_ACTIVE_NETWORK,
            this.onCreateNewActiveNetworkHandler.bind(this))
    }

    removeAllListeners() {
        this.controller.ipc.removeAllListeners(rendererActionConsts.GET_CURRENT_ACTIVE_NETWORK)
        this.controller.ipc.removeAllListeners(rendererActionConsts.CHANGE_ACTIVE_NETWORK)
        this.controller.ipc.removeAllListeners(rendererActionConsts.CREATE_NEW_ACTIVE_NETWORK)
    }

    onGetCurrentActiveNetworkHandler(event, filePath) {
        event.sender.send(mainActionConsts.SAVE_CURRENT_NETWORK,
            [this.controller.networkExporter.getSerializedNetwork(this.controller.network), filePath])
    }

    onChangeActiveNetworkHandler(event, serializedNetwork) {
        this.controller.setCurrentNetwork(this.controller.networkImporter.NetworkCreationObject(serializedNetwork))
    }

    onCreateNewActiveNetworkHandler(event) {
        this.controller.setCurrentNetwork(getNetworkCreationObject([], []));
        event.sender.send(mainActionConsts.NEW_FILE_CREATION)
    }


}
