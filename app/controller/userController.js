const { resOk } = global.help.resData;
const { userService, cacheService}  = require('../service');
const { setToken } = global.help.token;
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const logger = global.help.logger;
const { AuthFailed, ParameterException } = global.help.httpCode;
const { setPassWord, getSalt } = global.help.password;

module.exports = {
	login: async (req, res, next) => {
		let ruleData = {
			username: [
				{	
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if(!val) {
							isOk = false 
						}
						return isOk
					}
				},
				{
					ruleName: 'minThree',	
					msg: 'username长度必须大于2',
					rule: (val) => {
						var isOk = true
						if(val.length < 3) {
							isOk = false 
						}
						return isOk
					}
				},				
			],
			password: [
				{
					ruleName: 'required',
					msg: 'password必须填',
					rule: (val) => {
						var isOk = true
						if(!val) {
							isOk = false 
						}
						return isOk
					}
				}				
			]
		}
		let msgParam = checkParam.check(req, ruleData)
		if(msgParam) {
			let error = new ParameterException(msgParam)
			next(error)
			return			
		}

		let getData = req.body;

		let user = await userService.getUserByUsername(getData.username);

		if(!user) {
			let error = new AuthFailed('用户不存在')
			next(error)
			return
		}

    let toPassword = setPassWord(getData.password, user.salt);
    if (toPassword !== user.password) {
      let error = new AuthFailed('密码不正确')
      next(error)   
			return
    }

		let apidata = lodash.pick(user, ['uid', 'username', 'level', 'isOnDuty', 'registerTime']);

		let token = setToken(apidata);

		await cacheService.set(token, user, 60*60*3);

		apidata.token = token

		res.json(resOk(apidata))
	},
	logout: async (req, res, next) => {
		let token = req.body.token;

		let tokenCache = await cacheService.get(token)

		if(tokenCache) {
			await cacheService.del(token)
		}


		res.json(resOk({},10000, '注销成功'))
	},
	userInfo: async (req, res, next) => {
	  let apidata = lodash.pick(res.user, ['uid', 'username', 'level', 'isOnDuty', 'registerTime'])
		res.json(resOk(apidata))		
	},
	createUser: async (req, res, next) => {
		let getData = {
			username: req.body.username,
			password: req.body.password
		}

		let user = await userService.getUserByUsername(getData.username);

		if(user) {
			let error = new AuthFailed('用户已存在')
			next(error)
			return
		}
		
		getData.salt = getSalt()
		let toPassword = setPassWord(getData.password, getData.salt);
		getData.password = toPassword;

		// createUser
		let newUser = await userService.createUser(getData);

		let apidata = lodash.pick(newUser, ['uid', 'username', 'level', 'isOnDuty', 'registerTime']);

		res.json(resOk(apidata, 10000, '创建用户成功'))
	}
}