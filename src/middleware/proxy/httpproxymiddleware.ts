/**
 * 代理请求的中间件
 */
import { createProxyMiddleware } from 'http-proxy-middleware'
import { pathToRegexp } from 'path-to-regexp'
import koa, { Next, Context } from 'koa'
import koaConnect from '../../common/utils/koa2-connect'

/**
 * 代理规则制定
 */
function getTargets(target: string = '') {
    return {
        '/proxy/(.*)': {
            target: target,
            changeOrigin: true,
            pathRewrite: {
                '/proxy/': '/api/', // rewrite path
            }
        }
    }
}


const ko2Proxy = (options: any = {}) => {
    return async function (ctx: Context, next: Next) {
        
        let { targets = {} } = options
        const { path } = ctx
     

        targets = getTargets('https://devmsentapi.tostar.top')

        for (const route of Object.keys(targets)) {
            // console.log(345345352345325, path, pathToRegexp(route), pathToRegexp(route).test(path))
            if (pathToRegexp(route).test(path)) {
                await koaConnect(createProxyMiddleware(targets[route]))(ctx, next)
                break
            }

        }
        await next()
        
    }
}

export default (app: koa<koa.DefaultState, koa.DefaultContext>) => {
    const options = {
        targets: getTargets()
    }
    app.use(ko2Proxy(options))
}



