import {
    appQuitHandler,
    newFileCreationHandler,
    openFileHandler,
    saveAsFileHandler,
    saveFileHandler,
} from './menuHandlers'


export const emptyMenu = [
    {
        label: 'Unavailable'
    }
]

export const menu = [
    {
        label: "File",
        submenu: [
            {
                label: "New File",
                accelerator: "CmdOrCtrl+N",
                click: newFileCreationHandler
            },
            {
                label: 'Open...',
                accelerator: 'CmdOrCtrl+O',
                click: openFileHandler
            },
            {
                label: 'Save',
                accelerator: 'CmdOrCtrl+S',
                click: saveFileHandler
            },
            {
                label: 'Save as...',
                click: saveAsFileHandler

            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: appQuitHandler
            }
        ]
    }
];

