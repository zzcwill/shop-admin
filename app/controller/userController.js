const { resOk } = require('../help/resData');
const { userService, cacheService}  = require('../service');
const { setToken } = global.help.token;
const lodash = global.help.lodash;
const logger = global.help.logger;
const { AuthFailed } = global.help.httpCode;
const { setPassWord } = global.help.password;

module.exports = {
	login: async (req, res, next) => {
		var getData = {
			username: req.body.username,
			password: req.body.password
		}

		let user = await userService.getUserByUsername(getData.username);

		if(!user) {
			let error = new AuthFailed('用户不存在')
			next(error)
		}

    let toPassword = setPassWord(getData.password, user.salt);
    if (toPassword !== user.password) {
      let error = new AuthFailed('密码不正确')
      next(error)   
    }

		let apidata = lodash.pick(user,['uid', 'username', 'isOnDuty'])

		let token = setToken(apidata);

		await cacheService.set(token, user, 60*60*3);

		apidata.token = token

		res.json(resOk(apidata))
	},
	logout: async (req, res, next) => {
		let token = req.body.token;

		let tokenCache = await cacheService.get(token)
		console.info(tokenCache)

		if(tokenCache) {
			await cacheService.del(token)
		}	


		res.json(resOk({},10000, '注销成功'))
	},	
}