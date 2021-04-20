const { resOk } = global.help.resData;
const { customerService } = require('../service');
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const logger = global.help.logger;
const { ParameterException } = global.help.httpCode;


module.exports = {
	list: async (ctx, next) => {
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

		let listData = await customerService.list(getData);

		res.json(resOk(listData))		
	},
	add: async (ctx, next) => {
		let ruleData = {
			name: [
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

		let listData = await customerService.add(getData);

		res.json(resOk(listData))			
	},
	update: async (ctx, next) => {
		let ruleData = {
			id: [
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

		let isOK = await customerService.update(getData);

		res.json(resOk({
			isOK: isOK
		}))			
	},
	delete: async (ctx, next) => {
		let ruleData = {
			id: [
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

		let isOK = await customerService.delete(getData);

		res.json(resOk({
			isOK: isOK
		}))		
	},	
}