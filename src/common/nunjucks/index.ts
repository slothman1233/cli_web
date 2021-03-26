/**
 * nunjucks 编译成html代码
 */

import path from 'path'
import { nunjucksEVN } from '../utils/nunjucks'
import htmlMinifier from 'html-minifier'
import nunjucks from 'nunjucks'
import env from '../config/env'
import filters from './filter'
import { isAsync } from '../utils/type_check'
/**
 * 把环境变量赋值给 nunjucks 框架当做 nunjucks 的全局变量
 */

let evn

export const constant = (nunjucksEVN: nunjucks.Environment) => {
    evn = nunjucksEVN
    for (let item in env) {
        nunjucksEVN.addGlobal(item, env[item])
    }
}




/**
 * nunjucks 过滤器初始化
 */
export const filter = (nunjucksEVN: nunjucks.Environment) => {
    Object.keys(filters).forEach(key => {
        nunjucksEVN.addFilter(key, filters[key], isAsync(filters[key]))
    })

}





/**
 *通过文件地址跟参数获取编译后的html代码
 * @param {string} filepath 文件名地址 相对于 views文件夹
 * @param {any} optins 渲染的参数
 */
export const nunRender = (filepath: string, optins: any) => {
    if (!filepath) { return null }
    let html = htmlMinifier.minify(
        nunjucksEVN.render(path.resolve(__dirname, '..', '..', filepath), Object.assign({}, optins)),
        {
            collapseWhitespace: true
        }
    )

    return html
}

/**
 * 通过nunjucks字符串文本跟参数获取编译后的html代码
 * @param {string} str 模板字符串
 * @param {any} optins 渲染的参数
 */
export const nunRenderString = (str: string, optins: any) => {
    if (!str) { return null }
    let html = htmlMinifier.minify(
        nunjucksEVN.renderString(str, Object.assign({}, optins)),
        {
            collapseWhitespace: true
        }
    )


    return html
}




