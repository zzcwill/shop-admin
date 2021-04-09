const { resOk } = global.help.resData;
const { orderService, goodsService } = require('../service');
const checkParam = global.help.checkParam;
const lodash = global.help.lodash;
const { getOrderCode } = global.help.order;
const logger = global.help.logger;
const { ParameterException } = global.help.httpCode;


module.exports = {
	list: async (req, res, next) => {
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

		let listData = await orderService.list(getData);

		res.json(resOk(listData))		
	},
	add: async (req, res, next) => {
		let ruleData = {
			customer_name: [
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
			sale_type: [
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
			express_fee: [
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
			pay_status: [
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
			order_fee: [
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
			shoesArr: [
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
		getData.order_code = getOrderCode()
		getData.shoesArr = JSON.parse(getData.shoesArr)


		let { shoesArr } = getData;
		let goodsStockList = await Promise.all(
			shoesArr.map(
				async (item) =>{
					let itemGoods = await goodsService.getGoodsById(item.goods_id)
					let isCanBuy = item.goods_num <= itemGoods.goods_stock ? 1 : 0
					return isCanBuy
				}
			)
		)

		if(goodsStockList.indexOf(0) !== -1) {
			let error = new ParameterException('商品库存不足')
			next(error)			
			return
		}

		let isOK = await orderService.add(getData);

		res.json(resOk({
			isOK: isOK
		}));		
	},
	update: async (req, res, next) => {
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

		let isOK = await orderService.update(getData);

		res.json(resOk({
			isOK: isOK
		}))			
	},
	delete: async (req, res, next) => {
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

		let isOK = await orderService.delete(getData);

		res.json(resOk({
			isOK: isOK
		}))		
	},	
}