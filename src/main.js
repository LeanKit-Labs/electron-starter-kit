import { app, BrowserWindow, ipcMain, dialog, shell, Menu } from "electron";
import path from "path";
import reload from "electron-reload";
import os from "os";
import shortcut from "electron-localshortcut";
require( "electron-debug" )();

const appPath = path.resolve( path.join( __dirname, "./" ) );
const urlPath = path.join( appPath, "app/index.html" );
reload( appPath );

let mainWindow;

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
	mainWindow = new BrowserWindow( { width: 800, height: 600 } );
	mainWindow.loadURL( `file://${urlPath}` );
	// mainWindow.webContents.openDevTools();

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
