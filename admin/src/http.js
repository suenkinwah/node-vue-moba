import axios from "axios";
import Vue from 'vue'
//定义一个http创建一个实例

const http = axios.create({
    baseURL:'http://localhost:3000/admin/api'
});

//加的
http.interceptors.request.use(function(config) {
    config.headers.Authorization = 'Bearer ' + localStorage.token;
    return config;
},function (error) {
    return Promise.reject(error);
});



//前端拦截
http.interceptors.response.use(res =>{
    return res;
}, err => {
    if (err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        });
    }

    return Promise.reject(err);
});

//文件导出
export default http
