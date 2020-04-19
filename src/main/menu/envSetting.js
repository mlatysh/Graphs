import {Menu} from 'electron'
import {menu} from './menu.js'
import {emptyMenu} from "./menu";

export function setApplicationMenu() {
    const appMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(appMenu);
}

export function unsetApplicationMenu() {
    const appMenu = Menu.buildFromTemplate(emptyMenu)
    Menu.setApplicationMenu(appMenu);
}



