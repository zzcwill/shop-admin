const { wxRequest } = require('../utils/wxRequest')


//微信的jscode换取sessionKey
const jscode2session = (params, callback) => wxRequest(
  {
    data: params.data,
    url: 'wechat/jscode2session',
    method:'post'
  },
  callback
);

module.exports = {
  jscode2session
}
