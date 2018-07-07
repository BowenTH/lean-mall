/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-14 15:58:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-07 14:12:41
 */
var express = require("express");
var router = express.Router();
var crypto = require("crypto");

function sha1(str){
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

var WxJSConfig = require("wxjssdkconfig");
//该实例化不要放在下面的路由函数中，需要保证每次都是同一个对象调用getJSSConfig方法
// var wxJsConfig = new WxJSConfig("wxba0d86a1b518c1ac", "7538614d1836f05a1e5ef02f955f5c1b");// test account
var wxJsConfig = new WxJSConfig("wx8d917354c31c8a09", "7c8f60544ab45278b8adfed9d231a5b8");

router.get('/', function(req, res, next) {
  if(req.query.type == 'token_check') {
    url = req.query.url
     wxJsConfig.getJSConfig(url, function(error, configData) {
      var result = {
        errNo: 0,
        errObj: null,
        data: null
      };
      if (error) {
        result.errNo = 1;
        result.errObj = error;
      } else {
        result.data = configData;
      }
      res.json(result.data)
		});
		console.log('debug card----');
		
// 调试卡券
		setTimeout(() => {
			wxJsConfig.getCardSign('pX2-vjql158alrpMoc2OVhjJi_IM', function(error, configData) {
				var result = {
					errNo: 0,
					errObj: null,
					data: null
				};
				if (error) {
					result.errNo = 1;
					result.errObj = error;
				} else {
					result.data = configData;
				}
				console.log('reuslt-card:', JSON.stringify(result));
			});
		}, 1000);
  } else if(req.query.signature) {
    var query = req.query;
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = 'bowentoken' //这里是你在微信开发者中心页面里填的token，而不是****
    oriArray.sort();
    var original = oriArray.join('');
    var scyptoString = sha1(original);
    if(signature == scyptoString){
      res.end(echostr);
    }
  } else{
    console.log('content')
    return res.render('wx');
  }
})

module.exports = router;
