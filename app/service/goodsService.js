const { Goods }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  getGoodsById: async (id) => {
    let goods = await Goods.findOne({
      where: {
        id
      },
      raw:true
    })
    return goods
  },
  add: async (goods) => {
    let newGoods = await Goods.create(goods)
    return newGoods
  },
  update: async (search) => {
		let { id, goods_stock } = search;

    let isOk = await Goods.update(
      {
				goods_stock: goods_stock,
			},
      {
        //条件
        where: {
					id: id
				}
      }
    )
    return isOk[0]
  },
	delete: async (search) => {
		let { id } = search;
		let isOk = await Goods.destroy({
			where: {
				id: id
			}
		})
    return isOk[0]		
	},  
}
