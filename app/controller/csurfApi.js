var { resOk } = require('../help/resData');

module.exports = {
	get: async function (req, res, next) {
		res.json(resOk(10000,{
			data: 'csurf'
		},'csurf-test'))
	}
}