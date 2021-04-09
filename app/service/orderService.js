const { Order }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  list: async (search) => {
    const { page, pageSize } = search
    let offset = (page - 1) * pageSize;
		const { count, rows } = await Order.findAndCountAll({
			where: {},
			offset: offset,
			limit: pageSize,
      raw:true
		});

    return {
      list: rows,
      count: count
    }
  },
  add: async (order) => {
    let newOrder = await Order.create(order)
    return newOrder
  },
  update: async (search, order) => {
    let isOk = await Order.update(
      order,
      {
        //条件
        where: search
      }
    )
    return isOk[0]
  },
	delete: async (search) => {
		let isOk = await Order.destroy({
			where: search
		})
    return isOk[0]		
	},  
}
