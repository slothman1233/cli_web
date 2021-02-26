
/**
 * nunjucks 过滤器
 */

import nunjucks from 'nunjucks'

export default (nunjucksEVN: nunjucks.Environment) => {
    // 为nkj加入一个过滤器
    nunjucksEVN.addFilter('shorten', function (str: string, count: number) {
        return str.slice(0, count || 5)
    })

    //三元表达式
    nunjucksEVN.addFilter('ternary', function (a: any, b: any, c: any) {
        return a ? b : c
    })

    //format
    nunjucksEVN.addFilter('format', function (a: any, ...arg) {
        return a.replace(/%s/g, function () {
            return arg.shift()
        })

    })
    //去掉所有的html标记
    nunjucksEVN.addFilter('delHtmlTag', function (str: string) {
        return str.replace(/<[^>]+>/g, '')//去掉所有的html标记
    })

    //slice
    nunjucksEVN.addFilter('slice', function (str: string, start?: number, end?: number) {
        if (start && end) {
            return str.slice(start, end)
        } else if (start) {
            return str.slice(start)
        } else {
            return str
        }
    })

}

