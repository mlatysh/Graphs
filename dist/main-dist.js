/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/eventConsts/buitinConsts.js":
/*!**********************************************!*\
  !*** ./src/main/eventConsts/buitinConsts.js ***!
  \**********************************************/
/*! exports provided: consts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"consts\", function() { return consts; });\nconst consts = {\n    READY: 'ready',\n    WINDOW_ALL_CLOSED: 'window-all-closed',\n    ACTIVATE: 'activate'\n}\n\n\n//# sourceURL=webpack:///./src/main/eventConsts/buitinConsts.js?");

/***/ }),

/***/ "./src/main/eventConsts/mainActionConsts.js":
/*!**************************************************!*\
  !*** ./src/main/eventConsts/mainActionConsts.js ***!
  \**************************************************/
/*! exports provided: consts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"consts\", function() { return consts; });\nconst consts = {\n    MENU_HANDLERS_REQUESTS: {\n        SAVE_CURRENT_NETWORK_REQUEST: 'save-current-network-request',\n        OPEN_FILE_REQUEST: 'open-file-request',\n        NEW_FILE_CREATION_REQUEST: 'new-file-creation-request'\n    },\n    TOTAL_EXIT: 'total-exit',\n    SAVE_CURRENT_NETWORK: 'save-current-network',\n    OPEN_FILE: 'open-file',\n    CLEAR_SAVE_CURRENT_NETWORK: 'clear-save-current-network',\n    NEW_FILE_CREATION: 'new-file-creation'\n};\n\n\n//# sourceURL=webpack:///./src/main/eventConsts/mainActionConsts.js?");

/***/ }),

/***/ "./src/main/eventConsts/rendererActionConsts.js":
/*!******************************************************!*\
  !*** ./src/main/eventConsts/rendererActionConsts.js ***!
  \******************************************************/
/*! exports provided: consts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"consts\", function() { return consts; });\nconst consts = {\n GET_CURRENT_ACTIVE_NETWORK: 'get-current-active-network',\n CHANGE_ACTIVE_NETWORK: 'change-active-network',\n CREATE_NEW_ACTIVE_NETWORK: 'create-new-active-network'};\n\n\n//# sourceURL=webpack:///./src/main/eventConsts/rendererActionConsts.js?");

/***/ }),

/***/ "./src/main/fileWorker/fileWorker.js":
/*!*******************************************!*\
  !*** ./src/main/fileWorker/fileWorker.js ***!
  \*******************************************/
/*! exports provided: FileWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FileWorker\", function() { return FileWorker; });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass FileWorker {\n    static saveJsonToFile(jsonObj, filePath) {\n        fs__WEBPACK_IMPORTED_MODULE_0__[\"writeFileSync\"](filePath, JSON.stringify(jsonObj), 'utf-8')\n    }\n\n    static getJsonFromFile(filePath) {\n        return JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0__[\"readFileSync\"](filePath, 'utf-8'))\n    }\n}\n\n\n//# sourceURL=webpack:///./src/main/fileWorker/fileWorker.js?");

/***/ }),

