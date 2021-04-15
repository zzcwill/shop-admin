# shop-admin
> A shop-admin

# mysql
init.sql

# 消息推送
/socket

# 小程序
shop-xcx

# ab-登录接口demo
ab -n 10 -c 2 -t 5 -T 'application/json' -p ./ab/login.txt http://127.0.0.1:3000/api/login
login.txt放post请求参数

ab -n 10 -c 10 -t 5 -T 'application/json' -p ./ab/order_add.txt http://127.0.0.1:3000/api/order/add

### 项目运行
- 全局包安装
- npm install nodemon -g
-	npm install mocha -g
-	npm install nyc -g
-	npm install eslint -g
- 安装相应依赖包
- npm install
- 开发环境运行
- npm run dev
- 测试环境运行
- npm run test
- 生产环境运行
- npm run pro