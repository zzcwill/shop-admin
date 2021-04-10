const express = require('express');
const router = express.Router();
const { HttpException } = global.help.httpCode;

router.get('/', function(req, res, next) {
  res.redirect('/socket')
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'test' });
});

router.get('/test2', function(req, res, next) {
  res.render('test2', { title: 'test2' });
});

router.get('/test3', function(req, res, next) {
  res.render('test3', { title: 'menu' });
});

router.get('/test4', function(req, res, next) {
  res.render('test4', { title: 'order' });
});

router.get('/test5', function(req, res, next) {
  res.render('test5', { title: 'customer' });
});

router.get('/socket', function(req, res, next) {
  res.render('socket', { title: 'socket', username: 'zzc', uid: 1 });
});

router.get('/socket2', function(req, res, next) {
  res.render('socket2', { title: 'socket', username: 'root', uid: 2 });
});

router.get('/error', function(req, res, next) {
  next(new HttpException('test错误'))
});

module.exports = router;
