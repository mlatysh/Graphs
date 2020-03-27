import {remote} from 'electron'
import {menu} from './menu.js'

const appMenu = remote.Menu.buildFromTemplate(menu);

remote.Menu.setApplicationMenu(appMenu);


