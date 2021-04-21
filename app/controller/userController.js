const { resOk } = global.help.resData;
const { userService, cacheService } = require('../service');
const { setToken } = global.help.token;
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const logger = global.help.logger;
const config = global.config;
const { AuthFailed, ParameterException } = global.help.httpCode;
const { setPassWord, getSalt } = global.help.password;

module.exports = {
	login: async (ctx, next) => {
		let ruleData = {
			username: [
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
			],
			password: [
				{
					ruleName: 'required',
					msg: 'password必须填',
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
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let user = await userService.getUserByUsername(getData.username);

		if (!user) {
			let error = new AuthFailed('用户不存在')
			throw error;
			return
		}

		let toPassword = setPassWord(getData.password, user.salt);
		if (toPassword !== user.password) {
			let error = new AuthFailed('密码不正确')
			throw error;
			return
		}

		let apidata = lodash.pick(user, ['uid', 'username', 'level', 'isOnDuty', 'registerTime']);

		let token = setToken(apidata);

		await cacheService.set(token, user, config.security.expiresIn);

		apidata.token = token

		ctx.body = resOk(apidata)
	},
	logout: async (ctx, next) => {
		let token = ctx.request.body.token;

		let tokenCache = await cacheService.get(token)

		if (tokenCache) {
			await cacheService.del(token)
		}


		ctx.body = resOk({}, 10000, '注销成功')
	},
	userInfo: async (ctx, next) => {
		let apidata = lodash.pick(ctx.user, ['uid', 'username', 'level', 'isOnDuty', 'registerTime'])
		ctx.body = resOk(apidata);
	},
	createUser: async (ctx, next) => {
		let ruleData = {
			username: [
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
			],
			password: [
				{
					ruleName: 'required',
					msg: 'password必须填',
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
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let user = await userService.getUserByUsername(getData.username);

		if (user) {
			let error = new AuthFailed('用户已存在')
			throw error;
			return
		}

		getData.salt = getSalt()
		let toPassword = setPassWord(getData.password, getData.salt);
		getData.password = toPassword;

		// createUser
		let newUser = await userService.createUser(getData);

		let apidata = lodash.pick(newUser, ['uid', 'username', 'level', 'isOnDuty', 'registerTime']);

		ctx.body = resOk(apidata, 10000, '创建用户成功')
	},
	changePassword: async (ctx, next) => {
		let ruleData = {
			password: [
				{
					ruleName: 'required',
					msg: 'password必须填',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				}
			],
			newPassword: [
				{
					ruleName: 'required',
					msg: 'password必须填',
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
		let msgParam = checkParam.check(ctx, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			throw error;
			return
		}

		let getData = ctx.request.body;

		let user = await userService.getUserByUsername(ctx.user.username);

		if (!user) {
			let error = new AuthFailed('用户不存在')
			throw error;
			return
		}

		
		let toPassword = setPassWord(getData.password, user.salt);
		if (toPassword !== user.password) {
			let error = new AuthFailed('密码不正确')
			throw error;
			return
		}


		let toNewPassword = setPassWord(getData.newPassword, user.salt);

		let isOK = await userService.changePassword({
			password: toNewPassword
		},{
			uid: user.uid
		});

		ctx.body = resOk({
			isOK: isOK
		})
	}
}