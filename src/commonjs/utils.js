//自定义的 表单 验证规则  

export const emailCheck = (rule, value, callback) => {
    //验证 邮箱的 正则
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(value)) return callback();
    callback(new Error("请输入合法邮箱"));
};

export const mobileCheck = (rule, value, callback) => {
    //验证 手机号码的 正则
    const reg = /^1(3|4|5|7|8)\d{9}$/;

    if (reg.test(value)) return callback();
    callback(new Error("请输入合法电话"));
};
