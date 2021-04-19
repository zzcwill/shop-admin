var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var baseUrl = '/api/';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoienpjIiwibGV2ZWwiOm51bGwsImlhdCI6MTYxODgwMjUzNiwiZXhwIjoxNjE4ODg4OTM2fQ.7C_pJRneF39fUYrF4LGcJR53jzyLDmQbTUh-uW3-qrI';