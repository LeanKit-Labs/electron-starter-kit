let chai = require( "chai" );
chai.use( require( "sinon-chai" ) );
require( "sinon-as-promised" );
global.should = chai.should();

global._ = require( "lodash" );
global.sinon = require( "sinon" );
