const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//log工具
const logUtil = require('./src/utils/logUtil');

const routercontroller = require('./src/routerController.js');

const index = require('./routes/index');

onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {extension: 'pug'}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  //响应间隔时间
  let ms;
  try {
    await next();

    ms = new Date() - start;
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms)
  }
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(routercontroller());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
