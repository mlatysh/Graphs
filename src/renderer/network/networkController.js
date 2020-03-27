import {Network} from './../../../libs/vis-network'
import {getNetworkRepresentationObject} from "./networkRepresentationObject";


const objectToArray = object => {
    return Object.keys(object).map(function (key) {
        object[key].id = key;
        return object[key]
    });
};

export class NetworkController {
    constructor(networkCreationObject) {
        this.networks = [];
        if (networkCreationObject) {
            let network = new Network(networkCreationObject.container, networkCreationObject.data, networkCreationObject.options);
            let networkRepresentationObject = getNetworkRepresentationObject(networkCreationObject, network, true);
            this.networks.push(networkRepresentationObject)
        }
    }

    destroyCurrentNetwork() {
        let activeNetwork = undefined;
        this.networks.forEach((network) => {
            if (network.active) {
                activeNetwork = network
            }
        });
        activeNetwork.destroy();
        const activeNetworkIndex = this.networks.indexOf(activeNetwork);
        this.networks.slice(activeNetworkIndex, 1)
    }

    addAndSetCurrentNetwork(networkCreationObject) {
        let network = new Network(networkCreationObject.container, networkCreationObject.data, networkCreationObject.options);
        let networkRepresentationObject = getNetworkRepresentationObject(networkCreationObject, network, true);
        this.networks.push(networkRepresentationObject)
    }
}
