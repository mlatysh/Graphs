const {remote} = require('electron');
const {Menu} = remote.require('electron');
const {menu} = require('./menu/menu.js')


const appMenu = Menu.buildFromTemplate(menu);

Menu.setApplicationMenu(appMenu);


