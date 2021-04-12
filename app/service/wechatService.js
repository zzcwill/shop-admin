const { User }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  getUserInfo: async (username) => {
    let user = await User.findOne({
      where: {
        username
      },
      raw:true
    })
    return user
  }
}
