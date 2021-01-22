//导出函数app
module.exports = app => {
    //引用连接数据库的mongoose
    const mongoose = require('mongoose');
    //mongoose连接mongodb
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        //连接参数(必须加上)
        useNewUrlParser:true
    })
};
