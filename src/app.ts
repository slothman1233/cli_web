import koa, { Context, Next } from 'koa'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import koaRouter from 'koa-router'
import redisStore from 'koa-redis'
import config from './common/config/env'
// import log from './common/utils/logger'
import { notTest } from './common/utils/env'
import addRouter from './router'

import path from 'path'
import koaStatic from 'koa-static'
import views from 'koa-views'
import sequelizeInit from './db/sequelize/index'
//sequelize 初始化 需要则恢复 需要在config里面配置
// sequelizeInit()

import log from './middleware/log4js/log'

const redisConf = config.redis
const router = new koaRouter()
const app = new koa()


app.proxy = true
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())

// if (notTest) {
//     app.use(logger())
// }

//引用静态资源
app.use(koaStatic(__dirname + '/wwwroot'))

//ejs的使用
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))





//session 配置

app.keys = redisConf.keys
app.use(session({
    key: 'koa.sid', //cookie name 默认是 `koa.sid`
    prefix: 'koa:sess:', //redis key 的前缀 默认是 `koa:sess:`

    path: '/', //默认配置
    httpOnly: true, //默认配置
    maxAge: 24 * 60 * 60 * 1000, //单位毫秒

    ///redis的设置 需要则恢复  需要在config里面配置
    // store: redisStore({
    //     port: redisConf.port,
    //     host: redisConf.host
    // })
}, app))

if (notTest) {
// logger 日志
    app.use(async (ctx: Context, next: Next) => {
    //响应开始时间
        const start = Date.now()
        //响应间隔时间
        let ms:number
        try {
        //开始进入到下一个中间件
            await next()
            //记录响应日志
            ms = Date.now() - start
            log.info(ctx, ms)
        } catch (error) {
        //记录异常日志
            ms = Date.now() - start
            log.error(ctx, error, ms)
        }

        log.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
}
//路由初始化
addRouter(router)
app.use(router.routes()).use(router.allowedMethods())


// 404
app.use(async (ctx: Context) => {
    await ctx.render('error/404')
})

// 错误处理
// app.on('error', async (err, ctx) => {
//     console.error('server error', err.message, err.stack)
//     await ctx.render('error/error')
// })



export default app
