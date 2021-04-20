const router = require('koa-router')();
const { HttpException } = global.help.httpCode;

router.get('/', async (ctx) => {
  await ctx.redirect('/test4')
});

router.get('/test', async (ctx) =>  {
  await ctx.render('test', { title: 'test' });
});

router.get('/test2', async (ctx) =>  {
  await ctx.render('test2', { title: 'test2' });
});

router.get('/test3', async (ctx) =>  {
  await ctx.render('test3', { title: 'menu' });
});

router.get('/test4', async (ctx) =>  {
  await ctx.render('test4', { title: 'order' });
});

router.get('/test5', async (ctx) =>  {
  await ctx.render('test5', { title: 'customer' });
});

router.get('/socket', async (ctx) =>  {
  await ctx.render('socket', { title: 'socket', username: 'zzc', uid: 1 });
});

router.get('/socket2', async (ctx) =>  {
  await ctx.render('socket2', { title: 'socket', username: 'root', uid: 2 });
});

router.get('/error', async (ctx) =>  {
  next(new HttpException('test错误'))
});

module.exports = router;
