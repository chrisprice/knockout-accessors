var ko = require('knockout');

var exposed = false;

function wrap(obj, name, observable) {
	Object.defineProperty(obj, name, {
		  enumerable: false,
		  configurable: false,
		  get: function() {
		  	return exposed ? observable : observable();
		  },
		  set: function(value) {
			// not how knockout normally behaves but it's the more standard behaviour
			observable(value);
			return value;
		  }
	});
}


/**
 * Retrieve the underlying observable/computed from a property
 */
exports.expose = function(callback) {
	exposed = true;
	callback();
	exposed = false;
};

/**
 * Creates a property which wraps a new observable
 */
exports.observable = function(obj, name, initialValue) {
	wrap(obj, name, ko.observable(initialValue));
};

/**
 * Creates a property which wraps a new computed
 */
exports.computed = function(obj, name, args) {
	// this should toats assign the obj to the owner property
	wrap(obj, name, ko.computed(args));
};
