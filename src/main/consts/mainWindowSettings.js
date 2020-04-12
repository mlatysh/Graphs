import path from "path";

export const MAIN_WINDOW_SETTINGS = {
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
        nodeIntegration: true
    },
    title: 'Graphs [New File]',
    show: false,
    icon: path.join(__dirname, 'assets/icon/icon.png'),
    webSecurity: false
}

export const BASIC_WINDOW_TITLE = 'Graphs [New File]'
