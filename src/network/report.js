import {ins,errFun} from './request'
//统计数据
export function getDailyData(){
        return ins.get('/get/dailyData')
        .catch(errFun)
}

export function getCurrentData(){
    return ins.get('/get/currentDailyData')
    .catch(errFun)
}

