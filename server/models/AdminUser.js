//模型文件夹，分类
//引用mongoose
const mongoose = require('mongoose');

//定义模型的字段
const schema = new mongoose.Schema({
    //字段类型
    username:{type:String},
    password:{
        type:String,
        select:false,
    set(val){
        return require('bcrypt').hashSync(val, 10);
    }
    }

});

//导出mongoose，schema字段，在admin文件夹里的index.js引用
module.exports = mongoose.model('AdminUser', schema);
