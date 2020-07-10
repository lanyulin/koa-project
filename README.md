# 配置
### basic package
- @babel/core 
- @babel/node
- @babel/preset-env

### eslint配置
1. 全局安装 eslint
2. eslint --init

### 启动服务
    如果用node直接执行js文件，会报错，要使用babel-node。配置script命令：babel-node app.js

  __nodemon热重启服务__

  修改代码后，自动重启服务，无需执行重启命令
1. 安装nodemon
2. 配置script命令：nodemon --exec babel-node app.js


# 概念
### 1. 路由
- 路由：映射资源
- 接口：服务器提供各种能力，通过接口来调用能力
路由的本质：识别请求，给出对应的响应

#### 1.1 分组路由设计
根据feature给路由分类，便于查找接口
相同feature，有一个相同的路径前缀

#### 1.2 嵌套路由
两个路由实例如何嵌套的

#### 1.3 多重中间件

#### 1.4 重定向
redirect

#### 1.5补充：
allowedMethods的作用：
- 跨域的时候，会开启预检请求
- 告诉浏览器请求支持的方法。Headers中会多一条Allow: HEAD, GET，不再报 404 Not Found，而是405 Method Not Allowed

# 常用中间件
#### koa-views 模板渲染
常用引擎ejs、underscore
安装ejs包
*如果要返回text/html，模板的charset、response headers的Content-Type(这个不用手动设置)、编辑器三者需设置为utf-8，否则有中文时可能会出现乱码*


#### koa-static 静态资源处理
需要在html中加载服务器上的静态资源文件（js、图片等）

#### koa-bodyparser koa-better-body 数据处理
区别: post请求的时候，koa-bodyparser无法处理formDate格式的数据，只能处理x-www-form-urlencoded
**解释: koa-bodyparser不是无法处理formDate格式，而是被解析成字符串格式，存储在在ctx.req中（可打印一下）**

#### 自定义中间件
需求 -> 语法 -> 验证

语法：导出的是函数，且内部返回一个异步函数，且函数中要执行next()

验证：按照洋葱的模型开发，有没有阻塞程序的正常运行


# 部署

服务器 + git + secureCRT/iTerm2 + PM2

#### 1. [阿里云文档](https://help.aliyun.com/document_detail/50775.html)


新服务器可先更新操作系统
```
sudo yum -y update（yum是centOS的命令）
````
使用yum安装的node版本过低,不建议使用此方法安装。

#### 2. pm2
```
npm install pm2 -g 全局安装
```

#### 3. git

创建git仓库，本地关联远程 git remote add origin [url]

本地提交后，push: git push --set-upstream origin master

#### 4. ssh配置
- 命令: ssh-keygen 生成ssh公钥
- 回车回车回车
- cat /root/.ssh/...(ssh公钥保存的地址)
- 复制内容，到github的settings(https://github.com/settings/keys)中，添加密钥（不用填title)
- 把项目拉到服务器上 git clone git@github.com:lanyulin/koa-project.git
- 进入项目，执行npm install

#### 直接运行
- npm run start
- 例如3000端口，需在阿里云安全组，添加一个入方向，放行3000端口
- 查看是否在监听项目端口: netstat -tpln（杀死进程 kill [pid]）

#### pm2 运行
- 生成配置文件ecosystem.config.js
  pm2 ecosystem

### 遇到的问题
- 每次启动终端都要设置nvm use 
  执行 nvm alias default stable，重启终端



一些命令：
- yum list installed 列出已安装的软件包

    yum list列出可安装的（特别多）

    yum search xxx 查找软件包
- echo 输出重定向

    echo hello A  // 将字符串hello A输出到屏幕

    echo hello B > tmp.txt  // 前目录没有tmp.txt，则创建tmp.txt，并将字符串输出到tmp.txt文件中

    echo hello C >> tmp.txt  // 在tmp.txt的内容后面追加输出的字符串

- source 执行脚本命令

- hostnamectl 查看临时和固定的主机名
