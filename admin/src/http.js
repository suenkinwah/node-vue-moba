import axios from "axios";

//定义一个http创建一个实例

const http = axios.create({
    baseURL:'http://localhost:3000/admin/api'
})

//文件导出
export default http
