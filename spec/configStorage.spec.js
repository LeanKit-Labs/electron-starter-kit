import ConfigStorage from "../src/configStorage";
import fs from "fs-jetpack";

describe( "Config Storage", () => {
	describe( "session config", () => {
		let store;
		before( () => {
			store = new ConfigStorage( { key1: "val1" } );
			store.setItem( "key2", "val2" );
		} );

		it( "should have default config", () => {
			let val = store.getItem( "key1" );
			val.should.equal( "val1" );
		} );

		it( "should have added config", () => {
			let val = store.getItem( "key2" );
			val.should.equal( "val2" );
		} );

		it( "should have updated config", () => {
			store.setItem( "key1", "val2" );
			let val = store.getItem( "key1" );
			val.should.equal( "val2" );
		} );

		it( "should get all config", () => {
			let result = store.getAll();
			result.should.deep.equal( { key1: "val2", key2: "val2" } );
		} );
	} );

	describe( "persistent config", () => {
		let configFile = "./spec/test-files/test.config";
		let store;

		before( () => {
			fs.write( configFile, { key2: "already-here" } );
			store = new ConfigStorage( { bogus: true }, true, "./spec/test-files/", "test.config" );
			store.setItem( "key1", "val1" );
		} );

		after( () => {
			store = null;
			fs.remove( configFile );
		} );

		it( "should not have default config", () => {
			let val = store.getItem( "bogus", null );
			should.not.exist( val );
		} );

		it( "should get stored config value from existing file", () => {
			let val = store.getItem( "key2" );
			val.should.equal( "already-here" );
		} );

		it( "should get stored config value", () => {
			let val = store.getItem( "key1" );
			val.should.equal( "val1" );
		} );

		it( "should update config", () => {
			store.setItem( "key1", "val2" );
			let val = store.getItem( "key1" );
			val.should.equal( "val2" );
		} );

		it( "should get all config", () => {
			let result = store.getAll();
			result.should.deep.equal( { key2: "already-here", key1: "val2" } );
		} );

		it( "should create the config file", () => {
			let exists = fs.exists( configFile );
			exists.should.equal( "file" );
		} );
	} );

	describe( "loadFromFile", () => {
		let otherConfigFile = "./spec/test-files/other-config.json";
		let store;

		before( () => {
			let config = { key2: "val-from-file", key3: "val3" };
			fs.write( otherConfigFile, config );
			store = new ConfigStorage( { key1: "val1", key2: "val2" }, false );
			store.loadFromFile( otherConfigFile );
		} );

		it( "should merge values from config file", () => {
			let config = store.getAll();
			config.should.deep.equal( { key1: "val1", key2: "val-from-file", key3: "val3" } );
		} );

		after( () => {
			fs.remove( otherConfigFile );
		} );
	} );
} );
