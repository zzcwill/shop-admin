var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var baseUrl = '/api/';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoienpjIiwibGV2ZWwiOm51bGwsImlhdCI6MTYxODk3NjkxNiwiZXhwIjoxNjE5MDYzMzE2fQ.B53wTiCCCruDi1zh8JuVxS7Yd-Xmow0epKwqtmA10kQ';