/***/ "./src/main/main.js":
/*!**************************!*\
  !*** ./src/main/main.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _menu_envSetting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu/envSetting */ \"./src/main/menu/envSetting.js\");\n/* harmony import */ var _fileWorker_fileWorker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fileWorker/fileWorker */ \"./src/main/fileWorker/fileWorker.js\");\n/* harmony import */ var _eventConsts_buitinConsts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventConsts/buitinConsts */ \"./src/main/eventConsts/buitinConsts.js\");\n/* harmony import */ var _eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eventConsts/mainActionConsts */ \"./src/main/eventConsts/mainActionConsts.js\");\n/* harmony import */ var _menu_menuEventsEmitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/menuEventsEmitter */ \"./src/main/menu/menuEventsEmitter.js\");\n/* harmony import */ var _menu_menuHandlers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./menu/menuHandlers */ \"./src/main/menu/menuHandlers.js\");\n\n\n\n\n\n\n\n\nclass Main {\n    init() {\n        this.basicWindowTitle = 'Graphs [New File]';\n        this.mainWindow = undefined;\n        this.ipc = electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"];\n        this.menuEventsEmitter = undefined;\n        this.openedFile = undefined;\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].allowRendererProcessReuse = true;\n\n\n        this.setMainIpcHandlers()\n    }\n\n    setMainIpcHandlers() {\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on(_eventConsts_buitinConsts__WEBPACK_IMPORTED_MODULE_3__[\"consts\"].READY, this.onReady.bind(this));\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on(_eventConsts_buitinConsts__WEBPACK_IMPORTED_MODULE_3__[\"consts\"].WINDOW_ALL_CLOSED, this.onWindowAllClosed.bind(this));\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on(_eventConsts_buitinConsts__WEBPACK_IMPORTED_MODULE_3__[\"consts\"].ACTIVATE, this.onActivate.bind(this));\n\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__[\"consts\"].TOTAL_EXIT, this.onTotalExit.bind(this));\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__[\"consts\"].SAVE_CURRENT_NETWORK, this.onSaveCurrentNetwork.bind(this));\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__[\"consts\"].OPEN_FILE, this.onOpenFile.bind(this));\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__[\"consts\"].CLEAR_SAVE_CURRENT_NETWORK, this.onClearSaveNetwork.bind(this));\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__[\"consts\"].NEW_FILE_CREATION, this.onNewFileCreation.bind(this))\n    }\n\n\n    onNewFileCreation() {\n        this.setOpenedFile()\n    }\n\n    onClearSaveNetwork() {\n        if (this.openedFile) {\n            electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].emit(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__[\"consts\"].MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST, this.openedFile)\n        } else {\n            Object(_menu_menuHandlers__WEBPACK_IMPORTED_MODULE_6__[\"saveAsFileHandler\"])()\n        }\n    }\n\n    onSaveCurrentNetwork(event, args) {\n        _fileWorker_fileWorker__WEBPACK_IMPORTED_MODULE_2__[\"FileWorker\"].saveJsonToFile(args[0], args[1]);\n        this.setOpenedFile(args[1])\n    };\n\n    onWindowAllClosed() {\n        if (process.platform !== 'darwin') {\n            electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit();\n        }\n    }\n\n    onActivate() {\n        if (electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"].getAllWindows().length === 0) {\n            this.onReady()\n        }\n    }\n\n    onOpenFile(filePath) {\n        let serializedNetwork = _fileWorker_fileWorker__WEBPACK_IMPORTED_MODULE_2__[\"FileWorker\"].getJsonFromFile(filePath);\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].emit(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_4__[\"consts\"].MENU_HANDLERS_REQUESTS.OPEN_FILE_REQUEST, serializedNetwork);\n        this.setOpenedFile(filePath)\n    }\n\n    onReady() {\n        this.mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n            minWidth: 800,\n            minHeight: 600,\n            webPreferences: {\n                nodeIntegration: true\n            },\n            title: 'Graphs [New File]'\n        });\n        this.menuEventsEmitter = new _menu_menuEventsEmitter__WEBPACK_IMPORTED_MODULE_5__[\"MenuEventsEmitter\"](this.mainWindow);\n        Object(_menu_envSetting__WEBPACK_IMPORTED_MODULE_1__[\"setApplicationMenu\"])();\n        this.mainWindow.loadFile('index.html');\n        this.mainWindow.webContents.openDevTools()\n    }\n\n    setOpenedFile(fileName) {\n        if (fileName) {\n            this.openedFile = fileName;\n            this.mainWindow.setTitle('Graphs' + ' ' + '[ ' + this.openedFile + ' ]')\n        } else {\n            this.openedFile = undefined;\n            this.mainWindow.setTitle(this.basicWindowTitle)\n        }\n    }\n\n    onTotalExit() {\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()\n    }\n}\n\n(new Main()).init();\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/main/main.js?");

/***/ }),

/***/ "./src/main/menu/envSetting.js":
/*!*************************************!*\
  !*** ./src/main/menu/envSetting.js ***!
  \*************************************/
/*! exports provided: setApplicationMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setApplicationMenu\", function() { return setApplicationMenu; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ \"./src/main/menu/menu.js\");\n\n\n\nfunction setApplicationMenu() {\n    const appMenu = electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].buildFromTemplate(_menu_js__WEBPACK_IMPORTED_MODULE_1__[\"menu\"]);\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"].setApplicationMenu(appMenu);\n}\n\n\n\n\n\n//# sourceURL=webpack:///./src/main/menu/envSetting.js?");

/***/ }),

/***/ "./src/main/menu/menu.js":
/*!*******************************!*\
  !*** ./src/main/menu/menu.js ***!
  \*******************************/
/*! exports provided: menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"menu\", function() { return menu; });\n/* harmony import */ var _menuHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menuHandlers */ \"./src/main/menu/menuHandlers.js\");\n\n\n\nconst menu = [\n    {\n        label: \"File\",\n        submenu: [\n            {\n                label: \"New File\",\n                accelerator: \"CmdOrCtrl+N\",\n                click: _menuHandlers__WEBPACK_IMPORTED_MODULE_0__[\"newFileCreationHandler\"]\n            },\n            {\n                label: 'Open...',\n                accelerator: 'CmdOrCtrl+O',\n                click: _menuHandlers__WEBPACK_IMPORTED_MODULE_0__[\"openFileHandler\"]\n            },\n            {\n                label: 'Save',\n                accelerator: 'CmdOrCtrl+S',\n                click: _menuHandlers__WEBPACK_IMPORTED_MODULE_0__[\"saveFileHandler\"]\n            },\n            {\n                label: 'Save as...',\n                click: _menuHandlers__WEBPACK_IMPORTED_MODULE_0__[\"saveAsFileHandler\"]\n\n            },\n            {\n                type: 'separator'\n            },\n            {\n                label: 'Quit',\n                accelerator: 'CmdOrCtrl+Q',\n                click: _menuHandlers__WEBPACK_IMPORTED_MODULE_0__[\"appQuitHandler\"]\n            }\n        ]\n    }\n];\n\n\n\n//# sourceURL=webpack:///./src/main/menu/menu.js?");

