const { Customer }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  list: async (search) => {
    const { page, pageSize } = search
    let offset = (page - 1) * pageSize;
		const { count, rows } = await Customer.findAndCountAll({
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
  add: async (customer) => {
    let newCustomer = await Customer.create(customer)
    return newCustomer
  },
  update: async (search) => {
		let { id, name, phone, address } = search;

    let isOk = await Customer.update(
      {
				name: name,
				phone: phone,
				address: address
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
		let isOk = await Customer.destroy({
			where: {
				id: id
			}
		})
    return isOk[0]		
	},  
}
