
import axios from 'axios'
const baseURL='http://127.0.0.1:9909/api/v2/'; 
// const baseURL='http://39.106.105.169:9909/api/v2'

const ins=axios.create({
    baseURL,
    timeout:5000
})

ins.interceptors.request.use(config=>{
    config.headers.Authorization='Bearer '+localStorage.getItem('token'); // 携带token 进行请求
    return config;
});
ins.interceptors.response.use(response=>{
    return {
        data:response.data.data, //携带数据
        status:response.status  //携带状态码
    };
})

//请求出错时 catch 的处理函数
 const  errFun=(err)=>{
     return {
         status:err.response.status,
         err
     }
}

export  {ins,errFun};