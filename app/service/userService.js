const { User }  = require('../model');

module.exports = {
  getUserByUsername: async (username) => {
    let user = await User.findOne({
      where: {
        username
      }
    })
    return user
  }
}
