const { Role, User_role }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  role: async (search) => {
    const { page, pageSize } = search
    let offset = (page - 1) * pageSize;
		const { count, rows } = await Role.findAndCountAll({
			where: {},
			offset: offset,
			limit: pageSize
		});

    return {
      list: rows,
      count: count
    }
  },
  roleById: async (id) => {
		const { count, rows } = await Role.findAndCountAll({
			where: {
        id: id
      },
			offset: offset,
			limit: pageSize
		});

    return {
      list: rows,
      count: count
    }
  },  
  userRole: async (search) => {
    const { uid, page, pageSize } = search;
    let offset = (page - 1) * pageSize;

		let userRoleList = await sequelize.query(
      `
        SELECT c.* 
        FROM 
        user a 
        INNER JOIN user_role  b  on  a.uid = b.user_id 
        INNER JOIN role  c  on  b.role_id = c.id
        WHERE a.uid = ?
        LIMIT ?
        OFFSET ?;`,
      {
        replacements: [uid, pageSize, offset],
        type: QueryTypes.SELECT
      }
    );

    return {
      list: userRoleList,
      count: userRoleList.length
    }
  }
}
