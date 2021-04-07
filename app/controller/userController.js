const { resOk } = require('../help/resData');
const service = require('../service')
const { userService } = service
const { setToken } = global.help.token;
const lodash = global.help.lodash;

module.exports = {
	login: async (req, res, next) => {
		var getData = {
			usename: req.body.usename,
			password: req.body.password
		}


		let user = await userService.login(getData);

		let token = setToken(user, user.salt);


		let apidata = lodash.pick(user,['uid', 'username', 'userName'])
		apidata.token = token

		res.json(resOk(apidata))
	},
	logout: async (req, res, next) => {
		let data = {};


		res.json(data)
	},	
}