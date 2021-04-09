const { Order, Order_goods }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');
const { Promise } = require('../../redis');
const lodash = global.help.lodash;

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
  add: async (orderInfo) => {
    let { order_code, customer_name, sale_type, express_fee, pay_status, order_fee, shoesArr } = orderInfo

    // var apiData = {
    //   customer_name: '订单客户' + random(),
    //   sale_type: 1,
    //   express_fee: 10,
    //   pay_status: 1,
    //   order_fee: 2000 + random(),
    //   shoesArr: [
    //     {        
    //       goods_id : 1,
    //       goods_num: 5,
    //       goods_price: 80}
    //   ]
    // }

    //这里要加事务，明天做

    let newOrder = lodash.pick(orderInfo, ['order_code', 'customer_name', 'sale_type', 'express_fee', 'pay_status', 'order_fee']);
    await Order.create(newOrder)

    let order = await Order.findOne({
      where: {
        order_code: order_code
      },
      raw:true
    })
    

    shoesArr.map(
      async (item) => {
        await Order_goods.create(
          {
            order_id: order.id,
            goods_id: item.goods_id,
            goods_num: item.goods_num,
            goods_price: item.goods_price,
            goods_fee: item.goods_num * item.goods_price
          }
        )
      }
    )

    //生成订单

    return [1]
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
