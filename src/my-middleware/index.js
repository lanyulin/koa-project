// 定义一个中间件
import Koa from 'koa';
import Router from 'koa-router';

import middle1 from './middle1';
import middle2 from './middle2';
import middle3 from './middle3';

const app = new Koa();
const router = new Router();

// 全局使用中间件
app.use(middle1());  // 最外面的圈
app.use(middle2());
app.use(middle3());  // 最里面的圈

// 理解洋葱圈。打印顺序
// middle1 start
// middle2 start
// middle3 start
// middle3 end
// middle2 end
// middle1 end

router.get('/', async ctx => {
  ctx.body = 'hello lanmao'
})

// 非全局中间件
// router.get('/list', middle1(), ctx => {
//   ctx.body = [1, 2, 3]
// })

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)