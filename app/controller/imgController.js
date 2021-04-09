const path = require('path');
const config = global.config;
const { resOk } = global.help.resData;
const { Forbidden } = global.help.httpCode;
const cacheService = require('../service/cacheService');

module.exports = {
	upload: async (req, res, next) => {		
		// token校验
		let token = ''
		if(req.body.token) {
			token = req.body.token;
		}
		// 无带token
		if (!token) {
			next( new Forbidden('需要传token') );
			return
		}
		let tokenCache = await cacheService.get(token);
		if(!tokenCache) {
			next( new Forbidden('无效的token') );
			return
		}
		res.user = tokenCache;		

		if(req.file  !== undefined) {
			res.json(resOk(
				{
					date: global.help.dayjs().format('YYYY-MM-DD'),
					filename: req.file.filename,
					originalname: req.file.originalname,
					url: `${config.hostname}:${config.port}${config.uploadsUrl}${req.file.filename}`
				},
				10000,
				'图片上传成功'
			))
		}
	}
}
