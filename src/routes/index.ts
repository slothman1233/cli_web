
import { Context } from 'koa'
import { test_middleware, test_2 } from '../middleware/test'
import { Controller, get, middlewares } from '../common/decorator/httpMethod'
import http from '../common/utils/net'
import log from '../middleware/log4js/log'


// import * as map from './map'


export default class Common {


    @middlewares([test_middleware, test_2, test_2, test_middleware])
    @get('/index')
    async index(ctx: Context) {
        const res = await http.get<any>('http://www.fx110.uk/api/test/test?type=2', {unErrorMsg: true})
        const respost = await http.post('http://localhost:3000/api/test/testpost', { type: 1111, name: 'sdfdf', age: 55 })
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


        await ctx.render('test11')

    }


}


export const ss = function () { return 1 }
