import {openFileHandler, saveFileHandler, saveAsFileHandler, appQuitHandler} from './menuHandlers'


export const menu = [
    {
        label: "File",
        submenu: [
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

