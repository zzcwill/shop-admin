const { Menu, Role, Role_menu }  = require('../model');
const sequelize = require('../../db');
const { QueryTypes } = require('sequelize');

module.exports = {
  menu: async (search) => {
    let { page, pageSize } = search;
    let offset = (page - 1) * pageSize;
		const { count, rows } = await Menu.findAndCountAll({
			where: {},
			offset: offset,
			limit: pageSize
		});

    return {
      list: rows,
      count: count
    }
  },
  userMenu: async (search) => {
    const { uid, page, pageSize } = search;
    let offset = (page - 1) * pageSize;

		let userRoleList = await sequelize.query(
      `
        SELECT e.* 
        FROM 
        user a 
        INNER JOIN user_role  b  on  a.uid = b.user_id 
        INNER JOIN role  c  on  b.role_id = c.id
        INNER JOIN role_menu d  on  c.id = d.role_id
        INNER JOIN menu e  on  d.menu_id = e.id        
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
  },
}
