# node-koa 精简模版

### 支持配置 https

```js
/**
 * http
 */

var http = require('http');
var server = http.createServer(app.callback());

/**
 * https
 */

var fs = require('fs');
var https = require('https');
var crt = fs.readFileSync('./www.yiwukong.cn.crt');
var key = fs.readFileSync('./www.yiwukong.cn.rsa');
var a = { key: key, cert: crt };
var server = https.createServer(a, app.callback());
```

### demo 微信小程序获取手机号

`/server/index.js`

### download conle

```shell
# 下载安装依赖
$ npm install
# OR 使用 yarn 安装
$ yarn install
```

### 启动和部署

使用[pm2](https://github.com/Unitech/pm2)部署

```shell
# 本地开发
$ npm run dev
# 永久启动
$ npm run server
# 杀死全部进程
$ npm run delpm
```
