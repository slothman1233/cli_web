import { nunRender } from './index'



export default {
    'FmMoreRead': function (url: string, ...arg: any) {
       
        try {
            nunRender(url, { models: arg })
            console.log(arg)
            return 'sdfdsf'
        } catch (e) {
            return 'sdfdsf'
        }

    }
}
