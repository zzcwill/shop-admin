const path = require('path');
const fs = require('fs');
const config = global.config;
const { resOk } = global.help.resData;
const lodash = global.help.lodash;
const checkParam = global.help.checkParam;
const { Forbidden, ParameterException } = global.help.httpCode;
const { cacheService, imgService } = require('../service');

// 删除文件
let fsUnlik = async(path) => {
	return new Promise((resolve, reject) => {
		fs.unlink(path, (err) => {
				if (err) {
					reject(err);
				}
				resolve()
		});

	})
}

module.exports = {
	upload: async (ctx, next) => {		
		// token校验
		let token = ''
		if(ctx.request.body.token) {
			token = ctx.request.body.token;
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
		ctx.user = tokenCache;

		let { mimetype, size, filename, path } = ctx.request.file;

		if( size > config.uploadOption.maxSize) {
			await fsUnlik(path)
			next( new ParameterException('上传图片太大') );
			return
		}

		let newImg = {
			file_type: mimetype,
			file_size: size,
			file_path: `${config.hostname}:${config.port}${config.uploadOption.uploadsUrl}${ctx.request.file.filename}`,
			file_name: filename
		};

		let imgData = await imgService.add(newImg)


		if(ctx.request.file  !== undefined) {
			ctx.boyd = resOk(
				imgData,
				10000,
				'图片上传成功'
			)
		}
	}
}
