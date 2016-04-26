import { app, BrowserWindow, ipcMain, dialog, shell, Menu } from "electron";
import path from "path";
// import reload from "electron-reload";
import os from "os";
import shortcut from "electron-localshortcut";
import windowState from "./src/windowState";
import AppConfig from "./src/appConfig";
import ConfigStorage from "./src/configStorage";
require( "electron-debug" )();

const appPath = path.resolve( path.join( __dirname, "./" ) );
const urlPath = path.join( appPath, "index.html" );
// reload( appPath );

let store = new ConfigStorage( null, true, app.getPath( "userData" ) );
let appConfig = new AppConfig( store );

let mainWindow;
let mainWindowState = windowState( "main", {
	width: 800,
	height: 600
} );

const initMenus = () => {
	if ( os.platform() === "darwin" ) {
		const template = [ {
			label: "Application",
			submenu: [
				{ label: "About Application", selector: "orderFrontStandardAboutPanel:" },
				{ type: "separator" },
				{ label: "Preferences", accelerator: "CmdOrCtrl+,", click: function() {
					mainWindow.webContents.send( "open-settings" );
				} },
				{ type: "separator" },
				{ label: "Quit", accelerator: "Command+Q", click: function() {
					app.quit();
				} }
			] }, {
				label: "Edit",
				submenu: [
					{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
					{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
					{ type: "separator" },
					{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
					{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
					{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
					{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
				] }
			];

		Menu.setApplicationMenu( Menu.buildFromTemplate( template ) );
	} else {
		shortcut.register( mainWindow, "Ctrl+,", () => {
			mainWindow.webContents.send( "open-settings" );
		} );
	}
};

const createWindow = () => {
	mainWindow = new BrowserWindow( {
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		minWidth: 600,
		minHeight: 400
	} );

	if ( mainWindowState.isMaximized ) {
		mainWindow.maximize();
	}

	mainWindow.loadURL( `file://${urlPath}` );
	// mainWindow.webContents.openDevTools();

	mainWindow.on( "close", function() {
		mainWindowState.saveState( mainWindow );
	} );

	mainWindow.on( "closed", () => {
		mainWindow = null;
	} );

	initMenus();
};

app.on( "ready", createWindow );

app.on( "window-all-closed", () => {
	app.quit();
} );

app.on( "activate", () => {
	if ( mainWindow === null ) {
		createWindow();
	}
} );

ipcMain.on( "get-app-state", ( event, arg ) => {
	event.returnValue = appConfig.config;
} );

ipcMain.on( "set-app-state", ( event, arg ) => {
	appConfig.config = arg;
	event.returnValue = true;
} );