/***/ }),

/***/ "./src/main/menu/menuEventsEmitter.js":
/*!********************************************!*\
  !*** ./src/main/menu/menuEventsEmitter.js ***!
  \********************************************/
/*! exports provided: MenuEventsEmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MenuEventsEmitter\", function() { return MenuEventsEmitter; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../eventConsts/mainActionConsts */ \"./src/main/eventConsts/mainActionConsts.js\");\n/* harmony import */ var _eventConsts_rendererActionConsts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../eventConsts/rendererActionConsts */ \"./src/main/eventConsts/rendererActionConsts.js\");\n\n\n\n\nclass MenuEventsEmitter {\n\n    constructor(mainWindow) {\n        this.eventsEmitter = mainWindow.webContents;\n        this.setMenuHandlers()\n    }\n\n    send(event, args) {\n        this.eventsEmitter.send(event, args);\n    }\n\n    setMenuHandlers() {\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__[\"consts\"].MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST, (filePath) => {\n            this.send(_eventConsts_rendererActionConsts__WEBPACK_IMPORTED_MODULE_2__[\"consts\"].GET_CURRENT_ACTIVE_NETWORK, filePath)\n        });\n\n\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__[\"consts\"].MENU_HANDLERS_REQUESTS.OPEN_FILE_REQUEST, (network) => {\n            this.send(_eventConsts_rendererActionConsts__WEBPACK_IMPORTED_MODULE_2__[\"consts\"].CHANGE_ACTIVE_NETWORK, network)\n        });\n\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__[\"consts\"].MENU_HANDLERS_REQUESTS.NEW_FILE_CREATION_REQUEST, () => this.send(_eventConsts_rendererActionConsts__WEBPACK_IMPORTED_MODULE_2__[\"consts\"].CREATE_NEW_ACTIVE_NETWORK))\n    }\n}\n\n\n//# sourceURL=webpack:///./src/main/menu/menuEventsEmitter.js?");

/***/ }),

/***/ "./src/main/menu/menuHandlers.js":
/*!***************************************!*\
  !*** ./src/main/menu/menuHandlers.js ***!
  \***************************************/
/*! exports provided: appQuitHandler, saveAsFileHandler, saveFileHandler, openFileHandler, newFileCreationHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appQuitHandler\", function() { return appQuitHandler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveAsFileHandler\", function() { return saveAsFileHandler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveFileHandler\", function() { return saveFileHandler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openFileHandler\", function() { return openFileHandler; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newFileCreationHandler\", function() { return newFileCreationHandler; });\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../eventConsts/mainActionConsts */ \"./src/main/eventConsts/mainActionConsts.js\");\n\n\n\nconst createOptionsObject = (title, type) => {\n    let rez = {\n        title: title,\n        defaultPath: getUserHome(),\n        dontAddToRecent: true,\n        properties: ['createDirectory'],\n        filters: [\n            {name: 'Graph', extensions: ['graph', 'gph']},\n            {name: 'Any', extensions: ['*']}\n        ]\n    };\n    if (type === 'openFile')\n        rez.properties.push(type);\n    return rez\n};\n\n\nfunction getUserHome() {\n    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];\n}\n\nconst openFileHandler = () => {\n    const fileChosenHandler = (args) => {\n        if (!args.canceled){\n            // WORKING\n            electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].emit(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__[\"consts\"].OPEN_FILE,\n                args.filePaths[0])}\n    };\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showOpenDialog(\n        createOptionsObject('Open file...', 'openFile')\n    ).then(fileChosenHandler)\n};\n\n\nconst saveFileHandler = () => {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].emit(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__[\"consts\"].CLEAR_SAVE_CURRENT_NETWORK);\n};\n\nconst saveAsFileHandler = () => {\n    const locationChosenHandler = (args) => {\n        if (!args.canceled)\n            electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].emit(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__[\"consts\"].MENU_HANDLERS_REQUESTS.SAVE_CURRENT_NETWORK_REQUEST,\n                args.filePath)\n    };\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"dialog\"].showSaveDialog(\n        createOptionsObject('Save graph as...')\n    ).then(locationChosenHandler)\n};\n\nconst newFileCreationHandler = () => {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].emit(_eventConsts_mainActionConsts__WEBPACK_IMPORTED_MODULE_1__[\"consts\"].MENU_HANDLERS_REQUESTS.NEW_FILE_CREATION_REQUEST)\n};\n\nconst appQuitHandler = () => {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].emit('total-exit')\n};\n\n\n\n\n//# sourceURL=webpack:///./src/main/menu/menuHandlers.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ })

/******/ });