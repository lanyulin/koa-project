import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';
import source from 'koa-static';

const app = new Koa();
const router = new Router();

app.use(views('./views', {
  // map: {
  //   ejs: 'ejs', // ejs后缀文件用ejs引擎
  //   html: 'underscore'
  // }
  // 通常只需要一种模板格式，所以上面的map不常用
  // 下面的render文件也不需要加ejs后缀名了
  extension: 'ejs'
}))

// 我发现是以根目录为基准的
app.use(source('./static'));

router.get('/', async ctx => {
  await ctx.render('./index', {
    user: {
      name: '蓝猫'
    }
  }) // render是异步任务
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)