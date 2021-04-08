const colors = require("colors")
const config = require("../config/config")
const express = require("express")
const app = express()
let { createProxyMiddleware } = require('http-proxy-middleware');
let proxyOption = config.proxyOption
let wsproxyOption = config.wsproxyOption

app.get("/", function(req, res){
    res.redirect("/view/index.html")
})
app.use("/", express.static(config.targetDirPath))
app.use("/api/*", createProxyMiddleware(proxyOption))
app.use("/ws", createProxyMiddleware(wsproxyOption))

app.listen(config.devPort,function(){
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');
    console.log(colors.green("服务器启动监听"), colors.red(config.devPort) ,colors.green("端口"))
    console.log(`Your application is running here: http://localhost:${config.devPort}`)
})