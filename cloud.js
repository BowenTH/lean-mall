var AV = require('leanengine');
require('./cloud/product');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request) {
  return 'Hello world!';
});
