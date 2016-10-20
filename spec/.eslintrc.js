module.exports = {
	extends: [ "leankit/test" ],
	globals: {
		testHelpers: false,
		should: false
	},
	rules: {
		"no-magic-numbers": 0,
		"max-nested-callbacks": 0
	}
};
