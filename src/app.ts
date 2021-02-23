import koa, { Context, Next } from 'koa'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import koaRouter from 'koa-router'
import redisStore from 'koa-redis'
import config from './common/config/env'
// import log from './common/utils/logger'
import { isDev, notJest } from './common/utils/env'
import addRouter from './router'
import compress from 'koa-compress'
import path from 'path'
import koaStatic from 'koa-static'
import views from 'koa-views'
import sequelizeInit from './db/sequelize/index'
import cors from 'koa2-cors'
import bluebird from 'bluebird'
import LRU from 'lru-cache'
import window from './common/utils/window'
window.Promise = bluebird



//sequelize 初始化 需要则恢复 需要在config里面配置
// sequelizeInit()


import nunjucksMiddleware from './common/utils/nunjucks'

import log from './middleware/log4js/log'
import httpproxymiddleware from './middleware/proxy/httpproxymiddleware'

import zlib from 'zlib'
import microCache from './common/utils/microcache'

// import httpservercache from './middleware/httpservercache'
// const micro = new microCache()

const redisConf = config.redis
const router = new koaRouter()
const app = new koa()
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin) // 很奇怪的是，使用 * 会出现一些其他问题
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization,token,operateName, operateUid, sign,timestamp,nonce,accessKey'
    )
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')

    await next()
})

// app.use(async (ctx: Context, next: Next) => {
//     const md5 = `${ctx.path}}`
//     let html = ''
//     const getCache = micro.get(md5)
//     if (getCache) {
//         console.log(getCache.value)
//         ctx.type = getCache.type
//         ctx.status = 200
//         ctx.body = getCache.value
//     } else {

//         await next()
//     }

// })


//添加gzip压缩插件
// app.use(compress({
//     // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
//     filter: (content_type: string): boolean => {
//         return /text/i.test(content_type)
//     },
//     // 阀值，当数据超过1kb的时候，可以压缩
//     threshold: 1024,
//     // zlib是node的压缩模块
//     gzip: {
//         flush: zlib.constants.Z_SYNC_FLUSH
//     },
//     deflate: {
//         flush: zlib.constants.Z_SYNC_FLUSH,
//     },
//     br: false // disable brotli
// }))

// app.use(async (ctx: Context, next: Next) => {

//     await next()
//     console.log(JSON.stringify(ctx.body) )
//     const md5 = `${ctx.path}}`
//     const getCache = micro.get(md5)
//     if (!getCache) {
//         micro.set(md5, JSON.stringify(ctx.body), ctx.type)
//     }

// })


if (notJest) {
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

app.use(cors())

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
    maxage: isDev ? 0 : 1000 * 10,
    index: false,
    gzip: true

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


async function start() {

    //路由初始化
    await addRouter(router)



    app.use(router.routes()).use(router.allowedMethods())

    app.use(async (ctx: Context) => {

        //给文件添加类型
        let baseurl = path.basename(ctx.path)
        if (/\./.exec(baseurl)) {
            ctx.type = baseurl.split('.')[1]
        }
        //必须赋值不赋值的情况如果资源是404的话   返回的还是200
        ctx.status = 404

        await ctx.render('error/404')
    })

    // 错误处理
    // app.on('error', async (err, ctx) => {
    //     console.error('server error', err.message, err.stack)
    //     await ctx.render('error/error')
    // })
}


start()
export default app
