const config = require('config-lite')(__dirname);
global.config = config;
const help = require('./help');
global.help = help;
const middleware = require('./middleware');
global.middleware = middleware;

const path = require('path');
const Koa = require('koa')
const views = require('koa-views');
const serveFavicon = require('koa-favicon');
const cookieParser = require('koa-cookie');
const cookieSession = require('koa-session');
const bodyParser = require('koa-bodyparser');
const serveStatic = require('koa-static');
const cors = require('@koa/cors');

const helmet = require('koa-helmet');

const logger = require('koa-morgan');
const rfs = require('rotating-file-stream');

// const pageRouter = require('./router/page');
// const apiRouter = require('./router/api');

const app = new Koa()

app.use(cookieSession({
  key: global.config.cookieSession.name,
  // maxAge: 60*60*24
}))

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, '../imgData')));
app.use(helmet());
// app.use(cors());

//view engine setup
app.use(views(path.join(__dirname, 'views'), {
  map: {html: 'ejs' }
}));

//set logs
const generator = () => {
  let time = global.help.dayjs().format('YYYY-MM-DD');
  return `${time}.log`;
};
const accessLogStream = rfs.createStream(generator, {
  size: '100M',
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../logs/http')
})
app.use(logger('combined',{stream:accessLogStream}));

// app.use(pageRouter.routes(), pageRouter.allowedMethods())
// app.use(global.middleware.auth,apiRouter.routes(), apiRouter.allowedMethods())

app.use(async (ctx, next) => {
  let err = new global.help.httpCode.NotFound();
  await next(err);
});

app.use(global.middleware.catchError)

module.exports = app;
