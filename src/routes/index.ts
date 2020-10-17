
import { Context, Next } from 'koa'
import { test_middleware, test_2 } from '../middleware/test'
import { Controller, get, middlewares } from '../common/decorator/httpMethod'
import http from '../common/utils/net'
import path from 'path'
import fs from 'fs-extra'
import log from '../middleware/log4js/log'


// import * as map from './map'


export default class Common {


    @middlewares([test_middleware, test_2, test_2, test_middleware])
    @get('/index')
    async index(ctx: Context) {
        const res = await http.get<any>('http://www.fx110.uk/api/test/test?type=2', { unErrorMsg: true })
        const respost = await http.post('http://localhost:3000/api/test/testpost', { type: 1111, name: 'sdfdf', age: 55 })
        await ctx.render('index', {
            title: '12222313123123',
            name: '2',
            html: '<div>3</div>',
            data: [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }, { a: 4, b: 5, c: 6 }, { a: 4, b: 5, c: 6 }],
            httpget: JSON.stringify(res),
            respost: JSON.stringify(respost)
        })

    }

    @get('/')
    async home(ctx: Context) {
        await ctx.render('index', {
            title: '111'
        })

    }

    /**
     * 获取静态页面的html代码
     * @param ctx 
     */
    @get('/html')
    async html(ctx: Context, next: Next) {
        const url = path.resolve(__dirname, '..', 'wwwroot', 'index.html')
        const isExists = await fs.pathExists(url)
        if (isExists) {
            const res = await fs.readFile(url)
            ctx.type = 'text/html'
            ctx.status = 200
            ctx.body = res
            return
        }

        await next()

    }


}


export const ss = function () { return 1 }
