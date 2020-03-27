import {Menu} from 'electron'
import {menu} from './menu.js'

export function setApplicationMenu() {
    const appMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(appMenu);
}



