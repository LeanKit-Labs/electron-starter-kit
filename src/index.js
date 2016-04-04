import { app, BrowserWindow } from "electron";
import path from "path";
import reload from "electron-reload";
require( "electron-debug" )();

const appPath = path.resolve( path.join( __dirname, "./" ) );
const urlPath = path.join( appPath, "app/index.html" );
reload( appPath );

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow( { width: 800, height: 600 } );
	mainWindow.loadURL( `file://${urlPath}` );
	// mainWindow.webContents.openDevTools();

	mainWindow.on( "closed", () => {
		mainWindow = null;
	} );
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
