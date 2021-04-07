var path = require('path');
var config = require('config-lite')(path.resolve(__dirname, '../'));
var { resOk } = global.help.resData;

module.exports = {
	postmultipart: function(req, res, next) {
		var data = {};
	
		if(req.file  === undefined) {
			data = resOk(20000,{},'没有上传图片');
		}
	
		if(req.file  !== undefined) {
			data = resOk(
				10000,
				{
					date: global.help.dayjs().format('YYYY-MM-DD'),
					filename: req.file.filename,
					originalname: req.file.originalname,
					url: `${config.hostname}:${config.port}${config.uploadsUrl}${req.file.filename}`,
					way: req.body.way
				},
				'ok'
			);
		} 
	
		res.json(data)
	}
}