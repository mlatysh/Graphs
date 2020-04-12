const prompt = require('electron-prompt')

export class PromptController {
    static init(options, thenCallback, parent) {
        console.log('prompt entered')
        prompt(options)
            .then((r) => {
                if (!r) return
                thenCallback.call(parent, r)
                console.log(parent)
                parent.parent.network.redraw()
            }).catch(console.error);
    }
}
