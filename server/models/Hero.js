//模型文件夹，分类
//引用mongoose
const mongoose = require('mongoose');

//定义模型的字段
const schema = new mongoose.Schema({
    //字段类型
    name:{type:String},
    avatar:{type:String},
    title:{type:String},
    //指定关联模型
    categories:[{type:mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    items1:[{type:mongoose.SchemaTypes.ObjectId, ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId, ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId, ref:'Hero'},
        description:{type:String},
    }]
});

//导出mongoose，schema字段，在admin文件夹里的index.js引用
module.exports = mongoose.model('Hero', schema);
