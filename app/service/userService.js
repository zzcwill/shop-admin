const { User }  = require('../model');
const logger = global.help.logger;
const { AuthFailed } = global.help.httpCode;
const { setPassWord } = global.help.password;

module.exports = {
  login: async (user) => {
    let { username, password } = user
    let userInfo = await User.findOne({
      where: {
        username
      }
    })

    if (!userInfo) {
      throw new AuthFailed('用户不存在')
    }

    // 验证密码是否正确
    let toPassword = setPassWord(password, userInfo.salt);

    let correct = bcrypt.compareSync(toPassword, userInfo.password);

    if (!correct) {
      throw new AuthFailed('密码不正确')
    }

    return userInfo
  }
}
