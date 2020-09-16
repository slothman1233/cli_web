import { getPool } from './dbPool'
import log from '../../middleware/log4js/log'
import { queryCallback } from 'mysql'
const pool = getPool()

export const exportDao = (sql: string) => {
    return (...args: any[]): Promise<any> => new Promise((resolve, reject) => {
        log.log('====== execute sql ======')
        log.log(`${sql} , ${args}`)
        const callback: queryCallback = (err, result) => {
            if (err) { reject(err) }
            else { resolve(result) }
        }
        if (!sql) { pool.query(args.shift(), callback) }
        else { pool.query(sql, ...args, callback) }
    })
}

/**
 * sql transaction
 * @param  {Array} list 
 * const rets = await transaction([
 *     ["insert into user_group values (?,?)",[11,11]],
 *     ["insert into user_friend set ? ",{user_id:'12',friend_id:12}],
 *     'select * from user'
 * ]);
 */
export const transaction = (list: any[]): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(list) || !list.length) { return reject('it needs a Array with sql') }
        pool.getConnection((err: any, connection) => {
            if (err) { return reject(err) }
            connection.beginTransaction(err => {
                if (err) { return reject(err) }
                log.log('============ begin execute transaction ============')
                let rets: any[] = []
                return (function dispatch(i) {
                    let args = list[i]
                    if (!args) {//finally commit
                        connection.commit(err => {
                            if (err) {
                                connection.rollback()
                                connection.release()
                                return reject(err)
                            }
                            log.log('============ success executed transaction ============')
                            connection.release()
                            resolve(rets)
                        })
                    } else {
                        log.log(args)
                        // args = typeof args == 'string' ? [args] : args;
                        // const sql = args.shift();
                        const callback: queryCallback = (error, ret) => {
                            if (error) {
                                connection.rollback()
                                connection.release()
                                return reject(error)
                            }
                            rets.push(ret)
                            dispatch(i + 1)
                        }
                        if (typeof args === 'string') { connection.query(args, callback) }
                        else { connection.query(args.shift(), ...args, callback) }
                    }
                })(0)
            })
        })
    })
}