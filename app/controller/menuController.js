const { resOk } = global.help.resData;
const { menuService } = require('../service');
const { setToken } = global.help.token;
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const logger = global.help.logger;
const { ParameterException } = global.help.httpCode;

module.exports = {
	menu: async (ctx, next) => {
		let ruleData = {
			page: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			],
			pageSize: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			]
		}
		let msgParam = checkParam.check(req, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			next(error)
			return
		}

		let getData = req.body;
		getData.page = lodash.toFinite(getData.page)
		getData.pageSize = lodash.toFinite(getData.pageSize)

		let listData = await menuService.menu(getData);

		res.json(resOk(listData))			
	},
	userMenu: async (ctx, next) => {
		let ruleData = {
			page: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			],
			pageSize: [
				{
					ruleName: 'required',
					rule: (val) => {
						var isOk = true
						if (!val) {
							isOk = false
						}
						return isOk
					}
				},
			]
		}
		let msgParam = checkParam.check(req, ruleData)
		if (msgParam) {
			let error = new ParameterException(msgParam)
			next(error)
			return
		}

		let getData = req.body;
		getData.page = lodash.toFinite(getData.page)
		getData.pageSize = lodash.toFinite(getData.pageSize)
		getData.uid = res.user.uid;


		let listData = await menuService.userMenu(getData);

		res.json(resOk(listData))			
	},
}