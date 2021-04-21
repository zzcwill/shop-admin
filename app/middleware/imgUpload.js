const path = require('path');
const multer = require('@koa/multer');//加载koa-multer模块
// 上传 图片
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../imgData/uploads'))
  },
  //修改文件名称
  filename: function (req, file, cb) {
    let extName = file.originalname.slice(file.originalname.lastIndexOf('.'));
    // let fileName = uuid.v1();
    let fileName = Date.now();
    let date = global.help.dayjs().format('YYYY-MM-DD');
    cb(null, fileName + '-' + date + extName);
  }
})
//加载配置
var imgUpload = multer({
  storage: storage
}).single('file');

module.exports = imgUpload