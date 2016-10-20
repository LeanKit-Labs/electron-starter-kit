// Simple module to help you remember the size and position of windows.
// Can be used for more than one window, just construct many
// instances of it and give each different name.

import { app } from "electron";
import jetpack from "fs-jetpack";

export default function( name, defaults ) {
	const userDataDir = jetpack.cwd( app.getPath( "userData" ) );
	const stateStoreFile = `window-state-${ name }.json`;
	let state = {
		width: defaults.width,
		height: defaults.height
	};

	try {
		const loadedState = userDataDir.read( stateStoreFile, "json" );
		if ( loadedState != null ) {
			state = loadedState;
		}
	} catch ( err ) {
		// For some reason json can't be read.
		// No worries, we have defaults.
	}

	const saveState = function( win ) {
		if ( !win.isMaximized() && !win.isMinimized() ) {
			const position = win.getPosition();
			const size = win.getSize();
			state.x = position[ 0 ];
			state.y = position[ 1 ];
			state.width = size[ 0 ];
			state.height = size[ 1 ];
		}
		state.isMaximized = win.isMaximized();
		userDataDir.write( stateStoreFile, state, { atomic: true } );
	};

	return {
		get x() {
			return state.x;
		},
		get y() {
			return state.y;
		},
		get width() {
			return state.width;
		},
		get height() {
			return state.height;
		},
		get isMaximized() {
			return state.isMaximized;
		},
		saveState
	};
}
