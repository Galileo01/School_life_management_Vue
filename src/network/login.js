import {ins,errFun} from './request';


export function loginReq(account, password) {
    console.log(account, password);

    return ins
        .post('login', {
            account,
            password
        })
        .catch(errFun);
}
