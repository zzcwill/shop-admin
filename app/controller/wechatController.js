const { resOk } = global.help.resData;
const { userService, cacheService } = require('../service');
const { setToken } = global.help.token;
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const logger = global.help.logger;
const config = global.config;
const { AuthFailed, ParameterException } = global.help.httpCode;
const { setPassWord, getSalt } = global.help.password;

const axios = require('axios');


const appid = 'wxe9bd6704da7435ff';
const appSecret = 'b21f5a2b7497bacd729537fbc135ab84';

module.exports = {
	// 获取微信小程序-session_key和openid, 和shop-admin授权登录
	jscode2session: async (req, res, next) => {
		let ruleData = {
			code: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			]
		}
		let msgParam = checkParam.check(req, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			next(error)
			return
		}

		let getData = req.body;

		let toUrl = 'https://api.weixin.qq.com/sns/jscode2session';
		let paramData = '?appid=' + appid + '&secret=' + appSecret +'&js_code=' + getData.code + '&grant_type=' + 'authorization_code'
		let wechatdata = await axios({
			method: 'get',
			url: toUrl + paramData,
			headers: {
				'Content-Type': 'application/json',
			},			
		});		

		let openid = wechatdata.data.openid;
		// 这个去获取用户信息
		let session_key = wechatdata.data.session_key;

		let user = await userService.getUserByOpenid(openid) 

		// 用session_key-去获取微信用户信息

		let apidata = {}
		if(!user) {
			apidata.isOk = 0;
			apidata.openid = openid;
			res.json(resOk(apidata));
			return
		}

		if(user) {
			let tokenCahe = lodash.pick(user, ['uid', 'username', 'level', 'isOnDuty', 'registerTime']);
			let token = setToken(tokenCahe);
			await cacheService.set(token, user, config.security.expiresIn);

			apidata.token = token;
			// apidata.openid = openid;
			// apidata.session_key = session_key;
			apidata.isOk = 1;
			apidata.user = tokenCahe;

			res.json(resOk(apidata))
		}
	}
}