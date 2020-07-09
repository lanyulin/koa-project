import Koa from 'koa';

const app = new Koa();

// 中间件 里面的回调是中间件最小单元
app.use(async ctx => {
  ctx.body = 'hello lanmao'
});

app.listen(3000)