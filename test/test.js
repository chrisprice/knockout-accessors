var ok = require('./lib/ok');

var obj = {};

ok.observable(obj, 'a', 'a');
ok.observable(obj, 'b', 'b');
ok.computed(obj, 'c', function() { return obj.a + obj.b; });
ok.expose(function() {
	obj.a.subscribe(function() {
		console.log('subscription', obj.a);
	});
});

console.log(obj.c);
console.log(obj.a = 4);
console.log(obj.c);

