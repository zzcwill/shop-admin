const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { Forbidden } = global.help.httpCode
const config = global.config

const auth = async (req, res, next) => {
  const tokenToken = basicAuth(req);

  let errMsg = "无效的token";
  // 无带token
  if (!tokenToken || !tokenToken.name) {
    next( new Forbidden('需要传token') )
  }

  try {
    var decode = jwt.verify(tokenToken.name, config.security.secretKey);

  } catch (error) {
    // token 不合法 过期
    if (error.name === 'TokenExpiredError') {
      errMsg = "token已过期"
    }
    next( new Forbidden(errMsg) )
  }

  // if (decode.scope < this.level) {
  //   errMsg = "权限不足"
  //   throw new global.errs.Forbidden(errMsg);
  // }

  res.auth = decode

  next()
}

module.exports = auth
