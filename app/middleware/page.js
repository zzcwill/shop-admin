const { Forbidden } = global.help.httpCode;
const config = global.config;
const { cacheService } = require('../service/');

const page = async (req, res, next) => {
  let page = 1;
	let pageSize = 10;
  if(!req.body.page) {
    req.body.page = page;
  }
  if(!req.query.page) {
    req.query.page = page;
  }
  if(!req.body.pageSize) {
    req.body.pageSize = pageSize;
  }
  if(!req.query.pageSize) {
    req.query.pageSize = pageSize;
  }

  next()
}

module.exports = page
