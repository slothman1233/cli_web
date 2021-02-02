//获取ip（内网或外网）

import { IncomingMessage } from 'http'
import { Context } from 'koa'

export const getIp = function (ctx: Context) {
    let { req } = ctx
    let ipStr = req.headers['X-Real-IP'] || req.headers['x-forwarded-for']

    if (ipStr && !Array.isArray(ipStr)) {

        let ipArray: string[] = ipStr.split(',')

        if (ipArray || ipArray.length > 0) { //如果获取到的为ip数组

            return ipArray[0]

        }
        return ''

    } else { //获取不到时

        return ctx.ip.substring(ctx.ip.lastIndexOf(':') + 1)

    }

}

//获取外网ip

export const getNetIp = function (ctx: any) {
    let { req } = ctx
    let ipStr = req.headers['X-Real-IP'] || req.headers['x-forwarded-for']

    if (ipStr && !Array.isArray(ipStr)) {

        let ipArray: string[] = ipStr.split(',')

        if (ipArray.length > 1) { //如果获取到的为ip数组

            for (let i = 0; i < ipArray.length; i++) {

                let ipNumArray: string[] = ipArray[i].split('.')

                let tmp: string = ipNumArray[0] + '.' + ipNumArray[1]

                if (tmp === '192.168' || (ipNumArray[0] === '172' && ipNumArray[1] >= '16' && ipNumArray[1] <= '32') || tmp === '10.7') {

                    continue

                }

                return ipArray[i]

            }

        }

        return ipArray[0]

    } else { //获取不到时

        return ctx.ip.substring(ctx.ip.lastIndexOf(':') + 1)

    }

}