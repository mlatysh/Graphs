import {consts as rendererActionConsts} from "../../main/eventConsts/rendererActionConsts";
import {consts as mainActionConsts} from "../../main/eventConsts/mainActionConsts";

export class RendererEventListener {
    constructor(controller) {
        this.controller = controller;
        this.setRendererEventListeners()
    }

    setRendererEventListeners() {

        this.controller.ipc.on(rendererActionConsts.GET_CURRENT_ACTIVE_NETWORK,
            (event, filePath) => {
                event.sender.send(mainActionConsts.SAVE_CURRENT_NETWORK,
                    [this.controller.networkExporter.getSerializedNetwork(this.controller.network), filePath])
            });


        this.controller.ipc.on(rendererActionConsts.CHANGE_ACTIVE_NETWORK,
            (event, network) => {
                this.controller.setCurrentNetwork(this.controller.networkImporter.getNetworkCreationObject(network))
            });


        this.controller.ipc.on(rendererActionConsts.CREATE_NEW_ACTIVE_NETWORK,
            (event) => {
                this.controller.destroyCurrentNetwork();
                event.sender.send(mainActionConsts.NEW_FILE_CREATION)
            })
    }


}
