var path = require('path');

module.exports = {
	hostname: 'http://127.0.0.1',
	port: 3000,
	cookieSession: {
		name: 'session',
		keys: ['zzc']
	},
  log_dir: path.resolve(__dirname, '../logs'),
	uploadOption: {
		//上传路径-'/imgData/uploads/'
		uploadsUrl: '/uploads/',
		maxSize: 1024 * 1024 * 10	
	},
  security: {
    secretKey: "zzc",
    // 过期时间 3小时
    expiresIn: 60 * 60 * 24
  },
	// /api以下
	noauthArr: ['/api/login', '/api/createUser', '/api/upload', '/api/wechat/jscode2session', '/api/wechat/getUserInfo']
}