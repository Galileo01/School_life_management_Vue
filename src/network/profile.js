import {ins,errFun} from './request'

export function updateBaseInfo({account='',email='',qq='',tel='',wechat=''}){
  return ins.post('update/me',{
      account,email,qq,tel,wechat
  })
  .catch(errFun)
}
export function changePassword(newpass)
{
    return ins.post('update/password',{
       password:newpass
    })
    .catch(errFun)
}


//获取 管理员自己信息

export function getMe(){
  return ins.get('/get/me')
  .catch(errFun)
}