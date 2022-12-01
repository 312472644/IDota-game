const koa2Req = require('koa2-request');

// 转发请求，请求跨域问题
const proxy = {
  init(router) {
    getRankListAPI(router);
  }
};

// 获取天梯排名
const getRankListAPI = router => {
  router.get('/getRankList', async (ctx, next) => {
    const { url } = ctx.request;
    const params = url.split('?')?.[1];
    const response = await koa2Req(`https://api.maxjia.com/api/player/ladder/?${params}`);
    ctx.body = response.body;
    next();
  });
};

module.exports = { proxy };
