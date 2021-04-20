const { Forbidden } = global.help.httpCode;
const config = global.config;
const { cacheService } = require('../service/');

const auth = async (ctx, next) => {
  if(config.noauthArr.indexOf(ctx.url) !== -1) {
    next();
    return
  }

  let token = ''
  if(ctx.request.body.token) {
    token = req.body.token;
  }

  if(ctx.request.query.token) {
    token = req.query.token;
  }

  if(ctx.request.headers.token) {
    token = req.headers.token;
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

  next()
}

module.exports = auth
