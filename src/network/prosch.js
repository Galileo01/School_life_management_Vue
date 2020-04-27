import { errFun, ins } from './request';

export function addProvince({ name, provinceID }) {
    return ins
        .post('add/province', {
            name,
            provinceID
        })
        .catch(errFun);
}

export function addSch({ name, provinceID, universityID }) {
    return ins
        .post('add/university', {
            name,
            provinceID,
            universityID
        })
        .catch(errFun);
}

export function getProvince(pagenum, limit) {
    return ins
        .get('get/provinceList', {
            params: {
                limit,
                offset: (pagenum - 1) * limit //根据页码和 大小计算 偏移
            }
        })
        .catch(errFun);
}
export function getSch(pagenum, limit) {
    return ins
        .get('get/universityList', {
            params: {
                limit,
                offset: (pagenum - 1) * limit //根据页码和 大小计算 偏移
            }
        })
        .catch(errFun);
}

export function updatePro(name, provinceID) {
    return ins
        .post('update/province', {
            name,
            provinceID
        })
        .catch(errFun);
}
export function updateSch(name, provinceID, universityID) {
    
    console.log(provinceID,universityID);
    
    return ins.post('update/university', {
        name,
        provinceID,
        universityID                          
    })
    .catch(errFun)
}


export function deleteSch(id)
{
    console.log(id);
    
    return ins.delete('delete/university',{
        params:{
            id
        }
    })
    .catch(errFun)
}
export function deletePro(id)
{
    return ins.delete('delete/province',{
        params:{
            id
        }
    })
    .catch(errFun)
}
