var express = require('express');
var router = express.Router();
var { HttpException } = global.help.httpCode;

router.get('/', function(req, res, next) {
  res.redirect('/test')
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'test' });
});

router.get('/test2', function(req, res, next) {
  res.render('test2', { title: 'test2' });
});

router.get('/error', function(req, res, next) {
  next(new HttpException('test错误'))
});

module.exports = router;
