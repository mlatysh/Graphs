const prompt = require('electron-prompt')

export class PromptController {
    static init(options, thenCallback, parent, eventsHandler) {
        if (eventsHandler)
            eventsHandler.callbacks.remover(eventsHandler.eventListeners)
        prompt(options)
            .then((r) => {
                if (!r) {
                    if (eventsHandler)
                        eventsHandler.callbacks.setter(eventsHandler.eventListeners)
                    return
                }
                thenCallback.call(parent, r)
                console.log(parent)
                parent.parent.network.redraw()
                if (eventsHandler)
                    eventsHandler.callbacks.setter(eventsHandler.eventListeners)
            }).catch(console.error);
    }
}
