
import { Context } from 'koa'
import { test_middleware, test_2 } from '../middleware/test'
import { Controller, get, middlewares } from '../common/decorator/httpMethod'
import * as http from '../common/utils/net'
import log from '../middleware/log4js/log'


// import * as map from './map'


export default class Common {


    @middlewares([test_middleware, test_2, test_2, test_middleware])
    @get('/index')
    async index(ctx: Context) {
        log.log(ctx.query)
        const res = await http.get('http://localhost:3000/api/test/test', { type: 2 })

        const respost: any = await http.post({ path: '/api/test/testpost', hostname: 'localhost', port: 3000 }, { type: 1111, name: 'sdfdf', age: 55 })

        await ctx.render('index', {
            title: '1',
            name: '2',
            html: '<div>3</div>',
            data: [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }],
            httpget: JSON.stringify(res),
            respost: JSON.stringify(respost)
        })

    }

    @get('/')
    async home(ctx: Context) {
        const res = await http.get('http://localhost:3000/api/test/test', { type: 2 })

        log.log(JSON.stringify(res))


        const respost: any = await http.post({ path: '/api/test/testpost', hostname: 'localhost', port: 3000 }, { type: 1111, name: 'sdfdf', age: 55 })


        log.log(JSON.stringify(respost))


        await ctx.render('index', {
            title: '1',
            name: '2',
            html: '<div>3</div>',
            data: [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }],
            httpget: JSON.stringify(res),
            respost: JSON.stringify(respost)
        })

    }


}


export const ss = function () { return 1 }
