var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var baseUrl = '/api/';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInVzZXJuYW1lIjoienpjIiwibGV2ZWwiOm51bGwsImlhdCI6MTYxODQ1MzA1NCwiZXhwIjoxNjE4NTM5NDU0fQ.NQ5HGx2og8v1p25wT9DuhaumDYCD0ggfOwlKmcLvvk0';