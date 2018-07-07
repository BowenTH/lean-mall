# weixinJsSdkConfig

微信js sdk服务端签名生成接口([微信JS-SDK说明文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html))

## 使用方法

		/* 初始化 */
		var WxJSConfig = require("wxjssdkconfig");
		var wxJsConfig = new WxJSConfig("AppId","AppSecrect");
		
		/* 传入url，获取签名数据 */
		/* callback 回调函数参数:
					error:若无错误，error为null，否则为错误对象
					data:签名数据，json格式
		*/
		wxJsConfig.getJSSConfig(url,callback);
		
		
## 注意

* 必须在全局环境下实例 WxJSConfig类 ，引用认证获取的token和ticket字段需要缓存在应用中(两小时)，若每次请求签名都重新实例化WxJSConfig会导致缓存不可用。

## 代码示例(express)
        //服务端
		var WxJSConfig = require("wxjssdkconfig");
		//该实例化不要放在下面的路由函数中，需要保证每次都是同一个对象调用getJSSConfig方法
		var wxJsConfig = new WxJSConfig("AppId","AppSecrect");
		var router = express.Router();
		
		router.get('/api/wxJsToken',function(req, res){
            var url = decodeURIComponent(req.query.url);

            wxJsConfig.getJSSConfig(url,function(error,configData){
                var result = {
                    errNo:0,
                    errObj:null,
                    data:null
                }
                if (error) {
                    result.errNo = 1;
                    result.errObj = error;
                }
                else {
                    result.data = configData;
                }
                res.end(JSON.stringify(result));
            });
        });

        //浏览器端
        if (window.wx) {
            $.ajax({
                url:"/api/wxJsToken",
                data:{
                    //必须传入当前页面的url数据，获取签名
                    url:encodeURIComponent(location.href)
                },
                dataType: 'json',
                success: function(data){
                    if (data.errNo == 0) {
                        var configData = data.data;
                        configData.jsApiList = ["previewImage"];

                        wx.config(configData);
                        wx.ready(function(){
                            //认证成功，开始使用API
                        });
                        wx.error(function(){
                            //认证失败，可能是未在公共帐号中添加域名支持，可能是jsApiList中存在没有权限的js API
                        });
                    }
                    else {

                    }
                },
                error: function(xhr, type){
                    console.log("get weixin js config failed");
                }
            })
        };

        也可以由服务端将签名数据直接输入在页面，前端就不需要使用ajax获取.



