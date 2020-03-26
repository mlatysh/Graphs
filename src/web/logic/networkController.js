const getNetworkCreationObject = require('./networkCreationObject').getNetworkCreationObject;

class NetworkController {

    constructor(containerID, networkCreationObject) {
        this.container = document.getElementById(containerID);
        network ?
            this.network = new vis.Network(container, networkCreationObject.data, networkCreationObject.options) :
            this.network = null;

    }

    static objectToArray(object) {
        return Object.keys(object).map(function (key) {
            object[key].id = key;
            return object[key]
        });
    }

    destroyCurrentNetwork() {
        this.network.destroy();
        this.network = null
    }

    setCurrentNetwork(networkCreationObject) {
        this.network = new vis.Network(this.container, networkCreationObject.data, networkCreationObject.options)
    }

    doesNetworkExist() {
        return Boolean(this.network)
    }
}
