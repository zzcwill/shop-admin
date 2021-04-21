const { Forbidden } = global.help.httpCode;
const config = global.config;
const { cacheService } = require('../service/');

const page = async (ctx, next) => {
  let page = 1;
	let pageSize = 10;
  if(!ctx.request.body.page) {
    ctx.request.body.page = page;
  }
  if(!ctx.request.query.page) {
    ctx.request.query.page = page;
  }
  if(!ctx.request.body.pageSize) {
    ctx.request.body.pageSize = pageSize;
  }
  if(!ctx.request.query.pageSize) {
    ctx.request.query.pageSize = pageSize;
  }

  await next()
}

module.exports = page
