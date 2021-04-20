const http = require('http');
const path = require('path');
const config = require('config-lite')(path.resolve(__dirname, '../'));

const consumer = require('./consumer');

http.createServer(function(res){
	res.end('here is mq');
}).listen(config.mq.port);

consumer.eamilDLX()