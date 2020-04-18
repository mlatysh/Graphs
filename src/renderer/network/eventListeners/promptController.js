const prompt = require('electron-prompt')

export class PromptController {
    static init(options, thenCallback, parent, eventsHandler, extra) {
        if (eventsHandler)
            eventsHandler.callbacks.remover(eventsHandler.eventListeners)

        function then(r) {
            if (!r) {
                if (eventsHandler)
                    eventsHandler.callbacks.setter(eventsHandler.eventListeners)
                return
            }
            thenCallback.call(parent, r, extra)
            parent.parent.network.redraw()
            if (eventsHandler)
                eventsHandler.callbacks.setter(eventsHandler.eventListeners)
        }

        prompt(options).then(then).catch(console.error);
    }
}
