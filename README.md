# node + koa 精简模版

### clone download

```
git clone https://github.com/weilkss/node-koa.git
```

### scripts

```
# 本地开发node启动
npm run dev
# pm2启动项目
npm run start
# pm2重启所有服务
npm run restart
# 删除所有的pm2服务
npm run delpm
```

### koa2

[官方网站](https://koajs.com/)

`Koa` 是基于 `Node.js` 平台的下一台 Web 开发框架，`Koa` 是一个全新的 Web 框架，由 `Express` 原班人马打造，致力于成为 Web 应用和 API 开发领域中更小且更加富有表现力、更健壮的基石。通过 `async` 函数 `Koa` 帮你丢弃回调函数，并有力地增强错误处理。`Koa` 并没有绑定任何中间件，而是提供了一套优雅的方法帮助快速编写服务器端应用程序。

`Koa2` 相比较 `Koa1` 最大区别在于中间件的写法，`Koa1` 使用 `Generator`，`Koa2` 使用 `async/await` 语法，因此 `Node.js` 必须大于 `v7.6.0+`。

#### koa 中间件

- [koa-bodyparse](https://github.com/koajs/bodyparser) -- 把 koa2 上下文的 formData 数据解析到 ctx.request.body 的中间件
- [koa-convert](https://github.com/koajs/convert) -- 将基于 koa 生成器的中间件转换为基于承诺的中间件
- [koa-json](https://github.com/koajs/json) -- JSON pretty-printed response middleware. Also converts node object streams to binary.
- [koa-logger](https://github.com/koajs/logger) -- 日志处理中间件
- [koa-onerror](https://github.com/koajs/onerror) -- 错误处理中间件
- [koa-router](https://github.com/koajs/router) -- koa 路由中间件
- [koa-static](https://github.com/koajs/json) -- 公共资源处理中间件
- [koa-views](https://github.com/queckezz/koa-views) -- koa 模板处理中间件
- [koa2-cors](https://github.com/zadzbw/koa2-cors) -- 解决跨域的 koa 中间件

### pm2

```
npm install pm2 -g
```

[pm2](https://github.com/Unitech/pm2)是 node 进程管理工具，可以利用它来简化很多 node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

#### 其他命令

- 启动进程/应用 `pm2 start bin/www` 或 `pm2 start app.js`
- 重命名进程/应用 `pm2 start app.js --name wb123`
- 添加进程/应用 `watch pm2 start bin/www --watch`
- 结束进程/应用 `pm2 stop www`
- 结束所有进程/应用 `pm2 stop all`
- 删除进程/应用 `pm2 delete www`
- 删除所有进程/应用 `pm2 delete all`
- 列出所有进程/应用 `pm2 list`
- 查看某个进程/应用具体情况 `pm2 describe www`
- 查看进程/应用的资源消耗情况 `pm2 monit`
- 查看 pm2 的日志 `pm2 logs`
- 若要查看某个进程/应用的日志,使用 `pm2 logs www`
- 重新启动进程/应用 `pm2 restart www`
- 重新启动所有进程/应用 `pm2 restart all`

### 支持使用 ssl 证书

```
npm i ssl-root-cas https --save
```

在`app.js`中使用

```
require('ssl-root-cas').inject();
```

在`bin/www`中 v 配置

默认配置 `http`

```
/**
 * http
 */

var http = require('http');
var server = http.createServer(app.callback());
```

配置 `https`

```
/**
 * https
 * {crt}  证书的crt文件
 * {rsa}  证书的rsa文件
 */

var fs = require('fs')
var https = require('https');
var crt = fs.readFileSync('./www.yiwukong.cn.crt')
var key = fs.readFileSync('./www.yiwukong.cn.rsa')
var a = { key: key, cert: crt }
var server = https.createServer(a, app.callback());
```

### 路由

因为`koa`是一个单独的框架，所有很多的功能所需要中间件支持

```
const router = require('koa-router')();
```

`RoutePrefix` 和 `Route` 路由前缀

```
router.prefix('/api');
```

#### Example 获取微信手机号

```
router.get('/login/getPhoneNumber', async ctx => {
  let phoneData = await getWXData({ session_key: ctx.query.session_key, encryptedData: ctx.query.encryptedData, iv: ctx.query.iv });
  ctx.body = {
    code: 200,
    data: phoneData,
    msg: '成功'
  };
});
```

`getWXData` 是解密获取手机号,具体解密方法就不贴代码了

浏览器输入`http://localhost:3000/api//login/getPhoneNumber`,解密成功就会返回我们需要的手机号

### 总结

`node `+ `koa` 用起来很简单，简洁模板也只是我平时做一些测试才会用到，真正的用到企业或者大项目可不是这么简单的配置，至少代码都还要打包压缩，如果有需要的欢迎自取 👏,[node-koa](https://github.com/weilkss/node-koa)
