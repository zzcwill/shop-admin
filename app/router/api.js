const express = require('express');
const router = express.Router();

const controller = require('../controller');
const { userController, imgController, excelController, emailController } = controller;

const { upload } = global.middleware;

// user-about
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/userInfo', userController.userInfo);
router.post('/createUser', userController.createUser);
router.post('/changePassword', userController.changePassword);


//文件上传
router.post('/post/multipart', upload.imageUploader, imgController.postmultipart);


//excel导出
router.get('/excel', excelController.get);
router.get('/excel2', excelController.get2);

//发送邮件
router.post('/email', emailController.send);




module.exports = router;
