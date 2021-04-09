const path = require('path');
const multer  = require('multer');
const uuid = require('uuid');

//设置保存规则
let storage = multer.diskStorage({
  //destination：字段设置上传路径，可以为函数
  destination: path.resolve(__dirname, '../public/uploads'),
  //filename：设置文件保存的文件名
  filename: function(req, file, cb) {
      let extName = file.originalname.slice(file.originalname.lastIndexOf('.'));
      // let fileName = uuid.v1();
      let fileName = Date.now();
      let date = global.help.dayjs().format('YYYY-MM-DD');
      cb(null, fileName + '-' + date + extName);
  }
})
//设置过滤规则（可选）
let imageFilter = function(req, file, cb){
  var acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
  //微信公众号只接收上述四种类型的图片
  if(acceptableMime.indexOf(file.mimetype) !== -1){
      cb(null, true)
  }else{
      cb(null, false)
  }
}

//创建 multer 实例
let imgUpload = multer({ 
  storage: storage,
  fileFilter: imageFilter
}).single('file')    //定义表单字段、数量限制

module.exports = imgUpload