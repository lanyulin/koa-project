import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router;

// 注册方法
router.get('/', async ctx => {
  ctx.body = 'hello world!'
})

router.get('/list', async ctx => {
  ctx.body = [1, 2, 3]
})

// 动态路由接口设计
router.get('/list/:name', async ctx => {
  ctx.body = {
    name: ctx.params.name,
    time: Date.now()
  }
})

// post
router.post('/list', async ctx => {
  ctx.body = {
    type: 'post'
  }
})


// 路由分组
const group = new Router({
  prefix: '/group'
})

group.get('/', async ctx => {
  ctx.body = 'This is group route'
})



// 嵌套路由
const sub = new Router({
  prefix: '/sub'
})

sub.get('/forms', async ctx => {
  ctx.body = {
    code: 1,
    forms: true
  }
})
sub.get('/forms/:uid', async ctx => {
  ctx.body = {
    code: 1,
    uid: ctx.params.uid,
    time: Date.now()
  }
})

const nest = new Router()
nest.use('/nest', sub.routes())



// 多重中间件
const db = new Router();
db.get('/db/:id', async (ctx, next) => {
  // mongo
  ctx.user = '数据查询成功';
  next()
}, async (ctx, next) => {
  // log
  ctx.time = Date.now();
  next()
}, async (ctx, next) => {
  ctx.body = {
    user: ctx.user,
    time: ctx.time,
    id: ctx.params.id
  }
})


// 重定向
const proxy = new Router();
proxy.get('/find', async ctx => {
  ctx.redirect('/list')
})



// 挂载
app.use(router.routes()).use(router.allowedMethods());
app.use(group.routes());
app.use(nest.routes());
app.use(db.routes());
app.use(proxy.routes());

app.listen(3000)
