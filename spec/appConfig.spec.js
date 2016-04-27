import ConfigStorage from "../src/src/configStorage";
import AppConfig from "../src/src/appConfig";
import fs from "fs-jetpack";

describe( "App Config", () => {
	describe( "session config", () => {
		let appConfig;
		let defaultConfig;
		before( () => {
			let store = new ConfigStorage();
			appConfig = new AppConfig( store );
			defaultConfig = appConfig.defaults;
		} );

		it( "should get all defaults", () => {
			let config = appConfig.config;
			should.exist( config );
			let expected = defaultConfig;
			config.should.deep.equal( expected );
		} );

		it( "should get login", () => {
			let config = appConfig.login;
			should.exist( config );
			let expected = defaultConfig.login;
			config.should.deep.equal( expected );
		} );

		it( "should set login", () => {
			let val = appConfig.login;
			should.exist( val );
			let expected = defaultConfig.login;
			val.should.deep.equal( expected );
			appConfig.login = { host: "localhost" };
			val = appConfig.login;
			val.should.not.deep.equal( expected );
		} );
	} );

	describe( "persistent config", () => {
		let appConfig;
		let defaultConfig;
		let configFile = "./spec/test-files/test.app.config";

		before( () => {
			let store = new ConfigStorage( defaultConfig, true, "./spec/test-files/", "test.app.config" );
			appConfig = new AppConfig( store );
			defaultConfig = appConfig.defaults;
		} );

		after( () => {
			fs.remove( configFile );
		} );

		it( "should get all defaults", () => {
			let config = appConfig.config;
			should.exist( config );
			let expected = defaultConfig;
			config.should.deep.equal( expected );
		} );

		it( "should get login", () => {
			let config = appConfig.login;
			should.exist( config );
			let expected = defaultConfig.login;
			config.should.deep.equal( expected );
		} );

		it( "should set login", () => {
			let val = appConfig.login;
			should.exist( val );
			let expected = defaultConfig.login;
			val.should.deep.equal( expected );
			appConfig.login = { host: "localhost" };
			val = appConfig.login;
			val.should.not.deep.equal( expected );
		} );
	} );
} );
