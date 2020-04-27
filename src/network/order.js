import {ins,errFun} from './request'
//测试 阶段 添加 四种 订单
export function addHelp(params){
            return ins.post('add/help',params)
            .catch(errFun)
}
export function addLost(params){
    return ins.post('add/lostFound',params)
    .catch(errFun)
}
export function addPartTime(params){
    return ins.post('add/partTime',params)
    .catch(errFun)
}
export function addSec(params){
    return ins.post('add/secondary',params)
    // .catch(errFun)
}



export function getHelp(pagenum,limit){
      return ins.get('get/helpList', {
        params: {
            limit,
            offset: (pagenum - 1) * limit //根据页码和 大小计算 偏移
        }
    })
      .catch(errFun)
}

export function deleteHelp(id)
{
    return ins.delete('delete/help',{
        params:{
            id
        }
    })
    .catch(errFun)
}
export function getLost(pagenum,limit){
    return ins.get('get/lostFoundList', {
        params: {
            limit,
            offset: (pagenum - 1) * limit //根据页码和 大小计算 偏移
        }
    })
    .catch(errFun)
}
export function deleteLost(id)
{
    return ins.delete('delete/lostFound',{
        params:{
            id
        }
    })
    .catch(errFun)
}


export function getPartime(pagenum,limit){
    return ins.get('get/partTimeList', {
        params: {
            limit,
            offset: (pagenum - 1) * limit //根据页码和 大小计算 偏移
        }
    })
    .catch(errFun)
}
export function deletePart(id)
{
    return ins.delete('delete/partTime',{
        params:{
            id
        }
    })
    .catch(errFun)
}



export function getSec(pagenum,limit){
    return ins.get('get/secondaryList', {
        params: {
            limit,
            offset: (pagenum - 1) * limit //根据页码和 大小计算 偏移
        }
    })
    .catch(errFun)
}
export function deleteSec(id)
{
    return ins.delete('delete/secondary',{
        params:{
            id
        }
    })
    .catch(errFun)
}