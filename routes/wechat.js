var express = require('express');  
var router = express.Router();  

// 公众号消息
var wechat = require('wechat');
var config = {
  token: 'bowentoken',
  appid: 'wx8d917354c31c8a09',
  encodingAESKey: 'LPaHheYReDtxJUehoStYgDRyRMUvT3fK2KbScKU1HXr',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

router.use('/', wechat(config, function(req, res, next) {  
	console.log(req.weixin);  
	var message = req.weixin;
	console.log('somebody say:', JSON.stringify(message))
	if(message.msgtype === 'event' && message.event === 'subscribe'){
		res.reply('欢迎关注一方早餐，这里有最感性的声音和最牛逼的服务！');
	}else	if (message.Content === 'diaosi') {
		// 回复屌丝(普通回复)
		res.reply('你才是，😑');
	} else if (message.Content === 'text') {
		//你也可以这样回复text类型的信息
		res.reply({
			content: message.FromUserName + '你说啥：' + message.Content,
			type: 'text'
		});
	} else if (message.Content === 'music') {
		// 回复一段音乐
		res.reply({
			type: "music",
			content: {
				title: "来段音乐吧",
				description: "故事外的人",
				musicUrl: "http://music.163.com/song/media/outer/url?id=862515525.mp3",
				hqMusicUrl: "http://music.163.com/song/media/outer/url?id=862515525.mp3",
				thumbMediaId: "11"
			}
		});
	} else {
		// 回复高富帅(图文回复)
		res.reply([
			{
				title: '你来我家接我吧',
				description: '这是女神与高富帅之间的对话',
				picurl: 'http://p1.music.126.net/1rFY7bb4GRiZSdpyec4cKg==/109951163373014235.jpg?param=130y130',
				url: 'http://auto.qq.com/a/20180625/036788.htm/'
			}
		]);
	}
}));  

module.exports = router; 