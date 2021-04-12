var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var baseUrl = '/api/';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoienpjIiwibGV2ZWwiOm51bGwsImlhdCI6MTYxODE4OTcyMiwiZXhwIjoxNjE4Mjc2MTIyfQ.a2dYTJjkcn45pjEZHtdJC22GeMTsF7dHx-vAkTZeAbc';