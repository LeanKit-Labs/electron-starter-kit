const _ = require( "lodash" );
const defaultConfig = {
	login: { host: "", email: "", password: "", proxy: "" }
};

export default class AppConfig {
	constructor( store ) {
		this.store = store;
	}

	get config() {
		const c = _.clone( defaultConfig );
		const config = this.store.getAll();
		Object.assign( c, config );
		return c;
	}
	set config( obj ) {
		this.store.setAll( obj );
	}

	get defaults() {
		return defaultConfig;
	}

	get login() {
		return this.store.getItem( "login", defaultConfig.login );
	}
	set login( value ) {
		this.store.setItem( "login", value );
	}
}
