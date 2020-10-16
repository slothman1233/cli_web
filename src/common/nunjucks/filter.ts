
/**
 * nunjucks 过滤器
 */

import nunjucks from 'nunjucks'


export default (nunjucksEVN: nunjucks.Environment) => {
    // 为nkj加入一个过滤器
    nunjucksEVN.addFilter('shorten', function (str: string, count: number) {
        return str.slice(0, count || 5)
    })

}

