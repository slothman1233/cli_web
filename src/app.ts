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

import nunjucksMiddleware from './common/utils/nunjucks'

import log from './middleware/log4js/log'
import httpproxymiddleware from './middleware/proxy/httpproxymiddleware'

// import httpservercache from './middleware/httpservercache'

const redisConf = config.redis
const router = new koaRouter()
const app = new koa()


/**
 * 代理请求转发中间件
 */
httpproxymiddleware(app)


//缓存策略 有待优化
// app.use(httpservercache)

app.proxy = true
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())

// if (notTest) {
//     app.use(logger())
// }

//引用静态资源
// maxage -- 浏览器缓存的最大寿命（以毫秒为单位）。默认为0
// hidden -- 允许传输隐藏文件。默认为false
// index -- 默认文件名，默认为“ index.html”
// defer -- 如果为true，则在服务之后return next()，允许任何下游中间件首先响应。 默认 false
// gzip -- 当客户端支持gzip且所请求的扩展名为.gz的文件存在时，请尝试自动提供文件的gzip压缩版本。默认为true。
// br -- 当客户端支持brotli并且存在所请求的扩展名为.br的文件时（请注意，仅通过https接受brotli），请尝试自动提供文件的brotli版本。默认为true。
// setHeaders -- 函数，用于在响应时设置自定义标头。
// extensions -- URL 中没有扩展名时，尝试匹配传递的数组中的扩展名以搜索文件。首先找到的是送达。（默认为false）

app.use(koaStatic(__dirname + '/wwwroot', {
    maxage: 10,
    index: false
    
}))


//在路由之前调用 因为我们的中间件是在路由中使用的 故应该在路由前加到请求上下文ctx中
app.use(nunjucksMiddleware({
    // 指定模板文件夹
    path: path.resolve(__dirname, 'views'),
    ext: 'njk'
}))

//ejs的使用
// app.use(views(__dirname + '/views', {
//     extension: 'ejs'
// }))

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
        let ms: number
        try {
            //开始进入到下一个中间件
            await next()
            //记录响应日志
            ms = Date.now() - start
            log.info(ctx, ms)
        } catch (error) {
            //记录异常日志
            ms = Date.now() - start
            log.error({ ctx, error, resTime: ms })
        }

        log.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
}

//路由初始化
addRouter(router)



app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx: Context) => {
    //必须赋值不赋值的情况如果资源是404的话   返回的还是200
    ctx.status = 404
    await ctx.render('error/404')
})

// 错误处理
// app.on('error', async (err, ctx) => {
//     console.error('server error', err.message, err.stack)
//     await ctx.render('error/error')
// })



export default app
