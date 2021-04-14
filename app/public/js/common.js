var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var baseUrl = '/api/';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoienpjIiwibGV2ZWwiOm51bGwsImlhdCI6MTYxODM5MDI3NCwiZXhwIjoxNjE4NDc2Njc0fQ.hbLEu9kUKowkMmSPk0k7qlfehlS12JEtjhJeT_s3MJs';