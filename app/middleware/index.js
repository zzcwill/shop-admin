const auth = require('./auth')
const catchError = require('./catchError')
const imgUpload = require('./imgUpload')
const page = require('./page')
const loggerMiddleware = require('./logger')

module.exports ={
	imgUpload,
	auth,
	catchError,
	page,
	loggerMiddleware
}