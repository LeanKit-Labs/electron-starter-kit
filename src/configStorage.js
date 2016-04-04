const jetpack = require( "fs-jetpack" );

export default class ConfigStorage {

	constructor( initialConfig = null, isPersistent = false, configFilePath = "./", configFileName = "local.config.json" ) {
		this.persist = isPersistent;
		this.session = initialConfig || {};
		if ( this.persist ) {
			this.dataDir = jetpack.cwd( configFilePath );
			this.configFileName = configFileName;
			if ( this.dataDir.exists( this.configFileName ) ) {
				this.cache = this.dataDir.read( this.configFileName, "json" ) || {};
			} else {
				this.cache = initialConfig || {};
				this.dataDir.write( this.configFileName, this.cache, { atomic: true } );
			}
		}
	}

	loadFromFile( configFile ) {
		let config = jetpack.read( configFile, "json" ) || {};
		if ( this.persist ) {
			let state = this.dataDir.read( this.configFileName, "json" ) || {};
			Object.assign( state, config );
			this.cache = state;
			this.dataDir.write( this.configFileName, state, { atomic: true } );
		} else {
			Object.assign( this.session, config );
		}
	}

	getAll() {
		return this.persist ? ( this.dataDir.read( this.configFileName, "json" ) || {} ) : this.session;
	}

	setAll( state ) {
		if ( this.persist ) {
			this.cache = state;
			this.dataDir.write( this.configFileName, state, { atomic: true } );
		} else {
			this.session = state;
		}
	}

	getItem( key, defaultValue = null ) {
		let state = null;
		if ( this.persist ) {
			state = this.cache;
		} else {
			state = this.session;
		}
		// console.log( key, state, defaultValue );
		if ( state.hasOwnProperty( key ) ) {
			return state[ key ];
		}
		return ( defaultValue !== null ) ? defaultValue : null;
	}

	setItem( key, value ) {
		if ( this.persist ) {
			let state = this.dataDir.read( this.configFileName, "json" ) || {};
			state[ key ] = value;
			this.cache = state;
			this.dataDir.write( this.configFileName, state, { atomic: true } );
		} else {
			this.session[ key ] = value;
		}
	}
}
