/**
 * @description test middleware
 * @author 文亮
 */

import { Context, Next } from 'koa'
import log from './log4js/log'




/**
 * 中间件示例
 * @param {Context} ctx ctx
 * @param {Next} next next
 */
async function test_middleware(ctx: Context, next: Next) {
    if (ctx.query.type && parseInt(ctx.query.type) === 1) {
        ctx.body = {
            aa: 1
        }
    } else {
        await next()
    }

}

async function test_2(ctx: Context, next: Next) {
    if (ctx.query.type && parseInt(ctx.query.type) === 2) {
        ctx.body = {
            aa: 2
        }
    } else {
        await next()
    }

}


export {
    test_middleware,
    test_2
}








