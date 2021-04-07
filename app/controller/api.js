var { resOk } = global.help.resData;
var cacheService = require('../service/cacheService')

module.exports = {
	get: async function (req, res, next) {
		var data = {};

		var time =  Date.now()
		var cacheData = await cacheService.set(time,{
			name: 'zzc'
		}, 20)
		var cacheData2 = await cacheService.get(time)

		if (req.query.way === undefined) {
			data = resOk(20000, {}, '没有传way参数');
		}

		if (req.query.way !== undefined) {
			data = resOk(
				10000,
				{
					way: req.query.way,
					cache: cacheData2
				},
				'ok'
			);
		}

		res.json(data)
	},
	postjson: function (req, res, next) {
		var data = {};
		if (req.body.way === undefined) {
			data = resOk(20000, {}, '没有传way参数');
		}

		if (req.body.way !== undefined) {
			data = resOk(
				10000,
				{
					way: req.body.way
				},
				'ok'
			);
		}

		res.json(data)
	},
	postfrom: function (req, res, next) {
		var data = {};
		if (req.body.way === undefined) {
			data = resOk(20000, {}, '没有传way参数');
		}

		if (req.body.way !== undefined) {
			data = resOk(
				10000,
				{
					way: req.body.way
				},
				'ok'
			);
		}

		res.json(data)
	}
}