const Koa = require('koa');
const KoaRouter = require('koa-router');
const { proxy } = require('./proxy');

const app = new Koa();
const router = new KoaRouter();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

app.use(router.routes()); // 声明使用路由
proxy.init(router);

app.listen('3000', () => {
  console.log('服务启动成功~');
});
