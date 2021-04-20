const { cookieSession } = require("../../config/default");

var { resFail, resCodeArr } = global.help.resData;
var { HttpException } = global.help.httpCode

var catchError = async (err, ctx, next) => {
  if(err) {
    // 开发环境
    var isHttpException = err instanceof HttpException;
    var isDev = process.env.NODE_ENV === 'dev';

    if (isDev) {
      if(!isHttpException) {
        if(err.name === 'SequelizeDatabaseError') {
          ctx.status(500)
          ctx.json(resFail(err.parent.sqlMessage, resCodeArr[1][0]))            
        }
        if(err.name !== 'SequelizeDatabaseError') {
          throw err;          
        }     
      } 
      if (isHttpException) {
        ctx.status(err.status)
        ctx.json(resFail(err.msg, err.code))
      }        
    }  
    
    if (!isDev) {
      if (isHttpException) {
        ctx.status(err.status)
        ctx.json(resFail(err.msg, err.code))
      }  
      if (!isHttpException) {
        ctx.status(500)
        ctx.json(resFail('服务器内部异常', resCodeArr[1][0]))
      }         
    }
  }
}

module.exports = catchError
