var AV = require('leanengine');

AV.Cloud.define('firstPageProduct', function(request) {
	return 'Hello world!';
});

// module.exports = function() {
// 	AV.Cloud.define('firstPageProduct', function(request) {
// 		return 'Hello world!';
// 	});
// }