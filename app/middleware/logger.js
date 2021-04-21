const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const config = global.config;

// 这个是判断是否有logs目录，没有就新建，用来存放日志
const logsDir = path.parse(config.log_dir).dir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

log4js.configure({
  appenders: { cheese: { type: 'file', filename: path.resolve(config.log_dir, 'cheese.log') } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

let logger = log4js.getLogger('cheese');

// logger.level = process.env.NODE_ENV !== 'dev' ? 'DEBUG' : 'ERROR';
logger.level = 'INFO';

const loggerMiddleware = async (ctx, next) => {
	// 请求开始时间
	const start = new Date()
	await next()
	// 结束时间
	const ms = new Date() - start
	// 打印出请求相关参数
	const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips ||
		(ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
	let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
	logger.info(logText)
}

module.exports = loggerMiddleware
