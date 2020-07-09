import Koa from 'koa';
import Router from 'koa-router';
// import body from 'koa-bodyparser';
import body from 'koa-better-body';

const app = new Koa();
const router = new Router();

// 自动获取提交过来的数据
app.use(body());
// 使用koa-bodyparser

// router.get('/form', async ctx => {
//   ctx.body = ctx.query  // get的参数
// })

// router.post('/form', async ctx => {
//   ctx.body = ctx.request.body  // post提交的数据
//   ctx.body = ctx.req  // req存放了formData格式的数据，但是是字符串形式
// })


// 使用koa-better-body
router.post('/form', async ctx => {
  ctx.body = ctx.request.fields; // fields
})
// get请求没区别


app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)