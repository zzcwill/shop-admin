const express = require('express');
const router = express.Router();

const controller = require('../controller');
const { userController, imgController, excelController, emailController, menuController, roleController, orderController, customerController, wechatController, wechatController2 } = controller;

const { imgUpload, auth } = global.middleware;

// user-about
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/userInfo', userController.userInfo);
router.post('/createUser', userController.createUser);
router.post('/changePassword', userController.changePassword);


//文件上传
router.post('/upload', imgUpload, auth, imgController.upload);


//excel导出
router.get('/excel', excelController.get);
router.get('/excel2', excelController.get2);

//发送邮件
router.post('/email', emailController.send);
router.post('/emailMq', emailController.sendMq);

//菜单
router.post('/menu', menuController.menu);
router.post('/userMenu', menuController.userMenu);

//角色
router.post('/role', roleController.role);
router.post('/userRole', roleController.userRole);

//订单
router.post('/order/list', orderController.list);
router.post('/order/add', orderController.add);
router.post('/order/update', orderController.update);
router.post('/order/delete', orderController.delete);

//客户
router.post('/customer/list', customerController.list);
router.post('/customer/add', customerController.add);
router.post('/customer/update', customerController.update);
router.post('/customer/delete', customerController.delete);

// 微信小程序相关
router.post('/wechat/jscode2session', wechatController.jscode2session);

module.exports = router;
