const jwt = require('jsonwebtoken');
const { Forbidden } = global.help.httpCode;
const config = global.config;
const cacheService = require('../service/cacheService');

const auth = async (req, res, next) => {
  if(config.noauthArr.indexOf(req.url) !== -1) {
    next();
    return
  }

  let token = req.body.token;

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

  // try {
  //   var user = jwt.verify(token, config.security.secretKey);

  // } catch (error) {
  //   let errMsg = "无效的token";
  //   // token 不合法 过期
  //   if (error.name === 'TokenExpiredError') {
  //     errMsg = "token已过期"
  //   }
  //   next( new Forbidden(errMsg) )
  //   return
  // }

  next()
}

module.exports = auth
