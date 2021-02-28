
/**
 * nunjucks 过滤器
 */

import nunjucks from 'nunjucks'
import filter from '../config/filter'

export default (nunjucksEVN: nunjucks.Environment) => {
    Object.keys(filter).forEach(key => {
        nunjucksEVN.addFilter(key, filter[key])
    })

}

