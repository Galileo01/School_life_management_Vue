import { ins, errFun } from './request';

export function getUsers(account, pagenum, limit) {
    return ins
        .get('get/userList', {
            params: {
                account,
                limit,
                offset: (pagenum - 1) * limit
            }
        })
        .catch(errFun);
}
//测试 阶段
export function addUser(account, province, school) {
    return ins
        .post('add/user', {
            account,
            province,
            school
        })
        .catch(errFun);
}
export function updateState(state, userID) {
    return ins
        .post('update/userState', {
            state,
            userID
        })
        .catch(errFun);
}
export function removeUser(userID) {
    return ins
        .delete('delete/user', {
            params: {
                userID
            }
        })
        .catch(errFun);
}

export function updateUser({ qq, tel, wechat, userID }) {
    return ins
        .post('update/user', {
            qq,
            tel,
            wechat,
            userID
        })
        .catch(errFun);
}
