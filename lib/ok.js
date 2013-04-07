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
			observable(value);
		  }
	});
}

var ok = {};

/**
 * Retrieve the underlying observable/computed from a property
 */
ok.expose = function(callback) {
	exposed = true;
	callback();
	exposed = false;
};

/**
 * Creates a property which wraps a new observable
 */
ok.observable = function(obj, name, initialValue) {
	wrap(obj, name, ko.observable(initialValue));
};

/**
 * Creates a property which wraps a new computed
 */
ok.dependentObservable = ok.computed = function(obj, name, args) {
	// this should toats assign the obj to the owner property
	wrap(obj, name, ko.computed(args));
};

ok.applyBindings = ko.applyBindings;

module.exports = ok;

