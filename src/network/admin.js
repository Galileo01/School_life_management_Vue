import {ins,errFun} from './request'
 
export function getAdmin(account,pagenum,limit){
      return ins.get('get/adminList',{
            params:{
                  account,
                  limit,
                  offset:(pagenum-1)*limit //根据页码和 大小计算 偏移
            }
      })
      .catch(errFun);
}
export function addAdmin(account,password,role)
{   
      return ins.post('add/admin',{
            account,
            password,
            role
      }).catch(errFun)
}
export function removeAdmin(account)
{  
      return ins.delete('delete/admin',{
            params:{
            account}
      })
      .catch(errFun)
}
export function updateAdmin({account,email,tel,wechat})
{
      return ins.post('/update/admin',{
            account,
            email,
            tel,wechat
      })
      .catch(errFun)
}
//更新 管理员权限
export function updateRole(account,role){
      console.log(account,role);
      
      return ins.post('/update/adminRole',{
                  account,
                  role
      }).catch(errFun)
}
