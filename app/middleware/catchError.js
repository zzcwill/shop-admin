const { cookieSession } = require("../../config/default");

var { resFail, resCodeArr } = global.help.resData;
var { HttpException } = global.help.httpCode

var catchError = function(err, req, res, next) {
console.info(111)
  if(err) {
    res.status(200);
    res.json({
      ok: 1
    })
    return
  }
    // set locals, only providing error in dev
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  };

// var catchError = async (err, req, res, next) => {
//   try {
//     await next()

//   } catch (err) {
//     // 开发环境
//     var isHttpException = err instanceof HttpException;
//     var isDev = req.app.get('env') === 'dev';

//     if (isDev && !isHttpException) {
//       // throw error
//       res.status(500)
//       res.json(resFail({
//         msg: '服务器内部错误',
//         code: resCodeArr[1][0]             
//       }))      
//     }

//     // 生成环境
//     if (isHttpException) {
//       res.status(err.status)
//       res.json(resFail({
//         msg: err.msg,
//         code: err.code           
//       }))
//     } else {
//       res.status(500)
//       res.json(resFail({
//         msg: '服务器内部错误',
//         code: resCodeArr[1][0]             
//       }))
//     }
//   }
// }

module.exports = catchError
