/**
 * 把环境变量赋值给 nunjucks 框架当做 nunjucks 的全局变量
 */
import nunjucks from 'nunjucks'
import env from '../config/env'

export default (nunjucksEVN: nunjucks.Environment) => {
    for (let item in env) {
        nunjucksEVN.addGlobal(item, env[item])
    }

}