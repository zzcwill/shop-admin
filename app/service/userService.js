const { User }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  getUserByUsername: async (username) => {
    let user = await User.findOne({
      where: {
        username
      },
      raw:true
    })
    return user
  },
  createUser: async (user) => {
    let newUser = await User.create(user)
    return newUser
  },
  changePassword: async (password, uid) => {
    let isOk = await User.update(
      password,
      {
        //条件
        where: uid
      }
    )
    return isOk[0]
  },
  getUserByOpenid: async (openid) => {
    let user = await User.findOne({
      where: {
        openid
      },
      raw:true
    })
    return user
  },
}
