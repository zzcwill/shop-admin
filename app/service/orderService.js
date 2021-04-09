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

    //生成订单

    return newOrder
  },
  update: async (search) => {
		let { id, customer_name } = search;

    let isOk = await Order.update(
      {
				customer_name: customer_name,
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
		let isOk = await Order.destroy({
			where: {
				id: id
			}
		})
    return isOk[0]		
	},  
}
