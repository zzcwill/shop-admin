const { Forbidden } = global.help.httpCode;
const config = global.config;
const { cacheService } = require('../service/');

const auth = async (ctx, next) => {
  if(config.noauthArr.indexOf(ctx.url) !== -1) {
    await next();
    return
  }

  let token = ''
  if(ctx.request.body.token) {
    token = ctx.request.body.token;
  }

  if(ctx.request.query.token) {
    token = ctx.request.query.token;
  }

  if(ctx.request.headers.token) {
    token = ctx.request.headers.token;
  }

  // 无带token
  if (!token) {
    throw new Forbidden('需要传token');
    await next();
    return
  }

  let tokenCache = await cacheService.get(token);

  if(!tokenCache) {
    throw new Forbidden('无效的token');
    await next();
    return
  }  

  ctx.user = tokenCache;

  await next();
}

module.exports = auth
