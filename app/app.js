const config = require('config-lite')(__dirname);
global.config = config;
const help = require('./help');
global.help = help;
const middleware = require('./middleware');
global.middleware = middleware;

const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const serveFavicon = require('koa-favicon');
const cookieSession = require('koa-session');
const bodyParser = require('koa-bodyparser');
const serveStatic = require('koa-static');
const cors = require('@koa/cors');

const logger = require('koa-logger')

const pageRouter = require('./router/page');
const apiRouter = require('./router/api');

const app = new Koa();

app.use(global.middleware.catchError)

app.keys = global.config.cookieSession.keys;
app.use(cookieSession({
  key: global.config.cookieSession.name,
  // maxAge: 60*60*24
},app))

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}))
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, '../imgData')));
// app.use(cors());

//view engine setup
app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}));

//set logs
// app.use(logger())

app.use(pageRouter.routes(), pageRouter.allowedMethods())
app.use(apiRouter.routes(), apiRouter.allowedMethods())

// app.use(async (ctx, next) => {
//   let err = new global.help.httpCode.NotFound();
//   throw err;
//   await next();
// });

module.exports = app;
