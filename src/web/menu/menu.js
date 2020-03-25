const {handlers} = require('./menuHandlers')

console.log(handlers.openFileHandler)


const menu = [
    {
        label: "File",
        submenu: [
            {
                label: 'Open...',
                accelerator: 'CmdOrCtrl+O',
                click: handlers.openFileHandler
            },
            {
                label: 'Save',
                accelerator: 'CmdOrCtrl+S',
                click: handlers.saveFileHandler
            },
            {
                label: 'Save as...',
                click: handlers.saveAsFileHandler

            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: handlers.appQuitHandler
            }
        ]
    }
]

exports.menu = menu
