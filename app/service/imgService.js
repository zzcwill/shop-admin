const { File }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  add: async (img) => {
    console.info(img)
    let newImg = await File.create(img)
    return newImg
  },  
}
