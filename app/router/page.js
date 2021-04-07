var express = require('express');
var router = express.Router();
var { HttpException } = global.help.httpCode;

router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

router.get('/error', function(req, res, next) {
  next(new HttpException('test错误'))
});

module.exports = router;
